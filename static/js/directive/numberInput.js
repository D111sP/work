app.directive('numberInput', function($filter) {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ngModelCtrl) {
  
        ngModelCtrl.$formatters.push(function(modelValue) {
          return setDisplayNumber(modelValue, true);
        });
    
        // it's best to change the displayed text using elem.val() rather than
        // ngModelCtrl.$setViewValue because the latter will re-trigger the parser
        // and not necessarily in the correct order with the changed value last.
        // see http://radify.io/blog/understanding-ngmodelcontroller-by-example-part-1/
        // for an explanation of how ngModelCtrl works.
        
        ngModelCtrl.$parsers.push(function(viewValue) {
          setDisplayNumber(viewValue);
          return setModelNumber(viewValue);
        });
    
        // occasionally the parser chain doesn't run (when the user repeatedly 
        // types the same non-numeric character)
        // for these cases, clean up again half a second later using "keyup"
        // (the parser runs much sooner than keyup, so it's better UX to also do it within parser
        // to give the feeling that the comma is added as they type)
        
        elem.bind('keyup focus', function() {
          setDisplayNumber(elem.val());
        });
        function setDisplayNumber(val, formatter) {
          var valStr, displayValue, arraySplit;

          if (typeof val === 'undefined' || val == null) {
            return "";
          }

          valStr = val.toString();
          displayValue = valStr.replace('.', ',').replace('/', '').replace(/[A-Za-z]/g, '').replace(/[А-ЯЁа-яё]/g, '');

          if (valStr.length === 1 && valStr[0] === '0') {
            displayValue = '0';
          } else {
            displayValue = displayValue;
          }
          
          //Мое решени
          if(attrs.ficance !=0){
              if(attrs.ficance > 0 && attrs.accuracy == 0){
                  displayValue = displayValue.replace('.', '').replace(',', '');
                  if(displayValue.length > attrs.ficance){
                      var raznost = displayValue.length - attrs.ficance;
                      displayValue = displayValue.slice(0, -raznost);
                      
                  };
              };

              arraySplit = displayValue.split(',', 2);

              if(arraySplit.length >= 1){
                  if(arraySplit[0].length > attrs.ficance){
                      var raznost = arraySplit[0].length - attrs.ficance;
                      displayValue = arraySplit[0].slice(0, -raznost);
                  } else  displayValue = arraySplit[0];
              };

              if(arraySplit.length == 2){
                  if(arraySplit[1].length > attrs.accuracy){
                      var raznost = arraySplit[1].length - attrs.accuracy;
                      displayValue +=","+ arraySplit[1].slice(0, -raznost);
                  } else displayValue +=","+ arraySplit[1];
              };
          }else {
              arraySplit = displayValue.split(',', 2);
              arraySplitIndication = attrs.indication.split('.', 2);
              if(arraySplitIndication.length == 1){
                  if(arraySplit[0].length > 15){
                      var raznost = arraySplit[0].length - 15;
                      displayValue = arraySplit[0].slice(0, -raznost);
                  } else  displayValue = arraySplit[0];
                  if(arraySplit.length == 2){
                      if(arraySplit[1].length > 2){
                          var raznost = arraySplit[1].length - 2;
                          displayValue += ","+ arraySplit[1].slice(0, -raznost); 
                      } else displayValue +=","+ arraySplit[1];  
                  };
                  
              };
              
              if(arraySplitIndication.length == 2){
                  if(arraySplit[0].length > 15){
                      var raznost = arraySplit[0].length - 15;
                      displayValue = arraySplit[0].slice(0, -raznost);
                  } else  displayValue = arraySplit[0];
                  if(arraySplit.length == 2){
                      if(arraySplit[1].length > arraySplitIndication[1].length){
                          var raznost = arraySplit[1].length - arraySplitIndication[1].length;
                          displayValue += ","+ arraySplit[1].slice(0, -raznost); 
                      } else displayValue +=","+ arraySplit[1];  
                  };
              };

          };
    
          if (attrs.positive && displayValue[0] === '-') {
            displayValue = displayValue.substring(1);
          }

          if (typeof formatter !== 'undefined') {
            return (displayValue === '') ? 0 : displayValue;
          } else {
            elem[0].dispatchEvent(new Event("input"));
            elem.val((displayValue === '0') ? displayValue : displayValue);
          }
        };

        function setModelNumber(val) {
          var modelNum = val.toString().replace('.', ',').replace('/', '').replace(/[A-Za-z]/g, '').replace(/[А-ЯЁа-яё]/g, '');
          if (modelNum.toString().indexOf('.') !== -1) {
            modelNum = Math.round((modelNum + 0.00001) * 100) / 100;
          }
          if (attrs.positive) {
            modelNum = Math.abs(modelNum);
          }
          return modelNum;
        };

      }
    };
  });