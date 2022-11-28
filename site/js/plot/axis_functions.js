/*
       Lin-Lin scale
*/


const defaultAxis = (x, y, width, height, margin, svg, pcs) => {
  const x_axis = d3.scaleLinear()
    //.domain([0, 0])
    .range([40, width]);

  const y_axis = d3.scaleLinear()
    //.domain([0, 0])
    .range([height, 0]);

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height  + ")")
    .attr('class', 'axis-white x-axis-transition x-axis')
    .call(d3.axisBottom(x_axis)
    .ticks( (width - 40) / 60))
    .attr('opacity', '0');
  // Add Y axis
  svg.append('g')
    .attr("transform", "translate(40, 0)")
    .attr('class', 'axis-white y-axis-transition y-axis')
    .call(d3.axisLeft(y_axis)
    .ticks( innerHeight/ 60))
    .attr('opacity', '0');

  // Add X axis label
  svg.append("text")
    .style('fill', 'white')
    .style('font-size', '25px')
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 37)
    .text(pcs['x']);

  // Y axis label
  svg.append("text")
    .style('fill', 'white')
    .style('font-size', '25px')
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 25)
    .attr("x", -margin.top -(height / 2))
    .text(pcs['y'])

  // X axis animation
  x_axis.domain([
    d3.min(x.map(o => o.value)),
    d3.max(x.map(o => o.value)),
  ]);

  svg.select(".x-axis-transition")
    .transition()
    .duration(transitions['x-axis-display-delay'])
    .attr('opacity', '1')
    .call(d3.axisBottom(x_axis)
    .ticks((width - 40) /60));

  // Y axis animation
  y_axis.domain([
    d3.min(y.map(o => o.value)),
    d3.max(y.map(o => o.value)),
  ])

  svg.select(".y-axis-transition")
  .transition()
  .duration(transitions['y-axis-display-delay'])
  .attr('opacity', '1')
  .call(d3.axisLeft(y_axis)
  .ticks(innerHeight/60));

  return [x_axis, y_axis];
}

/*
       Log-Log scale
*/

const logarithmicXYAxis = (x, y, width, height, margin, svg, pcs) => {
  const x_axis = d3.scaleLog()
  //.domain([0,  0])
  .range([40, width])
  .base(10);

  const y_axis = d3.scaleLog()
 // .domain([0, 0])
  .range([height, 0])
  .base(10);

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .attr('class', 'axis-white x-axis-transition x-axis')
    .call(d3.axisBottom(x_axis)
    .ticks((width - 40) / 60, formatPower))
    .attr('opacity', '0');
  // Add Y axis
  svg.append('g')
    .attr("transform", "translate(40, 0)")
    .attr('class', 'axis-white y-axis-transition y-axis')
    .call(d3.axisLeft(y_axis)
    .ticks( innerHeight / 60, formatPower))
    .attr('opacity', '0');

  // Add X axis label
  svg.append("text")
    .style('fill', 'white')
    .style('font-size', '25px')
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 37)
    .text(pcs['x']);

  // Y axis label
  svg.append("text")
    .style('fill', 'white')
    .style('font-size', '25px')
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 25)
    .attr("x", -margin.top -(height / 2))
    .text(pcs['y'])

  // X axis animation
  x_axis.domain([
    d3.min(x.map(o => o.value)),
    d3.max(x.map(o => o.value)),
  ]).base(10);

  svg.select(".x-axis-transition")
    .transition()
    .duration(transitions['x-axis-display-delay'])
    .attr('opacity', '1')
    .call(d3.axisBottom(x_axis)  
    .ticks( (width - 40) / 60, formatPower));

  // Y axis animation
  y_axis.domain([
    d3.min(y.map(o => o.value)),
    d3.max(y.map(o => o.value)),
  ]).base(10);

  svg.select(".y-axis-transition")
  .transition()
  .duration(transitions['y-axis-display-delay'])
  .attr('opacity', '1')
  .call(d3.axisLeft(y_axis)
  .ticks( innerHeight / 60, formatPower));

  return [x_axis, y_axis];
}

/*
       Log-Lin scale
*/

const logarithmicXAxis = (x, y, width, height, margin, svg, pcs) => {
  const x_axis = d3.scaleLog()
  //.domain([0, 0])
  .range([40, width])
  .base(10);

  const y_axis = d3.scaleLinear()
  //.domain([0, 0])
  .range([height, 0]);

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .attr('class', 'axis-white x-axis-transition x-axis')
    .call(d3.axisBottom(x_axis)
    .ticks( (width - 40) / 60, formatPower))
    .attr('opacity', '0');
  // Add Y axis
  svg.append('g')
    .attr("transform", "translate(40, 0)")
    .attr('class', 'axis-white y-axis-transition y-axis')
    .call(d3.axisLeft(y_axis)
    .ticks(innerHeight / 60))
    .attr('opacity', '0');

  // Add X axis label
  svg.append("text")
    .style('fill', 'white')
    .style('font-size', '25px')
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 37)
    .text(pcs['x']);

  // Y axis label
  svg.append("text")
    .style('fill', 'white')
    .style('font-size', '25px')
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 25)
    .attr("x", -margin.top -(height / 2))
    .text(pcs['y'])

  // X axis animation
  x_axis.domain([
    d3.min(x.map(o => o.value)),
    d3.max(x.map(o => o.value)),
  ]);

  svg.select(".x-axis-transition")
    .transition()
    .duration(transitions['x-axis-display-delay'])
    .attr('opacity', '1')
    .call(d3.axisBottom(x_axis)
    .ticks( (width - 40) / 60, formatPower));

  // Y axis animation
  y_axis.domain([
    d3.min(y.map(o => o.value)),
    d3.max(y.map(o => o.value)),
  ]);

  svg.select(".y-axis-transition")
  .transition()
  .duration(transitions['y-axis-display-delay'])
  .attr('opacity', '1')
  .call(d3.axisLeft(y_axis)
  .ticks(innerHeight / 60));

  return [x_axis, y_axis];
}

/*
       Lin-Log scale
*/

const logarithmicYAxis = (x, y, width, height, margin, svg, pcs) => {
  const x_axis = d3.scaleLinear()
  //.domain([0, 0])
  .range([40, width]);

  const y_axis = d3.scaleLog()
  .domain([0, 0])
  .range([height, 0])
  .base(10);

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .attr('class', 'axis-white x-axis-transition x-axis')
    .call(d3.axisBottom(x_axis)
    .ticks( (width - 40 ) / 60))
    .attr('opacity', '0');
  // Add Y axis
  svg.append('g')
    .attr("transform", "translate(40, 0)")
    .attr('class', 'axis-white y-axis-transition y-axis')
    .call(d3.axisLeft(y_axis)
    .ticks( innerHeight / 60)
    .tickFormat(formatPower))
    .attr('opacity', '0');

  // Add X axis label
  svg.append("text")
    .style('fill', 'white')
    .style('font-size', '25px')
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 37)
    .text(pcs['x']);

  // Y axis label
  svg.append("text")
    .style('fill', 'white')
    .style('font-size', '25px')
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 25)
    .attr("x", -margin.top -(height / 2))
    .text(pcs['y'])

  // X axis animation
  x_axis.domain([
    d3.min(x.map(o => o.value)),
    d3.max(x.map(o => o.value)),
  ]);

  svg.select(".x-axis-transition")
    .transition()
    .duration(transitions['x-axis-display-delay'])
    .attr('opacity', '1')
    .call(d3.axisBottom(x_axis)
    .ticks( (width - 40) /60));

  // Y axis animation
  y_axis.domain([
    d3.min(y.map(o => o.value)),
    d3.max(y.map(o => o.value)),
  ]);

  svg.select(".y-axis-transition")
  .transition()
  .duration(transitions['y-axis-display-delay'])
  .attr('opacity', '1')
  .call(d3.axisLeft(y_axis)
  .ticks( innerHeight / 60)
  .tickFormat(formatPower));
  return [x_axis, y_axis];
}