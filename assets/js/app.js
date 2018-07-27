// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.


var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#plot")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/js/data.csv", function (err, depData) {
  if (err) throw err;

  // Step 1: Parse Data/Cast as numbers
   // ==============================
  depData.forEach(function (data) {
    data.poverty = +data.poverty;
    data.obesity = +data.obesity;
  });

  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(depData, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(depData, d => d.obesity)])
    .range([height, 0]);
//     .domain([0.1, d3.max(depData, d => d.depressed)])
  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

   // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(depData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.medIncome))
  .attr("cy", d => yLinearScale(d.depressed))
  .attr("r", "15")
  .attr("fill", "blue")
  .attr("opacity", ".5")

  // Step 6: Initialize tool tip
  // ==============================
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<br>Obesity: ${d.medIncome}<br>Poverty: ${d.depressed}`);
    });

  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  circlesGroup.on("click", function (data) {
      toolTip.show(data);
    })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 80)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Poverty");

  chartGroup.append("text")
    .attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Obesity");
});

function adjustiframes() {
  $('iframe').each(function(){
    var $this = $(this),
    proportion = $this.data( 'proportion' ),
    w = $this.attr('width'),
    actual_w = $this.width();
    
    if ( ! proportion ) {
      proportion = $this.attr('height') / w;
      $this.data( 'proportion', proportion );
    }

    if ( actual_w != w ){
      $this.css( 'height', Math.round(actual_w * proportion ) + 'px' );
    }

  })
}
// $(window).on('resize load', adjustiframes);
jQuery(window).on('resize load', adjustiframes);