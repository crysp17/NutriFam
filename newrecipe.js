$(function() {
    recipes = [];
    nutrition = {
        'ground beef':{unit: 'lb.', fat: 68, calories: 975, protein: 84, carbs: 0},
        'tomato sauce':{unit: 'cup', fat: 1, calories: 59, protein: 3, carbs: 13},
        'lasagna noodles':{unit: 'lb.', fat: 8, calories: 1600, protein: 56, carbs: 336},
        'ricotta':{unit: 'oz.', fat: 32, calories:428, protein:28, carbs: 7},
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
})

function helper(){

    $('.in-item').focusout(function(){
        var val = $(this).val();
        if (val in nutrition){
            $(this).parent().parent().find('.in-unit').val(nutrition[val].unit);
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