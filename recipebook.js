$(function() {
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
        sessionStorage.recipes = JSON.stringify(recipes);
    }
    $('#rec-book-footer button').click(function(){

        window.location.href = "newrecipe.html";
    })
    $('#recipe-list').on('click','a',function(){
        sessionStorage.recipe = $(this).text();
    })

    var keys = Object.keys(JSON.parse(sessionStorage.recipes));
    for (i = 0; i < keys.length; i++){
        var name = keys[i];
        $('#recipe-list').append("<li><a href = 'recipe.html'>"+name+"</a></li>");

    }
})