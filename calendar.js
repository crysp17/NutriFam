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
            col += '<a href="dayview.html"><img src = "images/pencil.png" id = "' + keys[i] + '' + j + '" ></a>';
            col += '</td>';
            row.append(col);   
        }

    }

    $("#breakfast0").click(function () {
      editClicked("Breakfast", sunday, 0, "Sunday", meals["breakfast"][0]);
    });

    $("#breakfast1").click(function () {
      editClicked("Breakfast", sunday, 1, "Monday", meals["breakfast"][1]);
    });

    $("#breakfast2").click(function () {
      editClicked("Breakfast", sunday, 2, "Tuesday", meals["breakfast"][2]);
    });

    $("#breakfast3").click(function () {
      editClicked("Breakfast", sunday, 3, "Wednesday", meals["breakfast"][3]);
    });

    $("#breakfast4").click(function () {
      editClicked("Breakfast", sunday, 4, "Thursday", meals["breakfast"][4]);
    });

    $("#breakfast5").click(function () {
      editClicked("Breakfast", sunday, 5, "Friday", meals["breakfast"][5]);
    });

    $("#breakfast6").click(function () {
      editClicked("Breakfast", sunday, 6, "Saturday", meals["breakfast"][6]);
    });

    $("#lunch0").click(function () {
      editClicked("Lunch", sunday, 0, "Sunday", meals["lunch"][0]);
    });

    $("#lunch1").click(function () {
      editClicked("Lunch", sunday, 1, "Monday", meals["lunch"][1]);
    });

    $("#lunch2").click(function () {
      editClicked("Lunch", sunday, 2, "Tuesday", meals["lunch"][2]);
    });

    $("#lunch3").click(function () {
      editClicked("Lunch", sunday, 3, "Wednesday", meals["lunch"][3]);
    });

    $("#lunch4").click(function () {
      editClicked("Lunch", sunday, 4, "Thursday", meals["lunch"][4]);
    });

    $("#lunch5").click(function () {
      editClicked("Lunch", sunday, 5, "Friday", meals["lunch"][5]);
    });

    $("#lunch6").click(function () {
      editClicked("Lunch", sunday, 6, "Saturday", meals["lunch"][6]);
    });

    $("#dinner0").click(function () {
      editClicked("Dinner", sunday, 0, "Sunday", meals["dinner"][0]);
    });

    $("#dinner1").click(function () {
      editClicked("Dinner", sunday, 1, "Monday", meals["dinner"][1]);
    });

    $("#dinner2").click(function () {
      editClicked("Dinner", sunday, 2, "Tuesday", meals["dinner"][2]);
    });

    $("#dinner3").click(function () {
      editClicked("Dinner", sunday, 3, "Wednesday", meals["dinner"][3]);
    });

    $("#dinner4").click(function () {
      editClicked("Dinner", sunday, 4, "Thursday", meals["dinner"][4]);
    });

    $("#dinner5").click(function () {
      editClicked("Dinner", sunday, 5, "Friday", meals["dinner"][5]);
    });

    $("#dinner6").click(function () {
      editClicked("Dinner", sunday, 6, "Saturday", meals["dinner"][6]);
    });

})

function editClicked(mealName, weekStart, dateOffset, weekDayName, mealList)
    {
      var targetDate = new Date();
      targetDate.setDate(weekStart.getDate() + dateOffset);
      sessionStorage.editClickedInfo = mealName + " Plan for " + weekDayName + ", " + (targetDate.getMonth()+1) + "/" + targetDate.getDate();
      sessionStorage.editClickedMealList = mealList;

      alert(sessionStorage.editClickedInfo);
    }