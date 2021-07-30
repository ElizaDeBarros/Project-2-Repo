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
    var width = 400;
    var height = 400;
    var margin = 30
    
    var radius = (Math.min(width, height) / 2 ) - margin

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
     .attr('width', '100%')
     .attr('height', '100%')
     .attr('viewBox','0 0 ' + height + ' ' + width)
      .attr('preserveAspectRatio', 'xMinYMin')
     .attr("class", "graph-svg-component")
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
        var width = 400;
        var height = 400;
        var radius = (Math.min(width, height) / 2 ) - margin;
        
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


   // Bar Chart Code

d3.csv("data/Resources/CleanedData.csv").then(function(attackdata) {
    //create an array of only the countries 
    var arr = attackdata.map(item => item.Country)
    //console.log(arr)
    //loop through country array to count how many attacks
    const countUnique = arr => {
        const counts = {};
        for (var i = 0; i < arr.length; i++) {
           counts[arr[i]] = 1 + (counts[arr[i]] || 0);
        };
        return counts;
     };
    //  console.log(countUnique(arr));

     //narrow country list to those with 10+ attacks
     var countryList = countUnique(arr);
     //  console.log(countryList)

     const countryArr = Object.entries(countryList);
     //  console.log(countryArr)

     const atLeast10 = countryArr.filter(([key,value])=>value>=10);

    //  const topCountries = Object.fromEntries(atLeast10);
       console.log(atLeast10)
    //  console.log(topCountries)

     topCountries = []
     

     for (var i = 0; i < atLeast10.length; i++) {
        
        topCountries.push({
            y: atLeast10[i][1],    
            label: atLeast10[i][0]
            
            
        });
        
    };
    console.log(topCountries)

    var chartLables = ['USA', 'BRAZIL', "AUSTRALIA", "SOUTH AFRICA", "BAHAMAS", "NEW CALEDONIA", "NEW ZEALAND", "MEXICO", "EGYPT", "FIJI"]
    var chartData = [1075, 39, 331, 183, 38, 21, 21, 14, 12, 10]

    const data = {
            labels: chartLables,
            datasets: [{
                // label: 'Total Shark Attacks',
                data: chartData,
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(255, 159, 64)',
                    'rgba(255, 205, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(54, 162, 235)',
                    'rgba(153, 102, 255)',
                    'rgba(201, 203, 207',
                    'rgba(0,0,158)',
                    'rgba(255,168,212)',
                    'rgba(92,255,92)',
                    'rgba(255,31,31)'
                    ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(0,0,158)',
                    'rgb(255,168,212)',
                    'rgb(92,255,92)',
                    'rgb(255,31,31)'
                    ],
                borderWidth: 1
            }]
        };
    Chart.plugins.register({
        beforeDraw: function(chartInstance, easing) {
          var ctx = chartInstance.chart.ctx;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // your color here
      
          var chartArea = chartInstance.chartArea;
          ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        }
      });
    
    var ctx = document.getElementById('BarChart');
    ctx.height = 160;
    

    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options:{
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 14,
                        beginAtZero: true
                    },
                    maintainAspectRatio: false
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 14,
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
          }
    });
});

    

// Pie Chart Code

//use d3 to calculate the totals for the pie chart 

d3.csv("data/Resources/CleanedData.csv").then(function(data) {
    maleArray = [];
    femaleArray = [];
    total = data.length;

    //count the number of attacks on men
    for (i = 0; i < data.length; i++) {
        var currentGender = data[i].Sex
        if (currentGender.includes('M')) {
            maleArray.push(currentGender);
        };   
    };
    maleCount = maleArray.length
    console.log(maleArray)

    //count the number of attacks on women
    for (i = 0; i < data.length; i++) {
        var currentGender = data[i].Sex
        if (currentGender.includes('F')) {
            femaleArray.push(currentGender);
        };   
    };
    femaleCount = femaleArray.length

    var noSexListed = total - maleCount - femaleCount
    
    //calculate the percentages
    var percentM = maleCount/total *100;
    var percentF = femaleCount/total *100;
    var percentU = noSexListed/total *100;

    //Pie Chart using chart.js
    var ctx = document.getElementById('PieChart');
    ctx.height = 70;
    ctx.width = 100;

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Male", "Female", "Unknown"],
            datasets: [
            {
                data: [percentM.toFixed(2), percentF.toFixed(2), percentU.toFixed(2)],
                backgroundColor: [
                "#5dede5",
                "#000080",
                "#5c5cff"
                ],
            }]
        },
        options: {
            layout: {
                padding: {
                    top: 20

                }
            },
            cutoutPercentage: 40, //Here for innerRadius. It's already exists
            outerRadius: 70,//Here for outerRadius
            // title: {
            //     display: true,
            //     text: 'Shark Attacks by Gender',
            //     fontSize: 20,
            //     color: 'rgb(255, 255, 255)'
            // },
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 18
                },
                position: 'bottom',
               },
            responsive: true,
        }
    });
});
   