    app.filter('dataEdit', function () {
        return function (str) {
            if(str == null || str == undefined || str == ""){
                return "";
            };
            
            gap = "."

            year = str.slice(0,4);
        
            month = str.slice(5,7); 

            day = str.slice(8,10);

            return day + gap + month + gap + year;
        };
    });

    
    app.filter('comma', function () {
        return function (str) {
            if(str == null || str == undefined || str == ""){
                return "";
            };
            return str.toString().replace('.', ',');
        };
    });

  
    app.filter('SpaceThousands', function () {
        return function (str) {
            
            return str.toLocaleString('ru-RU');
        };
    });

    app.filter('dataEdit_call_history', function () {
        return function (str) {
            if(str == null || str == undefined || str == ""){
                return "";
            };
            
            gap = "."

            year = str.slice(0,4);
        
            month = str.slice(5,7); 

            day = str.slice(8,10);

            time = str.slice(11,19);

            return  day + gap + month + gap + year +" "+ time;
        };
    });
