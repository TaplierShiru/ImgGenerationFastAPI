<template>
  <div class="enter-page">
    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" v-model="username" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" v-model="password" required>

    <button type="submit" @click="logIn">Login</button>
    <p>New user? <a href="/register" class="text-dark">Create new account</a></p>
    <label v-if="is_error_enter" id="error-enter" class="alert alert-danger" role="alert">Wrong username or password.</label>
  </div>
</template>

<script>
import { ref } from 'vue'
import { authenticationService } from '../../_services/authentication.service'
import router from '../../_helpers/router';

export default {
  name: 'LoginPage',
  setup(){
    const username = ref('');
    const password = ref('');
    const is_error_enter = ref(false);
    async function logIn() {
      const userResult = await authenticationService.login(username.value, password.value);
      if (userResult) {
        console.log("Good log/pass!");
        router.push('/menu');
        // window.location.href = '/menu';
      } else {
        is_error_enter.value = true;
      }
    }

    return {
      username,
      password,
      logIn,
      is_error_enter
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
</style>
