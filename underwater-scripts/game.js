var config = {
    type:Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade'
    },
    scene: [ TitleScene, Instructions, Scene1 ]
}

var game = new Phaser.Game(config)