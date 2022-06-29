from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/ping")
def read_root():
    return {"res": "pong"}