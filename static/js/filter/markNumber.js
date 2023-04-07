app.filter('markNumber', function () {
    return function (str, scaleSignificance, scaleAccuracy) { 
        if(scaleSignificance == undefined && scaleAccuracy == undefined){
            return ""; 
        };
        return scaleSignificance +"(" + scaleAccuracy + ")";
    };
});