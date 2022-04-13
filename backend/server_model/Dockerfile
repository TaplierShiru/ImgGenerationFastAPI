FROM mcr.microsoft.com/azureml/onnxruntime:latest
RUN apt update
RUN apt install -y python3.8
COPY ./requirements.txt ./requirements.txt
RUN apt remove python-pip
RUN apt install python3-pip
RUN python3 -m pip install pip
RUN ["pip3", "install", "--upgrade", "pip"]
RUN ["pip3", "install", "--no-cache-dir", "--upgrade", "-r", "requirements.txt"]
COPY . .
EXPOSE 2117
CMD python3 server_model.py