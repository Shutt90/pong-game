import Phaser from "phaser";

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("ball", "./src/assets/ball.png");
    this.load.image("paddle", "./src/assets/paddle.png");
  }

  create() {
    const ball = this.add.image(400, 150, "ball");
    const playerPaddle = this.add.image(25, 300, "paddle");
    const enemyPaddle = this.add.image(775, 300, "paddle");

    this.tweens.add({
      targets: [ball, playerPaddle, enemyPaddle],
      y: 450,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1,
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: MyGame,
};

const game = new Phaser.Game(config);
