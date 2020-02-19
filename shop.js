class Shop extends Phaser.Scene {
    constructor() {
        super({key: "Shop"})
    }
    preload(){

    }
    create(){
        this.map = this.add.tilemap('shop');
        const tileset3 = this.map.addTilesetImage('interior', 'gameTiles3');
        const tileset7 = this.map.addTilesetImage('ps', 'gameTiles7');
        const tileset6 = this.map.addTilesetImage('pc', 'gameTiles6');
        this.bottomLayer = this.map.createStaticLayer('floor', [tileset3, tileset7, tileset6]);
        this.floorLayer = this.map.createDynamicLayer('floor2', [tileset3, tileset7, tileset6]);
        this.shopEdgeLayer = this.map.createDynamicLayer('edge', [tileset3, tileset7,tileset6]);
        this.blockedLayer = this.map.createDynamicLayer('blocked', [tileset3, tileset7,tileset6]);
        this.shopFurnLayer = this.map.createDynamicLayer('furn', [tileset3, tileset7,tileset6]);
        this.player = this.physics.add.sprite(325, 325, "player1", 0);
        this.moveKeys = this.input.keyboard.addKeys('W,S,A,D,UP,DOWN,LEFT,RIGHT,cursor');
        this.interactionKey = this.input.keyboard.addKeys('SPACE');
        this.currentAnim = 0;
        this.timeSinceLastChange = this.time.now;

        this.shopEdgeLayer.setCollisionByProperty({collides: true});
        this.blockedLayer.setCollisionByProperty({collides: true});
        this.shopFurnLayer.setCollisionByProperty({collides: true});
        this.shopEdgeLayer.setCollisionBetween(1, 9999);
        this.blockedLayer.setCollisionBetween(1, 9999);
        this.shopFurnLayer.setCollisionBetween(1, 9999);
        this.physics.add.collider(this.player, this.shopEdgeLayer);
        this.physics.add.collider(this.player, this.blockedLayer);
        this.physics.add.collider(this.player, this.shopFurnLayer);

        this.player.body.collideWorldBounds = true;
    }
    update(){
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

        }

        if(this.player.body.x < 102 && this.player.body.x > 55 && this.player.body.y === 64){
            this.scene.start('Bedroom');
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