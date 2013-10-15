/**
 * Created by 4ayka on 15.10.13.
 */
if (null == Anna) var Anna = {};

jQuery.fn.CalculatorFirst =

 function (elementToInsert) {
        var container = $("<div><input type='text'/> <label></label> <span></span> </div>");
        elementToInsert.append(container);

        container.append($("<h3>Введите количество дней к командировке</h3>"));

        var text = container.val();

        container.keyup(function (e) {
            if (e.keyCode == 13 || e.keyCode == 10) {
                text.submit();
                if(text == 1){
                    container.text("LO   " + "250   " + "PIT");
                } else if(text >= 2){
                    container.text("P0   " + "500" * text);
                } else {
                    alert("Please select the number of days!");
                }
                return false;
            } });

     container.append($("<button class='ok' disabled='disabled'>OK</button>"));
};
