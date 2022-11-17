const multiYBy = (x, y, multiplier) => {
  let xCopy = _.cloneDeep(x);
  let yCopy = _.cloneDeep(y);

  yCopy = yCopy.map((v) => {
    return({
      'type': v.type,
      'value': v.value * multiplier,
    });
  })

  return [xCopy, yCopy];
}

const removeOutliersYGT = (x, y, threshold) => {
  let xCopy = _.cloneDeep(x);
  let yCopy = _.cloneDeep(y);

  for ( let i = 0; i < yCopy.length; i++ ) {
    if ( yCopy[i].value > threshold ) {
      delete yCopy[i];
      delete xCopy[i];
    }
  }

  xCopy = xCopy.filter(e => e !== undefined);
  yCopy = yCopy.filter(e => e !== undefined);

  return [xCopy, yCopy];
}

const filterByRecycled = (x, y) => {
  let xCopy = _.cloneDeep(x);
  let yCopy = _.cloneDeep(y);

  xCopy = xCopy.filter(v => v.type === 'rec' );
  yCopy = yCopy.filter(v => v.type === 'rec' );

  return [xCopy, yCopy];
}

const absoluteValue = (x, y) => {
  let xCopy = _.cloneDeep(x);
  let yCopy = _.cloneDeep(y);

  xCopy = xCopy.map((v) => {
    return({
      'type': v.type,
      'value': Math.abs(v.value),
    })
  });

  yCopy = yCopy.map((v) => {
    return({
      'type': v.type,
      'value': Math.abs(v.value),
    })
  });

  return [xCopy, yCopy];
}

const removeXValueEq = (x, y, value) => {
  let xCopy = _.cloneDeep(x);
  let yCopy = _.cloneDeep(y);

  for ( let i = 0; i < xCopy.length; i++ ) {
    if ( xCopy[i].value === value ) {
      delete yCopy[i];
      delete xCopy[i];
    }
  }

  xCopy = xCopy.filter(e => e !== undefined);
  yCopy = yCopy.filter(e => e !== undefined);

  return [xCopy, yCopy];
}
