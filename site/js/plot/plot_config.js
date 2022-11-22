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
    'axis': logarithmicXYAxis
  },
  'p-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18],
    ],
    'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
    'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower], 
    ],
  },
  'p-pb': {
    'transformations': [
      [multiXBy, 1e3]
    ],
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
    'axis': logarithmicXYAxis,
  },
  'p-e': {
    'transformations': [
      [multiXBy, 1e3],
      [removeOutliersXGT, 2e3]
    ],
      'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
    'axis': logarithmicXAxis,
  
  },
  'p-f': {
    'transformations': [
      [multiXBy, 1e3]
    ],
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
    'axis': logarithmicXAxis,
  },
  'p-mt': {
    'transformations': [
      [multiXBy, 1e3],
      [removeOutliersXGT, 2e3]
    ],
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
    'axis': logarithmicXAxis,

  },
  'p-mp': {
    'transformations': [
      [multiXBy, 1e3],
      [removeOutliersXGT, 2e3],
      filterByAssumed,
      filterByLimit,
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
    'axis': logarithmicXAxis,
  },
  'p-mc': {
    'transformations': [
      [multiXBy, 1e3],
      filterByLimit,
    ],
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
    'axis': logarithmicXAxis,

  },
  'p-chirp': {
    'transformations': [
      [multiXBy, 1e3],
      [removeOutliersXGT, 2e3]
    ]
  },
  'p-delta': {
    'transformations': [
      [multiXBy, 1e3]
    ],
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
   'axis': logarithmicXAxis,
  },
  'p-chi': {
    'transformations': [
      [multiXBy, 1e3]
    ],
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
   'axis': logarithmicXAxis,
  },
  'p-chieff': {
    'transformations': [
      [multiXBy, 1e3],
      [removeOutliersXGT, 2e3]
    ],
   'axis': logarithmicXAxis,
  },
  'p-age': {
    'transformations': [
      [multiXBy, 1e3], 
      [removeYValueEq, 0],
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ]
  },
  'p-tau': {
    'transformations': [
      [multiXBy, 1e3], 
      [removeOutliersXGT, 2e3]
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ],
  },
  'pdot-p': {
    'transformations': [
      absoluteValue,
      [multiXBy, 1e-18]
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ],
  },
  'pdot-pdot': {
    'transformations': [
      absoluteValue,
      [multiXBy, 1e-18],
      [multiYBy, 1e-18],
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ],
  },
  'pdot-pb':{
    'transformations':[
      absoluteValue,
     [multiXBy, 1e-18],
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
  },
  'pdot-e':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16],
    ],
   'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
  },
  'pdot-f':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16],
    ],
   'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
  },
  'pdot-mt':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16],
    ],
   'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
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
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
  },
  'pdot-mc':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      filterByLimit,
    ],
   'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
  },
  'pdot-chirp':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16],
    ],
   'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
  },
  'pdot-delta':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
    ],
   'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
  },
  'pdot-chi':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
    ],
   'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
  },
  'pdot-chieff':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16]
    ],
   'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, null],
    ],
  },
  'pdot-age':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeYValueEq, 0]
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ],
  },
  'pdot-tau':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
      [removeOutliersXGT, 1e-16]
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, null, formatPower],
    ],
  },
  'pb-p': {
    'transformations': [
      [multiYBy, 1e3],
      [removeOutliersYGT, 500],
    ],
    'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'pb-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18]
    ],
    'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
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
    'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'e-p': {
    'transformations': [
      [multiYBy, 1e3],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'e-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
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
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, .6],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, .6],
    ],
  },
  'f-p': {
    'transformations': [
      [multiYBy, 1e3],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, .6],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, .6],
    ],
  },
  'f-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18]
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
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
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'f-tau': {
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'mt-p': {
    'transformations': [
      [multiYBy, 1e3]
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'mt-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
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
    'transformations': [[removeYValueEq, 0]],
    'axis': logarithmicYAxis,
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, .6],
    ],
  },
  'mt-tau': {
    'axis': logarithmicYAxis,
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, .6],
    ],
  }, 
  'mp-p': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [multiYBy, 1e3],
      [excludeWithNames, ['J0737-3039B']]
    ],
    'axis': logarithmicYAxis,
  },
  'mp-pdot': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']],
      absoluteValue,
      [multiYBy, 1e-18]
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'mp-pb': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']]
    ],
    'axis': logarithmicYAxis,
  },
  'mp-e': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']] 
    ]
  },
  'mp-f': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']]  
    ],
  },
  'mp-mt': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']]  
    ],
  },
  'mp-mp': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']]  
    ],
  },
  'mp-mc': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']]  
    ],
  },
  'mp-chirp': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']]  
    ],
  },
  'mp-delta': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']]  
    ],
  },
  'mp-chi': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']]  
    ],
  },
  'mp-chieff': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']]  
    ],
  },
  'mp-age': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [removeYValueEq, 0],
      [excludeWithNames, ['J0737-3039B']]  
    ],
    'axis': logarithmicYAxis,
  },
  'mp-tau': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']]
    ],
    'axis': logarithmicYAxis,
  },
  'mc-p': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']],
      [multiYBy, 1e3],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'mc-pdot': {
    'transformations': [
      filterByLimit,
      absoluteValue,
      [excludeWithNames, ['J0737-3039A']],
      [multiYBy, 1e-18],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'mc-pb': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']],
    ],
    'axis': logarithmicYAxis,
  },
  'mc-e': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ],
  },
  'mc-f': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ],
  },
  'mc-mt': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ],
  },
  'mc-mp': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ],
  },
  'mc-mc':{
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ],
  },
  'mc-chirp':{
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ],
  },
  'mc-delta':{
    'transformations': [
      [excludeWithNames, ['J0737-3039A']]
    ],
  },
  'mc-chi':{
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ],
  },
  'mc-age':{
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']],
      [removeYValueEq, 0]
    ],
    'axis': logarithmicYAxis,
  },
  'mc-tau':{
    'transformations': [
      filterByAssumed,
      [excludeWithNames, ['J0737-3039A']],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, .6],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, .6],
    ],
  },
  'chirp-p': {
    'transformations': [
      [multiYBy, 1e3]
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'chirp-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18]
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'chirp-pb': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']],
      [multiYBy, 1e3]
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'chirp-e': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']],
    ],
  },
  'chirp-mt': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']],
    ],
  },
  'chirp-mp': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']],
    ],
  },
  'chirp-mc': {
    'transformations': [
      [excludeWithNames, ['J0737-3039A']],
    ],
  },
  'chirp-chieff': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']],
    ],
  },
  'chirp-age': {
    'transformations': [
      [removeYValueEq,0]
    ],
    'axis': logarithmicYAxis
  },
  'chirp-tau': {
    'transformations': [
      [excludeWithNames,['J0737-3039B']]
    ],
    'axis': logarithmicYAxis
  },
  'delta-p': {
    'transformations': [
      [multiYBy, 1e3]
    ],
    'axis': logarithmicYAxis
  },
  'delta-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18]
    ],
  'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'delta-mp': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']]
    ]
  },
  'delta-mc': {
    'transformations': [
      [excludeWithNames, ['J0737-3039A']]
    ]
  },
  'chi-p':{
    'transformations': [
      [multiYBy, 1e3],
    ],
    'axis': logarithmicYAxis
  },
  'chi-pdot':{
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'chi-pb':{
    'axis': logarithmicYAxis
  },
  'chi-mp': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']],
    ],
  },
  'chi-mc': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']],
    ],
  },
  'chi-age': {
    'transformations': [[removeYValueEq,0]],
    'axis': logarithmicYAxis
  },
  'chi-tau': {
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'chieff-p': {
    'transformations': [
      [multiYBy, 1e3],
    ],
   'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'chieff-pdot':{
    'transformations':[
      absoluteValue,
      [multiYBy, 1e-18],
    ],
   'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'chieff-mp': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']]  
    ],
  },
  'chieff-chieff': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']],
    ],
  },
  'chieff-tau': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']],
    ],
  },
  'age-p': {
    'transformations': [
      [multiYBy, 1e3], 
      [removeXValueEq, 0]
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'age-pdot':{
    'transformations':[
      absoluteValue,
      [multiYBy, 1e-18],
      [removeXValueEq, 0]
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'age-pb':{
    'transformations': [
      [removeXValueEq, 0]],
    'axis': logarithmicXYAxis
  },
  'age-e':{
    'transformations': [
      [removeXValueEq, 0],
    ],
    'axis': logarithmicXAxis,
  },
  'age-f': {
    'transformations': [
      [removeXValueEq, 0]
    ],
    'axis': logarithmicXAxis
  },
  'age-mt': {
    'transformations': [[removeXValueEq, 0]],
    'axis': logarithmicXAxis,
  },
  'age-mp': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [removeXValueEq, 0],
      [excludeWithNames, ['J0737-3039B']]  
    ],
    'axis': logarithmicXAxis,
  },
  'age-mc':{
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']],
      [removeXValueEq, 0]
    ],
    'axis': logarithmicXAxis
  },
  'age-chirp': {
    'transformations': [
      [removeXValueEq,0]
    ],
    'axis': logarithmicXAxis
  },
  'age-chi': {
    'transformations': [[removeXValueEq,0]],
    'axis': logarithmicXAxis
  },
  'age-age': {
    'transformations': [[removeXValueEq,0]],
    'axis': logarithmicXYAxis
  },
  'age-tau': {
    'transformations': [[removeXValueEq, 0]],
    'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, ".6"],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, ".6"],
    ],
  },
  'tau-p': {
    'transformations': [
      [multiYBy, 1e3]
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],

  },
  'tau-pdot':{
    'transformations':[
      absoluteValue,
      [multiYBy, 1e-18],
      [removeOutliersYGT, 1e-16]
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, formatPower],
    ],
  },
  'tau-pb':{
    'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
  },
  'tau-e': {
    'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
  },
  'tau-f': {
    'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
  },
  'tau-mt': {
    'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
  },
  'tau-mp': {
    'transformations': [
      filterByAssumed,
      filterByLimit,
      [excludeWithNames, ['J0737-3039B']]
    ],
    'axis': logarithmicXAxis
  },
  'tau-mc':{
    'transformations': [
      filterByAssumed,
      [excludeWithNames, ['J0737-3039A']],
    ],
    'axis': logarithmicXAxis,
      'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
  },
  'tau-chirp': {
    'transformations': [
      [excludeWithNames,['J0737-3039B']]
    ],
    'axis': logarithmicXAxis
  },
  'tau-chi': {
    'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
  },
  'tau-chieff': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']],
    ],
  },
  'tau-age': {
    'transformations': [[removeYValueEq, 0]],
    'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
  },
  'tau-tau': {
    'axis': logarithmicXYAxis,
      'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null, null],
      [adjustYtick, null, null],
    ],
  }, 
}
