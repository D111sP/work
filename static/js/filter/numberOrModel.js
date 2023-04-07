app.filter('NumberOrModel', function () {
    return function (str, model) {
    if(str == null){
        return model;
    } else  return str;
    };
  });