function addFret(value, parent, first = false) {
  let fret = document.createElement("div");
  fret.innerHTML = `${value}`;
  fret.classList.add("fret");
  if (first) {
    fret.classList.add("fret-string");
  }
  parent.appendChild(fret);
}

function displayTuningListener(value, displayMode = "note") {
  switch (value) {
    case "E":
      displayTuning(EStandard, displayMode);
      break;
    case "Eb":
      displayTuning(EbStandard, displayMode);
      break;
    default:
      break;
  }
}

function displayTuning(tuning, mode = "note") {
  const fretboard = document.querySelector(".fretboard");
  clearTuning();
  displayFretNumbers();
  for (let key in tuning.strings) {
    const nodes = tuning.strings[key];
    nodes.forEach(node => {
      if (mode == "note" || node.FretNumber == 0)
        addFret(node.Note, fretboard, node.FretNumber == 0);
      else addFret(node.FretNumber, fretboard);
    });
  }
}

function clearTuning() {
  const fretboard = document.querySelector(".fretboard");
  fretboard.innerHTML = "";
}

function displayFretNumbers() {
  const fretboard = document.querySelector(".fretboard");
  for (let i = 0; i < 23; i++) {
    addFret(i, fretboard, true);
  }
}

function displayScaleListener(scale) {
  const tuning = document.querySelector(".selection-tuning").value;
  switch (scale) {
    case "C":
      displayScale(tuning, CmajorScale);
      break;
    case "Gm":
      displayScale(tuning, GminorScale);
      break;
    case "Amp":
      displayScale(tuning, AminorPentatonicScale);
    default:
      break;
  }
}

function displayScale(tuning, scale) {
  clearTuning();
  displayTuningListener(tuning);
  const frets = document.querySelectorAll(".fret");
  frets.forEach(fret => {
    const value = fret.innerHTML;
    let inScale = false;
    scale.notes.forEach(note => {
      if (note == value) inScale = true;
    });
    if (inScale) fret.classList.add("fret-scale");
  });
}

function defaultDisplay() {
  displayTuning(EStandard, "note");
}

defaultDisplay();
