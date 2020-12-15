function refresh() {
  location.reload();
}

function addFret(value, parent, first = false) {
  let fret = document.createElement("div");
  fret.innerHTML = `${value}`;
  fret.classList.add("fret");
  if (first) {
    fret.classList.add("fret-string");
  }
  parent.appendChild(fret);
}

function enableSelectProgression() {
  const el = document.querySelector(".selection-progression");
  el.disabled = false;
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

function displayTuningListener(value, boolScale = true, displayMode = "note") {
  switch (value) {
    case "E":
      displayTuning(EStandard, boolScale, displayMode);
      break;
    case "Eb":
      displayTuning(EbStandard, boolScale, displayMode);
      break;
    default:
      break;
  }
}

function displayTuning(tuning, boolScale, mode = "note") {
  console.log("Displaying", tuning.name);
  const fretboard = document.querySelector(".fretboard");
  const scale = document.querySelector(".selection-scale").value;
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
  if (scale != "Select a scale" && boolScale) {
    displayScaleListener(scale);
  }
}

function displayScaleListener(scale) {
  enableSelectProgression();
  console.log(scale);
  switch (scale) {
    case "C":
      displayScale(CmajorScale);
      break;
    case "Gm":
      displayScale(GminorScale);
      break;
    case "Amp":
      displayScale(AminorPentatonicScale);
    default:
      break;
  }
}

function displayScale(scale) {
  clearTuning();
  const tuning = document.querySelector(".selection-tuning").value;
  displayTuningListener(tuning, false);
  const frets = document.querySelectorAll(".fret");

  frets.forEach(fret => {
    const value = fret.innerHTML;
    let inScale = false;
    scale.notes.forEach(note => {
      if (note == value) inScale = true;
    });

    if (inScale) fret.classList.add("fret-scale");
    if (value == scale.root) fret.classList.add("fret-root-note");
  });
}

function defaultDisplay() {
  displayTuning(EStandard, false, "note");
}

defaultDisplay();
