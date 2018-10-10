let data = [75, 42, 80, 54];

let width = 450, height = 200;

createBarChart = (data, width, height) => {
    let svg = d3.select(".bar-chart-card")
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
}

createBarChart(data, width, height)

createLineChart = () => {
    let lineData = [
                  {
                    "date": 1999,
                    "units": 320
                  },
                  {
                    "date": 2000,
                    "units": 552
                  },
                  {
                    "date": 2001,
                    "units": 342
                  },
                  {
                    "date": 2002,
                    "units": 431
                  },
                  {
                    "date": 2003,
                    "units": 251
                  },
                  {
                    "date": 2004,
                    "units": 445
                  }
                ];

    // set dimensions of the line chart
    let width = 450,
        height = 200;

    // set the scales
    let yScale = d3.scaleLinear()
        .domain([200, 600])
        .range([height, 0]);

    let xScale = d3.scaleOrdinal()
        .range([0, 90, 180, 270, 360, 450]);

    // create the line
    let line = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.units); });

    // create svg container
    let lineChart = d3.select(".line-chart-card")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "line-chart")

    lineChart.append("path")
        .data([lineData])
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "rebeccapurple")
        .attr("stroke-width", 2)

    lineChart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))

    lineChart.append("g")
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(yScale).ticks(5))
}

createLineChart()




