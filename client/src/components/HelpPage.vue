<template>
  <div class="enter-page">
    <br>
    <h1 class="display-1 d-flex justify-content-md-center">Help page</h1>
    <br>
    <section id="content-table">
        <h1>Содержание</h1>
    </section>
    <ul>
      <li><a href="#aim-system" class="link-light">Назначение системы</a></li>
      <li><a href="#cond-system-work" class="link-light">Необходимые условия работы системы</a></li>
      <li><a href="#install-system" class="link-light">Установка системы</a></li>
      <li><a href="#work-with-system" class="link-light">Руководство пользователя</a></li>
      <li><a href="#enter-page" class="link-light">Вход в систему (авторизация)</a></li>
      <li><a href="#main-page" class="link-light">Главная страница</a></li>
      <li><a href="#help-page" class="link-light">Страница с руководством пользователя</a></li>
      <li><a href="#generation-page" class="link-light">Страница по генерации изображений</a></li>

      <li><a href="#admin-work" class="link-light">Работа с системой в режиме администратора</a></li>
      <ul>
        <li><a href="#user-control-page" class="link-light">Страница по управлению учетными записями</a></li>
        <li><a href="#add-new-user-page" class="link-light">Добавление нового пользователя</a></li>
      </ul>
    </ul>

    <section id="aim-system">
        <h2>Назначение системы  </h2>
        <p>
            Информационная система ««Генерация изображений оптических пучков» предназначена для 
            генерации условных изображений оптических пучков от различных нейросетевых моделей, 
            в том числе с разным количеством генерируемых классов, а также с возможностью администрирования 
            учетных записей для доступа к системе.
        </p>
    </section>

    <div id="cond-system-work" class="d-flex justify-content-center flex-column">
        <h2>Необходимые условия работы системы  </h2>
        <p>
            Для корректного функционирования серверной части системы необходимо:
            <ul>
                <li>тип ЭВМ: x86-64 совместимый;</li>
                <li>объем ОЗУ – не менее 6 Гб;</li>
                <li>объем свободного дискового пространства – не менее 24 Гб;</li>
                <li>клавиатура или иное устройство ввода;</li>
                <li>мышь или иное манипулирующее устройство;</li>
                <li>монитор с разрешением 1024х768 и более;</li>
                <li>браузер Microsoft Edge версии 98.0 и выше.</li>
                <li>установленная программное обеспечением Docker Desktop версии 4.5 и выше.</li>
            </ul>
            Для корректного функционирования клиентской части системы необходимо:
            <ul>
              <li>тип ЭВМ: x86-64 совместимый;</li>
              <li>объем ОЗУ – не менее 4 Гб;</li>
              <li>объем свободного дискового пространства – не менее 21 Гб;</li>
              <li>клавиатура или иное устройство ввода;</li>
              <li>мышь или иное манипулирующее устройство;</li>
              <li>монитор с разрешением 1024х768 и более;</li>
              <li>браузер Microsoft Edge версии 98.0 и выше.</li>
            </ul>
        </p>
    </div>

    <div id="install-system" class="d-flex justify-content-center flex-column">
        <h2>Установка среды  </h2>
        <p>
            Система предоставляется в виде zip-файла. Данный файл необходимо распоковать в любую дерикторию, 
            и зайти в распокованную папку, чего необходимо развернуть контейнеры, описанные в файле 
            docker-compose.yml, для этого нужно открыть консоль в данной папке и ввести команду в консоли, 
            указанной на рисунке 1.
        </p>  
        <div align="center">
          <img src="@/assets/help/command_docker.png"/>
          <p>Рисунок 1 – Форма авторизации</p>
        </div>
    </div>

    <div id="work-with-system" class="d-flex justify-content-center flex-column">
        <h2>Руководство пользователя  </h2>
        <p>
          После запуска сиистемы, необходимо перейти на страницу сервиса в браузере, для этого нужно 
          открыть браузер Microsoft Edge и ввести адресс – http://localhost:8080/.
        </p>
        <div id="enter-page">
          <h2>Вход в систему </h2>
          <p>
            После перехода на страницу сервиса, откроется страница аутентификации 
            (см. рисунок 2). На данной странице, пользователю необходимо ввести логин 
            и пароль от аккаунта выданный администратором, также для тестирования программы 
            есть аккаунт с логином и паролем – admin. Данный аккаунт должен быть убран 
            администратором при эксплуатации системы.
          </p>
          <div class="d-flex justify-content-center flex-column">
            <img src="@/assets/help/enter_page.png"/>
            <p align="center">Рисунок 2 – Страница аутентификации</p>
          </div>
        </div>

        <div id="main-page">
          <h2>Главная страница  </h2>
          <p>
            При входе в систему, открывается главная страница (см. рисунок 3).
          </p>
          <div class="d-flex justify-content-center flex-column">
            <img src="@/assets/help/main_page.png"/>
            <p align="center">Рисунок 3 – Страница аутентификации</p>
          </div>
          <p>
            На каждой странице в системе, есть шапка страницы, которая 
            состоит из: логина пользователя, сыллки на главную страницу, сыллки на страницу 
            с управлением учетными записями (доступно лишь для администратора), сыллка на страницу 
            с руководством пользователя и выход из системы обратно к странице аутентификации.
          </p>
        </div>

        <div id="help-page">
          <h2>Главная страница  </h2>
          <p>
            При нажатии на кнопку "Help" открывается страница с руководством пользователя, 
            изображенная на рисунке 4.
          </p>
          <div class="d-flex justify-content-center flex-column">
            <img src="@/assets/help/help_page.png"/>
            <p align="center">Рисунок 4 - Страница с руководством пользователя</p>
          </div>
        </div>

        <div id="generation-page">
          <h2>Страница по генерации изображений  </h2>
          <p>
            На главной странице, пользователь может перейти к странице с генерацией изображений, 
            нажав на кнопку «Predict page» (см. рисунок 5).
          </p>
          <div class="d-flex justify-content-center flex-column">
            <img src="@/assets/help/generate_page.png"/>
            <p align="center">Рисунок 5 – Страница с генерацией изображений</p>
          </div>
          <p>
            На данной странице, пользователь может выбрать модель для генерации и 
            класс генерации в выпадающих списках. После чего пользователь может нажать 
            на кнопку «Generate Image» для генерации изображений, а также он может скачать 
            полученный результат, нажав на кнопку «Save Image».
          </p>
          <p>
            Пример генерации показан на рисунке 6.
          </p>
          <div class="d-flex justify-content-center flex-column">
            <img src="@/assets/help/generate_example.png"/>
            <p align="center">Рисунок 6 – Итог генерации</p>
          </div>
        </div>


        <div id="admin-work">
          <div id="user-control-page">
            <h2>Страница по управлению учетными записями  </h2>
            <p>
              Если пользователь имеет роль администратора, то он может перейти на страницу 
              управления учетными записями, нажав на ссылку «User control» в шапке страницы 
              (см. рисунок 7).
            </p>
            <div class="d-flex justify-content-center flex-column">
              <img src="@/assets/help/users_table.png"/>
              <p align="center">Рисунок 7 – Страница управления учетными записями</p>
            </div>
          </div>

          <div id="add-new-user-page">
            <h2>Добавление нового пользователя  </h2>
            <p>
              На данной странице, администратор может удалять учетные записи пользователей, 
              но при этом он не может удалять других, в том числе себя, администраторов. 
              Для добавления нового пользователя, администратору необходимо нажать на кнопку
              «Add new user», после чего откроется форма для заполнения (см. рисунок 8).
            </p>
            <div class="d-flex justify-content-center flex-column">
              <img src="@/assets/help/add_new_user.png"/>
              <p align="center">Рисунок 8 – Форма для добавления пользователя</p>
            </div>

            <p>
              В данной форме администратору нужно заполнить поле логина и дважды
              повторить пароль, после чего для добавления пользователя в систему, 
              администратору нужно нажать на кнопку «Create account». 
              Если не было никаких ошибок – администратор вернется обратно к таблице пользователей,
                если же была ошибка – система оповестит администратора об ошибке (см. рисунок 9).
            </p>
            <div class="d-flex justify-content-center flex-column">
              <img src="@/assets/help/add_new_user_error.png"/>
              <p align="center">Рисунок 9 – Пример ошибки в форме для добавления пользователя</p>
            </div>

          </div>
        </div>
    </div>


    <footer class="bottom-right">
      <div>
        <a href="#content-table" class="link-light">На верх</a>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'HelpPage',
  setup(){

    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Bordered form */
form {
  border: 3px solid #f1f1f1;
}

/* Full-width inputs */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}

.bottom-right {
  position: fixed;
  bottom: 10%;
  right: 10%;
}
</style>
