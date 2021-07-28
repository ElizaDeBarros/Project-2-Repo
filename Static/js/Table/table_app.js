d3.csv('\CleanedData.csv').then( function(sharkdata){
    //console.log(sharkdata);

    
    d3.select("tbody")
    .selectAll("tr")
    .data(sharkdata)
    .enter()
    .append("tr")
    .html(function(d) {
        return `<td>${d.Year}</td><td>${d.Date}</td><td>${d.Country}</td><td>${d.Type}</td><td>${d.Activity}</td><td>${d.Fatal}</td><td>${d.Species}</td>`;
    });

    var data = sharkdata;

    var tbody = d3.select("tbody");
    var button = d3.select("#filter-btn");
    var inputField1 = d3.select("#datetime");
    var inputField2 = d3.select("#city");
    var inputField3 = d3.select("#species");
    var inputField4 = d3.select("#activity");
    var inputField5 = d3.select("#fatal");
    var resetbtn = d3.select("#reset-btn");
    var columns = ["Year", "Date", "Country", "Type", "Activity", "Fatal","Species"]

    var populate = (dataInput) => {

        dataInput.forEach(sharkAttack => {
            var row = tbody.append("tr");
            columns.forEach(column => row.append("td").text(sharkAttack[column])
            )
        });
    }
    // Filter by attribute
button.on("click", () => {
	d3.event.preventDefault();
	var inputDate = inputField1.property("value").trim();
	var inputCity = inputField2.property("value").toUpperCase().trim();
    // var inputSpecies = inputField3.property("value").trim();
    // var inputActivity = inputField4.property("value").trim();
    // var inputFatal = inputField5.property("value").trim();

    
	// Filter by field matching input value
	var filterDate = data.filter(data => data.Year === inputDate);
	// console.log(filterDate)
	var filterCity = data.filter(data => data.Country === inputCity);
	// console.log(filterCity)
    // var filterSpecies = data.filter(data => data.Species === inputSpecies);
    // var filterActivity = data.filter(data => data.Activity === inputActivity);
    // var filterFatal = data.filter(data => data.Fatal === inputFatal);
	var filterData = data.filter(data => data.Year === inputDate && data.Country === inputCity);
	console.log(filterData)

	// Add filtered sighting to table
	tbody.html("");

	let response = {
		filterData, filterCity, filterDate
	}

	if (response.filterData.length !== 0) {
		populate(filterData);
	}
		else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
			populate(filterCity) || populate(filterDate);
	
		}
		else {
			tbody.append("tr").append("td").text("No results found!"); 
		}
})

resetbtn.on("click", () => {
	tbody.html("");
	populate(data)
	console.log("Table reset")
})
});
