const pcs = { // Plot control selection
  'confirmed': true,
  'x': 'mp',
  'y': 'mc'
}

const colors = {
  'rec': '#9370DB',
  'nrec': '#3CB371',
  'GC': '#CD0000',
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
  //   'ticks-confirmed': [
  //     [adjustXtick, 5],
  //     [adjustYtick, 5],
  //   ],
  //   'ticks-candidate': [
  //     [adjustXtick, 5],
  //     [adjustYtick, 5],
  //   ]
  // }
  'default': {
    'axis': defaultAxis,
    'color': defaultColor,
  },
  'p-p': {
    'transformations': [
      [removeOutliersYGT, 2]
    ],
  },
  'p-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 0.0000000000000000001],
    ],
    'axis': logarithmicXYAxis,
  },
  'p-pb': {
    'transformations': [
      [multiXBy, 1000],
      [removeOutliersXGT, 2000]
    ],
    'axis': logarithmicXYAxis,
  },
  'p-e': {
    'transformations': [
      [multiXBy, 1000],
      [removeOutliersXGT, 2000]
    ],
    'axis': logarithmicXAxis,
  },
  'p-f': {
    'transformations': [
      [multiXBy, 1000]
    ],
    'axis': logarithmicXAxis,
  },
  'p-mt': {
    'transformations': [
      [multiXBy, 1000],
      [removeOutliersXGT, 2000]
    ],
    'axis': logarithmicXAxis,

  },
  'p-chirp': {
    'transformations': [
      [multiXBy, 1000],
      [removeOutliersXGT, 2000]
    ]
  },
  'pb-p': {
    'transformations': [
      [multiYBy, 1000],
      [removeOutliersYGT, 500],
      filterByRecycled,
    ],
  },
  'age-tau': {
    'transformations': [[removeXValueEq, 0]],
    'axis': logarithmicXYAxis,
  },
}