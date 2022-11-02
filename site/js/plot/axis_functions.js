const defaultAxis = (horizontal, vertical, width, height) => {
  const x = d3.scaleLinear()
  .domain([d3.min(horizontal), d3.max(horizontal)])
  .range([ 0, width ]);

  const y = d3.scaleLinear()
  .domain([d3.min(vertical), d3.max(vertical)])
  .range([ height, 0]);

  return [x, y];
}