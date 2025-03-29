import BaseComponent from "../shared/base-component.js";

export class VerticalVideoComponent extends BaseComponent {
    cam = "Vertical";
    
    static get observedAttributes() {
        return ["cam"];
    }
}
