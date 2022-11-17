function plot() {
  // Get custom config
  const pair = `${pcs['x']}-${pcs['y']}`;

  // Get custom functions if any
  const config = pair in plotConfig ? plotConfig[pair] : plotConfig['default'];

  // Get plot data from pulsar_data
  [x, y] = getPlotData();

  // Custom data filter functions
  if ( config.hasOwnProperty('transformations') ) {
    if ( Array.isArray(config.transformations) ) {
      for ( let transformation of config.transformations ) {
        if ( Array.isArray(transformation) ) {
          [x, y] = transformation[0](x, y, transformation[1]); // If array then apply args
        } else {
          [x, y] = transformation(x, y);
        }
      }
    } else {
      [x, y] = config.transformations(x, y);
    }
  }

  // Build list of lists [[x, y] ..]
  const plotData = [];
  for ( let i = 0; i < x.length; i++ ) {
    plotData.push([x[i], y[i]]);
  }

  // Build plot SVG
  const plotContainer = document.getElementById('plot');

  const margin = { top: 15, right: 30, bottom: 60, left: 60 },
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

  // Add axis
  if ( config.hasOwnProperty('axis') ) {
    [x_axis, y_axis] = config.axis(x, y, width, height, margin, svg, pcs);
  } else {
    [x_axis, y_axis] = plotConfig['default'].axis(x, y, width, height, margin, svg, pcs);
  }

  // Add tooltips to data points
  const Tooltip = d3.select('#plot')
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("padding", "5px")

  const mouseover = function(d) {
    if ( d[0].type === 'rec' ) { borderColor = `-5px 0 0 0px ${colors['rec']}`; }
    else if ( d[0].type === 'nrec' ) { borderColor = `-5px 0 0 0px ${colors['nrec']}`; }
    else if ( d[0].type === 'GC' ) { borderColor = `-5px 0 0 0px ${colors['GC']}`; }
  
    Tooltip
      .style("opacity", 1)
      .style('box-shadow', borderColor)
    d3.select(this)
      .style("stroke", "white")
      .style("opacity", 1)
  }

  const mousemove = function(d) {
    Tooltip
      .html(`${pcs['x']}: ${d[0].value}<br>${pcs['y']}: ${d[1].value}`)
      .style("left", (70) + "px")
      .style("top", (70) + "px")
      .style("left", (d3.mouse(this)[0]+90) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }

  const mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // Adjust x and y axis ticks if necessary for confirmed
  if ( config.hasOwnProperty('ticks-confirmed') && pcs.confirmed ) {
    config['ticks-confirmed'][0][0](svg, x_axis, config['ticks-confirmed'][0][1]);
    config['ticks-confirmed'][1][0](svg, y_axis, config['ticks-confirmed'][1][1]);
  }

  // Adjust x and y axis ticks if necessary for confirmed
  if ( config.hasOwnProperty('ticks-candidate') && ! pcs.confirmed ) {
    config['ticks-candidate'][0][0](svg, x_axis, config['ticks-candidate'][0][1]);
    config['ticks-candidate'][1][0](svg, y_axis, config['ticks-candidate'][1][1]);
  }

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(plotData)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x_axis(d[0].value); } )
      .attr("cy", function (d) { return y_axis(d[1].value); } )
      .attr("r", 5)
      .style('opacity', 0)
      .style("fill", (d) => {
        if ( config.hasOwnProperty('color') ) {
          return config.color(d[0].type);
        }
        return plotConfig['default'].color(d[0].type);
      })
      
  svg.selectAll('circle')
    .transition()
    .duration(transitions['data-display-delay'])
    .style('opacity', 1);

  svg.selectAll('circle')
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave);
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
