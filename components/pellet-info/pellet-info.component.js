import BaseComponent from "../shared/base-component.js";

export class PelletInfoComponent extends BaseComponent {
    color = "blue";
    text  = "Sealing";;
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ["color", "text"];
    }
}
