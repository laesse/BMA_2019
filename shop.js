class Shop extends Phaser.Scene {
    constructor() {
        super({key: "Shop"})
    }
    preload(){

    }
    create(){
        this.map = this.add.tilemap('shop');
        const tileset3 = this.map.addTilesetImage('interior', 'gameTiles3');
        this.middleLayer2 = this.map.createStaticLayer('shopFloor', [tileset3]);
    }
    update(){

    }
}