app.filter('consumption', function () {
    return function (str, value_new, value_old, zero, numbetLenght, scaleAccuracy, nameBase, unit) {
        
        if(value_new == "" || value_new == null || value_new == undefined) {
            return "";
        } else value_new = value_new.replace(',', '.');

        if(value_old == "" || value_old == null || value_old == undefined) {
            return "";
        }else value_old = "" + value_old;
        
        if(nameBase == "АИС Восток"){
        } else if (nameBase == "ТРИЦ"){

            arrayValueOld = value_old.split('0', 2);

            if(unit == "Гкал"){
                scaleAccuracy = 4;
            } else if(arrayValueOld.lenght == 2){
                scaleAccuracy = arrayValueOld[1].lenght;
            }else {
                scaleAccuracy = 2;
            };
        };

        if (zero == 0 || zero == undefined){
            str = Number(value_new) - Number(value_old);

            return  str.toFixed(scaleAccuracy).toString().replace('.', ',');
        } else if (zero == 1){
            var numnerMax = "";

            for(let i = 0; i < numbetLenght; i++){
                numnerMax = numnerMax + "9";
            }; 

            str = 1 + Number(numnerMax) + Number(value_new) - Number(value_old);

            return  str.toFixed(scaleAccuracy).toString().replace('.', ',');
        };
    };
});

app.filter('consumption_EL', function () {
    return function (str, value_new, value_old, zero, numbetLenght, scaleAccuracy/*, nameBase, unit*/) {
        
        if(value_new == "" || value_new == null || value_new == undefined) {
            return "";
        } else value_new = value_new.replace(',', '.');

        if(value_old == "" || value_old == null || value_old == undefined) {
            return "";
        }else value_old = "" + value_old;
        
        /*if(nameBase == "АИС Восток"){
        } else if (nameBase == "ТРИЦ"){

            arrayValueOld = value_old.split('0', 2);

            if(unit == "Гкал"){
                scaleAccuracy = 4;
            } else if(arrayValueOld.lenght == 2){
                scaleAccuracy = arrayValueOld[1].lenght;
            }else {
                scaleAccuracy = 2;
            };
        };*/

        if (zero == 0 || zero == undefined){
            str = Number(value_new) - Number(value_old);

            return  str.toFixed(scaleAccuracy).toString().replace('.', ',');
        } else if (zero == 1){
            var numnerMax = "";

            for(let i = 0; i < numbetLenght; i++){
                numnerMax = numnerMax + "9";
            }; 

            str = 1 + Number(numnerMax) + Number(value_new) - Number(value_old);

            return  str.toFixed(scaleAccuracy).toString().replace('.', ',');
        };
    };
});