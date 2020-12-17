function getTuning(value) {
  switch (value) {
    case "E":
      return EStandard;
    case "Eb":
      return EbStandard;
  }
}

function getScale(value) {
  switch (value) {
    case "C":
      return CmajorScale;
    case "Am":
      return AminorScale;
    case "Gm":
      return GminorScale;
    case "Amp":
      return AminorPentatonicScale;
  }
}

function getChord(value) {
  switch (value) {
    case "A":
      return AmajorChord;
    case "A#":
      return AsharpMajorChord;
    case "B":
      return BmajorChord;
    case "C":
      return CmajorChord;
    case "C#":
      return CsharpMajorChord;
    case "D":
      return DmajorChord;
    case "D#":
      return DsharpMajorChord;
    case "E":
      return EmajorChord;
    case "F":
      return FmajorChord;
    case "F#":
      return FsharpMajorChord;
    case "G":
      return GmajorChord;
    case "G#":
      return GsharpMajorChord;
    case "Am":
      return AminorChord;
    case "A#m":
      return AsharpMinorChord;
    case "Bm":
      return BminorChord;
    case "Cm":
      return CminorChord;
    case "C#m":
      return CsharpMinorChord;
    case "Dm":
      return DminorChord;
    case "D#m":
      return DsharpMinorChord;
    case "Em":
      return EminorChord;
    case "Fm":
      return FminorChord;
    case "F#m":
      return FsharpMinorChord;
    case "Gm":
      return GminorChord;
    case "G#m":
      return GsharpMinorChord;
    case "Adim7b5":
      return Adim7flat5;
    case "Bdim7b5":
      return Bdim7flat5;
  }
}
