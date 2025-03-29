import BaseComponent from "../shared/base-component.js";

export class SealingComponent extends BaseComponent {
    sealid = "1";
    status = "normal";
    

    constructor() {
        super();
    }

    onChange() {
    }

    static get observedAttributes() {
        return ["sealid", "status"];
    }
}
