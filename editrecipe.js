$(function() {
    var recipes = JSON.parse(sessionStorage.recipes);
    var currRec = recipes[sessionStorage.recipe];
    var nutr = {fat: 0, carbs: 0, protein: 0}
    var nutrition = {
        'ground beef':{unit: 'lb.', fat: 68, calories: 975, protein: 84, carbs: 0},
        'tomato sauce':{unit: 'cup', fat: 1, calories: 59, protein: 3, carbs: 13},
        'lasagna noodles':{unit: 'lb.', fat: 8, calories: 1600, protein: 56, carbs: 336},
        'ricotta':{unit: 'oz.', fat: 4, calories:52, protein:3, carbs: 1},
        'mozzarella':{unit: 'oz.', fat: 6, calories: 85, protein: 6, carbs: 1},
        'chicken breast':{unit: 'lb.', fat: 16, calories: 748, protein: 139, carbs: 0},
        'heavy cream':{unit: 'cup', fat: 44, calories:414, protein:2, carbs: 3},
        'fettucine':{unit: 'lb.', fat: 8, calories: 1600, protein: 56, carbs: 336},
        'parmesan':{unit: 'tbsp.', fat: 1, calories: 21, protein: 2, carbs: 0},
        'butter':{unit: 'tbsp.', fat: 11, calories: 99, protein: 0, carbs: 0},
        'carrots':{unit: 'lb.', fat: 1, calories: 197, protein: 4, carbs: 43},
        'onions':{unit: 'cup', fat: 0, calories: 68, protein: 1, carbs: 16},
        'cheddar cheese':{unit: 'oz.', fat: 9, calories: 113, protein: 7, carbs: 1},
        'oatmeal':{unit: 'cup', fat: 5, calories: 293, protein: 12, carbs: 50},
        'brown sugar':{unit: 'tbsp.', fat: 0, calories: 54, protein: 0, carbs: 13.5},
        'celery':{unit: 'oz.', fat: 0, calories: 4, protein: 0, carbs: 1},
        'mayonanaise':{unit: 'tbsp.', fat: 5, calories: 59, protein:0, carbs: 3.5},
        'mustard':{unit: 'tbsp.', fat: 0, calories: 8, protein:1, carbs: 1},
        'potato':{unit: 'lb.', fat: 0, calories: 368, protein:10, carbs: 82}
    };

    $('#recipe-title').val(currRec.title);
    $('#recipe-servings').val(currRec.servings);
    var currCat = currRec.categories;
    for (var i = 0; i < currCat.length; i++){
        $('input:checkbox[value='+currCat[i]+']').attr('checked',true);
    }
    var currTime = currRec.time;
    $('#recipe-hours').val(currTime[0]);
    $('#recipe-minutes').val(currTime[1]);
    var currDir = currRec.directions;
    for (var i  = 0; i < currDir.length; i++){
        var newlist = "<li><textarea class = 'direction'>"+currDir[i]+"</textarea><button class = 'del-button'>x</button></li>";
        $('#directions').append(newlist);
    }
    var currIng = currRec.ingredients;
    console.log(currIng);
    for (var i  = 0; i < currIng.length; i++){
        var ci = currIng[i];
        var newrow = "<tr class = 'ingredient'><td><input class = 'in-item' value='"+ci.item+"'></input></td><td><input type = 'number' class = 'in-amt' value = "+ci.amount+"></input> </td><td><select class = 'in-unit'><option value = 'lb.'>lb.</option><option value = 'oz.'>oz.</option><option value = 'tbsp.'>tbsp.</option><option value = 'cup'>cup</option></select></td><td><button class = 'del-button'>x</button></td></tr>"
        $('#ingredients tr:last').after(newrow);
        var u = $('#ingredients tr:last').find('.in-unit');
        u.val(ci.unit);
        if (ci.item in nutrition){
            u.prop('disabled',true);
        }
    }

    $('body').on('click','a',function(){
        var c = confirm("Do you want to leave without saving?");
        return c;
    })
    
    $('#add-ingredient').click(function(){
        var newrow = "<tr class = 'ingredient'><td><input class = 'in-item'></input></td><td><input type = 'number' class = 'in-amt'></input> </td><td><select class = 'in-unit'><option value = 'lb.'>lb.</option><option value = 'oz.'>oz.</option><option value = 'tbsp.'>tbsp.</option><option value = 'cup'>cup</option></select></td><td><button class = 'del-button'>x</button></td></tr>"
        $('#ingredients tr:last').after(newrow);
        helper();
        deleteButton();
    })

    $('#add-direction').click(function(){
        var newlist = "<li><textarea class = 'direction'></textarea><button class = 'del-button'>x</button></li>";
        $('#directions').append(newlist);
        deleteButton();
    })
    function deleteButton(){
        $('.del-button').click(function(){
            var parent = $(this).parent();
            if (parent.is('li')){
                parent.remove();
            }else if (parent.is('td')){
                parent.parent().remove();
            }

        })
    }
    $('#cancel-recipe').click(function(){
        window.location.href = 'recipebook.html'
    })
    $('#save-recipe').click(function(){
        var recipe = {};
        recipe.title = $('#recipe-title').val();
        recipe.categories = [];
        $('.recipe-check').each(function(i,e){
            if (this.checked){
                recipe.categories.push($(this).val());
            }
        })
        recipe.servings = $('#recipe-servings').val();
        recipe.time = [$('#recipe-hours').val(), $('#recipe-minutes').val()];
        recipe.ingredients = [];
        $('.ingredient').each(function(i,e){
            ing = {};
            ing.item = $(this).find('.in-item').val();
            ing.amount = $(this).find('.in-amt').val();
            ing.unit = $(this).find('.in-unit').val();
            recipe.ingredients.push(ing);
        })
        recipe.directions = [];
        $('.direction').each(function(i,e){
            recipe.directions.push($(this).val());
        })
        recipe.nutrition = nutr;
        delete recipes[sessionStorage.recipe];
        recipes[recipe.title] =recipe;
        sessionStorage.recipes = JSON.stringify(recipes);
        sessionStorage.recipe = recipe.title;
        window.location.href = "recipe.html";
    })

    $('#recipe-servings').focusout(function(){
        var val  = $(this).val();
        if (val == 0){
            val = 1
        }else if (val < 0){
            val = -val;
        }
        $(this).val(val);
        updateGraph();
    });

    $('#recipe-hours').focusout(function(){
        var val  = $(this).val();
        if (val < 0){
            val = 0;
        }
        $(this).val(val);
    });

    $('#recipe-minutes').focusout(function(){
        var val  = $(this).val();
        if (val < 0){
            val = 0;
        }else if (val > 59){
            val = 59;
        }
        $(this).val(val);
    });

    //http://bl.ocks.org/j0hnsmith/5591116
    var width = 200;
    var radius = 100;

    var enterAntiClockwise = {
        startAngle: Math.PI * 2,
        endAngle: Math.PI * 2
    };

    var colors = ['CornflowerBlue','#b4f49f','Salmon'];

    var pie = d3.layout.pie()
        .value(function(d){return d.value;})
        .sort(null);

    var arc = d3.svg.arc()
        .outerRadius(radius);

    var svg = d3.select("#cal-pie").append("svg")
        .attr("width", width)
        .attr("height", width)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");

    var path = svg.selectAll("path")
        .data([])
        .enter().append("path")
        .attr("fill", function(d, i) { return color(i); })
        .attr("d", arc)
        .each(function(d) { this._current = d; }); // store the initial values

    function change(data) {
        path = path.data(pie(data)); // update the data
        // set the start and end angles to Math.PI * 2 so we can transition
        // anticlockwise to the actual values later
        path.enter().append("path")
            .attr("fill", function (d, i) {
                return colors[i];
            })
            .attr("d", arc(enterAntiClockwise))
            .each(function (d) {
                this._current = {
                    data: d.data,
                    value: d.value,
                    startAngle: enterAntiClockwise.startAngle,
                    endAngle: enterAntiClockwise.endAngle
                };
            }); // store the initial values
        path.exit()
            .transition()
            .duration(750)
            .attrTween('d', arcTweenOut)
            .remove() // now remove the exiting arcs
        path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
    }

    // Store the displayed angles in _current.
    // Then, interpolate from _current to the new angles.
    // During the transition, _current is updated in-place by d3.interpolate.
    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
    }
    // Interpolate exiting arcs start and end angles to Math.PI * 2
    // so that they 'exit' at the end of the data
    function arcTweenOut(a) {
        var i = d3.interpolate(this._current, {startAngle: Math.PI * 2, endAngle: Math.PI * 2, value: 0});
        this._current = i(0);
        return function (t) {
            return arc(i(t));
        };
    }
    function updateGraph(){
        var servings = 1.0;
        var cal = 0;
        var fat = 0;
        var carbs = 0;
        var prot = 0;
        if (parseInt($('#recipe-servings').val()) > 0){
            servings = parseInt($('#recipe-servings').val())*1.0;
        }
        $('.ingredient').each(function(i,e){
            var item = $(this).find('.in-item').val();
            var amt = parseFloat($(this).find('.in-amt').val());
            if (isNaN(amt)){
                amt = 0;
            }
            if (item in nutrition){
                cal += nutrition[item].calories * amt;
                fat += nutrition[item].fat * amt;
                carbs += nutrition[item].carbs * amt;
                prot += nutrition[item].protein * amt;
            }
        })
        cal /= servings;
        $('#cal-amt').text(cal.toFixed(0));
        fat /= servings;
        $('#fat-amt').text(fat.toFixed(2));
        carbs /= servings;
        $('#carbs-amt').text(carbs.toFixed(2));
        prot /= servings;
        $('#prot-amt').text(prot.toFixed(2));
        nutr.fat = fat;
        nutr.carbs = carbs;
        nutr.protein = prot;
        var data = [{label: 'Fat', value: fat*9}, {label: 'Carbs', value: carbs*4}, {label: 'Protein', value: prot*4}];
        change(data);
    }
    //http://stackoverflow.com/questions/24929890/how-to-give-add-new-item-option-in-jquery-autocomplete
    function helper(){
        $('.in-item').focusout(function(){
            var val = $(this).val();
            var unit = $(this).parent().parent().find('.in-unit');
            if (val in nutrition){
                unit.val(nutrition[val].unit);
                unit.prop('disabled',true);
            }else{
                unit.prop('disabled',false);
            }
        });
        $('.in-amt').focusout(function(){
            $(this).val(Math.abs($(this).val()));
            updateGraph();
        })
        $('.in-item').autocomplete({
            source: Object.keys(nutrition),
            minLength: 2
        });
    }
    deleteButton();
    helper();
    updateGraph();
})
