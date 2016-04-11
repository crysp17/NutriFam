$(function() {
    var famday = {Joanne:[{label: 'Fat', value: 395},{label: 'Protein', value:376},{lavel: 'Carbs', value:681}],
        Jimbob:[{label: 'Fat', value: 530},{label: 'Protein', value: 300},{lavel: 'Carbs', value: 920}],
        Matthew:[{label: 'Fat', value: 507},{label: 'Protein', value: 320},{lavel: 'Carbs', value: 1052}],
        Mark:[{label: 'Fat', value: 525},{label: 'Protein', value: 285},{lavel: 'Carbs', value: 933}],}
    var width = 300;
    var height = 300;
    var radius = Math.min(width,height)/2;
    var color = d3.scale.category10();
    var colors = ['LemonChiffon','Salmon','LightGreen'];
    var fam = Object.keys(famday);
    for (var i = 0; i < fam.length; i++){
        var svg = d3.select('#'+fam[i]+'pie')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate('+(width/2)+','+(height/2)+')')
        var arc = d3.svg.arc().outerRadius(radius);
        var pie = d3.layout.pie().value(function(d){return d.value;}).sort(null);
        var path = svg.selectAll('path')
            .data(pie(famday[fam[i]]))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i){return colors[i];});
    }
})