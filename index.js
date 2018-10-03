let data = [75, 42, 80, 54];

let width = 450, height = 200;

let svg = d3.select("main")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "bar-chart");

let yScale = d3.scaleLinear()
    .domain([d3.min(data), d3.max(data)])
    .range([height, 0]);

let xScale = d3.scaleOrdinal()
    .domain(["","mobile", "tablet", "laptop", "desktop",""])
    .range([0, 85, 185, 285, 385, 450]);

let y_axis = d3.axisLeft()
    .ticks(10)
    .scale(yScale);

let x_axis = d3.axisBottom()
    .scale(xScale);

svg.append("g")
    .call(y_axis);

svg.append("g")
    .call(x_axis)
    .attr("transform", "translate(0, 200)");


let barWidth = (400 / data.length);
let barChart = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", function(d) {
        return 200 - d;
    })
    .attr("height", function(d) {
        return d;
    })
    .attr("width", barWidth - 10)
    .attr("transform", function (d, i) {
         let translate = [barWidth * i + 40, 0];
         return "translate("+ translate +")";
    })
    .attr("class", "bar");
