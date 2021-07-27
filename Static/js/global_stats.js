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
    var bothList = yesList.concat(noList);

    var typeBoth = {};
    for (var i = 0; i < bothList.length; i++) {
        theType = bothList[i];
        if (bothList[i] in typeBoth) {
            typeBoth[theType] +=1
        }
        else {
            typeBoth[theType] =1
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

   //****************************************CHART SECTION********************************************************************************************************** */   

    // set the dimensions and margins of the graph
    var width = 360;
    var height = 360;
    
    var radius = Math.min(width, height) / 2 

    var color = d3.scaleOrdinal(d3.schemePastel1);
    // create 3 datasets
    var dataYes = Object.keys(typeYes).map(function(d) {
        return {type: d, quantity:typeYes[d]};
    });
    var dataNo = Object.keys(typeNo).map(function(d) {
        return {type: d, quantity:typeNo[d]};
    });  
    var dataBoth = Object.keys(typeBoth).map(function(d) {
        return {type: d, quantity:typeBoth[d]};
    });
    console.log(dataYes);
    // making the chart

    var svg = d3.select('#dynamicPie')
     .append('svg')
     .attr('width', width)
     .attr('height', height)
     .append('g')
     .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

     var arc = d3.arc()
     .innerRadius(radius - 75)
     .outerRadius(radius);

     var pie = d3.pie()
     .value(function (d) {
          return d.quantity;
     })
     .sort(null);
     
     var path = svg.selectAll('path')
     .data(pie(dataBoth))
     .enter()
     .append('path')
     .attr('d', arc)
     .attr('fill', function (d, i) {
          return color(d.data.type);
     })
     .attr('transform', 'translate(0, 0)');

     // adding a legend

    var legendRectSize = 12;
    var legendSpacing = 9;
    var legend = svg.selectAll('.legend') //the legend and placement
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'circle-legend')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = height * color.domain().length / 2;
        var horz = -2 * legendRectSize - 13;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });
    legend.append('circle') 
    .style('fill', color)
    .style('stroke', color)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', '.5rem');
    legend.append('text') 
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {
        return d;
    });

    d3.select("button#both")
     .on("click", function () {
          change(dataBoth);
    })
    d3.select("button#fatal")
     .on("click", function () {
          change(dataYes);
    })
    d3.select("button#nonFatal")
     .on("click", function () {
          change(dataNo)
    })

    function change(data) {
        var pie = d3.pie()
        .value(function (d) {
            return d.quantity;
       }).sort(null)(data);
        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        
        path = d3.select("#dynamicPie")
             .selectAll("path")
             .data(pie); // Compute the new angles
        var arc = d3.arc()
             .innerRadius(radius -75)
             .outerRadius(radius);
        path.transition().duration(500).attr("d", arc); // redrawing the path with a smooth transition
        console.log(arc);
   }
   });
