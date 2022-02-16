<template>
  <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
    <title>Image generation using CGAN</title>
    <nav v-if="currentUser" class="nav nav-masthead justify-content-center">
      <div class="nav nav-masthead fixed-top justify-content-center text-decoration-underline">
        <p class="nav-item nav-link text-dark">User name: {{ getUsername }}</p>
        <router-link to="/menu" class="nav-item nav-link text-dark">Home page</router-link>
        <router-link v-if="isAdmin" to="/users-table-page" class="nav-item nav-link text-dark">User control</router-link>
        <a @click="logout" class="nav-item nav-link text-dark">Logout</a>
      </div>
    </nav><br>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
    <footer class="fixed-bottom d-flex justify-content-center">
      <div>
        <p>Image generation by <a href="https://github.com/TaplierShiru" class="text-dark">@TaplierShiru</a>.</p>
      </div>
    </footer>
  </div>
</template>
<script>
import { authenticationService } from './_services/authentication.service';
import router from './_helpers/router';
import Role from './_helpers/role';
import { ref, computed } from 'vue';

export default {
  name: 'app',
  setup(){
    const currentUser = ref(null);
    authenticationService.currentUser.subscribe(x => { 
      currentUser.value = x;
    });

    const isAdmin = computed( () => { 
      return currentUser.value && currentUser.value.role === Role.Admin;
    });

    const getUsername = computed( () => {
      if (currentUser.value){
        return currentUser.value.username;
      }
      return 'Unknown';
    });

    function logout(){
      authenticationService.logout();
      router.push('/'); // Back to login page
    }

    return {
      currentUser,
      getUsername,
      isAdmin,
      logout
    }
  }
}
</script>
<style>

</style>