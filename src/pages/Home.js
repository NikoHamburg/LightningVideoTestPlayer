import { Lightning } from "@lightningjs/sdk";
import { VideoPlayerTest } from "../VideoPlayerTest";

class Home extends Lightning.Component {
  static _template() {
    return {
      Video: {
        type: VideoPlayerTest,
      },
    };
  }

  _getFocused() {
    return this.tag("Video");
  }
}

export { Home };
