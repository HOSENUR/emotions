import random
import json
import numpy as np
from nltk.stem import WordNetLemmatizer
import nltk
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Activation
from tensorflow.keras.optimizers import SGD

intents = json.loads(open('intents.json').read())
words = []
classes = []
documents = []

for intent in intents["intents"]:
    for pattern in intent['patterns']:
        word_list = nltk.word_tokenize(pattern)
        words.append(word_list)
        documents.append((word_list, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])

print(documents)
