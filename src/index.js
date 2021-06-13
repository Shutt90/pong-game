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
    const ball = this.add.image(400, 300, "ball");
    const playerPaddle = this.add.image(25, 300, "paddle");
    const enemyPaddle = this.add.image(775, 300, "paddle");
    const pause = (this.time.pause = true);
    const playerPaddleCollide = this.object1;
    const enemyPaddleCollide = this.object2;

    this.tweens.add({
      targets: ball,
      x: config.physics.arcade.velocity.x,
      duration: 5000,
      ease: "Power0",
    });

    console.log(this.tweens);
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: MyGame,
  physics: {
    default: "arcade",
    arcade: {
      velocity: { x: 3000 },
    },
  },
};

const game = new Phaser.Game(config);
