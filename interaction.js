
var questions = [
    {
        triggerArea: {
            x1: 200, x2: 250,
            y1: 200, y2: 250
        },
        question: "Wie viele Prozent der jährlichen CO2 emissionen fallen\n auf die online Pornographie Industrie?",
        answer: [
            "20 kg",
            "1 kg",
            "100 kg",
            "0.1 kg"
        ],
        correctAnswer: 3
    }
]



function interact(x, y, scene) {
    questions.forEach(q => {
        if(q.triggerArea.x1 < x && x < q.triggerArea.x2 && q.triggerArea.y1 < y && y < q.triggerArea.y2){
            displayQuestion(q, scene)
        }
    });
}

function displayQuestion(q, scene) {
  // scene.add.rexRoundRectangle(10, 400, 630, 150, 5, 0xede76b);
  scene.dialogPlugin.init()
  console.log("test")
//   scene.make.text({
//       x: 20, y: 410,
//       text: q.question,
//       stlye: {
//           font: "bold 10px Consolas",
//           fill: "black",
//           wordWrap: {width: 610},
//           align: 'center', 
//       }
//   })
}