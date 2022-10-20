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
  console.log(plotControlSelection);

  // Filter data points from pulsar data
  const horizontal = [];
  const vertical = [];

  for ( let pulsar of pulsarData ) {
    if ( plotControlSelection.confirmed ) {
      if ( pulsar.comments.toLowerCase().includes('confirmed') ) {
        horizontal.push(pulsar[plotControlSelection['horizontal']].value);
        vertical.push(pulsar[plotControlSelection['vertical']].value);
      }
    }
  }

  // Build list of lists [[horizontal, vertical] ..]
  const plotData = [];
  for ( let i = 0; i < horizontal.length; i++ ) {
    plotData.push([horizontal[i], vertical[i]]);
  }

  // Delete previous plot
  removeAllChildNodes(document.getElementById('plot'))

  // Build plot SVG
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 2])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 2])
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
      .style("fill", "#0d6efd")

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