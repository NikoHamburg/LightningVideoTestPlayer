import { Lightning } from "@lightningjs/sdk";

class Logger extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 400,
      x: 0,
      y: -400,
      rect: true,
      color: 0xcc000000,
      Logs: {
        x: 170,
        y: 20,
        flex: {
          direction: "column",
        },
        children: [],
      },
    };
  }

  _construct() {
    this.logs = [];
    this.logIndex = 0;
  }

  _init() {
    this.logStart = `APP START v${this.application.config.version}`;
    this.updateLogs(this.logStart);
  }

  updateLogs(logText) {
    console.log(logText);
    this.logIndex++;
    const logObj = {
      text: {
        text: `${this.logIndex}) ${logText}`,
        fontSize: 20,
        textColor: 0xff00dd00,
      },
    };
    if (this.logs.length < 12) this.logs.unshift(logObj);
    else {
      this.logs.pop();
      this.logs.unshift(logObj);
    }

    this.tag("Logs").children = this.logs;
  }
}

export { Logger };
