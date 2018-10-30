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
    let donutData = [{
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
      }];

    let width = 450;
    let height = 300;
    let radius = Math.min(width, height)/2;
    let thickness = 60;

    let donutChart = d3.select(".donut-chart-card")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "donut-chart-container")
        
    let group = donutChart.append("g")
        .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")")
        .attr("class", "donut-chart-container-inner")

    let color = d3.scaleOrdinal()
        .domain(["0-15", "16-30", "31-45","46-60", "61-75", "76-90", "91-105"])
        .range(["#770087" , "#2b009e" , "#0045b3", "#00c7c1", "#00d756", "#fdfdbb"]);  

    let arc = d3.arc()
        .outerRadius(radius - 30)
        .innerRadius(radius - thickness)
        .cornerRadius(3);

    let donut = d3.pie()
        .startAngle(-90 * Math.PI/180)
        .endAngle(-90 * Math.PI/180 + 2*Math.PI)
        .padAngle(.03)
        .value(function(d) { return d.percentage; })
        .sort(null);


    let donutPath = group.selectAll(".path")
        .data(donut(donutData))
        .enter()
        .append("path")
        .attr("class", "path")
        .attr("d", arc)
        .attr("id", function(d,i) { return "path" + i; })
        .attr('fill', function(d, i) { 
            return color(d.data.age);
          })
        .each(function(d,i) {
            let firstArcSection = /(^.+?)L/;
            let newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
            donutChart.append("path")
            .attr("class", "hiddenDonutArcs")
            .attr("id", "donutArc"+i)
            .attr("d", newArc)
            .style("fill", "none");
        });
 

    let text = group.selectAll(".label-text")
        .data(donut(donutData))
        .enter()
        .append("text")
        .attr("class", "text")
        .attr("dy", -13)
        .append("textPath")
        .attr("startOffset","50%")
        .style("text-anchor","middle")
        .attr("xlink:href", function(d,i){return "#donutArc" + i;})
        .text(function(d, i) { 
            if(d.data.percentage > 0.05) {
            return d.data.age;
        }
          })

    d3.selectAll(".donut-chart-container-inner path").call(toolTip);

    function toolTip(selection) {
        selection.on("mouseenter", function(donutData) {
            console.log(donutData)
            donutChart.append("text")
                .attr("class", "toolCircle")
                .attr("dy", -15) //to adjust text vertical alignment in tooltip
                .html(function(d) {
                    let htmlText = "<p>" + donutData.data.age +"</p>" + "<p>" + donutData.data.percentage + "</p>" + "<p>" + donutData.data.previous + "</p>"
                    let newHtmlText = `${donutData.data.age} ${donutData.data.percentage} ${donutData.data.previous}`
                    // console.log(newHtmlText)
                    console.log(htmlText)
                    return newHtmlText
                })//add text to circle
                .style("font-size", ".9em")
                .style("text-anchor", "middle") //center text in tooltip
                .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

            donutChart.append("circle")
                .attr("class", "toolCircle")
                .attr("r", radius - thickness - 1) //radius of tooltip circle
                .style("fill", function(donutData, i) {
                    // console.log() 
                    return color(i);
                })
                //   }) // original color(data.data[category]))
                .style("fill", function() {
                    return color(donutData.data.age);
                })
                // console.log
                .style("fill-opacity", 0.35)
                .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

        });
    

    selection.on("mouseout", function() {
        d3.selectAll(".toolCircle").remove();
    });
    }

}

createDonutChart();


createUSMapChart = () => {
    let width = 960,
        height = 500;

    let projection = d3.geoAlbersUsa();
    let path = d3.geoPath()
        .projection(projection);

    let map = d3.select(".map-chart-card").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
      svg.append("path")
          .attr("class", "states")
          .datum(topojson.feature(us, us.objects.states))
          .attr("d", path);
      })
}

createUSMapChart();