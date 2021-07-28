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
          label: 'Total Shark Attacks',
          data: chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.4)',
            'rgba(255, 159, 64, 0.4)',
            'rgba(255, 205, 86, 0.4)',
            'rgba(75, 192, 192, 0.4)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(153, 102, 255, 0.4)',
            'rgba(201, 203, 207, 0.4',
            'rgba(0,0,158, 0.4)',
            'rgba(255,168,212, 0.4)',
            'rgba(92,255,92,0.4)',
            'rgba(255,31,31,0.4)'
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
          ctx.fillStyle = 'rgba(224,224,224,0.5)'; // your color here
      
          var chartArea = chartInstance.chartArea;
          ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        }
      });
    
    var ctx = document.getElementById('BarChart');
    ctx.height = 200;

    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options:{
            scales: {
              y: {
                beginAtZero: true
              },
              maintainAspectRatio: false
            }
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
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Shark Attacks by Gender',
                fontSize: 20,
                color: 'rgb(107, 107, 107)'
            },
            legend:{
                font: 50,
               },
            responsive: true,
            
        }
    });
});
   






