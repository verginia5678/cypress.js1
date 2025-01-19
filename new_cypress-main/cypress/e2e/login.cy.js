describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio/'); // Зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');

         cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
         cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
         cy.get('#loginButton').click(); // Нажали войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяем, что после авторизации виден текст
         cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверяем наличие крестика
     })
     it('Восстановление пароля', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');

        cy.get('#forgotEmailButton').click(); // Нажали "Забыли пароль?"
        cy.get('#forgotForm > .header').contains('Восстановите пароль') // Проверяем текст
        cy.get('#forgotForm > .header').should('be.visible'); // Текст виден пользователю
        
        cy.get('#mailForgot').type('verginia5678@icloud.com') // Ввели маил
        cy.get('#restoreEmailButton').click(); //Нажали "Отправить код"
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');  // Проверяем текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверяем наличие крестика
    })
    it('НЕверный пароль и верный логин', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');

        cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio2'); // Ввели неверный пароль
        cy.get('#loginButton').click(); // Нажали войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяем, что после авторизации виден текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверяем наличие крестика
    })
    it('Верный пароль и НЕверный логин', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');

        cy.get('#mail').type('german@dolnikov1.ru'); // Ввели неверный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажали войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяем, что после авторизации виден текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверяем наличие крестика
    })
    it('Ошибка валидации', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');

        cy.get('#mail').type('germandolnikov1.ru'); // Ввели логин без @
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажали войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверяем, что после авторизации виден текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверяем наличие крестика
    })
    it('Проверка строчных букв', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');

        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввели логин с заглавными буквами
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажали войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяем, что после авторизации виден текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверяем наличие крестика
    })
    describe('Покупка аватара', function () {                                // название набора тестов
        it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
             cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
             cy.get('input[type="email"]').type('USER_LOGIN');                   // вводим логин
             cy.get('input[type="password"]').type('USER_PASSWORD');               // вводим пароль
             cy.get('button[type="submit"]').click();                        // нажимаем кнопку Подтвердить
             cy.wait(2000);
             cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
             cy.get('[href="/shop"]').click();                               // нажимаем кнопку Магазин
             cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
             cy.get('.credit').type('4620869113632996');                     // вводим номер карты
             cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
             cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
             cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
             cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
             cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
             cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
             cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
         });
     });
    
 })
 