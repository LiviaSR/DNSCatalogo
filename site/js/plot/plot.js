const pcs = { // Plot control selection
  'confirmed': true,
  'x': 'mp',
  'y': 'mc'
}

function plot() {
  // Get custom config
  const pair = `${pcs['x']}-${pcs['y']}`;

  // Get custom functions if any
  const config = pair in plotConfig ? plotConfig[pair] : plotConfig['default'];

  // Get plot data from pulsar_data
  [x, y] = getPlotData();

  // Custom data filter function
  if ( config.transformation ) {
    [x, y] = config.transformation(x, y);
  }

  // Build list of lists [[x, y] ..]
  const plotData = [];
  for ( let i = 0; i < x.length; i++ ) {
    plotData.push([x[i], y[i]]);
  }

  // Build plot SVG
  const plotContainer = document.getElementById('plot');

  const margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = plotContainer.offsetWidth - margin.left - margin.right,
  height = plotContainer.offsetHeight - margin.top - margin.bottom;

  // Append the svg object to the body of the page
  const svg = d3.select("#plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis
  if ( config.axis ) {
    [x_axis, y_axis] = config.axis(x, y, width, height);
  } else {
    [x_axis, y_axis] = plotConfig['default'].axis(x, y, width, height);  
  }

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_axis));
  // Add Y axis
  svg.append('g').call(d3.axisLeft(y_axis));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(plotData)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x_axis(d[0]); } )
      .attr("cy", function (d) { return y_axis(d[1]); } )
      .attr("r", 5)
      .style("fill", (d) => {
        if ( config.color ) {
          return config.color(d);
        }
        return plotConfig['default'].color(d);
      });
}

function getPlotData() {
  let pulsars = pulsarData
  if ( pcs.confirmed ) {
    pulsars = pulsarData.filter(pulsar => pulsar.Confirmed);
  }
  x = pulsars.map(pulsar => pulsar[pcs['x']].value);
  y = pulsars.map(pulsar => pulsar[pcs['y']].value);
  // Filter non numerical values
  return filterNonNumericValues(x, y);
}

function buildPlot() {
  // Delete previous plot
  removeAllChildNodes(document.getElementById('plot'));
  plot();
}
