const defaultAxis = (x, y, width, height, margin, svg, pcs) => {
  const x_axis = d3.scaleLinear()
    .domain([0, 0])
    .range([0, width]);

  const y_axis = d3.scaleLinear()
    .domain([0, 0])
    .range([height, 0]);

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .attr('class', 'axis-white x-axis-transition')
    .call(d3.axisBottom(x_axis))
    .attr('opacity', '0');
  // Add Y axis
  svg.append('g')
    .attr('class', 'axis-white y-axis-transition')
    .call(d3.axisLeft(y_axis))
    .attr('opacity', '0');

  // Add X axis label
  svg.append("text")
    .style('fill', 'white')
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 30)
    .text(pcs['x']);

  // Y axis label
  svg.append("text")
    .style('fill', 'white')
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
    .call(d3.axisBottom(x_axis));

  // Y axis animation
  y_axis.domain([
    d3.min(y.map(o => o.value)),
    d3.max(y.map(o => o.value)),
  ])

  svg.select(".y-axis-transition")
  .transition()
  .duration(transitions['y-axis-display-delay'])
  .attr('opacity', '1')
  .call(d3.axisLeft(y_axis));

  // add the X gridlines
  svg.append("g")			
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .transition()
    .duration(transitions['x-grid-display-delay'])
    .call(d3.axisBottom(x_axis)
        .tickSize(-height)
        .tickFormat("")
    )

  // add the Y gridlines
  svg.append("g")
    .attr("class", "grid")
    .transition()
    .duration(transitions['y-grid-display-delay'])
    .call(d3.axisLeft(y_axis)
        .tickSize(-width)
        .tickFormat("")
    )

  return [x_axis, y_axis];
}

const logarithmicXYAxis = (x, y, width, height, margin, svg, pcs) => {
  const x_axis = d3.scaleLog()
  .domain([0, 0])
  .range([0, width])
  .base(10);

  const y_axis = d3.scaleLog()
  .domain([0, 0])
  .range([height, 0])
  .base(10);

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .attr('class', 'axis-white x-axis-transition')
    .call(d3.axisBottom(x_axis).ticks(5, '.7'))
    .attr('opacity', '0');
  // Add Y axis
  svg.append('g')
    .attr('class', 'axis-white y-axis-transition')
    .call(d3.axisLeft(y_axis).ticks(5, '.7'))
    .attr('opacity', '0');

  // Add X axis label
  svg.append("text")
    .style('fill', 'white')
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 30)
    .text(pcs['x']);

  // Y axis label
  svg.append("text")
    .style('fill', 'white')
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
    .call(d3.axisBottom(x_axis).ticks(5, '.7'));

  // Y axis animation
  y_axis.domain([
    d3.min(y.map(o => o.value)),
    d3.max(y.map(o => o.value)),
  ]).base(10);

  svg.select(".y-axis-transition")
  .transition()
  .duration(transitions['y-axis-display-delay'])
  .attr('opacity', '1')
  .call(d3.axisLeft(y_axis).ticks(5, '.7'));

  // add the X gridlines
  svg.append("g")			
    .attr("class", "grid")
    .transition()
    .duration(transitions['x-grid-display-delay'])
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_axis)
        .ticks(5)
        .tickSize(-height)
        .tickFormat("")
    )

  // add the Y gridlines
  svg.append("g")
    .attr("class", "grid")
    .transition()
    .duration(transitions['y-grid-display-delay'])
    .call(d3.axisLeft(y_axis)
        .ticks(5)
        .tickSize(-width)
        .tickFormat("")
    )

  return [x_axis, y_axis];
}

const logarithmicXAxis = (x, y, width, height, margin, svg, pcs) => {
  const x_axis = d3.scaleLog()
  .domain([0, 0])
  .range([0, width])
  .base(10);

  const y_axis = d3.scaleLinear()
  .domain([0, 0])
  .range([height, 0]);

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .attr('class', 'axis-white x-axis-transition')
    .call(d3.axisBottom(x_axis).ticks(5, '.7'))
    .attr('opacity', '0');
  // Add Y axis
  svg.append('g')
    .attr('class', 'axis-white y-axis-transition')
    .call(d3.axisLeft(y_axis))
    .attr('opacity', '0');

  // Add X axis label
  svg.append("text")
    .style('fill', 'white')
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 30)
    .text(pcs['x']);

  // Y axis label
  svg.append("text")
    .style('fill', 'white')
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
    .call(d3.axisBottom(x_axis).ticks(5, '.7'));

  // Y axis animation
  y_axis.domain([
    d3.min(y.map(o => o.value)),
    d3.max(y.map(o => o.value)),
  ]);

  svg.select(".y-axis-transition")
  .transition()
  .duration(transitions['y-axis-display-delay'])
  .attr('opacity', '1')
  .call(d3.axisLeft(y_axis));

  // add the X gridlines
  svg.append("g")			
    .attr("class", "grid")
    .transition()
    .duration(transitions['x-grid-display-delay'])
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_axis)
        .ticks(5)
        .tickSize(-height)
        .tickFormat("")
    )

  // add the Y gridlines
  svg.append("g")
    .attr("class", "grid")
    .transition()
    .duration(transitions['y-grid-display-delay'])
    .call(d3.axisLeft(y_axis)
        .ticks(5)
        .tickSize(-width)
        .tickFormat("")
    )

  return [x_axis, y_axis];
}

const logarithmicYAxis = (x, y, width, height, margin, svg, pcs) => {
  const x_axis = d3.scaleLinear()
  .domain([0, 0])
  .range([0, width]);

  const y_axis = d3.scaleLog()
  .domain([0, 0])
  .range([height, 0])
  .base(10);

  // Add X axis
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .attr('class', 'axis-white x-axis-transition')
    .call(d3.axisBottom(x_axis))
    .attr('opacity', '0');
  // Add Y axis
  svg.append('g')
    .attr('class', 'axis-white y-axis-transition')
    .call(d3.axisLeft(y_axis).ticks(5, '.7'))
    .attr('opacity', '0');

  // Add X axis label
  svg.append("text")
    .style('fill', 'white')
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 30)
    .text(pcs['x']);

  // Y axis label
  svg.append("text")
    .style('fill', 'white')
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
    .call(d3.axisBottom(x_axis));

  // Y axis animation
  y_axis.domain([
    d3.min(y.map(o => o.value)),
    d3.max(y.map(o => o.value)),
  ]);

  svg.select(".y-axis-transition")
  .transition()
  .duration(transitions['y-axis-display-delay'])
  .attr('opacity', '1')
  .call(d3.axisLeft(y_axis));

  // add the X gridlines
  svg.append("g")			
    .attr("class", "grid")
    .transition()
    .duration(transitions['x-grid-display-delay'])
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_axis)
        .ticks(5)
        .tickSize(-height)
        .tickFormat("")
    )

  // add the Y gridlines
  svg.append("g")
    .attr("class", "grid")
    .transition()
    .duration(transitions['y-grid-display-delay'])
    .call(d3.axisLeft(y_axis)
        .ticks(5)
        .tickSize(-width)
        .tickFormat("")
    )

  return [x_axis, y_axis];
}