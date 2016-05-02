$(function() {
    var famday = { Jimbob:[{label: 'Fat', value: 30.7},{label: 'Protein', value: 14.9},{label: 'Carbs', value: 50.1}], }
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
          .style("font-size", "14px")
          .text(function(d, ind) { return famday[fam[i]][ind].label; });
    }
   
    document.getElementById("day-title").innerHTML = '<h1 style="margin:auto;font-weight:bold">' + sessionStorage.editClickedInfo + '</h1>';

    var foodForThisMeal = jQuery.parseJSON(sessionStorage.editClickedMealList);

    var mealHTML = '<ul>';

    for(var i=0; i<foodForThisMeal.length; i++)
    {
      var mealName = foodForThisMeal[i]["meal"];
      var members = foodForThisMeal[i]["members"];
    
      mealHTML = mealHTML + '<h2><li>' + mealName + ' ( ';

      for(var j=0; j<members.length; j++)
      {
        mealHTML += members[j] + " ";
      }

      mealHTML = mealHTML + ')</li></h2>'

    }

    mealHTML += '</ul>';

    document.getElementById("day-content").innerHTML = mealHTML + document.getElementById("day-content").innerHTML;
})

function toggle_visibility(id) {
             var e = document.getElementById(id);
             if(e.style.display == 'block')
                e.style.display = 'none';
             else
                e.style.display = 'block';
          }