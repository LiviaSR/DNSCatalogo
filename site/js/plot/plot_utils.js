function filterNonNumericValues(x, y) {
  const horizontalNumeric = []
  const verticalNumeric = [];

  for ( let i = 0; i < x.length; i++ ) {
    if ( typeof x[i] === 'number' && typeof y[i] === 'number' ) {
      horizontalNumeric.push(x[i]);
      verticalNumeric.push(y[i])
    }
  }

  return [horizontalNumeric, verticalNumeric];
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}