app.filter('writeError', function () {
    return function (str, value_new, value_old, zero) {
        
            if (value_new == "" || value_new == null || value_old == "" || value_old == null) {
                str = "";

                return str;
            }else {
                value_new = Number(value_new.replace(',', '.'));
                value_old = Number(value_old);
                if (zero == 1 ) {
                    str = "";
                    return str;  
                } else {
                    if(value_new >= value_old){
                        str = "";
                        return str;
                    }else return  "Меньше предыдущего!";
                    
                };    
            };

    };
  });