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

function addNote(value, parent, root) {
  let note = document.createElement("div");
  note.innerHTML = `${value}`;
  note.classList.add("note");
  note.dataset.toggle = "off";
  if (note.innerHTML == root) {
    toggleHighlightNote(note);
  }
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

function disableSelectProgression() {
  const el = document.querySelector(".selection-progression");
  el.value = "disabled";
  el.disabled = true;
}

function clearDisplay(el) {
  el.innerHTML = "";
}

function turnOffScale(frets) {
  frets.forEach((fret) => {
    fret.classList.remove("fret-scale", "fret-root");
  });
}

function toggleHighlightNote(note) {
  const frets = document.querySelectorAll(".fret");
  if (note.dataset.toggle == "off") {
    note.classList.add("note-selected");
    note.dataset.toggle = "on";
    frets.forEach((fret) => {
      if (fret.innerHTML == note.innerHTML) fret.classList.add("fret-root");
    });
  } else {
    frets.forEach((fret) => {
      note.classList.remove("note-selected");
      if (fret.innerHTML == note.innerHTML) fret.classList.remove("fret-root");
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
    if (chord.innerHTML != c.innerHTML) {
      c.classList.remove("chord-selected");
      c.dataset.toggle = "none";
    }
  });

  const chordInfo = getChord(chord.innerHTML);
  const chordTypes = Object.keys(chordInfo);
  const tuning = getTuning(document.querySelector(".selection-tuning").value);
  const offset = tuning.offset;
  let fretsInFingering;
  let fingering;
  do {
    const currentIndex = chordTypes.indexOf(chord.dataset.toggle);
    let newIndex = (currentIndex + 1) % chordTypes.length;
    chord.dataset.toggle = chordTypes[newIndex];
    fingering = chordInfo[chordTypes[newIndex]];
    fretsInFingering = Object.values(fingering);
  } while (
    fretsInFingering.indexOf(0) > -1 &&
    chord.dataset.toggle == "open" &&
    offset.indexOf(1) > -1
  );
  let i = -1;
  const num_frets = 23;
  for (key in fingering) {
    i++;
    if (fingering[key] != -1) {
      temp = fingering[key] + offset[i];
      index = i * num_frets + num_frets + temp;
      if (index % 23) {
        fretboard[index].classList.add("fret-chord");
      } else {
        fretboard[index].classList.add("fret-chord-open");
      }
    }
  }
  console.log(chord.dataset.toggle);
  if (chord.dataset.toggle != "none") {
    chord.classList.add("chord-selected");
  } else {
    chord.classList.remove("chord-selected");
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
  });

  const noteSelector = document.querySelector(".note-selector");
  clearDisplay(noteSelector);
  noteSelector.style.gridTemplateColumns = `repeat(${scale.notes.length}, 1fr)`;
  scale.notes.forEach((note) => {
    addNote(note, noteSelector, scale.root);
  });

  const progression = document.querySelector(".selection-progression");
  if (progression.value == "disabled") {
    progression.value = "0";
    displayChordSelectorListener("0");
  } else {
    displayChordSelectorListener(progression.value);
  }
}

function displayChordSelectorListener(progression) {
  const scale = getScale(document.querySelector(".selection-scale").value);
  chords = [];
  switch (progression) {
    case "all-chords": {
      chords = ALL_MAJ_MIN_CHORDS;
      break;
    }
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
    default:
      break;
  }
  if (chords.length > 10) {
    displayAllChordsSelector(chords);
  } else {
    displayChordSelector(chords);
  }
}

function displayChordSelector(chords) {
  const chordSelector = document.querySelector(".chord-selector");
  clearDisplay(chordSelector);
  chordSelector.style.gridTemplateColumns = `repeat(${chords.length}, 1fr)`;
  chords.forEach((chord) => {
    addChord(chord, chordSelector);
  });
}

function displayAllChordsSelector(chords) {
  const chordSelector = document.querySelector(".chord-selector");
  clearDisplay(chordSelector);
  chordSelector.style.gridTemplateColumns = `repeat(${chords.length / 2}, 17%)`;
  chords.forEach((chord) => {
    addChord(chord, chordSelector);
  });
}

function displayScaleListener(scale) {
  enableSelectProgression();
  if (scale == "0") {
    disableSelectProgression();
    clearDisplay(document.querySelector(".note-selector"));
    clearDisplay(document.querySelector(".chord-selector"));
    turnOffScale(document.querySelectorAll(".fret"));
    displayChordSelectorListener("all-chords");
  } else {
    displayScale(getScale(scale));
  }
}

function defaultDisplay() {
  displayTuning(EStandard, false, "note");
  displayScaleListener("0");
}

defaultDisplay();
