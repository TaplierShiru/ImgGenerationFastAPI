# Train CGAN and create ONNX models
ONNX itself - very popular format.

PyTorch by default consist of the module that can convert your model to ONNX format.
Here little example:
```
NOISE_SIZE = 100

dummy_noise = torch.randn(1, NOISE_SIZE, device="cuda", dtype=torch.float)
dummy_label = torch.randn(1, device="cuda", dtype=torch.long)

torch.onnx.export(
    gen_nn, (dummy_noise, dummy_label) , "model.onnx", verbose=True
)
```

For TensorFlow - you need install additional package from [here](https://github.com/onnx/tensorflow-onnx), 
you can install it via pip with command:
```
pip install -U tf2onnx
```
To run it, type next command with your model saved in path=`tensorflow-model-path`:
```
python -m tf2onnx.convert --saved-model tensorflow-model-path --output model.onnx
```

For additional info - refer to origin github.

## Examples of training
You can check other folders in this folder in order to look at the examples. Each folder include `README.md`
file which will explain some things.