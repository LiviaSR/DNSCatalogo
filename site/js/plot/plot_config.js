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
    'ticks-confirmed': [
      [adjustXtick, null, null],
      [adjustYtick, 5, formatPower],
    ],
    'ticks-candidate': [
      [adjustXtick, null, formatPower],
      [adjustYtick, 5, '.10f'],
    ],
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
    'transformations': [[removeYValueEq, 0]],
    'axis': logarithmicYAxis,
  },
  'mt-tau': {
    'axis': logarithmicYAxis,
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
    'axis': logarithmicYAxis
  },
  'mc-p': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']],
      [multiYBy, 1e3],
    ],
    'axis': logarithmicYAxis,
  },
  'mc-pdot': {
    'transformations': [
      filterByLimit,
      absoluteValue,
      [excludeWithNames, ['J0737-3039A']],
      [multiYBy, 1e-18],
    ],
    'axis': logarithmicYAxis
  },
  'mc-pb': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']],
    ],
    'axis': logarithmicYAxis
  },
  'mc-e': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ]
  },
  'mc-f': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ]
  },
  'mc-mt': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ]
  },
  'mc-mp': {
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ]
  },
  'mc-mc':{
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ]
  },
  'mc-chirp':{
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ]
  },
  'mc-delta':{
    'transformations': [
      [excludeWithNames, ['J0737-3039A']]
    ]
  },
  'mc-chi':{
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']]
    ]
  },
  'mc-age':{
    'transformations': [
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']],
      [removeYValueEq, 0]
    ],
    'axis': logarithmicYAxis
  },
  'mc-tau':{
    'transformations': [
      filterByAssumed,
      [excludeWithNames, ['J0737-3039A']],
    ],
    'axis': logarithmicYAxis
  },
  'chirp-p': {
    'transformations': [
      [multiYBy, 1e3]
    ],
    'axis': logarithmicYAxis
  },
  'chirp-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18]
    ],
    'axis': logarithmicYAxis
  },
  'chirp-pb': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']],
      [multiYBy, 1e3]
    ],
    'axis': logarithmicYAxis
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
  'axis': logarithmicYAxis
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
    'axis': logarithmicYAxis
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
    'axis': logarithmicYAxis
  },
  'chieff-p': {
    'transformations': [
      [multiYBy, 1000],
    ],
   'axis': logarithmicYAxis,
  },
  'chieff-pdot':{
    'transformations':[
      absoluteValue,
      [multiYBy, 1e-18],
    ],
   'axis': logarithmicYAxis,
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
  },
  'age-pdot':{
    'transformations':[
      absoluteValue,
      [multiYBy, 1e-18],
      [removeXValueEq, 0]
    ],
   'axis': logarithmicXYAxis,
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
  },
  'tau-p': {
    'transformations': [
      [multiYBy, 1e3]
    ],
   'axis': logarithmicXYAxis,

  },
  'tau-pdot':{
    'transformations':[
      absoluteValue,
      [multiYBy, 1e-18],
      [removeOutliersYGT, 1e-16]
    ],
   'axis': logarithmicXYAxis,
  },
  'tau-pb':{
    'axis': logarithmicXYAxis
  },
  'tau-e': {
    'axis': logarithmicXAxis,
  },
  'tau-f': {
    'axis': logarithmicXAxis,
  },
  'tau-mt': {
    'axis': logarithmicXAxis,
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
    'axis': logarithmicXAxis
  },
  'tau-chirp': {
    'transformations': [
      [excludeWithNames,['J0737-3039B']]
    ],
    'axis': logarithmicXAxis
  },
  'tau-chi': {
    'axis': logarithmicXAxis
  },
  'tau-chieff': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']],
    ],
  },
  'tau-age': {
    'transformations': [[removeYValueEq, 0]],
    'axis': logarithmicXYAxis,
  },
  'tau-tau': {
    'axis': logarithmicXYAxis
  }, 
}
