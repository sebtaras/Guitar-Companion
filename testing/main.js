const {Guitar} = require("./guitar");
const {chords} = require("./chords");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


displayChord(chordName, guitar){
    console.log("display chord");
}

let guitar = new Guitar();
guitar.outputGuitar();

while(true){ 
    let chordName = rl.question("Enter a chord to display: ", (chord) => {
        displayChord(chord, guitar)
    });
}
