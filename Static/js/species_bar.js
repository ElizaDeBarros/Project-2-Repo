d3.csv("data/Resources/CleanedData.csv").then(function(attackdata) {
    //create an array of only the countries 
    var arr = attackdata.map(item => item.Species)
    console.log(arr)
});
   