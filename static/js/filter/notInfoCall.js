app.filter('notInfoCall', function () {
    return function (str) {
      if (str == null || str == ""){
        return " "
      };
      if (str == "101"){
        return "Звонит"
      };
      if (str == "7"){
        return "Звонок принят"
      };

      return str;
    };
});