class Bedroom extends Phaser.Scene {


    constructor() {
        super({key: "bedroom"})
    }

    preload() {
        this.load.image('gameTiles1', 'assets/aye_kitchen.png');
        this.load.image('gameTiles2', 'assets/aye_tile_c.png');
        this.load.image('gameTiles3', 'assets/interior.png');
        this.load.image('gameTiles4', 'assets/tiles.png');
        this.load.image('gameTiles5', 'assets/tv.png');
        this.load.plugin('DialogModalPlugin', './dialog_plugin.js');
        this.load.tilemapTiledJSON('bedroom', 'assets/bma-map.json');
        this.load.spritesheet('player1',
            'assets/playerSprite.png',
            {frameWidth: 32, frameHeight: 36}
        );


    }


    create() {
        this.map = this.add.tilemap('bedroom');
        var tileset1 = this.map.addTilesetImage('int3', 'gameTiles1');
        var tileset2 = this.map.addTilesetImage('interieor2', 'gameTiles2');
        var tileset3 = this.map.addTilesetImage('interior', 'gameTiles3');
        var tileset4 = this.map.addTilesetImage('BMA-Game', 'gameTiles4');
        this.bottomLayer = this.map.createStaticLayer('bottomLayer', [tileset4, tileset2, tileset3, tileset1]);
        this.middleLayer = this.map.createStaticLayer('middleLayer', [tileset4, tileset2, tileset3, tileset1]);
        this.topLayer = this.map.createStaticLayer('topLayer', [tileset4, tileset2, tileset3, tileset1]);
        this.topLayer.setCollision(259);
        // Character
        this.player = this.physics.add.sprite(325, 325, "player1", "assets/playerSprite.png");
        const spawnPoint = this.map.findObject("Objects", obj => obj.name === "Spawn Point");
        // this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player1", "assets/playerSprite.png"); TODO is this needed

        // has to be set in Tiled
        // this.topLayer.setCollisionByProperty({ collides: true }); TODO seems like its not working

        // this.sys.install('DialogModalPlugin');
        // console.log(this.sys.dialogModal);
        // this.sys.dialogModal.init();

        this.player.body.collideWorldBounds = true;

        this.moveKeys = this.input.keyboard.addKeys('W,S,A,D,UP,DOWN,LEFT,RIGHT');
        this.interactionKey = this.input.keyboard.addKeys('SPACE');
    }

    update() {

        //charactermovment
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;
        //
        if (this.moveKeys.W.isDown || this.moveKeys.UP.isDown) {
            this.player.body.velocity.y -= 150;
        }
        if (this.moveKeys.S.isDown || this.moveKeys.DOWN.isDown) {
            this.player.body.velocity.y += 150;
        }
        if (this.moveKeys.A.isDown || this.moveKeys.LEFT.isDown) {
            this.player.body.velocity.x -= 150;
        }
        if (this.moveKeys.D.isDown || this.moveKeys.RIGHT.isDown) {
            this.player.body.velocity.x += 150;
        }

        if (this.interactionKey.SPACE.isDown) {
            interact(this.player.x, this.player.y, this)
        }

    }

}