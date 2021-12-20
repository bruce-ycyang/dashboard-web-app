FROM python:3.9
ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app/
RUN pip install --upgrade pip

RUN pip install -r ./requirements.txt
COPY  . /app

# CMD ["python", "run.py"]
CMD ["gunicorn", "-b", "0.0.0.0:5000", "run:app"]

#run this command 
#docker build . -t flask_ftx
#docker run flask_ftx -d
#docker run -p 5000:5000 flask_ftx