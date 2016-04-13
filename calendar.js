$(function() {
    var meals = 
        {
            breakfast: 
            [
            [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew']}]
            ],

            lunch: 
            [
            [{meal: 'Beef Stew', members: ['Joanne', 'Jimbob','Mark', 'Matthew']}],

            [{meal: 'Chicken Breast', members: ['Joanne', 'Jimbob']},
             {meal:'Ham & Brie Sandwich', members:['Mark', 'Matthew']}],

            [{meal: 'Quesadilla', members: ['Joanne', 'Jimbob']},
             {meal:'Tuna Salad Sandwich', members:['Mark', 'Matthew']}],

            [{meal: 'Chicken Breast', members: ['Joanne', 'Jimbob']},
             {meal:'PB & Banana Sandwich', members:['Mark', 'Matthew']}],

            [{meal: 'Wedge Salad', members: ['Joanne', 'Jimbob']},
             {meal:'Chicken Salad', members:['Mark', 'Matthew']}],

            [{meal: 'Chef Salad', members: ['Joanne', 'Jimbob']},
             {meal:'Turkey $ Swiss', members:['Mark', 'Matthew']}],

            [{meal: 'Fried Chicken', members: ['Joanne', 'Jimbob','Mark', 'Matthew']}]
            ],

            dinner: 
            [
            [{meal: 'Spaghetti', members: ['Joanne', 'Jimbob','Mark', 'Matthew']}],

            [{meal: "Shepherd's Pie", members: ['Joanne', 'Jimbob','Mark', 'Matthew']}],

            [{meal: 'Chicken Alfredo', members: ['Joanne', 'Jimbob','Mark', 'Matthew']}],

            [{meal: 'Pork Chops', members: ['Joanne', 'Jimbob','Mark', 'Matthew']}],

            [],

            [{meal: 'Fried Rice', members: ['Joanne', 'Jimbob','Mark', 'Matthew']}],

            [{meal: 'Tacos', members: ['Joanne', 'Jimbob','Mark', 'Matthew']}]
            ]
        }
    var nickname = {Joanne: 'Jo', Jimbob: 'Ji', Matthew: 'Mt', Mark: 'Mr'};
    var keys = Object.keys(meals);
    for (var i = 0; i < keys.length; i++){
        var m = meals[keys[i]];
        var row = $('#'+keys[i]);
        for (var j = 0; j < m.length; j++){
            var day = m[j]
            var col = '<td>';
            for (var k = 0; k < day.length; k++){
                var meal = day[k];
                col += '<div class = "meal"><p><b>'+meal.meal+'</b></p>';
                for (var l = 0; l < meal.members.length; l++){
                    col += '<div class = "fam">'+nickname[meal.members[l]]+'</div>'
                }
                col += '</div>';
            }
            col += '</td>';
            row.append(col);   
        }

    }


})