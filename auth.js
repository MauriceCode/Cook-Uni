$("#loginForm").on("submit", function (event) {
    event.preventDefault();
    var $inputs = $(this).find("[name]");
    var loginData = {};
    $inputs.each(function (i, el) {
      loginData[$(el).attr("name")] = $(el).val();
    });
    login(loginData.username, loginData.password);
  });
  
  $("#signUp").on("submit", function (event) {
    event.preventDefault();
    var $inputs = $(this).find("[name]");
    var signUpData = {};
    $inputs.each(function (i, el) {
      signUpData[$(el).attr("name")] = $(el).val();
    });
    signUp(signUpData);
  });