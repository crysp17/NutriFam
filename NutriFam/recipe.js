$(function() {
    console.log(localStorage['recipe'])
    var data = [25*9, 52*4, 32*4];
    var colors = ['CornflowerBlue', '#b4f49f', 'Salmon'];
    var width = 200;
    var svg = d3.select('#cal-pie')
        .append('svg')
        .attr('width', width)
        .attr('height', width)
        .append('g')
        .attr('transform', 'translate('+(width/2)+','+(width/2)+')')
    var arc = d3.svg.arc().outerRadius(width/2);
    var pie = d3.layout.pie().value(function(d){return d;}).sort(null);
    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i){return colors[i];});
})