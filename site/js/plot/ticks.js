const adjustXtick = (svg, x_axis, tick) => {
  svg.select(".x-axis")
    .call(d3.axisLeft(x_axis).ticks(tick))
}

const adjustYtick = (svg, y_axis, tick) => {
  svg.select(".y-axis")
    .call(d3.axisLeft(y_axis).ticks(tick))
}
