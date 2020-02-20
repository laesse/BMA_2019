class serverDialog extends Phaser.Scene {
    constructor() {
        super({
            key: 'serverDialog'
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
                text: this.add.text(0, 0, 'Stellen sie die Laufzeit \nihres Servers ein', {

                    fontSize: '24px',
                    color: 'black'
                }),
                space: {
                    title: 25,
                    content: 25,
                    choice: 15,

                    left: 25,
                    right: 25,
                    top: 25,
                    bottom: 25,


                }
            }),

            choices: [
                createLabel(this, '24/7'),
                createLabel(this, 'auf Anfrage'),
                createLabel(this, 'Tagsüber'),

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
                if (index === 1){
                    answerCorrect();
                }
                this.scene.stop('serverDialog');
            }, this )
            .on('button.over', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
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
