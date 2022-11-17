function filterNonNumericValues(x, y) {
  const horizontalNumeric = []
  const verticalNumeric = [];

  for ( let i = 0; i < x.length; i++ ) {
    if ( typeof x[i].value === 'number' && typeof y[i].value === 'number' ) {
      horizontalNumeric.push(x[i]);
      verticalNumeric.push(y[i]);
    }
  }

  return [horizontalNumeric, verticalNumeric];
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function formatPower(n) {
  const e = Math.log10(n);
  if (e !== Math.floor(e)) return; //Ignore non-exact power of ten.
  console.log('cnwudhne')
  return `10${(e + "").replace(/./g, c => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c] || "⁻")}`;
}