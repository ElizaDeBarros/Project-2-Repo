d3.csv('\CleanedData.csv').then( function(sharkdata){
    //console.log(sharkdata);

    
    d3.select("tbody")
    .selectAll("tr")
    .data(sharkdata)
    .enter()
    .append("tr")
    .html(function(d) {
        return `<td>${d.Year}</td><td>${d.Date}</td><td>${d.Time}</td><td>${d.Country}</td><td>${d.Type}</td><td>${d.Activity}</td><td>${d.Fatal}</td><td>${d.Species}</td>`;
    });

    


    // Select the button
    var button = d3.select("#filter-btn");
    var resetbtn = d3.select("#reset-btn");
    var form = d3.select("form");
    var tbody = d3.select("tbody");


    // Complete the event handler function for the form
    button.on("click", () => { 

        // Prevent the page from refreshing
        d3.event.preventDefault();
        // Select the input element and get the raw HTML node
        var inputElement = d3.select('#country');
        // Get the value property of the input element
        var inputValue = inputElement.property('value');
        var filteredData = sharkdata.filter(country => country.Country === inputValue);
        // console.log(inputValue);
        // console.log(filteredData);

        tbody.html("")

        filteredData.forEach(attack => {
        
            //Use d3 to append one table row `tr` for each ufo report object
                var row =  tbody.append('tr');
            
            //Use `Object.entries` to console.log each ufo report value
                Object.entries(attack).forEach(function([key, value]){
                    console.log(key, value);
                    //Use d3 to append 1 cell per ufo report value
                    var cell = row.append('td');
            
                    cell.text(value);
                });
            
            });

    })

    resetbtn.on("click", () => {
        tbody.html("");
        populate(sharkdata)
        //console.log("Table reset")
    });

});
