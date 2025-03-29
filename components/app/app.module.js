import {AppComponent} from "./app.component.js";
import {SealingComponent} from "../sealing/sealing.component.js";
import {SealingListComponent} from "../sealing-list/sealing-list.component.js";
import {VerticalVideoComponent} from "../vertical-video/vertical-video.component.js";
import {HorizontalVideoComponent} from "../horizontal-video/horizontal-video.component.js";
import {PelletInfoComponent} from "../pellet-info/pellet-info.component.js";
import {HeatersComponent} from "../heaters/heaters.component.js";
import {HeaterComponent} from "../heater/heater.component.js";

const components = [
    {
        key: "app-component",
        class: AppComponent
    },
    {
        key: "sealing-component",
        class: SealingComponent
    },
    {
        key: "sealing-list-component",
        class: SealingListComponent
    },
    {
        key: "vertical-video-component",
        class: VerticalVideoComponent
    },
    {
        key: "horizontal-video-component",
        class: HorizontalVideoComponent
    },
    {
        key: "pellet-info-component",
        class: PelletInfoComponent
    },
    {
        key: "heaters-component",
        class: HeatersComponent
    },
    {
        key: "heater-component",
        class: HeaterComponent
    }
];

for (const component of components) {
    customElements.define(component.key, component.class);
}   

