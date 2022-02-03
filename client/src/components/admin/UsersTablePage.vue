<template lang="">
    <transition name="add-user-form" mode="out-in">
      <div id="create-user-form" v-if="addUser" class="d-flex justify-content-center flex-column">
        <h1>Create new user account</h1>
        <p class="font-weight-bold">Please fill in this form to create an account</p><hr>
        <label for="username"><b>Username</b></label><br>
        <input type="text" placeholder="Enter username" name="username" v-model="username" required><hr>

        <label for="psw"><b>Password</b></label><br>
        <input type="password" placeholder="Enter Password" name="psw" v-model="password" required><hr>

        <label for="psw-repeat"><b>Repeat password</b></label><br>
        <input type="password" placeholder="Repeat Password" name="psw-repeat" v-model="passwordRepeat" required><hr>
        <div class="d-flex justify-content-center">
          <button class="btn btn-success" @click="addNewUser()">Create account</button>
          <button class="btn btn-danger" @click="addUserClick()">Back</button>
        </div>
        <label v-if="isErrorEnter" id="error-enter" 
          class="alert alert-danger" role="alert">
            Wrong username or password.
        </label>
      </div>
      <div v-else-if="!addUser">
        <table class="table">
          <thead><tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
          </tr></thead>
          <transition-group name="users" tag="tbody">
            <tr v-for="(userData, index) in userDataArray" :key="userData.username">
              <th scope="row" :key="`row-${userData.username}`">{{ index }}</th>
              <td :key="`row-username-${userData.username}`">{{ userData.username }}</td>
              <td :key="`row-role-${userData.username}`">{{ userData.role }}</td>
              <td :key="`row-td-btn-delete-${userData.username}`"><button class="btn btn-danger" 
                  :key="`row-btn-delete--${userData.username}`" @click="removeUserRow(index)">Delete
              </button></td>
            </tr>
          </transition-group>
        </table>
        <button class="button-add btn btn-success" @click="addUserClick()">Add new user</button>
      </div>
    </transition>
</template>
<script>
import { ref, onMounted } from 'vue';
import { getAllUsersFromServer, removeUser } from '../../_services/users.service';
import { authenticationService } from '../../_services/authentication.service'

export default {
    name: 'UsersTablePage',
    setup(){
        // Store list of user data
        // Single element - { username: 'Username', role: 'Role' }
        // Username - unique value
        const userDataArray = ref([]);
        const addUser = ref(false);
        const isErrorEnter = ref(false);
        const password = ref(null);
        const passwordRepeat = ref(null);
        const username = ref(null);

        // At the start of the page (after loaded)
        onMounted(async () => {
          userDataArray.value = await getAllUsersFromServer();
        });

        function removeUserRow(index){
          console.log(index);
          const username = userDataArray.value[index].username; 
          const role = userDataArray.value[index].role;
          // Cut single element in view
          userDataArray.value.splice(index, 1);
          // Send remove message to server
          removeUser(username, role);
        }

        function addUserClick(){
          addUser.value = !addUser.value;
        }

        async function addNewUser(){
          let resRegister = await authenticationService.register(username.value, password.value, passwordRepeat.value);
          if (resRegister){
            // All good - user registered
            userDataArray.value = await getAllUsersFromServer();
            addUserClick();
            isErrorEnter.value = false;
            username.value = null;
            password.value = null;
            passwordRepeat.value = null;
          } else{
            // Something go wrong, Show error message
            isErrorEnter.value = true;
          }
        }

        return {
            addUser,
            addUserClick,
            addNewUser,
            userDataArray,
            username,
            password,
            passwordRepeat,
            isErrorEnter,
            removeUserRow,
        }
    },
}
</script>
<style scoped>
.users-leave-active {
  transition: all 1s;
  position: absolute;
}

.users-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.users-enter-active {
  opacity: 0;
  transition: all 3s;
  transform: translateX(100px);
}

.users-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

.users-move {
  transition: transform 1s;
}

.button-add {
  position: fixed;
  bottom: 10%;
  right: 0px;
}

.add-user-form-enter-active {
  opacity: 0;
  transition: all 0.5s;
}

.add-user-form-enter-to {
  opacity: 1;
}

.add-user-form-leave-active {
  opacity: 1;
  transition: all 0.5s;
}

.add-user-form-leave-to {
  opacity: 0;
}

</style>