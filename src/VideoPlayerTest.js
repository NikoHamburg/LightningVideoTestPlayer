import { VideoPlayer, Lightning, Registry } from "@lightningjs/sdk";
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
        SkipToEndButton: {
          type: Button,
          buttonText: "SkipToEnd",
          x: 800,
        },
        Playmode0Button: {
          type: Button,
          buttonText: "Playmode 0",
          x: 950,
        },
        Playmode1Button: {
          type: Button,
          buttonText: "Playmode 1",
          x: 1100,
        },
        Playmode2Button: {
          type: Button,
          buttonText: "Playmode 2",
          x: 1250,
        },
      },
    };
  }

  _construct() {
  }

  _init() {
    VideoPlayer.consumer(this);
    VideoPlayer.size(1650, 720);
    VideoPlayer.position(100, 0);
    VideoPlayer.open(
      "http://vf-maf-lng.s3.eu-central-1.amazonaws.com/LNG_MVP_Big_Bunny_AWS_Test.mp4"
    );
    this.buttonIndex = 0;
    this.playmode = 0;
    this.hasEnded = false;
    this.isPlaying = false;
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
              this.isPlaying = true;
              this.fireAncestors(
                "$updateLogs",
                `Selected -> Play || hasEnded: ${this.hasEnded} isPlaying: ${this.isPlaying}`
              );
              this.hasEnded && this.playmode === 0
                ? VideoPlayer.seek(0)
                : VideoPlayer.play();
              break;
            }
            case "Pause": {
              this.isPlaying = false;
              this.fireAncestors(
                "$updateLogs",
                `Selected -> Pause || hasEnded: ${this.hasEnded} isPlaying: ${this.isPlaying}`
              );
              VideoPlayer.pause();
              break;
            }
            case "Stop": {
              this.fireAncestors(
                "$updateLogs",
                `Selected -> Stop || hasEnded: ${this.hasEnded} isPlaying: ${this.isPlaying}`
              );
              VideoPlayer.seek(0);
              break;
            }
            case "PlayPause": {
              if (this.isPlaying) {
                this.isPlaying = false;
                this.fireAncestors(
                  "$updateLogs",
                  `Selected -> Pause from Play/Pause || hasEnded: ${this.hasEnded} isPlaying: ${this.isPlaying}`
                );
                VideoPlayer.pause();
              } else {
                this.isPlaying = true;
                this.fireAncestors(
                  "$updateLogs",
                  `Selected -> Play from Play/Pause || hasEnded: ${this.hasEnded} isPlaying: ${this.isPlaying}`
                );
                this.hasEnded && this.playmode === 0
                  ? VideoPlayer.seek(0)
                  : VideoPlayer.play();
              }
              break;
            }
            case "SkipToEnd": {
              this.fireAncestors(
                "$updateLogs",
                `Selected -> SkipToEnd || Skipping to ${VideoPlayer.duration - 3}s of ${
                  VideoPlayer.duration
                }s`
              );
              this.isPlaying = false;
              VideoPlayer.seek(VideoPlayer.duration - 3);
              break;
            }
            case "Playmode 0": {
              this.playmode = 0;
              this.fireAncestors(
                "$updateLogs",
                `Selected -> Playmode 0: Stop on last frame`
              );
              break;
            }
            case "Playmode 1": {
              this.playmode = 1;
              this.fireAncestors(
                "$updateLogs",
                `Selected -> Playmode 1: Stop on first frame`
              );
              break;
            }
            case "Playmode 2": {
              this.playmode = 2;
              this.fireAncestors("$updateLogs", `Selected -> Playmode 2: Loop`);
              break;
            }
          }
        }
      },
    ];
  }

  $videoPlayerAbort() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerAbort");
  }

  $videoPlayerCanPlay() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerCanPlay");
  }

  $videoPlayerCanPlayThrough() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerCanPlayThrough");
  }

  $videoPlayerDurationChange() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerDurationChange");
  }

  $videoPlayerEmptied() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerEmptied");
  }

  $videoPlayerEncrypted() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerEncrypted");
  }

  $videoPlayerEnded() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerEnded");
  }

  $videoPlayerError() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerError");
  }

  $videoPlayerInterruptBegin() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerInterruptBegin");
  }

  $videoPlayerInterruptEnd() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerInterruptEnd");
  }

  $videoPlayerLoadedData() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerLoadedData");
  }

  $videoPlayerLoadedMetaData() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerLoadedMetaData");
  }

  $videoPlayerLoadStart() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerLoadStart");
  }

  $videoPlayerPlay() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerPlay");
  }

  $videoPlayerPlaying() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerPlaying");
  }

  // $videoPlayerProgress() {
  // this.fireAncestors("$updateLogs", "Event: $videoPlayerProgress");
  // }

  $videoPlayerRatechange() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerRatechange");
  }

  $videoPlayerSeeked() {
    this.fireAncestors(
      "$updateLogs",
      `Event: $videoPlayerSeeked | hasEnded: ${this.hasEnded} isPlaying: ${this.isPlaying}`
    );
    if (this.hasEnded) {
      if (this.isPlaying) {
        this.hasEnded = false;
        VideoPlayer.play();
      } else {
        this.hasEnded = false;
        VideoPlayer.pause();
      }
    } else {
      VideoPlayer.pause();
    }
  }

  $videoPlayerSeeking() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerSeeking");
  }

  $videoPlayerStalled() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerStalled");
  }

  $videoPlayerTimeUpdate() {
    // this.fireAncestors(
    //   "$updateLogs",
    //   `Event: $videoPlayerTimeUpdate hasEnded: ${this.hasEnded} isPlaying: ${this.isPlaying}`
    // );
    if (VideoPlayer.currentTime > VideoPlayer.duration - 1 && !this.hasEnded) {
      this.hasEnded = true;
      this.fireAncestors(
        "$updateLogs",
        `Custom Event: video has ended: ${this.hasEnded}`
      );
      switch (this.playmode) {
        case 0: {
          this.isPlaying = false;
          this.fireAncestors(
            "$updateLogs",
            `Playmode: ${this.playmode}  -> stopping on last frame`
          );
          VideoPlayer.pause();
          break;
        }
        case 1: {
          this.isPlaying = false;
          this.fireAncestors(
            "$updateLogs",
            `Playmode: ${this.playmode}  -> stopping on first frame`
          );
          VideoPlayer.seek(0);
          break;
        }
        case 2: {
          this.isPlaying = true;
          this.fireAncestors(
            "$updateLogs",
            `Playmode: ${this.playmode}  -> looping`
          );
          VideoPlayer.seek(0);
          break;
        }
      }
      VideoPlayer.pause();
    }
  }

  $videoPlayerVolumeChange() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerVolumeChange");
  }

  $videoPlayerWaiting() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerWaiting");
  }

  $videoPlayerClear() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerClear");
  }
}

// http://vf-maf-lng.s3.eu-central-1.amazonaws.com/LNG_MVP_Big_Bunny_AWS_Test.mp4

export { VideoPlayerTest };
