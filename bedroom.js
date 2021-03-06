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
        this.load.image('gameTiles7', 'assets/ps.png');
        this.load.tilemapTiledJSON('bedroom', 'assets/bedroom4.json');
        this.load.tilemapTiledJSON('shop', 'assets/shop_map2.json');

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
        const tileset7 = this.map.addTilesetImage('ps', 'gameTiles7');
        this.bottomLayer = this.map.createStaticLayer('Floor layer', [tileset4, tileset2, tileset3, tileset1, tileset5, tileset6]);
        this.middleLayer1 = this.map.createStaticLayer('carpet', [tileset4, tileset2, tileset3, tileset1, tileset6, tileset7]);
        this.middleLayer2 = this.map.createDynamicLayer('edge', [tileset4, tileset2, tileset3, tileset1, tileset5, tileset6, tileset7]);
        this.topLayer = this.map.createDynamicLayer('blocked', [tileset4, tileset2, tileset3, tileset1, tileset5, tileset6, tileset7]);
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
    }

    update(time, delta) {
        //charactermovment
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        if (score === 90){
            this.scene.stop('bedDialog');
            this.scene.stop('shopRadioDialog');
            this.scene.stop('serverDialog');
            this.scene.stop('pcBedroomDialog');
            this.scene.stop('alexaDialog');
            this.scene.stop('pcShopDialog');
            this.scene.stop('radioDialog');
            this.scene.stop('consoleDialog');
            this.scene.stop('tvDialog');
            this.scene.start('endDialog', this.score);
        }

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

            if (this.player.body.x < 190 && this.player.body.x > 120 && this.player.body.y === 416) {
                console.log("pc");
                this.scene.run('pcBedroomDialog', this.score);
            } else if (this.player.body.x < 360 && this.player.body.x > 280 && this.player.body.y > 40 && this.player.body.y < 100) {
                console.log("radio");
                this.scene.run('radioDialog', this.score);
            } else if (this.player.body.x === 512 && this.player.body.y > 110 && this.player.body.y < 155) {
                console.log("tv");
                this.scene.run('TvDialog', this.score);
            }
            else if (this.player.body.x === 480 && this.player.body.y > 203 && this.player.body.y < 248){
                console.log("console");
                this.scene.run('consoleDialog' ,this.score);
            }
            else if (this.player.body.x > 441 && this.player.body.x < 490 && this.player.body.y === 380){
                console.log("bed");
                this.scene.run('bedDialog' ,this.score);
            }
            else if (this.player.body.y > 405 && this.player.body.y < 443 && this.player.body.x === 416){
                console.log("bed");
                this.scene.run('bedDialog' ,this.score);
            }
            else if (this.player.body.y > 403 && this.player.body.y < 447 && this.player.body.x === 512){
                console.log("bed");
                this.scene.run('bedDialog' ,this.score);
            }
            else if (this.player.body.x > 438 && this.player.body.x < 493 && this.player.body.y === 480){
                console.log("bed");
                this.scene.run('bedDialog' ,this.score);
            }
            else {

                console.log("alexa");
                this.scene.run('alexaDialog', this.score);
            }

        }


        if (this.player.body.x < 102 && this.player.body.x > 55 && this.player.body.y === 64) {
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

function answerCorrect() {
    score += 10;
    console.log(score);
    updateProgress();
    if (score === document.getElementById("progressBar").max) {
        this.scene.stop("Bedroom");
    }

}

function updateProgress() {
    document.getElementById("progressBar").value = score;
}
