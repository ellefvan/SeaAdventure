var Instructions = new Phaser.Scene('Instructions')

Instructions.preload = function () {
    // credit to Scribe from OpenGameArt.org
    this.load.image('background', '/images/underwater-background.png')
}

Instructions.create = function () {
    let background = this.add.image(800, 600, 'background').setOrigin(1, 1)
    let gameDescription = this.add.text(5, 5, 
        `Fishy loves eating bubbles! But he can only eat the blue ones!
Avoid the red ones or Fishy will die!`,
     { fontSize: '20px', fill: '#FFF', align: 'center' })

    this.add.text(50, 200, 
        `Use the arrow keys to move Fishy.
Fishy will get faster the more bubbles he eats.
Pause or start the music
by pressing the 'm' button on your keyboard.`,
    { fontSize: '20px', fill: '#FFF', align: 'center' })

    this.add.text(50, 400, 
        `Press ESC to start!`,
    { fontSize: '20px', fill: '#FFF', align: 'center' })

    
    this.key_Esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
}

Instructions.update = function (delta) {
    if(this.key_Esc.isDown) {
        this.scene.start("Scene1")
    }
}