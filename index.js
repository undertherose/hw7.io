
var width = 700;
var height = 580;

console.log('aaaa');

var svgContainer = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var neighborhoods = svgContainer.append('g');
var points = svgContainer.append('g');

d3.json("neighborhoods.json")
    .then((neighborhoods_json) => 
    {var albersProjection = d3.geoAlbers()
        .scale(190000)
        .rotate([71.057, 0])
        .center([0, 42.313])
        .translate([width/2, height/2]);

    geoPath = d3.geoPath()
        .projection(albersProjection);

    neighborhoods.selectAll('path')
        .data(neighborhoods_json.features)
        .enter()
        .append('path')
        .attr('fill', '#ccc')
        .attr('d', geoPath);
    
    d3.json("points.json")
        .then((points_json) => 
        {points.selectAll('path')
            .data(points_json.features)
            .enter()
            .append('path')
            .attr('fill', '#900')
            .attr('stroke', '#999')
            .attr('d', geoPath);
        
        var spots = points_json.features;
        var geojson =[]
        for (var i = 0; i < spots.length - 1; i++) {
                const x = albersProjection(spots[i].geometry.coordinates);
                const y = albersProjection(spots[i + 1].geometry.coordinates);
                geojson.push([[x[0],x[1]], [y[0],y[1]]]);
            }

        console.log('a',geojson);
        

    // Start Animation on Click
        d3.select("body").on("click", function() {
            console.log("adf")
            var path = points.selectAll("line")
                .data(geojson)
                .enter()
                .append("line")
                .attr("x1",d => d[0][0])
                .attr("y1",d => d[0][1])
                .attr("x2",d => d[1][0])
                .attr("y2",d => d[1][1])
                .attr('stroke', '#999')
                .style("stroke-width",2)
                .attr("id", function(d,e) {return "l" + e})

                //.attr()
                   
                //.each((function(d,e){
                //    let length = d.node().getTotalLength()

            // Variable to Hold Total Length
            // var totalLength = path.node().getTotalLength();
            
            path
                .each(function(d,e) {
                    var totalLength = d3.select("#l" + e).node().getTotalLength();
                    d3.select("#l" + e)
                        .attr("stroke-dasharray", totalLength + " " + totalLength)
                        .attr("stroke-dashoffset", totalLength)
                        .transition()
                        .duration(500)
                        .delay(500*e)
                        .ease(d3.easeLinear)
                        .attr("stroke-dashoffset", 0) 
                })
/*                 .attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .duration(4000)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0) */ 
                //.on("end", repeat);

            // Set Properties of Dash Array and Dash Offset and initiate Transition
/*             path.transition()
                .duration(7500)
                .attr("stroke-dasharray", lines)
                .each("end", function() {
                    d3.select(this).call(transition);// infinite loop
                    //ptFeatures.style("opacity", 0)
                })
                .ease(d3.easeLinear) // Set Easing option
                .attr("stroke-dashoffset", 0)
                .delay(220000)

                function lines() {

                    return function(t) {

                        var l = path.node().getTotalLength(); 
                        interpolate = d3.interpolateString("0," + l, l + "," + l); 

                        //var p = path.node().getPointAtLength(t * l);
                        return interpolate(t);
                    }
                } */
                
                //.attr("stroke-dasharray", totalLength + " " + totalLength)
                //.attr("stroke-dashoffset", totalLength)
                //.transition() // Call Transition Method
                //.duration(500) // Set Duration timing (ms)
                //.delay(220)
                //.ease(d3.easeLinear) // Set Easing option
                //.attr("stroke-dashoffset", 0);} // Set final value of dash-offset for transition


    //)
})})});
