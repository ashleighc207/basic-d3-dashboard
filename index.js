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

    lineChart.selectAll("dot")
        .data(lineData)
        .attr("d", line)
        .enter()
        .append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return xScale(d.date)})
        .attr("cy", function(d) { return yScale(d.units)})
        .attr("fill", "rebeccapurple")

    lineChart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))

    lineChart.append("g")
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(yScale).ticks(5))
}

createLineChart()


createDonutChart = () => {
    let donutData = [
                  {
                    "age": "0-15",
                    "percentage": 0.01233,
                    "previous": 0.00124
                  },
                  {
                    "age": "16-30",
                    "percentage": 0.15695,
                    "previous": 0.02678 
                  },
                  {
                    "age": "31-45",
                    "percentage": 0.40673,
                    "previous": 0.05688
                  },
                  {
                    "age": "46-60",
                    "percentage": 0.33909,
                    "previous": 0.40673
                  },
                  {
                    "age": "61-75",
                    "percentage": 0.05688,
                    "previous": 0.33909
                  },
                  {
                    "age": "76-90",
                    "percentage": 0.02678,
                    "previous": 0.15695
                  },
                  {
                    "age": "91-105",
                    "percentage": 0.00124,
                    "previous": 0.01233
                  }
    ]

    let width = 450;
    let height = 200;
    let floatFormat = d3.format('.4r');
    let variable = "Percentage";
    let category = "Age";
    let radius = Math.min(width, height)/2;
    let cornerRadius = 3;
    let padAngle = 0.015;

    let donut = d3.pie()
        .value(function(d) { return floatFormat(d[variable]); })
        .sort(null);

    let arc = d3.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.6)
        .cornerRadius(cornerRadius)
        .padAngle(padAngle);

    let outerArc = d3.arc()
        .outerRadius(radius * 0.9)
        .innerRadius(radius * 0.9);

    let donutChart = d3.select(".donut-chart-card")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    donutChart.append('g').attr('class', 'slices');
    donutChart.append('g').attr('class', 'labelName');
    donutChart.append('g').attr('class', 'lines');

    let donutPath = donutChart.select(".slices")
        .datum(donutData).selectAll("path")
        .data(donut)
    .enter().append("path")
        .attr("fill", "rebeccapurple")
        .attr("d", arc)


}

createDonutChart();