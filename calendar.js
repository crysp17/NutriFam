$(function() {
    var initMeals = 
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
             {meal:'Turkey & Swiss', members:['Mark', 'Matthew', 'Luke', 'John']}],

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

    var today = new Date();
    var sunday = new Date();
    sunday.setDate(today.getDate()-today.getDay());
    var saturday = new Date();
    saturday.setDate(today.getDate()+6-today.getDay());
    var m1 = sunday.getMonth()+1;
    var d1 = sunday.getDate();
    var m2 = saturday.getMonth()+1;
    var d2 = saturday.getDate();
    var output = (m1<10 ? '0' : '') + m1 + '/' + (d1<10 ? '0' : '') +d1+ '/' + sunday.getFullYear()
    			+' - '+
    			(m2<10 ? '0' : '') + m2 + '/' + (d2<10 ? '0' : '') +d2+ '/' + saturday.getFullYear();
	$('#days').text(output);

	$('#left-days').click(function(){
	    sunday.setDate(sunday.getDate()-7);
	    saturday.setDate(saturday.getDate()-7);
	    var m1 = sunday.getMonth()+1;
	    var d1 = sunday.getDate();
	    var m2 = saturday.getMonth()+1;
	    var d2 = saturday.getDate();
	    var output = (m1<10 ? '0' : '') + m1 + '/' + (d1<10 ? '0' : '') +d1+ '/' + sunday.getFullYear()
	    			+' - '+
	    			(m2<10 ? '0' : '') + m2 + '/' + (d2<10 ? '0' : '') +d2+ '/' + saturday.getFullYear();
		$('#days').text(output);
	})
	$('#right-days').click(function(){
	    sunday.setDate(sunday.getDate()+7);
	    saturday.setDate(saturday.getDate()+7);
	    var m1 = sunday.getMonth()+1;
	    var d1 = sunday.getDate();
	    var m2 = saturday.getMonth()+1;
	    var d2 = saturday.getDate();
	    var output = (m1<10 ? '0' : '') + m1 + '/' + (d1<10 ? '0' : '') +d1+ '/' + sunday.getFullYear()
	    			+' - '+
	    			(m2<10 ? '0' : '') + m2 + '/' + (d2<10 ? '0' : '') +d2+ '/' + saturday.getFullYear();
		$('#days').text(output);
	})

    var initialData = JSON.stringify(initMeals);

    if(!sessionStorage.calendarData)
    {
      sessionStorage.calendarData = initialData;
    }

    var meals = jQuery.parseJSON(sessionStorage.calendarData);

    var nickname = {Joanne: 'Jo', Jimbob: 'Ji', Matthew: 'Mt', Mark: 'Mr', Luke: "L", John: "Jh"};
    var fam_colors = {Joanne: '#ffcccc', Jimbob: '#ffedcc', Matthew: '#ffffcc', Mark: '#cce5cc', Luke: '#e5e5ff', John: '#e5cce5'};
    var keys = Object.keys(meals);

    for (var i = 0; i < keys.length; i++){
        //m = breakfast, lunch, or dinner
        var m = meals[keys[i]];
        var row = $('#'+keys[i]);
        for (var j = 0; j < m.length; j++){
            var day = m[j]
            var col = '<td style = "position: relative;">';
            for (var k = 0; k < day.length; k++){
                if(day[k].meal == null)
                {
                  //col += '<div class = "meal"><p><b><a href="dayview.html">Add a meal</a></b></p>';
                }
                else
                {
                  var meal = day[k];
                  col += '<div class = "meal"><p><b>'+meal.meal+'</b></p>';
                  for (var l = 0; l < meal.members.length; l++){
                      col += '<div class = "fam" title = "'+meal.members[l]+'" style = "background-color:'+fam_colors[meal.members[l]]+'">'+nickname[meal.members[l]]+'</div>'
                  }
                  col += '</div>';
                }
            }
            col += '<a href="dayview.html"><img src = "images/pencil.png" class = "' + keys[i] + '' + j + '" ></a>';
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