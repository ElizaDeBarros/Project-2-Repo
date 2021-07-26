// Retrieve data with D3
d3.csv("data/Resources/CleanedData.csv").then(function(cleanData) {
    
    var dataArray = [];
    // Iterate through the data
    for (var i = 0; i < cleanData.length; i++) {
        dataArray.push({
            year: ++cleanData[i].Year,
            fatal: cleanData[i].Fatal,
            time: cleanData[i].Time,
            type: cleanData[i].Type
            });
        };


    // Creates a list yes of Types and a list no of Types
    var yesList = [];
    var noList = [];
    for (var i = 0; i < dataArray.length; i++) {
        if(dataArray[i].fatal === 'Y' && dataArray[i].type !=="" && dataArray[i].type !=="Invalid") {
            yesList.push(dataArray[i].type)
        }
        else if (dataArray[i].fatal === 'N' && dataArray[i].type !=="" && dataArray[i].type !=="Invalid") {
            noList.push(dataArray[i].type)
        }
    };
        
    var typeYes = {}; 
    for (var i = 0; i < yesList.length; i++) {
        theType = yesList[i];
        if (yesList[i] in typeYes) {
            typeYes[theType] +=1
        }
        else {
            typeYes[theType] =1
        }
    };

    var typeNo = {}; 
    for (var i = 0; i < noList.length; i++) {
        theType = noList[i];
        if (noList[i] in typeNo) {
            typeNo[theType] +=1
        }
        else {
            typeNo[theType] =1
        }
    };

    if (Object.keys(typeNo).length > Object.keys(typeYes).length) {
        colorDomain = Object.keys(typeNo)
    } else {
        colorDomain = Object.keys(typeYes)
    };
   //****************************************CHART SECTION********************************************************************************************************** */   

    // set the dimensions and margins of the graph
    var width = 400
    height = 400
    margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div 
    var svg = d3.select("#dynamicPie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // create 2 data_set
    var dataYes = typeYes
    var dataNo = typeNo

    // set the color scale
    var color = d3.scaleOrdinal()
    .domain(colorDomain)
    .range(d3.schemeDark2);

    // A function that create / update the plot for a given variable:
    function update(data) {

        // Compute the position of each group on the pie:
        var pie = d3.pie()
        .value(function(d) {return d.value; })
        .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
        var data_ready = pie(d3.entries(data))

        // map to data
        var u = svg.selectAll("path")
        .data(data_ready)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        u
        .enter()
        .append('path')
        .merge(u)
        .transition()
        .duration(1000)
        .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
        )
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)
    }

    // Initialize the plot the non fatal dataset
    update(dataNo)
});



 



    
