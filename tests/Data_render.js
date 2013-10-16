if (null == Anna) var Anna = {};

Anna.FormRender = {
  renderOneCheckboxSection : function(elementToInsert, checkboxData) {
      var el = $("<div><input type='checkbox'> <label></label>  <span></span> <span></span> </div>");
      elementToInsert.append(el);

      var first = el.find("span:first");
      var last = el.find("span:last");
      var checkbox = el.find("input");

      first.hide();
      last.hide();

      first.text(checkboxData.checked);
      last.text(checkboxData.unchecked);
      el.find("label").text(checkboxData.name);

      var state = function() {
          return checkbox.is(":checked");
      };

      return {
          clear: function () {  first.hide(); last.hide(); checkbox.prop("disabled", null); },
          check: function() {
              checkbox.prop("disabled", "disabled");
              if (state()) {
                  first.show();
                  last.hide();
              } else {
                  last.show();
                  first.hide();
              }
          },
          state : function() { return state();},
          value: function() {
              if (state()) {
                  return first.text();
              } else {
                  return last.text();
              }
          }
      }
  },

  renderCheckboxSection : function(elementToInsert, formData) {
      var container = $("<div></div>");
      elementToInsert.append(container);

      container.append($("<p>Проверьте, что критерии соотвертвуют:</p>"));
      //generate data for checkboxes
      var state = {
          items : {},
          clear : function() {},
          check : function() {$.each(this.items, function(idx, item) { item.check.apply(this, arguments); })}
      };
      $.each(formData, function(idx, checkboxData) {
          state.items[idx] = Anna.FormRender.renderOneCheckboxSection(container, checkboxData);
      });

      container.append($("<button class='clean' disabled='disabled'>CLEAN</button>"));
      container.append($("<button class='check'>CHECK</button>"));
      container.append($("<button class='next' disabled='disabled'>NEXT</button>"));

      container.find("button.clean").click(function() {
          $.each(state.items, function(idx, item) { item.clear(); });
        container.find("button.check").removeAttr("disabled", true);
        container.find("button.next").attr("disabled", true);
      });
      container.find("button.check").click(function() {
          $.each(state.items, function(idx, item) { item.check(); });

          $(this).attr("disabled", "disabled");
        container.find("button.next").removeAttr("disabled");
        container.find("button.clean").removeAttr("disabled");
          });
      var resultFunction = function() {
          var result = {};
          $.each(state.items, function(idx, item) {
              result[idx] = item.value();
              result[idx + "__state"] = item.state();
          });
          return result;
      };

    resultFunction.nextClick = function(handler) {
      container.find("button.next").click(handler);
    };
    return resultFunction;
  },

  renderTypeOfExpense : function (elementToInsert, renderData) {
    var container = $("<option></option>");
    elementToInsert.append(container);
    container.append($("<p>Вид расхода:</p>"));

       var nam = container.val("<option></option>");
       nam.text(renderData.name);
        container.empty();
        $.each(renderData, function(idx, renderData) {
            container.append($("<option value = " +'name'+ "></option>",{
                value: this.value,
                item: this.name
            }));
            drop.items[idx] = Anna.FormRender.renderTypeOfExpense (container, renderData);
        });

//    container.append($("<button class = 'ok'>OK</button>"));

 //   container.find("button.ok").click(function() {
 //       var target_6 = container.val ();
 //       if (target_6 === "1") {
  //          resultFunction.nextClick = function(handler) {
  //              container.find("button.ok").click(handler);
  //          };
  //      } else {
  //          alert("Not implemented! Choose option!!")
  //      }
  //      return false;
//
//    });

  }



};
