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

// Define all particular properties of each pair when necessary

const plotConfig = {
  // Config example:
  //
  // 'pair': {
  //   'transformations': someFunction,    ex.: multiply; remove values (filter data);
  //   'axis': someFunction,               ex.; LinLin; LinLog;
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
      [multiYBy, 0.000000000000000001],
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
  'p-mp': {
    'transformations': [
      [multiXBy, 1000],
      [removeOutliersXGT, 2000],
      filterByAssumed,
      filterByLimit,
    ],
    'axis': logarithmicXAxis,
  },
  'p-mc': {
    'transformations': [
      [multiXBy, 1000],
      filterByLimit,
    ],
    'axis': logarithmicXAxis,

  },
  'p-chirp': {
    'transformations': [
      [multiXBy, 1000],
      [removeOutliersXGT, 2000]
    ]
  },
  'p-delta': {
    'transformations': [
      [multiXBy, 1000]
    ],
   'axis': logarithmicXAxis,
  },
  'p-chi': {
    'transformations': [
      [multiXBy, 1000]
    ],
   'axis': logarithmicXAxis,
  },
  'p-chieff': {
    'transformations': [
      [multiXBy, 1000],
      [removeOutliersXGT, 2000]
    ],
   'axis': logarithmicXAxis,
  },
  'p-age': {
    'transformations': [
      [multiXBy, 1000], 
      [removeYValueEq, 0]
    ],
   'axis': logarithmicXYAxis,
   'ticks-candidate': [
    [adjustXtick, 10],
    [adjustYtick, 5],
   ],
  },
  'p-tau': {
    'transformations': [
      [multiXBy, 1000], 
      [removeOutliersXGT, 2000]
    ],
   'axis': logarithmicXYAxis,
   'ticks-candidate': [
      [adjustXtick, 10],
      [adjustYtick, 5],
   ],
  },
  'pdot-p': {
    'transformations': [
      absoluteValue,
      [multiXBy, 0.000000000000000001]
    ],
   'axis': logarithmicXYAxis,
   'ticks-confirmed': [
      [adjustXtick, 5],
      [adjustYtick, 5], 
   ],
   'ticks-candidate': [
      [adjustXtick, 5],
      [adjustYtick, 5], 
   ],
  },
  'pdot-pdot': {
    'transformations': [
      absoluteValue,
      [multiXBy, 1e-18],
      [multiYBy, 1e-18]

    ],
   'axis': logarithmicXYAxis,
  },
  'pdot-pb':{
    'transformations':[
      absoluteValue,
     [multiXBy, 1e-18],
    ],
   'axis': logarithmicXYAxis,
  },
  'pdot-e':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16],
    ],
   'axis': logarithmicXAxis,
  },
  'pdot-f':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16],
    ],
   'axis': logarithmicXAxis,
  },
  'pdot-mt':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16],
    ],
   'axis': logarithmicXAxis,
  },
  'pdot-mp':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16],
      filterByAssumed,
      filterByLimit,
    ],
   'axis': logarithmicXAxis,
  },
  'pdot-mc':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      filterByLimit,
    ],
   'axis': logarithmicXAxis,
  },
  'pdot-chirp':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16],
    ],
   'axis': logarithmicXAxis,
  },
  'pdot-delta':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
    ],
   'axis': logarithmicXAxis,
  },
  'pdot-chi':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
    ],
   'axis': logarithmicXAxis,
  },
  'pdot-chieff':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16]
    ],
   'axis': logarithmicXAxis,
  },
  'pdot-age':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeYValueEq, 0]
    ],
   'axis': logarithmicXYAxis,
  },
  'pdot-tau':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16]
    ],
   'axis': logarithmicXYAxis,
  },
  'pb-p': {
    'transformations': [
      [multiYBy, 1000],
      [removeOutliersYGT, 500],
    ],
    'axis': logarithmicXYAxis,
  },
  'pb-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18]
    ],
    'axis': logarithmicXYAxis,
  },
  'pb-e':{
    'axis': logarithmicXAxis
  },
  'pb-f':{
    'axis': logarithmicXAxis
  },
  'pb-mt':{
    'transformations': [

    ],
    'axis': logarithmicXAxis
  },
  'pb-mp':{
    'transformations': [
      filterByAssumed,
      filterByLimit,
    ],
    'axis': logarithmicXAxis
  },
  'pb-mc':{
    'transformations': [
      filterByLimit,
    ],
    'axis': logarithmicXAxis
  },
  'pb-chirp':{
    'axis': logarithmicXAxis
  },
  'pb-chi':{
    'axis': logarithmicXAxis
  },
  'pb-age':{
    'transformations': [
      [removeYValueEq, 0]],
    'axis': logarithmicXYAxis
  },
  'pb-tau':{
    'axis': logarithmicXYAxis
  },
  'e-p': {
    'transformations': [
      [multiYBy, 1e3],
    ],
    'axis': logarithmicYAxis
  },
  'e-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18],
    ],
    'axis': logarithmicYAxis,
  },
  'e-pb': {
    'axis': logarithmicYAxis,
  },
  'e-mp':{
    'transformations': [
      filterByAssumed,
      filterByLimit,
    ],
  },
  'e-mc':{
    'transformations': [
      filterByLimit,
    ],
  },
  'e-age':{
    'transformations': [
      [removeYValueEq, 0],
    ],
    'axis': logarithmicYAxis,
  },
  'e-tau': {
    'axis': logarithmicYAxis,
  },
  'f-p': {
    'transformations': [
      [multiYBy, 1e3],
    ],
    'axis': logarithmicYAxis,
  },
  'f-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18]
    ],
    'axis': logarithmicYAxis,
  },
  'f-pb': {
    'axis': logarithmicYAxis
  },
  'f-mp': {
    'transformations': [
      filterByAssumed,
      filterByLimit
    ]
  },
  'f-mc': {
    'transformations': [
      filterByLimit
    ]
  },
  'f-age': {
    'transformations': [
      [removeYValueEq, 0]
    ],
    'axis': logarithmicYAxis
  },
  'f-tau': {
    'axis': logarithmicYAxis
  },
  'mt-p': {
    'transformations': [
      [multiYBy, 1e3]
    ],
    'axis': logarithmicYAxis
  },
  'mt-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18],
    ],
    'axis': logarithmicYAxis,
  },
  'mt-pb': {
    'axis': logarithmicYAxis,
  },
  'mt-mp': {
    'transformations': [
      filterByAssumed,
      filterByLimit
    ]
  },
  'mt-mc': {
    'transformations': [
      filterByLimit
    ]
  },
  'mt-age': {
    'transformations': [[removeXValueEq, 0]],
    'axis': logarithmicYAxis,
  },
  'mt-tau': {
    'axis': logarithmicYAxis,
  }, 
  'mp-p': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [multiYBy, 1e3]
    ],
    'axis': logarithmicYAxis,
  },
  
  'age-tau': {
    'transformations': [[removeXValueEq, 0]],
    'axis': logarithmicXYAxis,
  },
}
