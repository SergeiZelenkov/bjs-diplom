"use strict"

const userForm = new UserForm()

userForm.loginFormCallback = function (data) {
   ApiConnector.login(data, (response) => {
      console.log("Ответ сервера на запрос авторизации:", response);
      if (response.success) { 
         location.reload();
     } else {
         userForm.setLoginErrorMessage("Ошибка авторизации: " + response.error);
     }
 });
};

userForm.registerFormCallback = function(data) {   
      ApiConnector.register(data, (response) => {
         console.log("Ответ сервера на запрос регистрации:", response);
         if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage("Ошибка регистрации: " + response.error);
        }
    });
};

