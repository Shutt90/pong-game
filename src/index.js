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
  }
  create() {
    this.background = this.add.image(400, 300, "background");
    this.background.setScale(0.2);
    this.arr = [-300, 300];
    this.scoreText1 = this.add.text(200, 300, playerCurrentScore, {
      fontSize: "64px",
      fill: "#00af7d",
    });
    this.scoreText2 = this.add.text(550, 300, enemyCurrentScore, {
      fontSize: "64px",
      fill: "#feb700",
    });
    this.ball = this.physics.add.sprite(400, 300, "ball");
    this.ball.setScale(0.6);
    this.playerPaddle = this.physics.add.sprite(55, 300, "paddle");
    this.enemyPaddle = this.physics.add.sprite(745, 300, "paddle");
    this.physics.add.collider(this.ball, this.playerPaddle, null, null, this);
    this.physics.add.collider(this.ball, this.enemyPaddle, null, null, this);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1.2, 1.2);
    this.ball.body.allowRotation = true;
    this.ball.body.velocity.set(
      this.arr[Math.floor(Math.random() * this.arr.length)],
      this.rand
    );
    this.playerScore = () => playerCurrentScore++;
    this.enemyScore = () => enemyCurrentScore++;
    this.playerPaddle.setCollideWorldBounds(true);
    this.enemyPaddle.setCollideWorldBounds(true);
    this.playerPaddle.setImmovable();
    this.enemyPaddle.setImmovable();
    this.keys = this.input.keyboard.addKeys("W,S,A,D,I,J,L,K");
    this.ball.setCircle(31);

    this.ball.body.setAngularVelocity(250);
    this.ball.setMaxVelocity(1500);
    this.timer = function () {
      this.scene.resume();
    };
    this.resumeGame = function () {
      this.pauseText = this.add.text(250, 200, "NEW GAME", {
        fontSize: "64px",
        fill: "#fff",
      });
    };

    this.reset = function () {
      if (this.ball.body.x < this.playerPaddle.body.x - 25) {
        enemyCurrentScore++;
        this.scene.restart();
        this.scene.pause();
        console.log(this.time);
        // this.time.(4000, this.resumeGame(), [], this)

        // this.time.delayedCall(
        //   1000,
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
        this.scene.pause();
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
