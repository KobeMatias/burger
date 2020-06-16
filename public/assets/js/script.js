$(document).ready(function() {
    
    $.ajax("/burgers", {
      type: "GET"
    }).then(function(data) {
  
      var burgers = data.burgers;
      var len = burgers.length;
  
      for (var i = 0; i < len; i++) {
  
        var text = "Devour"
        var elem = $("#not_Devoured");
        var elemClass = "btn-primary devour"
  
        if (burgers[i].eaten === 1) {
          text = "Delete";
          elem = $("#Devoured");
          elemClass="btn-danger delete"
        }
  
        var new_elem = "<div class='row burger-row'><div class='col-md-7 text-center'>"+burgers[i].id+". "+burgers[i].burger+"</div><div class='col-md-5 text-center'><button type='button' class='btn "+elemClass+"' data-id='"+burgers[i].id+"'>"+text+"</button></div></div>"
  
        elem.append(new_elem)
  
      }
    })
  
    $(document).on("click", ".devour", function(event) {
      // event.preventDefault();
  
      var burger_id = $(this).data("id");
      var eatenState = {
        eaten: 1
      };

      $.ajax("/burgers/" + burger_id, {
        type: "PUT",
        data: JSON.stringify(eatenState),
        dataType:'json',
        contentType: 'application/json',
      }).then(function() {
        console.log("Burger eaten");
        location.reload();
      });
  
    });
  
    $(document).on("click", ".delete", function(event) {
      event.preventDefault();
  
      var burger_id = $(this).data("id");
  
      $.ajax({
        method: "DELETE",
        url: "/burgers/" + burger_id,
      }).then(function(data) {
        location.reload();
      });
  
    });
  
    $(".add_burger").on("submit", function(event) {
      event.preventDefault();
  
      var newBurger = {
        burger: $("#burgerName").val().trim()
      };
  
      $.ajax("/burgers", {
        type: "POST",
        data: JSON.stringify(newBurger),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("added new burger");
        location.reload();
      });
    });
  
  });
  