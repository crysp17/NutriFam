$(function() {
    var meals = 
        {
            breakfast: 
            [
            [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew', 'Luke', 'John']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew', 'Luke', 'John']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew', 'Luke', 'John']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew', 'Luke', 'John']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew', 'Luke', 'John']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew', 'Luke', 'John']}],

             [{meal: 'Oatmeal', members: ['Joanne', 'Jimbob']},
              {meal:'Cheerios', members:['Mark', 'Matthew', 'Luke', 'John']}]
            ],

            lunch: 
            [
            [{meal: 'Beef Stew', members: ['Joanne', 'Jimbob','Mark', 'Matthew', 'Luke', 'John']}],

            [{meal: 'Chicken Breast', members: ['Joanne', 'Jimbob']},
             {meal:'Ham & Brie Sandwich', members:['Mark', 'Matthew', 'Luke', 'John']}],

            [{meal: 'Quesadilla', members: ['Joanne', 'Jimbob']},
             {meal:'Tuna Salad Sandwich', members:['Mark', 'Matthew', 'Luke', 'John']}],

            [{meal: 'Chicken Breast', members: ['Joanne', 'Jimbob']},
             {meal:'PB & Banana Sandwich', members:['Mark', 'Matthew', 'Luke', 'John']}],

            [{meal: 'Wedge Salad', members: ['Joanne', 'Jimbob']},
             {meal:'Chicken Salad', members:['Mark', 'Matthew', 'Luke', 'John']}],

            [{meal: 'Chef Salad', members: ['Joanne', 'Jimbob']},
             {meal:'Turkey $ Swiss', members:['Mark', 'Matthew', 'Luke', 'John']}],

            [{meal: 'Fried Chicken', members: ['Joanne', 'Jimbob','Mark', 'Matthew', 'Luke', 'John']}]
            ],

            dinner: 
            [
            [{meal: 'Spaghetti', members: ['Joanne', 'Jimbob','Mark', 'Matthew', 'Luke', 'John']}],

            [{meal: "Shepherd's Pie", members: ['Joanne', 'Jimbob','Mark', 'Matthew', 'Luke', 'John']}],

            [{meal: 'Chicken Alfredo', members: ['Joanne', 'Jimbob','Mark', 'Matthew', 'Luke', 'John']}],

            [{meal: 'Pork Chops', members: ['Joanne', 'Jimbob','Mark', 'Matthew', 'Luke', 'John']}],

            [{}],

            [{meal: 'Fried Rice', members: ['Joanne', 'Jimbob','Mark', 'Matthew', 'Luke', 'John']}],

            [{meal: 'Tacos', members: ['Joanne', 'Jimbob','Mark', 'Matthew', 'Luke', 'John']}]
            ]
        }

    var nickname = {Joanne: 'Jo', Jimbob: 'Ji', Matthew: 'Mt', Mark: 'Mr', Luke: "L", John: "Jh"};
    var fam_colors = {Joanne: '#ffcccc', Jimbob: '#ffedcc', Matthew: '#ffffcc', Mark: '#cce5cc', Luke: '#e5e5ff', John: '#e5cce5'};
    var keys = Object.keys(meals);
    for (var i = 0; i < keys.length; i++){
        var m = meals[keys[i]];
        var row = $('#'+keys[i]);
        for (var j = 0; j < m.length; j++){
            var day = m[j]
            var col = '<td>';
            for (var k = 0; k < day.length; k++){
                if(day[k].meal == null)
                {
                  col += '<div class = "meal"><p><b><a href="dayview.html">Add a meal</a></b></p>';
                }
                else
                {
                  var meal = day[k];
                  col += '<div class = "meal"><p><b>'+meal.meal+'</b></p>';
                  for (var l = 0; l < meal.members.length; l++){
                      col += '<div class = "fam" style = "background-color:'+fam_colors[meal.members[l]]+'">'+nickname[meal.members[l]]+'</div>'
                  }
                  col += '</div>';
                }
            }
            col += '</td>';
            row.append(col);   
        }

    }

    var table = $('calendar');
    /*
    for(var i = 0; i < table.rows.length; i++)
    {
      for(var j = 0; j < table.rows[i].cells.length; j++)
      {
        table.rows[i].cells[j].onclick = (function(i,j) {
                return function () 
                {
                  location.href = "dayview.html";
                  if(!(i==2 || i==4 || i==6))
                  {
                    //if the row doesn't contain meal information,
                    //do nothing.
                  }
                  else
                  {
                    var blod; //breakfast, lunch, or dinner?
                    var curMeals = []; //list of meals being eaten at that time, mapped to who is eating them
                    if(i==2)
                    {
                      blod = 'breakfast';
                      for(var k = 0; k < meals[breakfast][j].length; k++)
                      {
                        curMeals.append(meals[breakfast][j][k]);
                      }
                    }
                    if(i==4)
                    {
                      blod = 'lunch';
                      for(var k = 0; k < meals[lunch][j].length; k++)
                      {
                        curMeals.append(meals[lunch][j][k]);
                      }
                    }
                    if(i==6)
                    {
                      blod = 'dinner';
                      for(var k = 0; k < meals[dinner][j].length; k++)
                      {
                        curMeals.append(meals[dinner][j][k]);
                      }
                    }
                  }
                };
            }(i, j));
      }
    }
    */

})