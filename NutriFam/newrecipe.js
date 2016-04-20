$(function() {
    recipes = [];
    nutrition = {
        'ground beef':{unit: 'lb.', fat: 68, calories: 975, protein: 84, carbs: 0},
        'tomato sauce':{unit: 'cup', fat: 1, calories: 59, protein: 3, carbs: 13},
        'lasagna noodles':{unit: 'lb.', fat: 8, calories: 1600, protein: 56, carbs: 336},
        'ricotta':{unit: 'oz.', fat: 4, calories:52, protein:3, carbs: 1},
        'mozzarella':{unit: 'oz.', fat: 6, calories: 85, protein: 6, carbs: 1}
    };
    $('#add-ingredient').click(function(){
        newrow = "<tr class = 'ingredient'><td><input class = 'in-item'></input></td><td><input type = 'number' class = 'in-amt'></input> </td><td><select class = 'in-unit'><option value = 'lb.'>lb.</option><option value = 'oz.'>oz.</option><option value = 'cup'>cup</option></select></td></tr>"
        $('#ingredients tr:last').after(newrow);
        helper();
    })

    $('#add-direction').click(function(){
        newlist = "<li><textarea class = 'direction'></textarea></li>";
        $('#directions').append(newlist);
    })

    $('#save-recipe').click(function(){
        recipe = {};
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
        recipes.push(recipe);
        window.location.href = "recipe.html";
    })
    helper();

    //http://bl.ocks.org/j0hnsmith/5591116
    var width = 200;
    radius = 100;

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
                var amt = parseInt($(this).find('.in-amt').val());
                if (item in nutrition){
                    cal += nutrition[item].calories * amt;
                    fat += nutrition[item].fat * amt;
                    carbs += nutrition[item].carbs * amt;
                    prot += nutrition[item].protein * amt;
                }
            })
            cal /= servings;
            $('#cal-amt').text(cal);
            fat /= servings;
            $('#fat-amt').text(fat);
            carbs /= servings;
            $('#carbs-amt').text(carbs);
            prot /= servings;
            $('#prot-amt').text(prot);
            var data = [{label: 'Fat', value: fat*9}, {label: 'Carbs', value: carbs*4}, {label: 'Protein', value: prot*4}];
            change(data);

        })
        $('.in-item').autocomplete({
            source: Object.keys(nutrition),
            minLength: 2,
            messages: {
                noResults: '',
                results: function() {}
            }
        });
    }
})
