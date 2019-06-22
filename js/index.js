var chartLibrary = {};

(function () {
    "use strict";
    this.createLineChart = function (element, data, dimensions) {
        
        let lcDataset = data,
            width = dimensions.width,
            height = dimensions.height,
            min = 0,
            max = 0,
            vals = [[], []],
            cats = [[],[]];

        lcDataset.forEach(function(item, i){
            item.values.forEach(function(innerItem, j){
                (innerItem.value > max) ? max = innerItem.value : (innerItem.value < min) ? min = innerItem.value : null;
                cats[i].push(innerItem.category)
                vals[i].push(innerItem.value)
            })
        })

        let yScale = d3.scaleLinear()    
            .domain([min, max])
            .range([height - 60 , 0])
            .nice(4)

        let xScale = d3.scaleBand()
            .domain(cats[0])
            .rangeRound([0, width - 60]);

        let line = d3.line()
            .x(function(d, i) { 
                return xScale(d.category) + xScale.bandwidth()/2; 
            })
            .y(function(d) { 
                return yScale(d.value); 
            })

        let lineChart = d3.select(element)
            .append("svg")
            .attr("viewbox", "0 0 400 250")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "line-chart")
            .append("g")
            .attr("transform", "translate(20, 0)")

        let gridlines = d3.axisLeft()
            .tickFormat("")
            .ticks(4)
            .tickSize(-(width - 60))
            .scale(yScale);

        lineChart.append("g")
            .call(gridlines)
            .classed("gridlines", true)
            .select(".domain")
            .remove();

        lineChart.selectAll(".gridlines .tick line")
            .attr("transform", "translate(20,20)");

        lineChart.append("g")
            .attr("transform", "translate(20, 225)")
            .call(d3.axisBottom(xScale)
            .tickSizeOuter(0))
            .attr("class", "lc-xaxis")

        lineChart.append("g")
            .attr("transform", "translate(20, 20)")
            .call(d3.axisLeft(yScale)
            .tickSizeOuter(0).ticks(4))
            .attr("class", "lc-yaxis")

        let lineGroup = lineChart.append('g')
            .attr("transform", "translate(20, 20)")
            .attr("class", "linegroup")

        let points = lineChart.append('g')
            .attr("transform", "translate(20, 20)")

        lineGroup.append("path")
            .datum(lcDataset[0].values)
            .attr("d", line)
            .attr("class", "first-line")

        lineGroup.append("path")
            .datum(lcDataset[1].values)
            .attr("d", line)
            .attr("class", "second-line")

        points.selectAll("dot")
            .data(lcDataset[0].values)
            .enter()
            .append("circle")
            .attr("class", "first-point-set")
            .attr("r", 4)
            .attr("cx", function(d, i) { return xScale(d.category) + xScale.bandwidth()/2})
            .attr("cy", function(d) { return yScale(d.value)}) 

        points.selectAll("dot")
            .data(lcDataset[1].values)
            .enter()
            .append("circle")
            .attr("class", "second-point-set")
            .attr("r", 4)
            .attr("cx", function(d, i) { return xScale(d.category) + xScale.bandwidth()/2})
            .attr("cy", function(d) { return yScale(d.value)}) 

    }, this.createBarChart = function (element, data, dimensions) {
        
        let bcDataset = [[], []],
            width = dimensions.width,
            height =  dimensions.height;
        
        data.forEach(function(item, i){
           bcDataset[0].push(item.value)
           bcDataset[1].push(item.category)
        })     

        let max = d3.max(bcDataset[0]),
            min = d3.min(bcDataset[0]);

        let yScale = d3.scaleLinear()    
            .domain([min, max])
            .range([height - 40, 0])
            .nice(4)

        
        let xScale = d3.scaleBand()
            .domain(bcDataset[1])
            .rangeRound([0, width - 60]);

        
        let barChart = d3.select(element)
            .append("svg")
            .attr("viewbox", "0 0 400 250")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "bar-chart");

        
        barChart.append("g")
            .attr("transform", "translate(40," + (height - 20) + ")")
            .call(d3.axisBottom(xScale)
                .tickSizeOuter(0))
            .attr("class", "bc-xaxis")

    
        barChart.append("g")
            .attr("transform", "translate(45, 20)")
            .call(d3.axisLeft(yScale)
            .tickSizeOuter(0).ticks(4))
            .attr("class", "bc-yaxis")

        barChart.append("g")
            .attr("transform", "translate(45,20)")
            .selectAll()
            .data(bcDataset[0])
            .enter()
            .append("rect")
            .attr("class", "empty-bar")
            .attr("x", function(d, i) {
                return xScale(bcDataset[1][i]);
            })
            .attr("height", height - 40)
            .attr("width", xScale.bandwidth() - 7)

        barChart.append("g")
            .attr("transform", "translate(45,20)")
            .selectAll("bar")
            .data(bcDataset[0])
            .enter()
            .append("rect")
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("x", function(d, i) {
                return xScale(bcDataset[1][i]);
            })
            .attr("height", function(d, i) {
                return (height - 40) - yScale(d);
            })
            .attr("width", xScale.bandwidth() - 7)
            .attr("class", "bar");

    }, this.createDonutChart = function (element, data, dimensions) {

        // set the dimensions of the chart, the radius and the thickness of the donut

        let dcDataset = [[],[]],
            width = dimensions.width,
            height = dimensions.height,
            radius = Math.min(width, height)/1.8,
            thickness = 90;

        data.forEach(function(item, i){
           dcDataset[0].push(item.value)
           dcDataset[1].push(item.category)
        }) 

        dcDataset[0].sort((a, b) => b - a)

        let min = d3.min(dcDataset[1]),
            max = d3.max(dcDataset[1]);

        // create an append donut chart to the element
        let donutChart = d3.select(element)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "donut-chart-container")

        // create a group for the inner arc, used for tool tips
        let group = donutChart.append("g")
            .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")")
            .attr("class", "donut-chart-container-inner")

        let colorArr = ['#003f5c','#2f4b7c','#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600'];

        (dcDataset[0].length == 7) ?  colorArr.splice(4, 1) : (dcDataset[0].length == 6) ?  colorArr.splice(4, 1) && colorArr.splice(6, 1) : null

        // create the color scale for the donut chart
        let color = d3.scaleOrdinal()
            .domain([min, max])
            .range(colorArr); 


        // create the arc
        let arc = d3.arc()
            .outerRadius(radius - 30)
            .innerRadius(radius - thickness)

        // creat the donut function
        let donut = d3.pie()
            .value(function(d) {
                return d; 
            })
            .sort((a, b) => b - a);

        // create and append the donut path
        let donutPath = group.selectAll(".path")
            .data(donut(dcDataset[0]))
            .enter()
            .append("path")
            .attr("class", "path")
            .attr("d", arc)
            .attr("id", function(d,i) { return "path" + i; })
            .attr('fill', function(d) {
                return color(d.data);
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

    }
}).apply(chartLibrary);

        // set line chart example data
    let lineChartContainer = "#lc-fake-data .card-panel";
    let lineChartData = [ {name: "Dataset One", 
                values: [
                {category : "Jan", value: 42},
                {category : "Feb", value: 32},
                {category : "Mar", value: 50},
                {category : "Apr", value: 23},
                {category : "May", value: 43},
                {category : "Jun", value: 48},
                {category : "Jul", value: 52},
                {category : "Aug", value: 13},
                {category : "Sep", value: 20},
                {category : "Oct", value: 73},
                {category : "Nov", value: 36},
                {category : "Dec", value: 21}
            ]
            }, { name: "Dataset Two", 
                values: [
                {category : "Jan", value: 20},
                {category : "Feb", value: 12},
                {category : "Mar", value: 60},
                {category : "Apr", value: 25},
                {category : "May", value: 32},
                {category : "Jun", value: 25},
                {category : "Jul", value: 41},
                {category : "Aug", value: 30},
                {category : "Sep", value: 10},
                {category : "Oct", value: 41},
                {category : "Nov", value: 61},
                {category : "Dec", value: 51}
                ]
            }];
    let lcDimensions = {height: 250, width: 820};

    //set bar chart example data
    let barChartContainer = "#bc-fake-data .card-panel";
    let barChartData =  [ {category: "Cat 1", value: 416},
            {category: "Cat 2", value: 100},
            {category: "Cat 3", value: 101},
            {category: "Cat 4", value: 284},
            {category: "Cat 5", value: 337},
            {category: "Cat 6", value: 678}
        ]
    let bcDimensions = {height: 250, width: 400};

    // donut chart example data
    let donutChartContainer = "#dc-fake-data .card-panel";
    let donutChartData = [ {category: "Data A", value: 14},
            {category: "Data B", value: 8}, 
            {category: "Data C", value: 20}, 
            {category: "Data D", value: 13}, 
            {category: "Data F", value: 18}, 
            {category: "Data G", value: 5}
        ]
    let dcDimensions = {height: 250, width: 400};

    chartLibrary.createLineChart(lineChartContainer, lineChartData, lcDimensions);
    chartLibrary.createBarChart(barChartContainer, barChartData, bcDimensions);
    chartLibrary.createDonutChart(donutChartContainer, donutChartData, dcDimensions);