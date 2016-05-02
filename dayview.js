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

    if(Object.keys(foodForThisMeal[0])[0] != "meal")
    {
      document.getElementById("day-content").innerHTML = '<br>' + document.getElementById("day-content").innerHTML;
    }
    else
    {
      var mealHTML = '<ul>';

      for(var i=0; i<foodForThisMeal.length; i++)
      {
        var mealName = foodForThisMeal[i]["meal"];
        var members = foodForThisMeal[i]["members"];
      
        mealHTML = mealHTML + '<h2><li>' + mealName + '</li></h2>';

        mealHTML = mealHTML + '<ul><li><h3>';
        for(var j=0; j<members.length; j++)
        {
          mealHTML += members[j];
          if (j != members.length - 1) {
            mealHTML += ", ";
          }
        }
        mealHTML = mealHTML + '</h3></li></ul>';

      }

      mealHTML += '</ul>';

      document.getElementById("day-content").innerHTML = mealHTML + document.getElementById("day-content").innerHTML;
    }



    //recipes stuff
    
    var recipes = {
        "Chicken Alfredo":
            {"title":"Chicken Alfredo","categories":["Dinner"],"servings":"6","time":["0","45"],"ingredients":[{"item":"fettucine","amount":"1","unit":"lb."},{"item":"chicken breast","amount":"1","unit":"lb."},{"item":"butter","amount":"8","unit":"tbsp."},{"item":"heavy cream","amount":"2","unit":"cup"},{"item":"parmesan","amount":"10","unit":"tbsp."}],"directions":["Cook pasta according to package.","Brown chicken breasts in oil.","Melt butter and add heavy cream. Simmer for two minutes.","Add pasta, chicken, and parmesan. Season to taste."],"nutrition":{"fat":35,"carbs":57,"protein":36.5}},
        "Shepherd's Pie":
            {"title":"Shepherd's Pie","categories":["Lunch","Dinner"],"servings":"8","time":["1","15"],"ingredients":[{"item":"potato","amount":"1","unit":"lb."},{"item":"ground beef","amount":"1","unit":"lb."},{"item":"carrots","amount":"1","unit":"lb."},{"item":"cheddar cheese","amount":"8","unit":"oz."},{"item":"onions","amount":"2","unit":"cup"}],"directions":["Cut the potatoes into cubes, mince the onions, and shred the carrots.","Brown the ground beef and cook onions until translucent.","Boil and mash potatoes.","Stir the carrots into the ground beef and onions, layer into a baking pan.","Layer mashed potatoes on top.","Sprinkle cheddar cheese on top, bake in a 375 degree oven for 45 minutes or until the cheese is bubbly."],"nutrition":{"fat":17.625,"carbs":20.625,"protein":19.5}},
        "Oatmeal":
            {"title":"Oatmeal","categories":["Breakfast"],"servings":"2","time":["0","15"],"ingredients":[{"item":"oatmeal","amount":"1","unit":"cup"},{"item":"brown sugar","amount":"1","unit":"tbsp."}],"directions":["Boil 1 cup of water.","Add oatmeal and cook for 5 minutes. Add sugar to taste."],"nutrition":{"fat":2.5,"carbs":31.75,"protein":6}},
        "Potato Salad":
            {"title":"Potato Salad","categories":["Lunch"],"servings":"4","time":["0","30"],"ingredients":[{"item":"potato","amount":"1","unit":"lb."},{"item":"mayonanaise","amount":"4","unit":"tbsp."},{"item":"mustard","amount":"2","unit":"tbsp."},{"item":"celery","amount":"4","unit":"oz."}],"directions":["Dice the celery and cube the potatoes.","Boil the potatoes until tender.","Mix the cooked potatoes with the remaining ingredients, then cool. Add salt and pepper to taste."],"nutrition":{"fat":5,"carbs":25.5,"protein":3}}
    }
    if (sessionStorage.recipes == undefined){
        sessionStorage.recipes = JSON.stringify(recipes)
    }
    recipes = Object.keys(JSON.parse(sessionStorage.recipes))
    console.log(recipes);
    for (var i = 0; i < recipes.length; i++){
      var popup = $('#popup-recipes');
      popup.append('<div><button class = "add-meal" style = "margin-left:30px;">+</button><span style = "margin-top: 5px">'+recipes[i]+'</span></div>');
    }
    var meal = ''
    $('#popup-recipes .add-meal').on('click', function(){
      toggle_visibility('popupBoxTwoPosition');
      meal = $(this).parent().find('span').text();
    })

    $('#save-recipe-to-calendar').on('click',function(){
      var calData = JSON.parse(sessionStorage.calendarData)
      var members = [];
      $('input:checkbox').each(function(){
        if(this.checked){
          members.push($(this).val());
        }
      })
      var mealType = sessionStorage.editClickedInfo.split(' ')[0].toLowerCase();
      var dateOffset = sessionStorage.dateOffset;
      console.log(members);
      calData[mealType][dateOffset].push({meal:meal, members:members});
      sessionStorage.calendarData=JSON.stringify(calData);
      window.location.href = 'calendar.html';
    })


})

function toggle_visibility(id) {
             var e = document.getElementById(id);
             if(e.style.display == 'block')
                e.style.display = 'none';
             else
                e.style.display = 'block';
          }