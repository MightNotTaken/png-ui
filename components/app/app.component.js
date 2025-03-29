import BaseComponent from "../shared/base-component.js";

export class AppComponent extends BaseComponent {
  leftSeals = [
    {
      sealid: 1,
      status: "normal",
    },
    {
      sealid: 2,
      status: "low-temperature",
    },
    {
      sealid: 3,
      status: "high-temperature",
    },
    {
      sealid: 4,
      status: "normal",
    },
    {
      sealid: 5,
      status: "normal",
    },
    {
      sealid: 6,
      status: "low-pressure",
    },
    {
      sealid: 7,
      status: "paper-shift",
    },
  ];
  rightSeals = [
    {
      sealid: 8,
      status: "normal",
    },
    {
      sealid: 9,
      status: "low-temperature",
    },
    {
      sealid: 10,
      status: "high-temperature",
    },
    {
      sealid: 11,
      status: "normal",
    },
    {
      sealid: 12,
      status: "normal",
    },
    {
      sealid: 13,
      status: "low-pressure",
    },
    {
      sealid: 14,
      status: "paper-shift",
    },
  ];
}
