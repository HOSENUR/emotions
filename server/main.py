from typing import Union
import random
import json
import pickle
import numpy as np
from nltk.stem import WordNetLemmatizer
import nltk
from tensorflow.keraa.models import load_model
lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json').read())

from fastapi import FastAPI

app = FastAPI()


@app.get("/ping")
def read_root():
    return {"res": "pong"}