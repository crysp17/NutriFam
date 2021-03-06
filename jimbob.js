$(function generateDailyPi() {
    var famday = { Jimbob:[{label: 'Fat', value: 34.7},{label: 'Protein', value: 14.9},{label: 'Carbs', value: 50.4}], }
    var width = 280;
    var height = 280;
    var radius = Math.min(width,height)/2;
    var colors = ['CornflowerBlue','Salmon','#b4f49f'];
    var fam = Object.keys(famday);
    for (var i = 0; i < fam.length; i++){
        var svg = d3.select('#'+fam[i]+'pie')
            .append('svg')
            .data([famday[fam[i]]])
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate('+(width/2)+','+(height/2)+')')
        var arc = d3.svg.arc().outerRadius(radius);
        var pie = d3.layout.pie().value(function(d){return d.value;}).sort(null);
        var arcs = svg.selectAll("g.slice") 
          .data(pie)
          .enter()
          .append("svg:g")
          .attr("class", "slice");

        arcs.append("svg:path")
          .attr("fill", function(d, i) { return colors[i]; } )
          .attr("d", arc);

        // Add a legendLabel to each arc slice
        arcs.append("svg:text")
          .attr("transform", function(d) { 
            d.outerRadius = radius;
            d.innerRadius = radius/3;
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .style("font-size", "18px")
          .text(function(d, ind) { return famday[fam[i]][ind].label; });
    }
})

$(function generateWeeklyPi() {
    var famday = { JimbobWeek:[{label: 'Fat', value: 40.2},{label: 'Protein', value: 10.8},{label: 'Carbs', value: 49.0}], }
    var width = 280;
    var height = 280;
    var radius = Math.min(width,height)/2;
    var colors = ['CornflowerBlue','Salmon','#b4f49f'];
    var fam = Object.keys(famday);
    for (var i = 0; i < fam.length; i++){
        var svg = d3.select('#'+fam[i]+'pie')
            .append('svg')
            .data([famday[fam[i]]])
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate('+(width/2)+','+(height/2)+')')
        var arc = d3.svg.arc().outerRadius(radius);
        var pie = d3.layout.pie().value(function(d){return d.value;}).sort(null);
        var arcs = svg.selectAll("g.slice") 
          .data(pie)
          .enter()
          .append("svg:g")
          .attr("class", "slice");

        arcs.append("svg:path")
          .attr("fill", function(d, i) { return colors[i]; } )
          .attr("d", arc);

        // Add a legendLabel to each arc slice
        arcs.append("svg:text")
          .attr("transform", function(d) { 
            d.outerRadius = radius;
            d.innerRadius = radius/3;
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .style("font-size", "18px")
          .text(function(d, ind) { return famday[fam[i]][ind].label; });
    }
})

$(function generateMonthlyPi() {
    var famday = { JimbobMonth:[{label: 'Fat', value: 32.3},{label: 'Protein', value: 9.6},{label: 'Carbs', value: 58.1}], }
    var width = 280;
    var height = 280;
    var radius = Math.min(width,height)/2;
    var colors = ['CornflowerBlue','Salmon','#b4f49f'];
    var fam = Object.keys(famday);
    for (var i = 0; i < fam.length; i++){
        var svg = d3.select('#'+fam[i]+'pie')
            .append('svg')
            .data([famday[fam[i]]])
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate('+(width/2)+','+(height/2)+')')
        var arc = d3.svg.arc().outerRadius(radius);
        var pie = d3.layout.pie().value(function(d){return d.value;}).sort(null);
        var arcs = svg.selectAll("g.slice") 
          .data(pie)
          .enter()
          .append("svg:g")
          .attr("class", "slice");

        arcs.append("svg:path")
          .attr("fill", function(d, i) { return colors[i]; } )
          .attr("d", arc);

        // Add a legendLabel to each arc slice
        arcs.append("svg:text")
          .attr("transform", function(d) { 
            d.outerRadius = radius;
            d.innerRadius = radius/3;
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .style("font-size", "18px")
          .text(function(d, ind) { return famday[fam[i]][ind].label; });
    }
})