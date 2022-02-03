import axios from 'axios';
import config from '../_helpers/config';


export async function getAllModelNamesFromServer(){
    let arrayModels = [];

    await axios.get(`${config.serverUrl}/predict/get_all_model_names`).then(
      (response) => {
        console.log(arrayModels);
        if (response.data.result){
            arrayModels = response.data.modelNamesArray;
            console.log(arrayModels);
        }
    }).catch(
      (error) => console.log(error)
    );

    return arrayModels;
}

export async function getLabelNames(modelName){
  let modelLabelArray = null;

  await axios.post(`${config.serverUrl}/predict/get_label_array`, { model_name: modelName }).then(
    (response) => {
      if (response.data.result){
          modelLabelArray = response.data.modelLabelArray;
          console.log(modelLabelArray);
      }
  }).catch(
    (error) => console.log(error)
  );
  
  return modelLabelArray;
}