import Phaser from "phaser";

let playerCurrentScore = 0;
let enemyCurrentScore = 0;

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("ball", "./src/assets/ball2.png");
    this.load.image("paddle", "./src/assets/laser.png");
    this.load.image("background", "./src/assets/background.jpg");

    this.startPositionBall = { x: 400, y: 300 };

    this.startPlayPaddle = {
      x: this.startPositionBall.x - 345,
      y: this.startPositionBall.y,
    };

    this.startEnemyPaddle = {
      x: this.startPositionBall.x + 345,
      y: this.startPositionBall.y,
    };
  }

  create() {
    this.background = this.add.image(
      this.startPositionBall.x,
      this.startPositionBall.y,
      "background"
    );
    this.background.setScale(0.2);
    this.arr = [-300, 300];

    this.scoreText1 = this.add.text(
      this.startPositionBall.x / 2 - this.fontSize / 2,
      this.startPositionBall.y - this.fontSize / 2,
      playerCurrentScore,
      {
        fontSize: this.fontSize + "px",
        fill: "#00af7d",
      }
    );
    this.scoreText2 = this.add.text(
      this.startPositionBall.x * 1.5 - this.fontSize / 2,
      this.startPositionBall.y - this.fontSize / 2,
      enemyCurrentScore,
      {
        fontSize: this.fontSize + "px",
        fill: "#feb700",
      }
    );
    this.ball = this.physics.add.sprite(
      this.startPositionBall.x,
      this.startPositionBall.y,
      "ball"
    );
    this.ball;
    this.playerPaddle = this.physics.add.sprite(
      this.startPlayPaddle.x,
      this.startPlayPaddle.y,
      "paddle"
    );
    this.enemyPaddle = this.physics.add.sprite(
      this.startEnemyPaddle.x,
      this.startEnemyPaddle.y,
      "paddle"
    );

    this.fontSize = 64;

    this.ball
      .setCollideWorldBounds(true)
      .setCircle(31)
      .setMaxVelocity(1500)
      .setBounce(1.2, 1.2)
      .setScale(0.6);

    this.ball.body.allowRotation = true;
    this.ball.body.velocity.set(
      this.arr[Math.floor(Math.random() * this.arr.length)],
      this.rand
    );
    this.ball.body.setAngularVelocity(250);

    this.playerPaddle.setCollideWorldBounds(true).setImmovable();
    this.enemyPaddle.setCollideWorldBounds(true).setImmovable();

    this.physics.add.collider(this.ball, this.playerPaddle, null, null, this);
    this.physics.add.collider(this.ball, this.enemyPaddle, null, null, this);

    this.keys = this.input.keyboard.addKeys("W,S,A,D,I,J,L,K");

    this.timer = function () {
      this.scene.resume();
    };
    this.resumeGame = function () {
      this.pauseText = this.add.text(
        this.startPositionBall.x - this.fontSize / 2,
        this.startPositionBall.y - this.fontSize / 2,
        "NEW GAME",
        {
          fontSize: "64px",
          fill: "#fff",
        }
      );
    };

    this.reset = function () {
      if (this.ball.body.x < this.playerPaddle.body.x - 25) {
        enemyCurrentScore++;
        this.scene.restart();
        // this.scene.pause();
        // this.time.(4000, this.resumeGame(), [], this)

        // this.time.delayedCall(
        //   3000,
        //   function () {
        //     return this.scene.resume;
        //   },
        //   [],
        //   this
        // );
        // setInterval(function () {
        //   this.scene.resume;
        // }, 3000);
      } else if (this.ball.body.x > this.enemyPaddle.body.x + 25) {
        playerCurrentScore++;
        this.scene.restart();
        // this.scene.pause();
        // this.resumeGame();

        // this.time.delayedCall(3000, this.timer(), [], this);

        // setInterval(function () {
        //   this.scene.resume();
        // }, 3000);
      }
    };
  }

  update() {
    this.rand = Math.floor(Math.random() * 180);
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
