const multi1000RemoveOutliersWithValueGreaterThan500FilterByRecycled = (x, y) => {
  let xCopy = _.cloneDeep(x);
  let yCopy = _.cloneDeep(y);

  yCopy = yCopy.map((v) => {
    return({
      'type': v.type,
      'value': v.value * 1000,
    });
  })

  for ( let i = 0; i < yCopy.length; i++ ) {
    if ( yCopy[i].value > 500 ) {
      yCopy.splice(i, 1);
      xCopy.splice(i, 1);
    }
  }

  xCopy = xCopy.filter(v => v.type === 'rec' );
  yCopy = yCopy.filter(v => v.type === 'rec' );

  console.log(xCopy);
  console.log(yCopy);

  return [xCopy, yCopy];
}
