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
  note.addEventListener("click", () => toggleHighlightNote(note));
  parent.appendChild(note);
}

function addChord(value, parent) {
  let chord = document.createElement("div");
  chord.innerHTML = `${value}`;
  chord.classList.add("chord");
  chord.dataset.toggle = "none";
  chord.addEventListener("click", () => toggleHighlightChordType(chord));
  parent.appendChild(chord);
}

function enableSelectProgression() {
  const el = document.querySelector(".selection-progression");
  el.disabled = false;
}

function clearDisplay(el) {
  el.innerHTML = "";
}

function toggleHighlightNote(note) {
  const frets = document.querySelectorAll(".fret");
  if (note.dataset.toggle == "off") {
    note.classList.add("note-selected");
    note.dataset.toggle = "on";
    frets.forEach((fret) => {
      if (fret.innerHTML == note.innerHTML) fret.classList.add("fret-selected");
    });
  } else {
    frets.forEach((fret) => {
      note.classList.remove("note-selected");
      if (fret.innerHTML == note.innerHTML)
        fret.classList.remove("fret-selected");
    });
    note.dataset.toggle = "off";
  }
}

function toggleHighlightChordType(chord) {
  const fretboard = document.querySelectorAll(".fret");
  fretboard.forEach((fret) => {
    fret.classList.remove("fret-chord", "fret-chord-open");
  });

  const chords = document.querySelectorAll(".chord");
  chords.forEach((c) => {
    if (chord.innerHTML != c.innerHTML) c.dataset.toggle = "none";
  });

  const chordInfo = getChord(chord.innerHTML);
  const chordTypes = Object.keys(chordInfo);
  console.log(chordTypes);
  const tuning = getTuning(document.querySelector(".selection-tuning").value);
  const offset = tuning.offset;

  const currentIndex = chordTypes.indexOf(chord.dataset.toggle);
  let newIndex = (currentIndex + 1) % chordTypes.length;
  chord.dataset.toggle = chordTypes[newIndex];
  console.log(chord.dataset.toggle);
  const fingering = chordInfo[chordTypes[newIndex]];
  const fretsInFingering = Object.values(fingering);
  console.log(fretsInFingering);
  console.log(offset);
  if (
    fretsInFingering.indexOf(0) > -1 &&
    chord.dataset.toggle == "open" &&
    offset.indexOf(1) > -1
  ) {
    console.log("skipping");
  } else {
    let i = -1;
    const num_frets = 23;
    for (key in fingering) {
      i++;
      if (fingering[key] != -1) {
        if (fingering[key] != "X") {
          temp = fingering[key] + offset[i];
          //console.log(fingering[key], offset[i]);
          //console.log("temp key", temp, key);
          index = i * num_frets + num_frets + temp;
          if (index % 23) {
            fretboard[index].classList.add("fret-chord");
          } else {
            fretboard[index].classList.add("fret-chord-open");
          }
        }
      }
    }
    //console.log(fingering);
  }
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
    nodes.forEach((node) => {
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

  frets.forEach((fret) => {
    const value = fret.innerHTML;
    let inScale = false;
    scale.notes.forEach((note) => {
      if (note == value) inScale = true;
    });

    if (inScale) fret.classList.add("fret-scale");
    if (value == scale.root) fret.classList.add("fret-root-note");
  });

  const noteSelector = document.querySelector(".note-selector");
  clearDisplay(noteSelector);
  noteSelector.style.gridTemplateColumns = `repeat(${scale.notes.length}, 1fr)`;
  scale.notes.forEach((note) => {
    addNote(note, noteSelector);
  });

  const progression = document.querySelector(".selection-progression");
  if (progression.value != "Select chords") {
    displayChordSelectorListener(progression.value);
  }
}

function displayChordSelectorListener(progression) {
  console.log(progression);
  const scale = getScale(document.querySelector(".selection-scale").value);
  chords = [];
  switch (progression) {
    case "0": {
      chords = [...scale.chords];
      break;
    }
    case "1-5-6-4": {
      chords = [
        scale.chords[0],
        scale.chords[4],
        scale.chords[5],
        scale.chords[3],
      ];
      break;
    }
    case "2-5-1": {
      chords = [scale.chords[1], scale.chords[4], scale.chords[0]];
    }
  }
  console.log(chords);
  displayChordSelector(chords);
}

function displayChordSelector(chords) {
  const chordSelector = document.querySelector(".chord-selector");
  clearDisplay(chordSelector);
  chordSelector.style.gridTemplateColumns = `repeat(${chords.length}, 1fr)`;
  chords.forEach((chord) => {
    addChord(chord, chordSelector);
  });
}

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
    case "Gm":
      return GminorScale;
    case "Amp":
      return AminorPentatonicScale;
  }
}

function getChord(value) {
  switch (value) {
    case "C":
      return CmajorChord;
    case "Gm":
      return GminorChord;
  }
}

function defaultDisplay() {
  displayTuning(EStandard, false, "note");
}

console.log("test");
defaultDisplay();
