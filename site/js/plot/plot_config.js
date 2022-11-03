const plotConfig = {
  'default': {
    'transformation': null,
    'axis': defaultAxis,
    'tick': null,
    'color': defaultColor,
  },
  'pb-p': {
    'transformation': multi1000RemoveOutliersWithValueGreaterThan500FilterByRecycled,
    'axis': null,
    'tick': null,
    'color': null,
  },
  'age-tau': {
    'transformation': null,
    'axis': logarithmicXYAxis,
    'tick': null,
    'color': null,
  }
}