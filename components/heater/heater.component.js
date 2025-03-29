import dataService from "../../services/data.service.js";
import BaseComponent from "../shared/base-component.js";

export class HeaterComponent extends BaseComponent {
    heaterid = 0;
    temperature = 0;

    constructor() {
        super();
        dataService.subscribe("plcData", data => {
            if (data[this.heaterid]) {
                this.temperature = data[this.heaterid];
                this.render();
            }
        });
    }
    
    static get observedAttributes() {
        return ["heaterid", "temperature"];
    }
}
