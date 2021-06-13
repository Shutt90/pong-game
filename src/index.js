import Phaser from "phaser";

let currentScore

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("ball", "./src/assets/ball.png");
    this.load.image("paddle", "./src/assets/paddle.png");
  }

  create() {
    var ball = this.physics.add.sprite(400, 300, "ball");
    var playerPaddle = this.physics.add.sprite(25, 300, "paddle");
    var enemyPaddle = this.physics.add.sprite(775, 300, "paddle");
    const pause = (this.time.pause = true);
    ball.setBounce(0.2);
    ball.setCollideWorldBounds(true);
    playerPaddle.setCollideWorldBounds(true);
    enemyPaddle.setCollideWorldBounds(true); //sets sprite to stay in frame/canvas
    console.log(playerPaddle)
    playerPaddle.body.checkCollision,{right: true};

    this.tweens.add({
      targets: ball,
      x: config.physics.arcade.velocity.x,
      duration: 5000,
      ease: "Power0",
    });

    // var reverseBall = function () {
    //   if (ball.body.x === (playerPaddle.body.x - ball.body)|| ball.body.x === (playerPaddle.body.x - ball.body)) {
    //     config.physics.arcade.velocity.x === -config.physics.arcade.velocity.x
    //   }
    //   currentScore++
    // }
    // reverseBall();

    console.log(this.tweens);
  }

  update() {
    

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
      debug: true,
      // collider: [this.playerPaddle, this.enemyPaddle]
    },
  },
};

const game = new Phaser.Game(config);
