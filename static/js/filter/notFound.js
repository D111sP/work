app.filter('notFound', function () {
    return function (str) {
      if (str == null || str == ""){
        return "не указано"
      };

      if (str.substr(0, 18) == "<Объект не найден>"){
        return "не указано"
      };
    };
  });