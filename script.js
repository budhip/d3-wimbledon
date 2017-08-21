/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

var colorScale = d3.scaleLinear()
var yScale = d3.scaleLinear()

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width + marginLeft)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  let data = []
  d3.tsv('afcw-results.tsv', function(d) {
    let goals = d.map(data => {
      return data.GoalsScored
    })
    redraw(goals)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  colorScale.domain([0, d3.max(data)]).range(['red', 'green'])
  yScale.domain([0, d3.max(data)]).range([0, height - margin])

  let sumbuXAxis = d3.scaleLinear()
                   .domain([0, data.length])
                   .range([0, width])

  let sumbuYAxis = d3.scaleLinear()
                  .domain([0, d3.max(data)])
                  .range([height - margin, 0])


  let lebarBatang = width/data.length

  svg.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('fill', colorScale)
     .attr('class', 'bar')
     .attr('x', (d, i) => {
       return i * lebarBatang + marginLeft - 10
     })
     .attr('y', (d) => {
       return height - yScale(d) - margin
     })
     .attr('width', lebarBatang - 2)
     .attr('height', (d) => {
       return yScale(d)
     })

  svg.append('g')
     .attr('class', 'axisSteelBlue')
     .attr('transform', `translate(${marginLeft - 10})`)
     .call(d3.axisLeft(sumbuYAxis).ticks(d3.max(data)))

  svg.append('g')
     .attr('class', 'axisSteelBlue')
     .attr('transform', `translate(${marginLeft - 10}, ${height - margin})`)
     .call(d3.axisBottom(sumbuXAxis).ticks(data.length))

}

reload()
