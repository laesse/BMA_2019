

var config = {
    type: Phaser.AUTO,
    width: 650,
    height: 650,
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y: 0}
        }
    },
    plugins: [ 'DialogModalPlugin' ],
    scene: [ Bedroom ],
    extend: {
        moveKeys: null,
        player: null,
        interactionKey : null
    },
};

var game = new Phaser.Game(config);