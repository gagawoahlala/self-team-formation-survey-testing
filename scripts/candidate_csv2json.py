import json
import codecs

# get qualtrics ids
with open('questions.json') as json_file:
    questions = json.load(json_file)
qualtricsid_set = set([q['qualtricsid'] for q in questions])

data_start_row = 3 # 0 based
data = codecs.open("stage1.csv", "r", "utf-8").read().strip().split('\n')
rev_indices, id_idx = {field:idx for idx, field in enumerate(data[0].split('\t'))
                if field in qualtricsid_set}, data[0].split('\t').index('workerID')
result_arr = []
for datum in data[data_start_row:]:
    datum = datum.split('\t')
    print len(datum)
    print datum[101]
    result_arr.append({'mturk_id': datum[id_idx],
                        'stage': 1,
                        'answers': [{k: datum[v]} for k, v in rev_indices.iteritems()]})
json.dump(result_arr, open('stage1.json', 'w'))
