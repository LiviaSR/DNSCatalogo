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

  const margin = {top: 10, right: 30, bottom: 60, left: 60},
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

  if ( config.axis ) {
    [x_axis, y_axis] = config.axis(x, y, width, height, margin, svg, pcs);
  } else {
    [x_axis, y_axis] = plotConfig['default'].axis(x, y, width, height, margin, svg, pcs);
  }

  // let Tooltip = d3.select('#plot')
  //   .append("div")
  //   .style("opacity", 0)
  //   .attr("class", "tooltip")
  //   .style("background-color", "white")
  //   .style("border", "solid")
  //   .style("border-width", "2px")
  //   .style("border-radius", "5px")
  //   .style("padding", "5px")

  // const mouseover = d => {
  //   Tooltip
  //     .style("opacity", 1)
  //   d3.select(this)
  //     .style("stroke", "black")
  //     .style("opacity", 1)
  // }
  // const mousemove = d => {
  //   Tooltip
  //     .html("The exact value of<br>this cell is: " + d[0].value)
  //     .style("left", (70) + "px")
  //     .style("top", (70) + "px")
  //     // .style("left", (d3.mouse(this)[0]+70) + "px")
  //     // .style("top", (d3.mouse(this)[1]) + "px")
  // }
  // const mouseleave = d => {
  //   Tooltip
  //     .style("opacity", 0)
  //   d3.select(this)
  //     .style("stroke", "none")
  //     .style("opacity", 0.8)
  // }

  console.log(plotData);

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(plotData)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x_axis(d[0].value); } )
      .attr("cy", function (d) { return y_axis(d[1].value); } )
      .attr("r", 5)
      .style("fill", (d) => {
        if ( config.color ) {
          return config.color(d[0].type);
        }
        return plotConfig['default'].color(d[0].type);
      })
    // .on('mouseover', mouseover)
    // .on('mousemove', mousemove)
    // .on('mouseleave', mouseleave);
}

function getPlotData() {
  let pulsars = pulsarData
  if ( pcs.confirmed ) {
    pulsars = pulsarData.filter(pulsar => pulsar.Confirmed);
  }
  x = pulsars.map(pulsar => { 
    return({ 
      'value': pulsar[pcs['x']].value,
      'type': pulsar.Type,
    })
  });
  y = pulsars.map(pulsar => { 
    return({ 
      'value': pulsar[pcs['y']].value,
      'type': pulsar.Type,
    })
  });
  // Filter non numerical values
  return filterNonNumericValues(x, y);
}

function buildPlot() {
  // Delete previous plot
  removeAllChildNodes(document.getElementById('plot'));
  plot();
}
