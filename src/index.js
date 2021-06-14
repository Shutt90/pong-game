import Phaser from "phaser";

let ball;
let playerPaddle;
let enemyPaddle;
let playerCurrentScore = 0;
let enemyCurrentScore = 0;

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("ball", "./src/assets/ball.png");
    this.load.image("paddle", "./src/assets/paddle.png");
  }
  create() {
    var scoreText1;
    scoreText1 = this.add.text(16, 16, "score: " + playerCurrentScore, {
      fontSize: "32px",
      fill: "#fff",
    });
    var scoreText2;
    scoreText2 = this.add.text(500, 16, "score: " + enemyCurrentScore, {
      fontSize: "32px",
      fill: "#fff",
    });
    ball = this.physics.add.sprite(400, 300, "ball");
    playerPaddle = this.physics.add.sprite(55, 300, "paddle");
    enemyPaddle = this.physics.add.sprite(745, 300, "paddle");
    ball.setCollideWorldBounds(true);
    ball.setBounce(1.1, 1.1);
    ball.body.allowRotation = true;
    ball.body.velocity.set(400, this.rand);
    this.playerScore = () => playerCurrentScore++;
    this.enemyScore = () => enemyCurrentScore++;
    playerPaddle.setCollideWorldBounds(true);
    enemyPaddle.setCollideWorldBounds(true);
    playerPaddle.setImmovable();
    enemyPaddle.setImmovable();
    this.keys = this.input.keyboard.addKeys("W,S,I,K");
    ball.setCircle(17);
    ball.body.setAngularVelocity(250);

    this.reset = function () {
      if (ball.body.x < playerPaddle.body.x - 10) {
        enemyCurrentScore++;
        this.scene.restart();
      } else if (ball.body.x > enemyPaddle.body.x + 10) {
        playerCurrentScore++;

        this.scene.restart();
      }
    };
  }

  update() {
    this.physics.add.collider(ball, playerPaddle, null, null, this);
    this.physics.add.collider(ball, enemyPaddle, null, null, this);
    this.rand = Math.floor(Math.random() * 360);

    playerPaddle.setVelocity(0);
    if (this.keys.W.isDown) {
      playerPaddle.setVelocityY(-400);
    } else if (this.keys.S.isDown) {
      playerPaddle.setVelocityY(400);
    }
    this.reset();

    enemyPaddle.setVelocity(0);
    if (this.keys.I.isDown) {
      enemyPaddle.setVelocityY(-400);
    } else if (this.keys.K.isDown) {
      enemyPaddle.setVelocityY(400);
    }
    this.reset();
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
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
