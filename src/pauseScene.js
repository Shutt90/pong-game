class pauseScene extends Phaser.Scene {
  constructor() {
    super({ key: "pauseScene" });
  }

  preload() {}

  create() {
    this.keys = this.input.keyboard.addKeys("R,SPACE");
    this.pauseText = this.add.text(
      0,
      0,
      "PAUSED\nPress Space to Resume\nOr R to restart frame",
      {
        fontSize: "32px",
        fill: "#fff",
      }
    );
    this.unpause();
    this.restart();
  }

  update() {
    this.unpause();
    this.restart();
  }

  unpause() {
    if (this.keys.SPACE.isDown) {
      this.scene.resume("playScene");
      this.scene.stop();
    }
  }

  restart() {
    if (this.keys.R.isDown) {
      this.scene.stop("playScene");
      this.scene.start("playScene");
      setTimeout(() => {
        this.scene.resume("playScene");
      }, 1000);
      this.scene.stop();
    }
  }
}

export default pauseScene;
