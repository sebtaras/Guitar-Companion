const CmajorChord = {
  none: {},
  open: {
    firstString: 0,
    secondString: 1,
    thirdString: 0,
    fourthString: 2,
    fifthString: 3,
    sixthString: -1,
  },
  barre: {
    firstString: 3,
    secondString: 5,
    thirdString: 5,
    fourthString: 5,
    fifthString: 3,
    sixthString: -1,
  },
  octave: {
    firstString: 8,
    secondString: 8,
    thirdString: 9,
    fourthString: 10,
    fifthString: 10,
    sixthString: 8,
  },
  power: {
    firstString: -1,
    secondString: -1,
    thirdString: 5,
    fourthString: 5,
    fifthString: 3,
    sixthString: -1,
  },
};

const FmajorChord = {
  none: {},
  barre: {
    firstString: 1,
    secondString: 1,
    thirdString: 2,
    fourthString: 3,
    fifthString: 3,
    sixthString: 1,
  },
  octave: {
    firstString: 8,
    secondString: 10,
    thirdString: 10,
    fourthString: 10,
    fifthString: 8,
    sixthString: -1,
  },
  power: {
    firstString: -1,
    secondString: -1,
    thirdString: -1,
    fourthString: 3,
    fifthString: 3,
    sixthString: 1,
  },
};

const GminorChord = {
  none: {},
  barre: {
    firstString: 3,
    secondString: 3,
    thirdString: 3,
    fourthString: 5,
    fifthString: 5,
    sixthString: 3,
  },
  octave: {
    firstString: 10,
    secondString: 11,
    thirdString: 12,
    fourthString: 12,
    fifthString: 10,
    sixthString: -1,
  },
  power: {
    firstString: -1,
    secondString: -1,
    thirdString: -1,
    fourthString: 5,
    fifthString: 5,
    sixthString: 3,
  },
};
