<template lang="">
    <transition name="add-user-form" mode="out-in">
      <div id="create-user-form" v-if="isShownAddUserPage" class="d-flex justify-content-center flex-column">
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
          <button class="btn btn-danger" @click="switchBetweenUserTableAndCreateAccount()">Back</button>
        </div>
        <transition name="cfade" tag="div">
          <label class="alert alert-danger" role="alert" v-if="isErrorEnter">
            {{ errorMessage }}
          </label>
        </transition>
      </div>
      <div v-else-if="!isShownAddUserPage">
        <h1 class="display-1 d-flex justify-content-center">Users table</h1>
        <br>
        <table class="table">
          <thead><tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
          </tr></thead>
          <transition-group name="users" tag="tbody">
            <tr v-for="(userData, index) in userDataArray" :key="userData.username">
              <th scope="row" :key="`row-${userData.username}`">{{ index + 1 }}</th>
              <td :key="`row-username-${userData.username}`">{{ userData.username }}</td>
              <td :key="`row-role-${userData.username}`">{{ userData.role }}</td>
              <td :key="`row-td-btn-delete-${userData.username}`">
                <button class="btn btn-danger" v-if="userData.role == adminRoleName" 
                  :key="`row-btn-delete--${userData.username}`" @click="removeUserRow(index)" disabled>
                  Delete
                </button>
                <button class="btn btn-danger" v-else 
                  :key="`row-btn-delete--${userData.username}`" @click="removeUserRow(index)">
                  Delete
                </button>
              </td>
            </tr>
          </transition-group>
        </table>
        <button class="button-add btn btn-success" @click="switchBetweenUserTableAndCreateAccount()">Add new user</button>
      </div>
    </transition>
</template>
<script>
import { ref, onMounted } from 'vue';
import { getAllUsersFromServer, removeUser } from '../../_services/users.service';
import { authenticationService } from '../../_services/authentication.service'
import Role from '../../_helpers/role'; // no-unused-vars


export default {
    name: 'UsersTablePage',
    setup(){
        // Store list of user data
        // Single element - { username: 'Username', role: 'Role' }
        // Username - unique value
        const userDataArray = ref([]);
        // If false - will shown table of all users, otherwise page where admin can add new user
        const isShownAddUserPage = ref(false);
        // If true - will be shown error message
        const isErrorEnter = ref(false);
        // Error messsage if some error occure
        const errorMessage = ref('');
        // Field to fill in order to add new user
        const password = ref(null);
        const passwordRepeat = ref(null);
        const username = ref(null);
        // Constants for further usage
        const adminRoleName = ref(Role.Admin);

        // At the start of the page (after page is loaded)
        onMounted(async () => {
          // Update table of users
          userDataArray.value = await getAllUsersFromServer();
        });

        function removeUserRow(index) {
          const username = userDataArray.value[index].username; 
          const role = userDataArray.value[index].role;
          // Cut single element in view
          userDataArray.value.splice(index, 1);
          // Send remove message to server
          removeUser(username, role);
        }

        function switchBetweenUserTableAndCreateAccount() {
          isShownAddUserPage.value = !isShownAddUserPage.value;
        }

        async function addNewUser() {
          let resRegister = await authenticationService.register(username.value, password.value, passwordRepeat.value);
          if (resRegister.status) {
            // All good - user registered
            userDataArray.value = await getAllUsersFromServer();
            // Close creation of user
            switchBetweenUserTableAndCreateAccount();
            // Hide error if its occure before
            isErrorEnter.value = false;
            // Clear all fields
            username.value = null;
            password.value = null;
            passwordRepeat.value = null;
          } else {
            // Something go wrong, Show error message
            isErrorEnter.value = true;
            errorMessage.value = resRegister.errorMessage;
          }
        }

        return {
            isShownAddUserPage,
            switchBetweenUserTableAndCreateAccount,
            addNewUser,
            userDataArray,
            username,
            password,
            passwordRepeat,
            isErrorEnter,
            errorMessage,
            removeUserRow,
            adminRoleName,
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


.cfade-enter-active {
  opacity: 0;
  transition: all 1.0s;
}

.cfade-enter-to {
  opacity: 1;
}


.cfade-leave-active {
  opacity: 1;
  transition: all 1.0s;
}

.cfade-leave-to {
  opacity: 0;
}

</style>