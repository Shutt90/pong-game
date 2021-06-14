import Phaser from "phaser";

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
    this.scoreText1 = this.add.text(16, 16, "score: " + playerCurrentScore, {
      fontSize: "32px",
      fill: "#fff",
    });
    this.scoreText2 = this.add.text(500, 16, "score: " + enemyCurrentScore, {
      fontSize: "32px",
      fill: "#fff",
    });
    this.ball = this.physics.add.sprite(400, 300, "ball");
    this.playerPaddle = this.physics.add.sprite(55, 300, "paddle");
    this.enemyPaddle = this.physics.add.sprite(745, 300, "paddle");
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1.1, 1.1);
    this.ball.body.allowRotation = true;
    this.ball.body.velocity.set(400, this.rand);
    this.playerScore = () => playerCurrentScore++;
    this.enemyScore = () => enemyCurrentScore++;
    this.playerPaddle.setCollideWorldBounds(true);
    this.enemyPaddle.setCollideWorldBounds(true);
    this.playerPaddle.setImmovable();
    this.enemyPaddle.setImmovable();
    this.keys = this.input.keyboard.addKeys("W,S,A,D,I,J,L,K");
    this.ball.setCircle(17);
    this.ball.body.setAngularVelocity(250);
    this.resumeGame = function () {
      this.pauseText = this.add.text(250, 200, "NEW GAME", {
        fontSize: "64px",
        fill: "#fff",
      });
    };

    this.reset = function () {
      if (this.ball.body.x < this.playerPaddle.body.x - 10) {
        enemyCurrentScore++;
        this.scene.restart();
        this.scene.pause();

        // this.time.delayedCall(
        //   1000,
        //   function () {
        //     return this.scene.resume;
        //   },
        //   [],
        //   this
        // );
        // setInterval(function () {
        //   console.log(this);
        // }, 3000);
      } else if (this.ball.body.x > this.enemyPaddle.body.x + 10) {
        playerCurrentScore++;
        this.scene.restart();
        this.scene.pause();
        // this.time.delayedCall(3000, this.scene.resume, [], this);

        // setInterval(function () {
        //   this.scene.resume();
        // }, 3000);
      }
    };
  }

  update() {
    this.rand = Math.floor(Math.random() * 360);

    this.reset();

    this.playerPaddle.setVelocity(0);
    if (this.keys.W.isDown) {
      this.playerPaddle.setVelocityY(-400);
    } else if (this.keys.S.isDown) {
      this.playerPaddle.setVelocityY(400);
    }

    this.enemyPaddle.setVelocity(0);
    if (this.keys.I.isDown) {
      this.enemyPaddle.setVelocityY(-400);
    } else if (this.keys.K.isDown) {
      this.enemyPaddle.setVelocityY(400);
    }

    this.physics.add.collider(this.ball, this.playerPaddle, null, null, this);
    this.physics.add.collider(this.ball, this.enemyPaddle, null, null, this);
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
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
