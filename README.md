# ImgGenerationFastAPI
Image generation using GANs with FastAPI as front-end

# Run docker with Redis and RabbitMQ
Redis:
`docker run -d -p 6379:6379 redis`

RabbitMQ:
`docker run -d -p 5672:5672 rabbitmq`

# Start server and workers
Server:
`uvicorn app:app`

Workers with Celery:
`celery -A celery_task_app.worker worker -l info`

# Problem with Celery on Windows
### Solution 1
While trying to start Celery on windows, I have some problems with that,
but found some solution in the Internet
in order to start worker on Windows try next:

Install:

`pip install eventlet`

After that, Celery can be started via command:

`celery -A celery_task_app.worker worker --pool=eventlet`

*but* there is some issue with this `eventlet`

### Solution 2 (recommended)

Instal:
`pip install gevent`

Run Celery with command: `celery -A celery_task_app.worker worker -l info -P gevent`


Tested on Windows 10