class alexaDialog extends Phaser.Scene {
    constructor() {
        super({
            key: 'alexaDialog'
        })
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }


    create() {
        var dialog = this.rexUI.add.dialog({
            x: 325,
            y: 325,

            background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x26f070),

            title: this.rexUI.add.label({
                background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xffffff),
                text: this.add.text(0, 0, 'Du willst soviel CO2 sparen wie möglich, \n welche Option ist für die Umwelt die Bessere?', {
                    fontSize: '12px',
                    color: 'black'
                }),
                space: {
                    left: 15,
                    right: 15,
                    top: 10,
                    bottom: 10
                }
            }),

            choices: [
                createLabel(this, 'Schalte die Lüftung selbständig an!'),
                createLabel(this, 'Alexa, schalte die Lüftung ein'),
            ],

            space: {
                title: 25,
                content: 25,
                choice: 15,

                left: 25,
                right: 25,
                top: 25,
                bottom: 25,
            },

            expand: {
                content: false,  // Content is a pure text object
            }
        })
            .layout()
            // Für testing-Zwecke
            //.drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000);

        this.print = this.add.text(0, 0, '');
        dialog
            .on('button.click', function (button, groupName, index) {
                console.log(index + ': ' + button.text + '\n');
                if (index === 0){
                    answerCorrect();
                }
                this.scene.stop('alexaDialog');
            }, this )
            .on('button.over', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle(1, 0x000000);
            })
            .on('button.out', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle();
            });



    }



    update() {

    }
}

var createLabel = function (scene, text, backgroundColor) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x6a4f4b),

        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
};