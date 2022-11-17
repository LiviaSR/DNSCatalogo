const defaultAxis = (x, y, width, height, margin, svg, pcs) => {
  const x_axis = d3.scaleLinear()
  .domain([
    d3.min(x.map(o => o.value)),
    d3.max(x.map(o => o.value)),
  ])
  .range([ 0, width ]);

  const y_axis = d3.scaleLinear()
  .domain([
    d3.min(y.map(o => o.value)),
    d3.max(y.map(o => o.value)),
  ])
  .range([ height, 0]);

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_axis));
  // Add Y axis
  svg.append('g').call(d3.axisLeft(y_axis));

  // Add X axis label:
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 30)
    .text(pcs['x']);

  // Y axis label:
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 25)
    .attr("x", -margin.top -(height / 2))
    .text(pcs['y'])

  return [x_axis, y_axis];
}

const logarithmicXYAxis = (x, y, width, height, margin, svg, pcs) => {
  const x_axis = d3.scaleLog()
  .domain([
    d3.min(x.map(o => o.value)),
    d3.max(x.map(o => o.value)),
  ])
  .range([0, width])
  .base(10);

  const y_axis = d3.scaleLog()
  .domain([
    d3.min(y.map(o => o.value)),
    d3.max(y.map(o => o.value)),
  ])
  .range([height, 0])
  .base(10);

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_axis).ticks(5, '.2'));
  // Add Y axis
  svg.append('g').call(d3.axisLeft(y_axis).ticks(5, '.6'));

  // Add X axis label:
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 30)
    .text(pcs['x']);

  // Y axis label:
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 25)
    .attr("x", -margin.top -(height / 2))
    .text(pcs['y'])

  return [x_axis, y_axis];
}

const logarithmicXAxis = (x, y, width, height, margin, svg, pcs) => {
  const x_axis = d3.scaleLog()
  .domain([
    d3.min(x.map(o => o.value)),
    d3.max(x.map(o => o.value)),
  ])
  .range([ 0, width ])
  .base(10);

  const y_axis = d3.scaleLinear()
  .domain([
    d3.min(y.map(o => o.value)),
    d3.max(y.map(o => o.value)),
  ])
  .range([ height, 0]);

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_axis).tickFormat(d3.format(".2")));
  // Add Y axis
  svg.append('g').call(d3.axisLeft(y_axis).tickFormat(d3.format(".2")));

  // Add X axis label:
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 30)
    .text(pcs['x']);

  // Y axis label:
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 25)
    .attr("x", -margin.top -(height / 2))
    .text(pcs['y'])

  return [x_axis, y_axis];
}