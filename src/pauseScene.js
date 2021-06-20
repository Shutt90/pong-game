class pauseScene extends Phaser.Scene {
    constructor() {
      super({ key: "pauseScene" });
    }

    preload(){}

    create(){
        this.keys = this.input.keyboard.addKeys("R,SPACE");
        console.log("PAUSE ENABLED")
        this.pauseText = this.add.text(
            0,
            0,
            "PAUSED\nPress Space to Resume\nOr R to restart",
            {
              fontSize: "32px",
              fill: "#fff",
            }
          );
        this.unpause();
    }

    update(){
        this.unpause();
    }


    unpause() {
        if (this.keys.SPACE.isDown) {
          this.scene.resume("playScene");
          this.scene.stop()
        } else if (this.keys.R.isDown) {
            this.scene.stop()
          this.scene.restart("playScene");
          setTimeout(() => {
            this.scene.resume("playScene");
          }, 1000);
        }
      };

}

export default pauseScene