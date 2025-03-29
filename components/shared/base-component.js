export default class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.template = ""; 
        this.styleElement = null; 
        this.templateVariables = [];
    }

    async connectedCallback() {
        const componentPath = this.tagName.toLowerCase().replace("-component", "");

        // Fetch global CSS files and inject them
        const globalStyles = await this.loadGlobalStyles(["css/flex.css", "css/position.css"]);

        // Fetch component HTML
        const htmlResponse = await fetch(`./components/${componentPath}/${componentPath}.component.html`);
        if (!htmlResponse.ok) {
            console.error(`Component HTML not found: ${componentPath}`);
            return;
        }
        this.template = await htmlResponse.text();

        // Fetch component-specific CSS
        const cssResponse = await fetch(`./components/${componentPath}/${componentPath}.component.css`);
        if (cssResponse.ok) {
            const cssText = await cssResponse.text();
            this.styleElement = document.createElement("style");
            this.styleElement.textContent = cssText;
        }

        this.templateVariables = this.extractTemplateVariables();
        this.render(globalStyles);
    }

    async loadGlobalStyles(stylesheets) {
        let globalStyles = "";
        for (const sheet of stylesheets) {
            try {
                const response = await fetch(sheet);
                if (response.ok) {
                    globalStyles += await response.text();
                } else {
                    console.warn(`Global CSS not found: ${sheet}`);
                }
            } catch (error) {
                console.error(`Error loading global CSS: ${sheet}`, error);
            }
        }
        return globalStyles;
    }

    extractTemplateVariables() {
        if (!this.template) return [];
        const regex = /{{\s*([\w-]+)\s*}}/g;
        const matches = new Set();
        let match;
        while ((match = regex.exec(this.template)) !== null) {
            matches.add(match[1]); 
        }
        return Array.from(matches);
    }

    static get observedAttributes() {
        return [];
    }

    onChange() {
        // console.log("onChange not implemented");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            Array.from(this.attributes).forEach(attr => {
                if (this[attr.name] !== undefined) {
                    this[attr.name] = attr.value;
                }
            });
            this.onChange && this.onChange();
            this.render(); 
        }
    }

    

    
    getLoopableElements() {
        const templateWrapper = document.createElement("div");
        templateWrapper.innerHTML = this.template; // Convert template string to DOM
    
        return Array.from(templateWrapper.querySelectorAll("[looper]")).map(element => {
            // Extract only empty attributes (attributes with no value)
            const emptyAttributes = Array.from(element.attributes)
                .filter(attr => attr.value === "") // Only keep attributes with an empty value
                .reduce((acc, attr) => {
                    acc[attr.name] = true; // Store attribute name with a boolean `true`
                    return acc;
                }, {});
    
            return {
                component: element.tagName.toLowerCase(),
                looper: element.getAttribute("looper"), // Get looper separately
                tagText: element.outerHTML.trim(), // Full HTML tag
                attributes: emptyAttributes // Only empty attributes
            };
        });
    }
    
    updateVariablesHTML(html, context) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
    
        // Loop through all elements in the document
        doc.querySelectorAll("*").forEach((element) => {
            for (const attr of [...element.attributes]) {
                if (attr.name.startsWith("[")) {
                    let name = attr.name.slice(1, -1); // Remove brackets []
                    let value = JSON.stringify(context[attr.value]); // Get value from context (was `this[attr.value]`)
                    if (value !== undefined) {
                        element.removeAttribute(attr.name);
                        element.setAttribute(name, value);
                    }
                }
            }
        });
    
        return doc.body.innerHTML; // Return the modified HTML
    }
    
    render(globalStyles = "") {
        let renderedHTML = this.template;
        this.templateVariables.forEach(variable => {
            const regex = new RegExp(`{{\\s*${variable}\\s*}}`, "g");
            renderedHTML = renderedHTML.replace(regex, this[variable] || "");
        });

        renderedHTML = this.updateVariablesHTML(renderedHTML, this);
        const loopers = this.getLoopableElements();
        for (let element of loopers) {
            try {
                const {
                    component,
                    looper,
                    tagText,
                    attributes
                } = element;
                let list = [];
                let loopData = this[looper];
                try {
                    loopData = JSON.parse(this[looper]);
                } catch {}

                for (let data of loopData) {
                    let newElement = document.createElement(component);
                    for (let key in attributes) {
                        newElement.setAttribute(key, data[key])
                    }
                    list.push(newElement);
                }
                if (list.length) {
                    renderedHTML = renderedHTML.replace(tagText, list.map(el => el.outerHTML).join(""))
                }
                
            } catch (error) {
                console.error(error);
            }
        }


        this.shadowRoot.innerHTML = ""; 

        // Inject global styles
        const globalStyleElement = document.createElement("style");
        globalStyleElement.textContent = globalStyles;
        this.shadowRoot.appendChild(globalStyleElement);

        // Inject component-specific styles
        if (this.styleElement) this.shadowRoot.appendChild(this.styleElement.cloneNode(true));

        // Inject component HTML
        const contentWrapper = document.createElement("div");
        contentWrapper.innerHTML = renderedHTML;
        this.shadowRoot.appendChild(contentWrapper);
    }
}
