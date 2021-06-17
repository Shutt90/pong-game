class menuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" });
  }

  preload() {
    this.load.image("space", "./src/assets/space.png");
    this.load.image("spacedown", "./src/assets/spacedown.png");
  }
  create() {
    this.scene.launch("playScene");
    this.keys = this.input.keyboard.addKeys("SPACE");

    this.anims.create({
      key: "spaceAnim",
      frames: [{ key: "space" }, { key: "spacedown" }],
      frameRate: 2,
      repeat: -1,
    });

    this.center = { x: 400, y: 300 };
    this.fontSize = 30;

    this.animatedSpace = this.add
      .sprite(this.center.y, this.center.x, "space")
      .play("spaceAnim")
      .setScale(2);
    this.insertMenuText();

    // this.add.sprite(400, 300, "space").play("animSpace");
  }
  update() {
    this.checkPlay();
  }

  checkPlay() {
    if (this.keys.SPACE.isDown) {
      this.scene.stop("menuScene");
      this.scene.resume("playScene");
    }
  }

  insertMenuText() {
    this.scoreText1 = this.add.text(
      this.center.x / 1.8 - this.fontSize / 2,
      this.center.y * 1.8 - this.fontSize / 2,
      "PRESS SPACE TO START",
      {
        fontSize: this.fontSize + "px",
        fill: "#000",
      }
    );
  }
}

export default menuScene;