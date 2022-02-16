# Train model on ***Rock, paper and scissors*** dataset
## Dataset
Dataset can be found [here](https://www.tensorflow.org/datasets/catalog/rock_paper_scissors).
I train model only on training dataset part, where 3 folders with images for each class 
(rock, paper or scissors).

## How train
Example of training can be found in notebook . There need todo some changes in path to dataset, 
and other things pritty easy, if you know TensorFlow 2.x.

Original idea for CGAN taken from paper
[cGANs with Projection Discriminator](https://paperswithcode.com/paper/cgans-with-projection-discriminator).
I found this paper easy for me, and this configuration of model gives very good results, compare to original CGAN model.

## How create ONNX
After training your model, you save it in folder `results/models/test_save`.

You need to run next command in folder `results/models`:
```
python -m tf2onnx.convert --saved-model test_save --output model.onnx --opset 15
```

NOTICE! I don't know why, but this command without `opset` parameter just does not work, so its must be here.
`opset` - its parameter for version of onnx in conversation stage. For this moment last version is 15.