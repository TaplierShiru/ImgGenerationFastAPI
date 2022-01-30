# Server model
## Setup for Windows
Must be mounted to directory:

`${pwd}/../server_web/static`

### Build docker
```
docker build -t onnx-test .
```

### Start docker

```
docker run -d -p 2117:2117 -v ${pwd}/../server_web/static:/server_web_static onnx-test
```

