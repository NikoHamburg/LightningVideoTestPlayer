import { Lightning } from "@lightningjs/sdk";

class Button extends Lightning.Component {
  static _template() {
    return {
      color: 0xff000000,
      rect: true,
      h: 40,
      w: 120,
      Label: {
        x: 10,
        y: 4,
        color: 0xffffffff,
        text: { fontSize: 20 },
      },
    };
  }

  _init() {
    this.tag("Label").patch({
      text: {
        text: this.buttonText,
      },
    });
  }

  _focus() {
    this.color = 0xff555555;
    this.tag("Label").color = 0xfff1f1f1;
  }

  _unfocus() {
    this.color = 0xff000000;
    this.tag("Label").color = 0xffffffff;
  }
}

export { Button };
