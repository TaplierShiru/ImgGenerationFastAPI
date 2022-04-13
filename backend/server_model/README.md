# Server model module
The main purpose of this module is to run onnx models with ONNX-Runtime.

In `onnx_model/models` stored all models for this module. 
For now there are `model.onnx` and `model_better.onnx` models which generate digit (from MNIST dataset)
by given label. In same folder, there is `model_data.json` - file which contains 
of configuration for each model. 

There are three main keys for each model:
- `path` - path to model;
- `labels` - array of possibly labels for this models. This is important to backend and web modules;
- `noise_dim` - noise dimension for generator, it can be different for models;
- `type` - type of class model;

Each model have own config data, which can be found in `onnx_models/models/model_data.json` file.
First key - name of the model, value - config for this model. There are parameters mentioned above.
Important part - its `type` - this is name of the class which will create our model and run it.

In order to add custom model - you need to create your own class which implements methods from `BaseModel`,
add config file into `model_data.json` and append your model into `model_collection` 
(How add it - you can find example inside script)

For more examples how to train and transfer model to ONNX, refer to folder `server/train_cgan` 
where you can find `README.md` file with more info.

## How to start docker
### 1. Build docker
```
docker build -t onnx-test .
```

### 2. Start docker

```
docker run -d -p 2117:2117 -v ${pwd}/../server_web/static:/server_web_static onnx-test
```

### 3. Test server
Now you can connect to your docker via port 2117 for some client side.
You can test your connection with next simple example:
```
import xmlrpc.client


SERVER_IP = "127.0.0.1"
SERVER_PORT = 2117

server_rcp = xmlrpc.client.ServerProxy(
    f'http://{SERVER_IP}:{SERVER_PORT}'
)
print(server_rcp.get_all_model_names())
```
