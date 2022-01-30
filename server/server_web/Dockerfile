FROM python:3.8-slim
RUN apt-get update
WORKDIR /app/
COPY ./requirements.txt ./requirements.txt
RUN ["pip", "install", "--no-cache-dir", "--upgrade", "-r", "requirements.txt"]
COPY . .
EXPOSE 3117
CMD uvicorn app:app --host 0.0.0.0 --port 3117