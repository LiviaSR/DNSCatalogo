function buildPlot() {

}

function buildPlotControls(axis) {
  // Horizontal axis controls
  let controlAnchor = document.getElementById(`${axis}-plot-control-anchor`);

  // Tags in this array shall be ignored when building plot controls
  const ignoreField = ['name', 'Type', 'DoubleSystem', 'systemName', 'hasReferences', 'references', 'comments'];

  let properties = []
  for ( let property of Object.keys(pulsarData[0]) ) {
    if ( ! ignoreField.includes(property) ) {
      properties.push(property);
    }
  }

  for ( let row = 0; row < Math.ceil(properties.length / 5); row++) {

    let rowDiv = document.createElement('div')
    rowDiv.className = 'row';

    // Calc the number of elements to display in each row
    let end_index = (row + 1) * 5 > properties.length ? properties.length: (row + 1) * 5;
    for ( let i = row * 5; i < end_index; i++ ) {
      let colDiv = document.createElement('div');
      colDiv.className = 'col text-left';
      let formDiv = document.createElement('div')
      formDiv.className = 'form-check';

      let input = document.createElement('input');
      input.className = 'form-check-input';
      input.type = 'radio';
      input.name = `plot-control-${axis}`;
      input.id = `plot-control-${axis}-${properties[i]}`;

      let label = document.createElement('label');
      label.className = 'form-check-label';
      label.setAttribute('for', `plot-control-${axis}-${properties[i]}`);
      label.innerHTML = properties[i];

      formDiv.appendChild(input);
      formDiv.appendChild(label);
      colDiv.appendChild(formDiv)
      rowDiv.appendChild(colDiv);
    }
    controlAnchor.appendChild(rowDiv);
  }
}

{/* <div class="row">
<div class="col">
  <div class="form-check">
    <input class="form-check-input" type="radio" name="plot-control-sources" id="plot-control-sources-confirmed">
    <label class="form-check-label" for="plot-control-sources-confirmed">
      Confirmed
    </label>
  </div>
</div>
<div class="col">
  <div class="form-check">
    <input class="form-check-input" type="radio" name="plot-control-sources" id="plot-control-sources-candidate">
    <label class="form-check-label" for="plot-control-sources-candidate">
      Candidate
    </label>
  </div>
</div> */}
// </div>