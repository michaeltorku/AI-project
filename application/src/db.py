import pandas as pd
import joblib
import json


def run_model():
    df = pd.read_json('./data/data.json', orient = "index")
    df = df.T
    row = df.loc[0]
    columns = df.columns[2:19]

    ratio = [1]
    columns2 = ["empty"]
    for i in range(len(columns)):
      for j in [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]:
        df = df.append(row)
        df.iloc[-1,i] = j * df.iloc[-1,i]
        ratio.append(j)
        columns2.append(columns[i])
    for i in range(len(columns)):
        for j in [1, 2, 3, 4, 5, 6, 7, 8, 9]:
          df = df.append(row)
          df.iloc[-1, i] = j * df.iloc[-1, i]
          ratio.append(j)
          columns2.append(columns[i])
    new_model = joblib.load("classifier.h5")
    scalar = joblib.load("scalar.h5")

    X = scalar.transform(df)
    yprd = new_model.predict(X)
    cols = df.columns
    obj = {}
    obj['credit_score'] = str(yprd[0])
    greater = []
    i = 0
    while i < len(yprd):
        text = ""
        if yprd[0] == 2: 
           text = "Good job! You have a high score. Our AI could not find any ways to reliably increase your credit score."
           greater.append(text)
           break;
        if yprd[i] > yprd[0]:
            if i < (len(yprd)- 1) / 2: 
              text = "Our AI found that you can improve your credit score by decreasing your " + columns2[i] + " by " + str(ratio[i] * 10) + " percent."
              greater.append(text)
              i = i + 9 + (i - 1) % 9
            else: 
              text = "Our AI found that you can credit score by decreasing your " + columns2[i] + " by " + str(ratio[i]) + " percent."
              greater.append(text)
              i = i + 9 + (i - 1) % 9
        i += 1
    if (len(greater) == 0):
       if (yprd[0] != 2):
        text = "Our AI could not find any factors to reproduce"
        greater.append(text)
    obj['improvements'] = greater

    # print(obj)
    print(yprd)
    with open("./data/results.json", "w") as outfile:
        json.dump(obj, outfile)

run_model();
