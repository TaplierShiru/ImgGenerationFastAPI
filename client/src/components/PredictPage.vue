<template lang="">
  <div class="container-xxl">
    <br>
    <div class="image-container">
      <div class="row d-flex justify-content-md-center">
        <select v-model="selectedModelName">
          <option v-for="modelName in modelNamesArray" :key="modelName">
            {{ modelName }}
          </option>
        </select>
      </div>
      <br>
      <div class="row d-flex justify-content-md-center">
        <transition name="cfade" tag="div" mode="out-in">
          <img v-if="imgUrl" :src="imgUrl" class="image"/>
          <div v-else-if="isGenerateInProcess" class="row d-flex justify-content-md-center">
            <p>Generation of image in process...</p>
          </div>
          <div v-else class="row justify-content-md-center">
            <p>Choose model type, label and click `Generate` button to generate image</p>
          </div>
        </transition>
      </div>
    </div>
    <div class="container-xxl margin-top-xxl">
      <div class="row d-flex justify-content-md-center">
        <div class="col col-md-auto">
          <button type="button" class="btn btn-success" @click="generateImage">Generate Image</button>
        </div>
        <div class="col col-md-auto">
          <button type="button" class="btn btn-secondary">Save Image</button>
        </div>
      </div>
      <div class="row d-flex justify-content-md-center">
        <select class="form-select" v-model="labelGeneration" aria-label="Select label to generate">
          <option disabled value="">Choose generation label number</option>
          <option v-for="(labelNumber, index) in labelArray" :key="index" v-bind:value="index">
            {{ labelNumber }}
          </option>
        </select>
      </div>
      <div class="row d-flex justify-content-md-center">
        <transition name="cfade" tag="div" mode="out-in">
          <label id="error-choose-generation-label" v-if="isErrorChooseGenerationLabel"
            class="alert alert-danger" role="alert">
              Choose number to generate.
          </label>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import config from '../_helpers/config';
import b64toBlob from '../_helpers/b64toblob';
import { getAllModelNamesFromServer, getLabelNames } from '../_services/model.service';
import { authenticationService } from '../_services/authentication.service';


export default {
    name: "PredictPage",
    setup(){
      // Hold generated image
      const imgUrl = ref(null);
      // If true - will show massage what generation in process
      const isGenerateInProcess = ref(false);
      // Label for generation, selected label from user
      const labelGeneration = ref(null);
      // If any error occure before generation, set to True in order
      // to show error message to user
      const isErrorChooseGenerationLabel = ref(false);
      // Array of possibly models to generate something
      const modelNamesArray = ref([]);
      // Selected model from `modelNamesArray`
      const selectedModelName = ref(null);
      // Array of possibly label to generate by model
      const labelArray = ref([]);

      // At the start of the page (after loaded)
      onMounted(async () => {
        // Update array of possibly models, method will return array of strings
        modelNamesArray.value = await getAllModelNamesFromServer();
      });

      // Generate new image with certain label and model name
      async function generateImage(){
          // check if label is num between certain number
          const lbl = parseInt(labelGeneration.value);
          if (isNaN(lbl) || selectedModelName.value === null){
            // Empty label
            isErrorChooseGenerationLabel.value = true;
            return;
          }
          // All good, reset if early some error occure
          isErrorChooseGenerationLabel.value = false;
          // Send message to generate new img to server
          // Generation can take some time 
          // So we must wait answer from server then its ready
          axios.post(`${config.serverUrl}/predict`, { 
            label: lbl, 
            model_name: selectedModelName.value,
            username: authenticationService.currentUserNameValue
          }).then((response) => {
              // Show message that generation in process
              isGenerateInProcess.value = true;
              // Clear previous image
              imgUrl.value = null;
              if (response.data.status_task){
                // Check generation status each second, while we do not take final img
                // TODO: Fix number of requests
                let checkStatusImage = setTimeout( // eslint-disable-line no-unused-vars
                  function checkImage() {
                    axios.post(`${config.serverUrl}/predict/take_result`, {
                      username: authenticationService.currentUserNameValue
                    }).then(
                      (response) => {
                        if (response.data.imageUrl){
                          // Convert sended image to url
                          const blob = b64toBlob(response.data.imageUrl, 'image/png')
                          imgUrl.value = URL.createObjectURL(blob);
                          isGenerateInProcess.value = false;
                        }
                        else{
                          // Wait another 1000ms and request again
                          checkStatusImage = setTimeout(checkImage, 1000);
                        }
                      }
                    );
                  }, 1000);
              }
            }
          ).catch(
            (error) => {
              console.log(error);
            }
          )
      }

      // Each model have own set of labels
      async function updateLabelNames(){
        labelArray.value = await getLabelNames(selectedModelName.value);
      }
      // Update array of possible labels for chosen model
      watch(selectedModelName, updateLabelNames)

      return {
        labelGeneration,
        labelArray,
        selectedModelName,
        modelNamesArray,
        isErrorChooseGenerationLabel,
        imgUrl,
        isGenerateInProcess,
        updateLabelNames,
        generateImage,
      }
    }
}
</script>
<style scoped>

.cfade-enter-active {
  opacity: 0;
  transition: all 1.0s;
/*  transform: translateY(-400px); */
}

.cfade-enter-to {
  opacity: 1;
/*  transform: translateX(0px); */
}


.cfade-leave-active {
  opacity: 1;
  transition: all 1.0s;
/*  transform: translateY(0); */
}

.cfade-leave-to {
  opacity: 0;
/*  transform: translateY(400px); */
}


.image {
  max-height: 250px;
  max-width: 250px;
  min-width: 100px;
  min-width: 100px;
}

.image-container {
  height: 300px; /* Max img size its 250 */
}

</style>