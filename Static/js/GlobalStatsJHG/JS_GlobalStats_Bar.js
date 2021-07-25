// Bar Chart Code

d3.csv("CleanedData.csv").then(function(data) {
    let uniqueCountry = [...new Set(data.map(item => item.Country))];

    totalAttacks = [];

    // Iterate through the data to count how many shark attacks each row in the 
    //CSV is 1 attack
   for (var i = 0; i < uniqueCountry.length; i++) {
    var attacks = 0
        if (data.Country === uniqueCountry[i]) {
            attacks += i
            };
        totalAttacks.push(attacks)
    };
   console.log(totalAttacks);
   console.log(uniqueCountry);
});


// Pie Chart Code

//use d3 to calculate the totals for the pie chart 

d3.csv("CleanedData.csv").then(function(data) {
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
                data: [percentM, percentF, percentU],
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
                text: 'Shark Attacks by Gender'
               
            },
            responsive: true,
            maintainAspectRatio: true,
        }
    });
});
   






// var ctx = document.getElementById('chart');
