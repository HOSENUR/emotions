from fastapi import FastAPI
from email import message
from typing import Union
import random
import json
import pickle
import numpy as np
from nltk.stem import WordNetLemmatizer
import nltk
from fastapi import Request
from tensorflow.keras.models import load_model
lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json').read())
words = pickle.load(open('words.pkl','rb'))
classes = pickle.load(open('classes.pkl','rb'))
model = load_model('model.h5')
from EMOJIS import DATA
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('omw-1.4')

def clean(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words

def bag(sentence):
    sentence_words = clean(sentence)
    bag = [0]*len(words)
    for s in sentence_words:
        for i,w in enumerate(words):
            if w == s:
                bag[i] = 1
    return np.array(bag)

def predict(sentence):
    bow = bag(sentence)
    res= model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i,r] for i,r in enumerate(res) if r>ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    return return_list

def getResponse(intents_list, intents_json):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if(i['tag'] == tag):
            result = random.choice(i['responses'])
            break
    return result        

app = FastAPI()

@app.get("/ping")
def read_root():
    return {"res": "pong"}

@app.post("/popsicle")
async def translate(info : Request):
    req = await info.json()
    text = req['text']
    res=""
    for i in text.split(" "):
        ints = predict(i)
        res += DATA[getResponse(ints, intents)]
    return {
        "status" : "SUCCESS",
        "res" :res,
    }