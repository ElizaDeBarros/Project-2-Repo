function init() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Use the D3 library to read in CleanedData.csv.
    d3.csv("data/Resources/CleanedData.csv").then(function(data) {
 
        let uniqueCountry = [...new Set(data.map(item => item.Country))];

        // add the options to the button
        dropdownMenu.selectAll("option")
            .data(uniqueCountry)
            .enter()
            .append("option")
            .text(a => a)
            .attr('value', a => a);

        // individual USA is the default country on the page
        var FirstCountry = uniqueCountry[0];

        CreatePlots(FirstCountry);
    });
};

// On change to the dropdown menu
d3.selectAll("#selDataset").on("change", getNewData);

// Function called by DOM changes
function getNewData() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var newCountry = dropdownMenu.property("value");
    // Initialize an empty array for the country's data
    CreatePlots(newCountry);
};

//**************************************************************MAIN FUNCTION************************************************************
//***************************************************************************************************************************************
//***************************************************************************************************************************************
//***************************************************************************************************************************************
//  Fuction to create plots per country.
function CreatePlots(country) {  
    d3.csv("data/Resources/CleanedData.csv").then(function(data) {
        var dataCountry = data.map(item => item.Country);

        var countryArray = [];
        // Iterate through the data
        for (var i = 0; i < dataCountry.length; i++) {
            if (dataCountry[i] === country) {
                countryArray.push({
                    year: ++data[i].Year,
                    fatal: data[i].Fatal,
                    time: data[i].Time
                });
            };
        };

        
        //-----------------------------------------------Time Count begin---------------------------------------------------------------------------
        var stringArray =[];
        // Count of time stamps that with format HHhMM
        for (i = 0; i < countryArray.length; i++) {
            var currentTime = countryArray[i].time
            if (currentTime.includes('h') && currentTime.length === 5 ) {
                stringArray.push(currentTime.split("h"));
            };   
        };
       
        var hourVar = [];
        for (i = 0; i < stringArray.length; i++) {
            if ((parseInt(stringArray[i][0])>=0) && (parseInt(stringArray[i][1])>=0)){
                var timeVar = parseInt(stringArray[i][0]) + ((parseInt(stringArray[i][1]))/60);
                hourVar.push(timeVar)
            };
        };
        
        var countMorning = 0;
        var countAfternoon = 0;
        var countDusk = 0;
        var countNight = 0;

        for (i = 0; i < hourVar.length; i++) {
            if (hourVar[i] >= 5 && hourVar[i] <= 12) {
                countMorning +=1
            }
            else if (hourVar[i] > 12 && hourVar[i] <= 17) {
                countAfternoon +=1
            }

            else if (hourVar[i] > 17 && hourVar[i] <=19) {
                countDusk +=1
            }

            else  {
                countNight +=1
            }
        };

        // Count of time stamps that with format HHhMM+space
        var stringArray =[];
        for (i = 0; i < countryArray.length; i++) {
            var currentTime = countryArray[i].time
            if (currentTime.includes('h') && currentTime.length === 6 ) {
                stringArray.push(currentTime.split("h"));
            };   
        };
       
        var hourVar = [];
        for (i = 0; i < stringArray.length; i++) {
            if ((parseInt(stringArray[i][0])>=0) && (parseInt(stringArray[i][1])>=0)){
                var timeVar = parseInt(stringArray[i][0]) + ((parseInt(stringArray[i][1]))/60);
                hourVar.push(timeVar)
            };
        };

        for (i = 0; i < hourVar.length; i++) {
            if (hourVar[i] >= 5 && hourVar[i] <= 12) {
                countMorning +=1
            }
            else if (hourVar[i] > 12 && hourVar[i] <= 17) {
                countAfternoon +=1
            }

            else if (hourVar[i] > 17 && hourVar[i] <=19) {
                countDusk +=1
            }

            else  {
                countNight +=1
            }
        };

        // Count of time stamps that with specific characters
        var stringArray =[];
        for (i = 0; i < countryArray.length; i++) {
             var currentTime = countryArray[i].time
             if (currentTime.includes('Morning') || currentTime.includes('morning') || currentTime.includes('AM') || currentTime.includes('Â  ') || currentTime.includes('A.M.') || currentTime.includes('Dawn') || currentTime.includes('>') || currentTime.includes('<') || currentTime.includes('Mid morning') || currentTime.includes('Late morning') || currentTime.includes('Just before noon') || currentTime.includes('Early morning')) {
                countMorning +=1;
             }
             else if (currentTime.includes('Sunset') || currentTime.includes('after noon') || currentTime.includes('Afternoon') ||currentTime.includes('Midday') || currentTime.includes('P.M.') || currentTime.includes('Lunchtime') || currentTime.includes('Early afternoon')) {
                countAfternoon +=1;
             }
             else if (currentTime.includes('"Evening"') || currentTime.includes('Dusk') || currentTime.includes('sundown') || currentTime.includes('Nightfall') || currentTime.includes('Late afternoon') || currentTime.includes('Just before sundown')) {
                countDusk +=1;
             }

             else if (currentTime.includes('"Night"') || currentTime.includes('8:04 PM') || currentTime.includes('Night') || currentTime.includes('Midnight') || currentTime.includes('After Dusk')) {
                countNight +=1;
             }; 

         };
        
         // Count of time stamps that with format HHhMM+various charachters
        var stringArray =[];
        for (i = 0; i < countryArray.length; i++) {
            var currentTime = countryArray[i].time
            if (currentTime.includes('h') && !currentTime.includes('>') && !currentTime.includes('<') && currentTime.length > 6 ) {
                splitVar = currentTime.split('h', 2);
                stringArray.push(splitVar);
            };   
        };
       
        var hourVar = [];
        for (i = 0; i < stringArray.length; i++) {
            if ((parseInt(stringArray[i][0])>=0) && (parseInt(stringArray[i][1])>=0)){
                var timeVar = parseInt(stringArray[i][0]) + ((parseInt(stringArray[i][1]))/60);
                hourVar.push(timeVar)
            };
        };

        for (i = 0; i < hourVar.length; i++) {
            if (hourVar[i] >= 5 && hourVar[i] <= 12) {
                countMorning +=1
            }
            else if (hourVar[i] > 12 && hourVar[i] <= 17) {
                countAfternoon +=1
            }

            else if (hourVar[i] > 17 && hourVar[i] <=19) {
                countDusk +=1
            }

            else  {
                countNight +=1
            }
        };

        // Count of time stamps that with format HHMM
        var stringArray =[];
        for (i = 0; i < countryArray.length; i++) {
            currentTime = countryArray[i].time
            var isNumber = /^\d+$/.test(currentTime);
            if (isNumber) {                
                stringArray.push((parseInt(currentTime)/100));
            };   
        };
        
        var hourVar = [];
        for (i = 0; i < stringArray.length; i++) {
                timeVar = Math.floor(stringArray[i]) + ((stringArray[i] - Math.floor(stringArray[i]))/60) ;
                hourVar.push(timeVar)
        };
        
        for (i = 0; i < hourVar.length; i++) {
            if (hourVar[i] >= 5 && hourVar[i] <= 12) {
                countMorning +=1
            }
            else if (hourVar[i] > 12 && hourVar[i] <= 17) {
                countAfternoon +=1
            }

            else if (hourVar[i] > 17 && hourVar[i] <=19) {
                countDusk +=1
            }

            else  {
                countNight +=1
            }
        };

        //-----------------------------------------------Time Count end---------------------------------------------------------------------------
        
        var theYearfatalYes = {}
        var theYearfatalNo = {}
        // Calculates the number of attacks per year for the selected country
        var yearCount ={};
            for (var i = 0; i < countryArray.length; i++) {
                var theYear = countryArray[i].year -1;
                if (theYear in yearCount) {
                    yearCount[theYear] += 1;
                    if (countryArray[i].Fatal === "Y") {
                        theYearfatalYes[theYear] += 1; 
                    }
                    else {
                        theYearfatalNo[theYear] += 1;
                    }
                }
                else{
                    yearCount[theYear] = 1;
                    if (countryArray[i].Fatal === "Y") {
                        theYearfatalYes[theYear] = 1;
                        theYearfatalNo[theYear] = 0; 
                    }
                    else {
                        theYearfatalYes[theYear] = 0;
                        theYearfatalNo[theYear] = 1;
                    }
                }
            };
            console.log( yearCount);
            
        // Creates a bar chart         
        var year = [];
        var attacks = []
        Object.entries(yearCount).forEach(([key,value]) => {
            year.push(key);
            attacks.push(value); 
        }); 
                    
        var barTrace = {
            x: year,
            y: attacks,
            type: "bar",
        };

        var dataBar = [barTrace];
        var layoutBar = {
            title: `<span span style='font-weight: bold;'><b>Shark Attacks per Year - ${country} <b></span>`,
            xaxis: {autorange: true, 
                    title: 'Year',
                    tickfont: {
                        size: 14,
                        color: 'rgb(107, 107, 107)'
                        }     
                    },
            yaxis: {autorange: true,
                    title: 'Number of Attacks',
                        tickfont: {
                            size: 14,
                            color: 'rgb(107, 107, 107)'
                        }     
                    },
            paper_bgcolor:'rgba(255,255,255,0.5)',
            plot_bgcolor:'rgba(255,255,255,0.4)',
            maker: {color: 'rgb(135, 190, 98, 1.0)'},
            bargap: 0.2
            
        };
            Plotly.newPlot("bar-chart", dataBar, layoutBar);
            // });
                
        // Create a donut chart that displays percentage of attack by time of the day
        var dataPie = [{
            values: [countMorning, countAfternoon, countDusk, countNight],
            labels: ['Morning', 'Afternoon', 'Dusk', "Night",],
            hoverinfo: 'label+percent',
            hole: .4,
            type: 'pie'
        }];
                  
        var layoutPie = {
           
            title: `<span span style='font-weight: bold;'><b>Shark Attacks - Time of the Day<b></span>`,
            
            annotations: [
                {
                    font: {
                        size: 20
                    },
                    showarrow: false,
                    text: "TIME",
                },
            ],        
            showlegend: false,
            paper_bgcolor:'rgba(255,255,255,0.5)',
            plot_bgcolor:'rgba(255,255,255,0.4)',
        };    
        Plotly.newPlot('pie-chart', dataPie, layoutPie);

         // Create a gauge chart that displays total number of attacks in a country
        var dataGauge = [
            {
                domain: { x: [0, 2000], y: [0, 2000] },
                value: countryArray.length,
                title: {text: `<span style='font-weight: bold;'><b>Total Shark Attacks<b></span><br><span style='font-weight: normal;'>1980-2018`},
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: {range: [null, 2000]},
                    bar: { color: "orange" },
                    steps: [
                        {range: [0,250], color: '#FFABAB'},
                        {range: [250,500], color: '#FF7D7D'},
                        {range: [500,750], color: '#FF6D6D'},
                        {range: [750,1000], color: '#FF2D2D'},
                        {range: [1000,1250], color: '#FF0909'},
                        {range: [1250,1500], color: '#EA0000'},
                        {range: [1500,1750], color: '#C80000'},
                        {range: [1750,2000], color: '#A40000'},
                    ],
                    threshold: {
                        line: { color: "purple", width: 6 },
                        thickness: 0.75,
                        value: countryArray.length
                    },
                },
            }
        ];
        var layoutGauge = { 
            margin: { t: 0, b: 0 },
            paper_bgcolor:'rgba(255,255,255,0.5)',
            plot_bgcolor:'rgba(255,255,255,0.4)',
        };
        Plotly.newPlot('gauge', dataGauge, layoutGauge);


    });
};
       




        

init();