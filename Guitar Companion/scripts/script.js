function addFret(txt, parent) {
  let fret = document.createElement("div");
  fret.innerHTML = `${txt}`;
  fret.classList.add("fret");
  if (["E", "A", "D", "G", "B", "e"].indexOf(txt) > -1) {
    fret.classList.add("fret-string");
  }
  parent.appendChild(fret);
}

const array1 = ["e", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const array2 = ["B", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const array3 = ["G", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const array4 = ["D", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const array5 = ["A", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const array6 = ["E", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const fretboard = document.querySelector(".fretboard");
array1.forEach((el) => {
  addFret(el, fretboard);
});
array2.forEach((el) => {
  addFret(el, fretboard);
});
array3.forEach((el) => {
  addFret(el, fretboard);
});
array4.forEach((el) => {
  addFret(el, fretboard);
});
array5.forEach((el) => {
  addFret(el, fretboard);
});
array6.forEach((el) => {
  addFret(el, fretboard);
});
