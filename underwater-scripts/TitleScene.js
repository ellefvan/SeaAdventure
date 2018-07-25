var TitleScene = new Phaser.Scene('TitleScene');

TitleScene.preload = function () {
    // credit to Scribe from OpenGameArt.org
    this.load.image('background', '/images/underwater-background.png')
}

TitleScene.create = function () {
    let background = this.add.image(800, 600, 'background').setOrigin(1, 1)
    this.texth1 = this.add.text(400, 100, 
        `Sea Game`, 
        {font: "80px Courier New", align: 'center'}).setOrigin(0.5, 0)
    this.texth2 = this.add.text(400, 300, "> Press Enter <", {font: "32px Courier New"}).setOrigin(0.5, 0.5)
    this.add.text(400, 350, "Press Space for How to Play", {font: "32px Courier New"}).setOrigin(0.5, 0.5)

    this.key_Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.key_Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
}

TitleScene.update = function(delta) {
    if(this.key_Enter.isDown) {
        this.scene.start("Scene1")
    }
    if(this.key_Space.isDown) {
        this.scene.start("Instructions")
    }
}