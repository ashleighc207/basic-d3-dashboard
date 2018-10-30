/**  
 * aaChartLib.js 
 * Version:             1.0.wip
 * Last edited author:  amoore
 * Last edited issue:   N/A
 * @preserve
 */
var aaChart = {};
(function () {
    "use strict";
    var t = {
        width: 393,
        height: 285
    };
    this.renderLineChart = function (element, data, categories) {
        
        // manipulate the data to make it all arrays
        let dataSet = [data.New, data.Terminated, categories];

        // set dimensions of the line chart
        let width = t.width,
            height = t.height;

        // get the min and max of the data set
        let max = Math.ceil(Math.max(...dataSet[0], ...dataSet[1]) / 10) * 10;
        let min = Math.min(...dataSet[0], ...dataSet[1])

        // set the y-scale
        let yScale = d3.scaleLinear()    
            .domain([min, max])
            .range([height - 40 , 0])

        //set the x-scale
        let xScale = d3.scaleBand()
            .domain(dataSet[2])
            .rangeRound([0, width - 40]);

        // create the 'new' line
        let line = d3.line()
            .x(function(d, i) { 
                return xScale(dataSet[2][i]) + xScale.bandwidth()/2; 
            })
            .y(function(d) { 
                return yScale(d); 
            })

        // create svg container
        let lineChart = d3.select(element)
            .append("svg")
            .attr("viewbox", "0 60 960 600")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "line-chart")

        // create the gridlines
        let gridlines = d3.axisLeft()
            .tickFormat("")
            .ticks(2)
            .tickSize(-(width - 40))
            .scale(yScale);

        // create a group for the gridlines and remove the domain for it
        lineChart.append("g")
            .call(gridlines)
            .classed("gridlines", true)
            .select(".domain").remove();

        // style the gridlines
        lineChart.selectAll(".gridlines .tick line")
            .attr("stroke", "#a8a8a8")
            .attr("stroke-dasharray", "2,2")
            .attr("transform", "translate(20,20)");

        // create a group for the x-axis and append it
        lineChart.append("g")
            .attr("transform", "translate(20, 265)")
            .call(d3.axisBottom(xScale)
            .tickSizeOuter(0))
            .attr("class", "line-chart-x")

        // create a group for the y-axis and append it
        lineChart.append("g")
            .attr("transform", "translate(20, 20)")
            .call(d3.axisLeft(yScale)
            .tickSizeOuter(0).ticks(5))
            .attr("class", "line-chart-y")

        // create a group for the line
        let lineGroup = lineChart.append('g')
            .attr("transform", "translate(20, 20)")
            .attr("class", "linegroup-g")

        // create a group for the points
        let points = lineChart.append('g')
            .attr("transform", "translate(20, 20)")

        // append the first line to the svg group
        lineGroup.append("path")
            .datum(dataSet[0])
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "#7a4183")
            .attr("stroke-width", 2)
            .attr("class", "line-chart-path")

        // append the second line to the svg group
        lineGroup.append("path")
            .datum(dataSet[1])
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "orange")
            .attr("stroke-width", 2)
            .attr("class", "line-chart-path")

        // append the first set of points to the point group
        // add tooltip mouseover function
        points.selectAll("dot")
            .data(dataSet[0])
            .enter()
            .append("circle").classed('dot', true)
            .attr("r", 4)
            .attr("stroke-width", 0)
            .attr("cx", function(d, i) { return xScale(dataSet[2][i]) + xScale.bandwidth()/2})
            .attr("cy", function(d) { return yScale(d)})
            .attr("fill", "rebeccapurple")
            .attr("class", "line-chart-point")  


        // append the second set of points to the point group
        // add tooltip mouseover function
        points.selectAll("dot")
            .data(dataSet[1])
            .enter()
            .append("circle").classed('dot', true)
            .attr("r", 4)
            .attr("stroke-width", 0)
            .attr("cx", function(d, i) { return xScale(dataSet[2][i]) + xScale.bandwidth()/2})
            .attr("cy", function(d) { return yScale(d)})
            .attr("fill", "orange")
            .attr("class", "line-chart-point") 

        // create a group for the tooltip
        let tooltip = d3.select(".line-chart").append("g")
          .attr("class", "tooltip")
          .style("display", "none")

        // append a rectangle to the tooltip to create the box
        tooltip.append("g:rect")
          .attr("width", 100)
          .attr("height", 60)
          .style("stroke", "#d3d3d3")
          .attr("fill", "#fff")

        // append the text to the tooltip
        tooltip.append("g:text")
          .attr("x", 30)
          .attr("y", "1.2em")
          .style("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("font-weight", "bold");
        

        // remove ticks on y axis
        lineChart.selectAll(".line-chart-y .tick line")
            .attr("display", "none")

        // remove ticks on x axis
        lineChart.selectAll(".line-chart-x .tick line")
            .attr("display", "none")

        // remove line on y axis
        lineChart.selectAll(".line-chart-y .domain")
            .attr("display", "none")

        // remove line on x axis
        lineChart.selectAll(".line-chart-x .domain")
            .attr("display", "none")

        //adding tooltip to points
        d3.selectAll(".line-chart-point")
            .on("mousemove", function(d) {
                let x = d3.mouse(this)[0] + 40;
                let y = d3.mouse(this)[1] - 10;
                tooltip.style("display", "inline")
                .attr("transform", "translate(" + x + "," + y + ")");
                tooltip.select("text").text(d);
            })
            .on("mouseout", function() {
                tooltip.style("display", "none");
            });


    }, this.renderBarChart = function (element, data, categories) {

        // manipulate the data to make it all arrays
        let dataSet = [data.Renewals, categories];
        console.log(element,data,categories, 'barchart')

        // set the dimensions of the chart
        let width = t.width,
            height = t.height;

        // get the min and max of the data set
        let max = d3.max(dataSet[0]);
        let min = d3.min(dataSet[0]);

        // set the y-scale
        let yScale = d3.scaleLinear()    
            .domain([min, max])
            .range([height - 40 , 0])

        // set the x-scale
        let xScale = d3.scaleBand()
            .domain(dataSet[1])
            .rangeRound([0, width - 40]);

        // create and append the bar chart to it's element
        let barChart = d3.select(element)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "bar-chart");

        // create a group for the x-axis and append it
        barChart.append("g")
            .attr("transform", "translate(20, 265)")
            .call(d3.axisBottom(xScale)
            .tickSizeOuter(0))
            .attr("class", "bar-chart-x")

        // create a group for the y-axis and append it
        barChart.append("g")
            .attr("transform", "translate(20, 20)")
            .call(d3.axisLeft(yScale)
            .tickSizeOuter(0).ticks(5))
            .attr("class", "bar-chart-y")

        // create group and append the full height bars
        barChart.append("g")
            .attr("transform", "translate(20,20)")
            .selectAll()
            .data(dataSet[0])
            .enter()
            .append("rect")
            .attr("fill", "#e8e8e8")
            .attr("x", function(d, i) {
                return xScale(dataSet[1][i]);
            })
            .attr("height", height - 40)
            .attr("width", xScale.bandwidth() - 5)

        // create a group and append the dataset bars
        barChart.append("g")
            .attr("transform", "translate(20,20)")
            .selectAll("bar")
            .data(dataSet[0])
            .enter()
            .append("rect")
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("x", function(d, i) {
                return xScale(dataSet[1][i]);
            })
            .attr("height", function(d, i) {
                return (height - 40) - yScale(d);
            })
            .attr("width", xScale.bandwidth() - 5)
            .attr("class", "bar");

        // remove ticks on y axis
        barChart.selectAll(".bar-chart-y .tick line")
            .attr("display", "none")

        // remove line on y axis
        barChart.selectAll(".bar-chart-y .domain")
            .attr("display", "none")

        // remove ticks on x axis
        barChart.selectAll(".bar-chart-x .tick line")
            .attr("display", "none")

        // remove line on x axis
        barChart.selectAll(".bar-chart-x .domain")
            .attr("display", "none")

    }, this.renderDonutChart = function (element, data) {

        // set the dimensions of the chart, the radius and the thickness of the donut
        let width = t.width,
            height = t.height,
            radius = Math.min(width, height)/2,
            thickness = 70;

        // assign the data to an array
        let dataSet = [...data];

        // create an append donut chart to the element
        let donutChart = d3.select(element)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "donut-chart-container")

        // create a group for the inner arc, used for tool tips
        let group = donutChart.append("g")
            .attr("transform", "translate(" + (width/3) + "," + (height/2) + ")")
            .attr("class", "donut-chart-container-inner")

        // create the color scale for the donut chart
        let color = d3.scaleOrdinal()
            .domain(Object.keys(dataSet))
            .range(["#7A4183" , "#4E87A0" , "#86C8BC", "#AADDD6"]);  

        // create the arc
        let arc = d3.arc()
            .outerRadius(radius - 30)
            .innerRadius(radius - thickness)

        // creat the donut function
        let donut = d3.pie()
            .value(function(d) { 
                return Object.values(d); 
            })
            .sort(null);

        // create and append the donut path
        let donutPath = group.selectAll(".path")
            .data(donut(dataSet))
            .enter()
            .append("path")
            .attr("class", "path")
            .attr("d", arc)
            .attr("id", function(d,i) { return "path" + i; })
            .attr('fill', function(d) { 
                return color(Object.keys(d.data));
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

    }, this.renderUSmap = function (r, n, e, o) {
        function a(t, r) {
            if (t) throw t;
            d3.tsv("../javascript/us-state-names.tsv", function (t, n) {
                for (var a = 0; a < n.length; a++)
                    if (void 0 !== f.get(n[a].name)) {
                        var i = f.get(n[a].name).value,
                            c = Number(n[a].id);
                        s[c] = i, l[c] = n[a].code
                    } v.append("g").attr("class", "states").selectAll("path").data(topojson.feature(r, r.objects.states).features).enter().append("path").attr("data-value", function (t) {
                    return s[Number(t.id)]
                }).attr("fill", function (t) {
                    return M(s[Number(t.id)] / d)
                }).attr("d", b).attr("id", function (t) {
                    return Number(t.id)
                }).on("mousemove", function (t) {
                    var r = "";
                    r += '    <table class="c3-tooltip">', r += "        <tbody>", r += "            <tr>", r += '                <th colspan="2">' + o + "</th>", r += "            </tr>", r += '            <tr class="c3-tooltip-name--Concentration">', r += '                <td class="name">', r += '                    <span style="background-color:' + M(s[Number(t.id)] / d) + '"></span>' + l[Number(t.id)], r += "                </td>", r += '                <td class="value">' + s[Number(t.id)] + "</td>", r += "            </tr>", r += "        </tbody>", r += "    </table>", $(e).html(r), $(this).attr("fill-opacity", "0.8"), $(e).show();
                    var n = $(".states")[0].getBoundingClientRect().width;
                    if (d3.event.layerX < n / 2) d3.select(e).style("top", d3.event.layerY + 15 + "px").style("left", d3.event.layerX + 15 + "px");
                    else {
                        var a = $(e).width();
                        d3.select(e).style("top", d3.event.layerY + 15 + "px").style("left", d3.event.layerX - a - 30 + "px")
                    }
                }).on("mouseout", function () {
                    $(this).attr("fill-opacity", "1.0"), $(e).hide()
                }).append("title").text(function (t) {
                    return s[Number(t.id)]
                });
                var u = v.append("g").attr("class", "key").attr("transform", "translate(250,660)"),
                    g = 40;
                u.append("text").attr("class", "caption").attr("x", 0).attr("y", 30).attr("fill", "#000").attr("text-anchor", "end").attr("font-size", "28px").attr("width", 30).text("0"), u.selectAll("rect").data([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).enter().append("rect").attr("x", function (t) {
                    return 30 + 40 * t
                }).attr("height", 40).attr("width", 40).attr("fill", function (t) {
                    return M(t)
                }), u.append("text").attr("class", "caption").attr("y", 30).attr("fill", "#000").attr("text-anchor", "start").attr("font-size", "28px").attr("x", function (t) {
                    return 470
                }).text(d3.max(h))
            })
        }
        for (var i = 2 * t.width, c = 2 * t.height, u = ["#D8DBE3", "#C3C8D4", "#B0B6C7", "#A6ADBF", "#9CA4B8", "#8992AA", "#757F9C", "#616D8E", "#4D5B80", "#3A4972"], f = d3.map(n, function (t) {
                return t.name
            }), s = {}, l = {}, h = [], g = 10, d = 0, p = 0; p < n.length; p++) h.push(n[p].value);
        d = Math.round(d3.max(h) / 10);
        var v = d3.select(r).append("svg").attr("viewBox", "0 60 960 600").attr("width", t.width).attr("height", t.height),
            y = i,
            m = c,
            b = d3.geoPath(),
            E = d3.scaleLinear().domain([1, d]).rangeRound([m, .9 * y]),
            M = d3.scaleThreshold().domain(d3.range(2, d)).range(u);
        d3.queue().defer(d3.json, "../javascript/us.json").await(a)
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
}).apply(aaChart);
//# sourceMappingURL=./aaChartLib.js.map


// set line chart example data
let lineChartElement = "#membership-growth";
let lineChartData = {
    New: [4, 2, 0, 3, 3, 4, 52, 3, 0, 3, 3, 1],
    Terminated: [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0]   
};
let lineChartCategories = ["Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"];

//set bar chart example data
let barChartElement = "#membership-renewals";
let barChartData = { 
    Renewals: [4, 1, 7, 4, 5, 12, 2, 2, 0, 2, 3, 1]};
let barChartCategories = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

// donut chart example data
let donutChartElement = "#class-distribution";
let donutChartData = [ {"Regular": 75}, {"Corporate Membership": 27}, {"Common App Corp": 12}, {"Regular First Time Member": 4}, {"Full": 4}, {"Student": 3}, {"Individual": 2}, {"District": 2}, {"Affiliate": 2}, {"Associate": 1}, {"Complimentary Media": 1}, {"Regular Active Age 65+": 1}, {"At-large": 1}]

aaChart.renderLineChart(lineChartElement, lineChartData, lineChartCategories);
aaChart.renderBarChart(barChartElement, barChartData, barChartCategories);
aaChart.renderDonutChart(donutChartElement, donutChartData);

