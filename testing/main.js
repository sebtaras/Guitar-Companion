const { Guitar } = require("./guitar");
const readline = require("readline");
const { displayChord } = require("./displayChord");
const { exit } = require("process");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let guitar = new Guitar();

asyncReadLine();

function asyncReadLine() {
    let chordName = rl.question("Enter a chord to display: ", chord => {
        if (chord != "") {
            displayChord(chord, guitar, "open");
            asyncReadLine();
        } else {
            exit();
            //test
        }
    });
}
