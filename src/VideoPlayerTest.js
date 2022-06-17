import { VideoPlayer, Lightning } from "@lightningjs/sdk";
import { Button } from "./Button";

class VideoPlayerTest extends Lightning.Component {
  static _template() {
    return {
      Buttons: {
        y: 800,
        PlayButton: {
          type: Button,
          buttonText: "Play",
          x: 200,
        },
        PauseButton: {
          type: Button,
          buttonText: "Pause",
          x: 350,
        },
        StopButton: {
          type: Button,
          buttonText: "Stop",
          x: 500,
        },
        PlayPauseButton: {
          type: Button,
          buttonText: "PlayPause",
          x: 650,
        },
        StopFirstButton: {
          type: Button,
          buttonText: "StopFirst",
          x: 800,
        },
        StopLastButton: {
          type: Button,
          buttonText: "StopLast",
          x: 950,
        },
        LoopButton: {
          type: Button,
          buttonText: "Loop",
          x: 1100,
        },
      },
    };
  }

  _init() {
    VideoPlayer.consumer(this);
    VideoPlayer.size(1650, 720);
    VideoPlayer.position(100, 0);
    VideoPlayer.open(
      "http://vf-maf-lng.s3.eu-central-1.amazonaws.com/LNG_MVP_Big_Bunny_AWS_Test.mp4"
    );
    this.buttonIndex = 0;
    this._setState("Buttons");
  }

  static _states() {
    return [
      class Buttons extends this {
        _handleLeft() {
          if (this.buttonIndex > 0) this.buttonIndex--;
        }

        _handleRight() {
          if (this.buttonIndex < this.tag("Buttons").children.length - 1)
            this.buttonIndex++;
        }

        _getFocused() {
          return this.tag("Buttons").children[this.buttonIndex];
        }

        _handleEnter() {
          switch (this.tag("Buttons").children[this.buttonIndex].buttonText) {
            case "Play": {
              VideoPlayer.play();
              console.log(`${VideoPlayer.playing}`);
              break;
            }
            case "Pause": {
              VideoPlayer.pause();
              console.log(`${VideoPlayer.playing}`);
              break;
            }
            case "Stop": {
              VideoPlayer.seek(0);
              break;
            }
            case "PlayPause": {
              VideoPlayer.playPause();
              console.log(`${VideoPlayer.playing}`);
              break;
            }
            case "StopFirst": {
              VideoPlayer.seek(0);
              break;
            }
            case "StopLast": {
              VideoPlayer.seek(VideoPlayer.duration);
              break;
            }
            case "Loop": {
              console.log(`Looped: ${VideoPlayer.looped}`);
              VideoPlayer.loop();
              console.log(`Looped: ${VideoPlayer.looped}`);
              break;
            }
          }
        }
      },
    ];
  }

  $videoPlayerSeeked() {
    VideoPlayer.pause();
    console.log(`${VideoPlayer.playing}`);
  }

  $videoPlayerStalled() {
    console.log(`stalled`);
  }
}

// http://vf-maf-lng.s3.eu-central-1.amazonaws.com/LNG_MVP_Big_Bunny_AWS_Test.mp4

export { VideoPlayerTest };
