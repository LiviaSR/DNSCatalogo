function filterNonNumericValues(horizontal, vertical) {
  const horizontalFilter = []
  const verticalFilter = [];

  for ( let i = 0; i < horizontal.length; i++ ) {
    if ( typeof horizontal[i] === 'number' && typeof vertical[i] === 'number' ) {
      horizontalFilter.push(horizontal[i]);
      verticalFilter.push(vertical[i])
    }
  }

  return [horizontalFilter, verticalFilter];
}

const plotControlSelection = {
  'confirmed': true,
  'horizontal': 'mp',
  'vertical': 'mc'
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function buildPlot() {
  // Filter data points from pulsar data
  let horizontal = [];
  let vertical = [];

  if ( plotControlSelection.confirmed ) {
    let confirmedPulsars = pulsarData.filter(pulsar => pulsar.Confirmed);
    horizontal = confirmedPulsars.map(pulsar => pulsar[plotControlSelection['horizontal']].value);
    vertical = confirmedPulsars.map(pulsar => pulsar[plotControlSelection['vertical']].value);
  } else {
    horizontal = pulsarData.map(pulsar => pulsar[plotControlSelection['horizontal']].value);
    vertical = pulsarData.map(pulsar => pulsar[plotControlSelection['vertical']].value);
  }

  // Filter non numerical values
  [horizontal, vertical] = filterNonNumericValues(horizontal, vertical);

  // Build list of lists [[horizontal, vertical] ..]
  const plotData = [];
  for ( let i = 0; i < horizontal.length; i++ ) {
    plotData.push([horizontal[i], vertical[i]]);
  }

  // Delete previous plot
  removeAllChildNodes(document.getElementById('plot'))

  // Build plot SVG
  let plotContainer = document.getElementById('plot');
  console.log(plotContainer.offsetHeight);

  var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = plotContainer.offsetWidth - margin.left - margin.right,
  height = plotContainer.offsetHeight - margin.top - margin.bottom;

  // Append the svg object to the body of the page
  var svg = d3.select("#plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis
  var x = d3.scaleLinear()
    .domain([d3.min(horizontal), d3.max(horizontal)])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([d3.min(vertical), d3.max(vertical)])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(plotData)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d[0]); } )
      .attr("cy", function (d) { return y(d[1]); } )
      .attr("r", 5)
      .style("fill", "#58a6ff")

}

function setConfirmed() {
  const isConfirmed = $('input[name="plot-control-sources"]:checked').val();
  plotControlSelection.confirmed = isConfirmed == 'confirmed' ? true : false;
  buildPlot();
}

function setHorizontalAxis() {
  const horizontalAxisProperty = $('input[name="plot-control-horizontal"]:checked').val();
  plotControlSelection.horizontal = horizontalAxisProperty;
  buildPlot();
}

function setVerticalAxis() {
  const verticalAxisProperty = $('input[name="plot-control-vertical"]:checked').val();
  plotControlSelection.vertical = verticalAxisProperty;
  buildPlot();
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

    for ( let i = row * 5; i < (row + 1) * 5; i++ ) {
      if ( i >= properties.length ) { // Append empty columns to align elements
        let colDiv = document.createElement('div');
        colDiv.className = 'col';
        rowDiv.appendChild(colDiv);
        continue;
      }

      let colDiv = document.createElement('div');
      colDiv.className = 'col text-left';
      let formDiv = document.createElement('div')
      formDiv.className = 'form-check';

      let input = document.createElement('input');
      input.className = 'form-check-input';
      input.type = 'radio';
      input.name = `plot-control-${axis}`;
      input.id = `plot-control-${axis}-${properties[i]}`;
      input.value = properties[i];
      if ( axis == 'horizontal' ) {
        input.setAttribute('onclick', 'setHorizontalAxis()');
      } else {
        input.setAttribute('onclick', 'setVerticalAxis()');
      }
      // Checked by default
      if ( plotControlSelection[axis] == properties[i] ) {
        input.checked = true;
      }
      
      let label = document.createElement('label');
      label.className = 'form-check-label';
      label.setAttribute('for', `plot-control-${axis}-${properties[i]}`);
      label.innerHTML = properties[i];

      formDiv.appendChild(input);
      formDiv.appendChild(label);
      colDiv.appendChild(formDiv);
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