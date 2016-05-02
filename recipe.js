$(function() {
    //sessionStorage.recipe = "Shepherd's Pie";
    console.log(sessionStorage.recipe);
    var recipes = JSON.parse(sessionStorage.recipes);
    var recipe = recipes[sessionStorage.recipe];
    $('#recipe-title').text(recipe.title);
    var categories = recipe.categories;
    var catText = '';
    for (var i = 0; i < categories.length; i++){
        catText += categories[i]
        if (i < categories.length - 1){
            catText += ', '
        }
    }
    $('#recipe-categories').text(catText);
    $('#recipe-servings').text(recipe.servings);
    var time = recipe.time;
    $('#recipe-hours').text(time[0]);
    $('#recipe-minutes').text(time[1]);
    var nutrition = recipe.nutrition;
    var cal = nutrition.fat * 9 + (nutrition.protein + nutrition.carbs)*4;
    $('#recipe-cal').text(cal.toFixed(0));
    $('#recipe-fat').text(nutrition.fat.toFixed(2));
    $('#recipe-carbs').text(nutrition.carbs.toFixed(2));
    $('#recipe-prot').text(nutrition.protein.toFixed(2));

    var ingredients = recipe.ingredients;
    for (var i = 0; i < ingredients.length; i++){
        var ing = ingredients[i];
        $('#ingredients-list').append('<li>'+ing.amount+' '+ing.unit+' '+ing.item+'</li>');
    }
    var directions = recipe.directions;
    for (var i = 0; i < directions.length; i++){
        $('#directions-list').append('<li>'+directions[i]+'</li>');
    }

    var data = [nutrition.fat*9, nutrition.carbs*4, nutrition.protein*4];
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

    $('#del-recipe').click(function(){
        var r = confirm("Are you sure you want to delete this recipe?");
        if (r == true){
            var name = sessionStorage.recipe;
            delete recipes[name];
            sessionStorage.recipes = JSON.stringify(recipes);
            window.location.href = "recipebook.html";
        }
    })
    $('#edit-recipe').click(function(){
        window.location.href = "editrecipe.html";

    })
})