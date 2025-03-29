import BaseComponent from "../shared/base-component.js";

export class SealingListComponent extends BaseComponent {
    data = [];
        
    static get observedAttributes() {
        return ["data"];
    }

}
