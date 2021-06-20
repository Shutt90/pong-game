import Phaser from "phaser";
import playScene from "./playScene";
import menuScene from "./menuScene";
import pauseScene from "./pauseScene"

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [menuScene, pauseScene, playScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
