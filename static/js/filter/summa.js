app.filter('summa', function () {
    return function (str, value_new, value_old, tarif, zero, numbetLenght, scaleAccuracy) {
        if (tarif == "" || tarif == null || tarif == undefined){
            return "";
        };
        if(value_new == "" || value_new == null || value_new == undefined){
            return "";
        } else value_new = value_new.replace(',', '.');

        if(value_old == "" || value_old == null || value_old == undefined){
            return "";
        }else value_old = "" + value_old;

        if(Number(value_old) > Number(value_new) && zero != 1){
            return "";
        };

        if (zero == 0 || zero == undefined) {
            str = (Number(value_new)-Number(value_old))*Number(tarif);   
            
            return str.toFixed(2).toString().replace('.', ',');
        } else if (zero == 1) {

            var numnerMax = "";

            for(let i = 0; i < numbetLenght; i++){
                numnerMax = numnerMax + "9";
            }; 

            str = (1 + Number(numnerMax) + Number(value_new) - Number(value_old))*Number(tarif);
            
            return str.toFixed(2).toString().replace('.', ',');
        };
    };
  });