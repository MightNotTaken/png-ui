import BaseComponent from "../shared/base-component.js";

export class HorizontalVideoComponent extends BaseComponent {
    cam = "Horizontal";
    
    static get observedAttributes() {
        return ["cam"];
    }
}
