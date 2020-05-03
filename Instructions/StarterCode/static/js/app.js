function Plots(id) {
    
    //Read samples.json
        d3.json("data/samples.json").then (sampledata =>{
            console.log(sampledata)
            
            var ids = sampledata.samples[0].otu_ids;
            console.log(ids)
            
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log (labels)
        
        // Top 10 otu ids for the plot OTU and reversing it. 
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
         
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            
            var data = [trace];
    
            // Layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 100
                }
            };
    
            
        Plotly.newPlot("bar", data, layout);
            // Bubble chart
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            // Layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 800
            };
    
            // Data variable 
            var data1 = [trace1];
    
        // Bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // Function to get the necessary data
    function getDemoInfo(id) {
    // json file to get data
        d3.json("samples.json").then((data)=> {
    // metadata info for the demographic panel
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter meta data info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var demographicInfo = d3.select("#sample-metadata");
            
           demographicInfo.html("");
    
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // Function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // Function for the initial data rendering
    function init() {
        // Select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // Read the data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to display the data and the plots to the page
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();