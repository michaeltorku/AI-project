import pandas as pd
import joblib
import json


def run_model():
    df = pd.read_json('../data/data.json', orient = "index")
    df = df.T
    row = df.loc[0]
    for i in range(4, 12):
        df = df.append(row)
        df.iloc[i-3,i] *= 0 * df.iloc[i-3,i]
    # for i in range(4, 12):
    #     df = df.append(row)
    #     df[i].iloc[i+5, i] *= 0.75 * df.iloc[i+5, i]
    new_model = joblib.load("classifier.h5")
    scalar = joblib.load("scalar.h5")

    X = scalar.transform(df)
    yprd = new_model.predict(X)
    cols = df.columns
    obj = {}
    obj['credit_score'] = str(yprd[0])
    greater = {}
    plus = []
    minus = []
    for i in range(len(yprd)):
        if yprd[i] > yprd[0]:
            col = ""
            if i < 9:
                plus.append(str(cols[i+3]))
            else: 
                minus.append(str(cols[i-5]))
    greater['plus'] = plus
    greater['minus'] = minus
    obj['improvements'] = greater

    # print(obj)
    print(yprd)
    with open("../data/results.json", "w") as outfile:
        json.dump(obj, outfile)

run_model();
