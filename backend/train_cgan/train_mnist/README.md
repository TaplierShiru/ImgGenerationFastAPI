# Train CGAN on ***mnist*** dataset
## Dataset
You can download it from [official site](http://yann.lecun.com/exdb/mnist/), or download it from [kaggle](https://www.kaggle.com/c/digit-recognizer).

I recommend download it from Kaggle and check my notebook how I load dataset.

## How train
I think that mnist dataset - is very easy dataset for almost every model/task.

So I trained model using [CGAN model](https://arxiv.org/abs/1411.1784) without any super-dupa-changes on 
Kaggle platform, you can check code/run it on this platform.
[Link to notebook](https://www.kaggle.com/tapliershiru/cgan-on-mnist-dataset-tensorflow-2-x-onnx).

## How create ONNX
After training, you will save your model into folder, and after that you need to run command:
```
python -m tf2onnx.convert --saved-model path-to-folder --output model.onnx --opset 15
```

NOTICE! I don't know why, but this command without `opset` parameter sometimes just does not work, so its must be here.
`opset` - its parameter for version of onnx in conversation stage. For this moment last version is 15.

About Kaggle notebook, for some reason TensorFlow can't clear GPU memory in proper way and its hard to run
`tf2onnx` command in notebook, so I do next:
- Save model to folder;
- Zip this folder;
- Download it;
- Create ONNX model on my PC or via [Colab](https://colab.research.google.com/) (In this notebook 
you can simply load model into notebook via files and create ONNX model via same command);
- Download created model from colab (if colab was chosen) and place it in this project.

