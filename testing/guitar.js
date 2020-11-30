const {FRET_NUM, STRING_NUM} = require("./constants")

class Guitar {
    constructor() {
        this.map = new Map();
        this.map[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.map[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.map[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.map[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.map[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.map[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //this.tuning = E_STANDARD;
    }

    outputGuitar() {
        console.log("   0  1  2  3  4  5  6  7  8  9 10 11 12\n");
        for(let i=1; i<=STRING_NUM; i++){
            this.outputString(this.map[i], i);
        }
    }

    outputString(array, stringIndex){
        switch(stringIndex){
            case 1: process.stdout.write("e  "); break;
            case 2: process.stdout.write("B  "); break;
            case 3: process.stdout.write("G  "); break;
            case 4: process.stdout.write("D  "); break;
            case 5: process.stdout.write("A  "); break;
            case 6: process.stdout.write("E  "); break;
        }
        for(let i=0; i<=FRET_NUM; i++){
            process.stdout.write(array[i] == 0 ? "-  " : array[i] + "  ")
        }
        console.log()
    }

    updateWithChord(chord) {
        for(let i=1; i<=STRING_NUM; i++){
            this.map[i][chord[i-1]] = 1;
        }
    }

    clearChord(){
        this.map[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.map[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.map[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.map[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.map[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.map[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
}

module.exports = {
    Guitar
}