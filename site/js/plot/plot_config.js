const pcs = { // Plot control selection
  'confirmed': true,
  'x': 'mp',
  'y': 'mc'
}


const symbols = {
    'p': '$$ P $$',
    'pdot': '$$ \\dot{P} $$',
    'pb': '$$  P_b  $$',
    'e': '$$ e $$',
    'f': '$$ f $$',
    'mt': '$$  M_t  $$',
    'mp': '$$  M_p  $$',
    'mc': '$$  M_c  $$',
    'chirp': '$$  \\mathcal{M} $$', 
    'delta': '$$ \\delta $$',
    'chi': '$$  \\chi_f  $$',
    'chieff': '$$  \\chi_{eff}  $$',
    'age': '$$  \\tau_c  $$',
    'tau': '$$  \\tau_{GW}  $$',
    'dist': '$$ d $$',
    'l': '$$ l $$',
    'b': '$$ b $$',
    'z': '$$ z $$',
    'mu_l': '$$ \\mu_l $$',
    'mu_b': '$$ \\mu_b $$'

};



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

// Define all particular properties to include
// in plots of each pair (x,y) when necessary

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
    'units': {
      'p': {
        "symbol": 'P',
        "unit": '(s)',
      },
      'pdot': {
        "symbol": '\(\dot{P} \)',
        "unit": '(\(s~s^{-1}\))',
      },
      'pb': {
        "symbol": '\( P_b \)',
        "unit": '(days)',
      },
      'e': {
        "symbol": 'e',
        "unit": 'null',
      },
      'f': {
        "symbol": 'f',
        "unit": null,
      },
      'mt': {
        "symbol": '\( M_t \)',
        "unit": '(\\(M_\\odot \\))',
      },
      'mp': {
        "symbol": '\( M_p \)',
        "unit": '(\(M_\odot \))',
      },
      'mc': {
        "symbol": '\( M_c \)',
        "unit": '(\(M_\odot \))',
      },
      'chirp': {
        "symbol": '\( \mathcal{M} \)',
        "unit": '(\(M_\odot \))',
      },
      'delta': {
        "symbol": '\( \delta \)',
        "unit": '(deg)',
      },
      'chi': {
        "symbol": '\( \chi_f \)',
        "unit": null,
      },
      'chieff': {
        "symbol": '\( \chi_{eff} \)',
        "unit": null,
      },
      'age': {
        "symbol": '\( \tau_c \)',
        "unit": '(Gyr)',
      },
      'tau': {
        "symbol": '\( \tau_{GW} \)',
        "unit": '(Gyr)',
      },
    }
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
    'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null], 
    ],
  },
  'p-pb': {
    'transformations': [
      [multiXBy, 1e3]
    ],
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
    'axis': logarithmicXYAxis,
  },
  'p-e': {
    'transformations': [
      [multiXBy, 1e3],
      [removeOutliersXGT, 2e3]
    ],
      'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
    'axis': logarithmicXAxis,
  
  },
  'p-f': {
    'transformations': [
      [multiXBy, 1e3]
    ],
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
    'axis': logarithmicXAxis,
  },
  'p-mt': {
    'transformations': [
      [multiXBy, 1e3],
      [removeOutliersXGT, 2e3]
    ],
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
    'axis': logarithmicXAxis,
  },
  'p-mc': {
    'transformations': [
      [multiXBy, 1e3],
      filterByLimit,
    ],
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
   'axis': logarithmicXAxis,
  },
  'p-chi': {
    'transformations': [
      [multiXBy, 1e3]
    ],
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ]
  },
  'p-tau': {
    'transformations': [
      [multiXBy, 1e3], 
      [removeOutliersXGT, 2e3]
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'pdot-p': {
    'transformations': [
      absoluteValue,
      [multiXBy, 1e-18]
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'pdot-pb':{
    'transformations':[
      absoluteValue,
     [multiXBy, 1e-18],
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'pdot-delta':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
    ],
   'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'pdot-chi':{
    'transformations':[
      absoluteValue,
      [multiXBy, 1e-18],
    ],
   'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'pb-p': {
    'transformations': [
      [multiYBy, 1e3],
      [removeOutliersYGT, 500],
    ],
    'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'pb-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18]
    ],
    'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'e-p': {
    'transformations': [
      [multiYBy, 1e3],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'e-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'f-p': {
    'transformations': [
      [multiYBy, 1e3],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'f-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18]
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'f-tau': {
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'mt-p': {
    'transformations': [
      [multiYBy, 1e3]
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'mt-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'mt-tau': {
    'axis': logarithmicYAxis,
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, formatPower],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      filterByLimit,
      [excludeWithNames, ['J0737-3039A']],
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'chirp-p': {
    'transformations': [
      [multiYBy, 1e3]
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'chirp-pdot': {
    'transformations': [
      absoluteValue,
      [multiYBy, 1e-18]
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'chirp-pb': {
    'transformations': [
      [excludeWithNames, ['J0737-3039B']],
      [multiYBy, 1e3]
    ],
    'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'chieff-p': {
    'transformations': [
      [multiYBy, 1e3],
    ],
   'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'chieff-pdot':{
    'transformations':[
      absoluteValue,
      [multiYBy, 1e-18],
    ],
   'axis': logarithmicYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'tau-p': {
    'transformations': [
      [multiYBy, 1e3]
    ],
   'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'tau-pb':{
    'axis': logarithmicXYAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'tau-e': {
    'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'tau-f': {
    'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'tau-mt': {
    'axis': logarithmicXAxis,
    'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
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
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  },
  'tau-tau': {
    'axis': logarithmicXYAxis,
      'ticks-confirmed': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
      'ticks-candidate': [
      [adjustXtick, null],
      [adjustYtick, null],
    ],
  }, 
}
