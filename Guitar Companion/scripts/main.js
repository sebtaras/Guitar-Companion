function refresh() {
  location.reload();
}

function addFret(value, parent, first = false) {
  let fret = document.createElement("div");
  fret.innerHTML = `${value}`;
  fret.classList.add("fret");
  if (first) {
    fret.classList.add("fret-string");
    if ([0, 3, 5, 7, 9, 12, 15, 17, 19, 21].indexOf(value) > -1) {
      fret.classList.add("fret-mark");
    }
  }
  parent.appendChild(fret);
}

function addNote(value, parent) {
  let note = document.createElement("div");
  note.innerHTML = `${value}`;
  note.classList.add("note");
  note.dataset.toggle = "off";
  note.addEventListener("click", () => toggleHighlight(note));
  parent.appendChild(note);
}

function enableSelectProgression() {
  const el = document.querySelector(".selection-progression");
  el.disabled = false;
}

function clearDisplay(el) {
  el.innerHTML = "";
}

function toggleHighlight(note) {
  if (note.dataset.toggle == "off") note.dataset.toggle = "on";
  else note.dataset.toggle = "off";
  alert(note.dataset.toggle);
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
  clearDisplay(fretboard);
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
  const tuning = document.querySelector(".selection-tuning").value;
  clearDisplay(tuning);
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

  const noteSelector = document.querySelector(".note-selector");
  clearDisplay(noteSelector);
  noteSelector.style.gridTemplateColumns = `repeat(${scale.notes.length}, 1fr)`;
  scale.notes.forEach(note => {
    addNote(note, noteSelector);
  });
}

function defaultDisplay() {
  displayTuning(EStandard, false, "note");
}

console.log("test");
defaultDisplay();
