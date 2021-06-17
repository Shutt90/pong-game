let playerCurrentScore = 0;
let enemyCurrentScore = 0;

class playScene extends Phaser.Scene {
  constructor() {
    super({ key: "playScene" });
  }

  preload() {
    this.load.image("ball", "./src/assets/ball2.png");
    this.load.image("paddle", "./src/assets/laser.png");
    this.load.image("background", "./src/assets/background.jpg");
    this.load.audio("score", "./src/assets/sounds/scoreup.wav");
    this.load.audio("win", "./src/assets/sounds/winner.wav");
    this.load.audio("lose", "./src/assets/sounds/loser.wav");
  }

  create() {
    this.scene.sendToBack();
    this.scene.pause();
    this.positions();
    this.createBackground();
    this.insertText();
    this.ballConfig();
    this.paddleConfig();
    this.sounds();
    this.func();
    this.fontSize = 64;
    this.keys = this.input.keyboard.addKeys("W,S,I,J");
  }

  update() {
    this.rand = Math.floor(Math.random() * 180);
    this.ai();
    this.gameOver();

    this.playerPaddle.setVelocity(0);
    if (this.keys.W.isDown) {
      this.playerPaddle.setVelocityY(-400);
    } else if (this.keys.S.isDown) {
      this.playerPaddle.setVelocityY(400);
    }

    this.reset();
  }

  positions() {
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

  paddleConfig() {
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

    this.playerPaddle.setCollideWorldBounds(true).setImmovable();
    this.enemyPaddle.setCollideWorldBounds(true).setImmovable();
    this.physics.add.collider(this.ball, this.playerPaddle, null, null, this);
    this.physics.add.collider(this.ball, this.enemyPaddle, null, null, this);
  }

  createBackground() {
    this.background = this.add.image(
      this.startPositionBall.x,
      this.startPositionBall.y,
      "background"
    );
    this.background.setScale(0.2);
  }

  insertText() {
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
  }

  ballConfig() {
    this.ball = this.physics.add.sprite(
      this.startPositionBall.x,
      this.startPositionBall.y,
      "ball"
    );

    this.ball
      .setCollideWorldBounds(true)
      .setCircle(31)
      .setMaxVelocity(1500)
      .setBounce(1.2, 1.2)
      .setScale(0.6);

    this.arr = [-300, 300];

    this.ball.body.allowRotation = true;
    this.ball.body.velocity.set(
      this.arr[Math.floor(Math.random() * this.arr.length)],
      this.rand
    );
    this.ball.body.setAngularVelocity(250);
  }

  sounds() {
    this.scoreSnd = this.sound.add("score");
    this.winSnd = this.sound.add("win");
    this.loseSnd = this.sound.add("lose");
  }

  func() {
    this.reset = function () {
      if (this.ball.x < this.startPlayPaddle.x - 25) {
        // if (soundOn) {
        this.scoreSnd.play();
        // }
        enemyCurrentScore++;
        this.scene.restart();
        this.scene.pause();
        setTimeout(() => {
          this.scene.resume();
        }, 3000);
      } else if (this.ball.body.x > this.startEnemyPaddle.x - 25) {
        // if (soundOn) {
        this.scoreSnd.play();
        // }
        playerCurrentScore++;
        this.scene.restart();
        this.scene.pause();
        setTimeout(() => {
          this.scene.resume();
        }, 3000);
      }
    };

    this.ai = function () {
      if (this.ball.x > this.startPositionBall.x) {
        this.physics.moveTo(
          this.enemyPaddle,
          this.startEnemyPaddle.x,
          this.ball.y,
          350
        );
      }
    };

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

    this.gameOver = function () {
      if (playerCurrentScore >= 10) {
        //display winner scene
        this.winSnd.play();
        alert("YOU WIN!!!");
        this.scene.pause();
      } else if (enemyCurrentScore >= 10) {
        this.loseSnd.play();
        alert("YOU LOSE!!!");
        this.scene.pause();
      }
    };
  }
}

export default playScene;
