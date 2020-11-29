const {chords} = require("./chords")

class Chord {
    constructor(chordName){
        this.map = chords.chordName  
    }

    numberOfFingerings() {
        console.log(this.map.size)
    }
}