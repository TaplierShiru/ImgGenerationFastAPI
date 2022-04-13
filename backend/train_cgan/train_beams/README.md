# Train model on ***Beams*** dataset
## Dataset
Dataset can not be found anywhere - it's my dataset from work, and I don't think anybody wants it.


## How train
Example of training can be found in notebook . There need todo some changes in path to dataset, 
and other things pritty easy, if you know TensorFlow 2.x.

## How create ONNX
After training your model, you save it in folder `results/models/test_save`.

You need to run next command in folder `results/models`:
```
python -m tf2onnx.convert --saved-model test_save --output model.onnx --opset 13
```

NOTICE! I don't know why, but this command without `opset` parameter just does not work, 
so its must be here.
`opset` - its parameter for version of onnx in conversation stage. 
For this moment last version is 15, but its recommended to use 13 version.