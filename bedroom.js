class Bedroom extends Phaser.Scene {
    currentAnim;
    timeSinceLastChange;



    constructor() {
        super({key: "Bedroom"})
    }

    preload() {
        this.load.image('gameTiles1', 'assets/aye_kitchen.png');
        this.load.image('gameTiles2', 'assets/aye_tile_c.png');
        this.load.image('gameTiles3', 'assets/interior.png');
        this.load.image('gameTiles4', 'assets/tiles.png');
        this.load.image('gameTiles5', 'assets/tv.png');
        this.load.image('gameTiles6', 'assets/pc.png');
        this.load.tilemapTiledJSON('bedroom', 'assets/bma-mapD.json');
        this.load.tilemapTiledJSON('shop', 'assets/shopC.json');

        this.load.spritesheet('player1',
            'assets/playerspriteblue.png',
            {
                frameWidth: 32,
                frameHeight: 36,
                startFrame: 0,
                endFrame: 12
            }
        );


    }


    create() {

        this.map = this.add.tilemap('bedroom');
        const tileset1 = this.map.addTilesetImage('int3', 'gameTiles1');
        const tileset2 = this.map.addTilesetImage('interieor2', 'gameTiles2');
        const tileset3 = this.map.addTilesetImage('interior', 'gameTiles3');
        const tileset4 = this.map.addTilesetImage('BMA-Game', 'gameTiles4');
        const tileset5 = this.map.addTilesetImage('tv', 'gameTiles5');
        const tileset6 = this.map.addTilesetImage('pc', 'gameTiles6');
        this.bottomLayer = this.map.createStaticLayer('Floor layer', [tileset4, tileset2, tileset3, tileset1]);
        this.middleLayer1 = this.map.createStaticLayer('carpet', [tileset4, tileset2, tileset3, tileset1, tileset6]);
        this.middleLayer2 = this.map.createDynamicLayer('edge', [tileset4, tileset2, tileset3, tileset1]);
        this.topLayer = this.map.createDynamicLayer('blocked', [tileset4, tileset2, tileset3, tileset1, tileset5, tileset6]);
        // Character
        this.player = this.physics.add.sprite(325, 325, "player1", 0);
        //collision with wall & Objects
        this.topLayer.setCollisionByProperty({collides: true});
        this.topLayer.setCollisionBetween(1, 9999);
        this.physics.add.collider(this.player, this.topLayer);
        this.middleLayer2.setCollisionBetween(1, 9999);
        this.physics.add.collider(this.player, this.middleLayer2);

        this.player.body.collideWorldBounds = true;

        this.moveKeys = this.input.keyboard.addKeys('W,S,A,D,UP,DOWN,LEFT,RIGHT,cursor');
        this.interactionKey = this.input.keyboard.addKeys('SPACE');

        this.currentAnim = 0;
        this.timeSinceLastChange = this.time.now;
        this.scoreTotal = 0;
    }

    update(time, delta) {
        //charactermovment
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;


        if (this.moveKeys.W.isDown || this.moveKeys.UP.isDown) {
            this.changeFrame(0, 2);
            this.player.setFrame(this.currentAnim);
            this.player.body.velocity.y -= 150;

        }
        if (this.moveKeys.S.isDown || this.moveKeys.DOWN.isDown) {
            this.changeFrame(3, 5);
            this.player.setFrame(this.currentAnim);
            this.player.body.velocity.y += 150;

        }
        if (this.moveKeys.A.isDown || this.moveKeys.LEFT.isDown) {
            this.changeFrame(6, 8);
            this.player.setFrame(this.currentAnim);
            this.player.body.velocity.x -= 150;

        }
        if (this.moveKeys.D.isDown || this.moveKeys.RIGHT.isDown) {
            this.changeFrame(9, 11);
            this.player.setFrame(this.currentAnim);
            this.player.body.velocity.x += 150;

        }

        if (this.interactionKey.SPACE.isDown) {
            //TODO AddAction
            this.scene.run('TvDialog', this.score);

        }

        if(this.player.body.x < 102 && this.player.body.x > 55 && this.player.body.y === 64){
            this.scene.start('Shop');
        }
    }

    changeFrame(number, number2) {
        let timePassed = this.time.now - this.timeSinceLastChange;

        if (timePassed >= 200 || this.currentAnim < number || this.currentAnim > number2) {
            if (this.currentAnim >= number && this.currentAnim < number2) {
                this.currentAnim++;

            } else {
                this.currentAnim = number;
            }
            this.timeSinceLastChange = this.time.now;
        }

    }


}
var score = 0;
function answerCorrect(){
    score += 10;
    console.log(score);
}