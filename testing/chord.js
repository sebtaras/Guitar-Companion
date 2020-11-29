const {chords} = require("./chords")
class Chord {
    constructor(chordName){
        this.map = new Map();
    }

    numberOfFingerings() {
        console.log(this.map.size)
    }
}

module.exports = {
    Chord
}