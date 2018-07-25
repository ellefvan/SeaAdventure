var Scene1 = new Phaser.Scene('Scene1');

let gameOver = false
let player
let score = 0
let bubbles
let velocity = 150
let badBubbles

Scene1.preload = function () {
    // this = Phaser.Scene
    // credit to Psyk23 from OpenGameArt.org
    this.load.image('player', '/images/BlueFish.png')
    // credit to Scribe from OpenGameArt.org
    this.load.image('background', '/images/underwater-background.png')
    // credit to HorrorPen from OpenGameArt.org
    this.load.image('bubble', '/images/bubble.png')
    this.load.image('redBubble', '/images/Bubble - Red.png')
    // credit to cynicmusic from OpenGameArt.org
    this.load.audio('bgmusic', ['/music/underwater.wav'])
}

Scene1.create = function () {
    let background = this.add.image(800, 600, 'background').setOrigin(1, 1)
    // make the test audio loop when played
    this.soundFX = this.sound.add("bgmusic", {loop: "true"})
    this.soundFX.play()
    // pause the music on m
    this.input.keyboard.on("keydown_M", (e) => {
        if (this.soundFX.isPlaying) {
            this.soundFX.pause()
        }
        else this.soundFX.resume()
    })
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: 'black' })
    player = this.physics.add.sprite(100, 450, 'player').setScale(0.125)
    player.setCollideWorldBounds(true);
    let bubbles = this.physics.add.group({
        key: 'bubble',
        repeat: 3,
        setXY: { x: 100, y: 50, stepX: 200, stepY: 200 },
        setScale: {x: .05, y: 0.05}
    })
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys()
    this.physics.add.overlap(player, bubbles, collectBubbles, null, this)
    badBubbles = this.physics.add.group()
    // make sure the badBubble is not created anywhere near Fishy!
    badBubbles.create(Phaser.Math.Between(200, 800), Phaser.Math.Between(0, 600), 'redBubble').setScale(0.025)
    this.physics.add.overlap(player, badBubbles, bubblesHurt, null, this)
}

Scene1.update = function (delta) {
    if (gameOver)
    {
        return;
    }
    if (cursors.left.isDown)
    {
        player.setVelocityX(velocity * -1 - .1*velocity);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(velocity + .1*velocity);
    }
    else if (cursors.up.isDown)
    {
        player.setVelocityY(velocity * -1 - .1*velocity);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(velocity + .1*velocity);
    }
}

function collectBubbles (player, bubble)
{
    bubble.x = Phaser.Math.Between(0, 800)
    bubble.y = Phaser.Math.Between(0, 600)

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score)
    let bubbleNum = 0
    if (score / 100 >= 1 && score % 100 === 0) {
        bubbleNum++
        for (let i = 0; i < bubbleNum; i++) {
            badBubbles.create(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 'redBubble').setScale(0.025)
        }
    }
}

function bubblesHurt (player, badBubbles)
{
    this.physics.pause();
// turn the player red
    player.setTint(0xff0000);
// stop the game
    gameOver = true;
}