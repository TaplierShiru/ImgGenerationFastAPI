<template lang="">
  <div class="container">
    <div class="row justify-content-md-center">
      <transition name="image-generated" tag="div" mode="out-in">
        <img v-if="imgUrl" :src="imgUrl"/>
        <div v-else-if="isGenerateInProcess" class="row justify-content-md-center">
          <p>Generation of image in process...</p>
        </div> 
      </transition>
    </div>
    <div class="row justify-content-md-center">
      <div class="col col-md-auto">
        <button type="button" class="btn btn-success" @click="generateImage">Generate Image</button>
      </div>
      <div class="col col-md-auto">
        <button type="button" class="btn btn-secondary">Save Image</button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import axios from 'axios';
import config from '../_helpers/config';
import b64toBlob from '../_helpers/b64toblob';


export default {
    name: "PredictPage",
    setup(){
      const imgUrl = ref(null);
      const isGenerateInProcess = ref(false);

      async function generateImage(){
          // Send message to generate new img to server
          // Generation can take some time 
          // So we must wait answer from server then its ready
          axios.post(`${config.serverUrl}/predict`, { label: 0 }).then(
            (response) => {
              console.log(response);
              isGenerateInProcess.value = true;
              imgUrl.value = null;
              if (response.data.status_task){
                // Check generation status each second
                let checkStatusImage = setTimeout( // eslint-disable-line no-unused-vars
                  function checkImage() {
                    axios.get(`${config.serverUrl}/predict/take_result`).then(
                      (response) => {
                        console.log(response);
                        if (response.data.imageUrl){
                          const blob = b64toBlob(response.data.imageUrl, 'image/png')
                          imgUrl.value = URL.createObjectURL(blob);
                          isGenerateInProcess.value = false;
                        }
                        else{
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

      return {
        imgUrl,
        isGenerateInProcess,
        generateImage,
      }
    }
}
</script>
<style scoped>

.image-generated-enter-active {
  opacity: 0;
  transition: all 2.0s;
/*  transform: translateY(-400px); */
}

.image-generated-enter-to {
  opacity: 1;
/*  transform: translateX(0px); */
}


.image-form-leave-active {
  opacity: 1;
  transition: all 2.0s;
/*  transform: translateY(0); */
}

.image-form-leave-to {
  opacity: 0;
/*  transform: translateY(400px); */
}

</style>