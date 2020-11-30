const { chords } = require("./chords");

function displayChord(input, guitar, chordType) {
  switch (input) {
    case "A": determineChordType(chords.A, guitar, chordType); break;
    case "Am": determineChordType(chords.Am, guitar, chordType); break;
    case "C": determineChordType(chords.C, guitar, chordType); break;
    case "Cm": determineChordType(chords.Cm, guitar, chordType); break;
  }
}

function determineChordType(chordFingerings, guitar, chordType) {
  switch (chordType) {
    case "open": {
      if (chordFingerings.open) renderChord(chordFingerings.open, guitar);
      else determineChordType(chordFingerings, guitar, "barre");
      break;
    }
    case "barre": {
      if (chordFingerings.barre) renderChord(chordFingerings.barre, guitar);
      else console.log(guitar);
    }
    default:
      break;
  }
}

function renderChord(chord, guitar){
    guitar.clearChord();
    guitar.updateWithChord(chord);
    guitar.outputGuitar();
}

module.exports = {
  displayChord,
};
