app.filter('newMeter', function(metObj){
    return function (str){
        if (metobj.metersData == null || metObj.metersData == "") {
        
            return null;   
        } else {

            str = metobj.metersData.newMeter;
            return str;     
        };
    };
});
