import simplejson as json
intents = json.loads((open('emojis.json').read()), encoding='utf-8')
file = open("myfile.txt", "a")
c=0
his=[]

for i in intents:
    p=[]
    for j in intents[i]:
        if(j not in his):
            p.append(j)
            his.append(j)
    d={
        "tag":c,
        "patterns":p,
        "responses":[i]
    }
    c=c+1
    file.write(str(d)+",\n")
    