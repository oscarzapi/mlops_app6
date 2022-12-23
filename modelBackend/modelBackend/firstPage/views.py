from django.shortcuts import render
from django.http import JsonResponse
import joblib
import json
import pandas as pd
from django.core.files.storage import FileSystemStorage

model = joblib.load('../../model/modelPipeline.pkl')
# Create your views here.




def scoreJson(request):
    data = json.loads(request.body)
    dataF = pd.DataFrame({"x":data}).transpose()
    score = model.predict_proba(dataF)[:,-1][0]
    scoreFloat = float(score)
    print(scoreFloat)
    return JsonResponse({'score':scoreFloat})

def scoreFile(request):
    fileObj = request.FILES['filePath']
    fs = FileSystemStorage()
    filePathName = fs.save(fileObj.name, fileObj)
    filePathName = fs.url(filePathName)
    filePath = '.'+filePathName

    data = pd.read_csv(filePath)
    score = model.predict_proba(data)[:,-1]
    scores = {j:k for j,k in zip(data['Loan_ID'],score)}

    scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return JsonResponse({'result':scores})
