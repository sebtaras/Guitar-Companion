const {Guitar} = require("./guitar");
const readline = require('readline');
const {Chord} = require("./chord");
const {chords} = require("./chords");
const {displayChord} = require("./displayChord")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let guitar = new Guitar();

let chordName = rl.question("Enter a chord to display: ", (chord) => {
    displayChord(chord, guitar, "open")
});
