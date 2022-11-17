const pcs = { // Plot control selection
  'confirmed': true,
  'x': 'mp',
  'y': 'mc'
}

const colors = {
  'rec': '#58a6ff',
  'nrec': '#34ebae',
  'GC': '#eb3465',
}

const transitions = { // miliseconds
  'x-axis-display-delay': 0,
  'y-axis-display-delay': 0,
  'x-grid-display-delay': 0,
  'y-grid-display-delay': 0,
  'data-display-delay': 0,
}

const plotConfig = {
  // Config example:
  //
  // 'pair': {
  //   'transformations': someFunction,
  //   'axis': someFunction,
  //   'color': someFunction,
  // }
  'default': {
    'axis': defaultAxis,
    'color': defaultColor,
  },
  'pb-p': {
    'transformations': [
      [multiYBy, 1000],
      [removeOutliersYGT, 500],
      filterByRecycled,
    ],
  },
  'age-tau': {
    'axis': logarithmicXYAxis,
  },
  'p-pdot': {
    'transformations': absoluteValue,
    'axis': logarithmicXYAxis,
  }
}