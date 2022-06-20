import { VideoPlayer, Lightning, Registry } from "@lightningjs/sdk";
import { Button } from "./Button";
import { Logger } from "./Logger";

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
        SeekButton: {
          type: Button,
          buttonText: "Seek",
          x: 1250,
        },
        SkipButton: {
          type: Button,
          buttonText: "Skip",
          x: 1400,
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
    // Registry.setTimeout(() => {
    //   this.fireAncestors('$updateLogs', `isPlaying: ${VideoPlayer.playing}`)
    //   VideoPlayer.seek(VideoPlayer.duration - 0.5);
    // }, 2000);
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
              this.fireAncestors("$updateLogs", "Selected -> Play");
              VideoPlayer.play();
              break;
            }
            case "Pause": {
              this.fireAncestors("$updateLogs", "Selected -> Pause");
              VideoPlayer.pause();
              break;
            }
            case "Stop": {
              this.fireAncestors("$updateLogs", "Selected -> Stop");
              VideoPlayer.seek(0);
              break;
            }
            case "PlayPause": {
              this.fireAncestors("$updateLogs", "Selected -> PlayPause");
              VideoPlayer.playPause();
              break;
            }
            case "StopFirst": {
              this.fireAncestors("$updateLogs", "Selected -> stopFirst");
              VideoPlayer.seek(0);
              break;
            }
            case "StopLast": {
              this.fireAncestors("$updateLogs", "Selected -> stopLast");
              // VideoPlayer.seek(VideoPlayer.duration - 0.5);
              VideoPlayer.skip(
                VideoPlayer.duration - VideoPlayer.currentTime - 0.5
              );
              break;
            }
            case "Loop": {
              VideoPlayer.loop();
              this.fireAncestors(
                "$updateLogs",
                `Toggle Loop: loop ${VideoPlayer.looped}`
              );
              break;
            }
            case 'Seek': {
              VideoPlayer.seek(VideoPlayer.currentTime + 5);
              this.fireAncestors('$updateLogs', `Seeking + 5s`)
              break;
            }
            case 'Skip': {
              VideoPlayer.skip(5);
              this.fireAncestors('$updateLogs', `Skipping 5s`)
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
    this.fireAncestors("$updateLogs", "Event: $videoPlayerSeeked");
    VideoPlayer.pause();
    this.fireAncestors(
      "$updateLogs",
      `currentTime: ${VideoPlayer.currentTime} duration: ${VideoPlayer.duration} isPlaying: ${VideoPlayer.playing}`
    );
  }

  $videoPlayerSeeking() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerSeeking");
  }

  $videoPlayerStalled() {
    this.fireAncestors("$updateLogs", "Event: $videoPlayerStalled");
  }

  // $videoPlayerTimeUpdate() {
  //   this.fireAncestors("$updateLogs", "Event: $videoPlayerTimeUpdate");
  // }

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
