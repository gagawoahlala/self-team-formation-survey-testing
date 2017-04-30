def readcsv(path):
    dic = {}
    with open(path) as f:
        for line in f.readlines()[1:]:
            arr = line.strip().split(',')
            dic[arr[0]] = ','.join(arr[1:])
    return dic

def merge(candidate, dict1, dict2):
    result = []
    prefix = candidate['mturk_id'] + ',' + '|'.join(candidate['blocks']) + ',' + dict2[candidate['mturk_id']]
    if len(candidate['rating']) < 10:
        print candidate
    for c in candidate['rating']:
        result.append(prefix + ',' + c + ',' + str(candidate['rating'][c]) + ',' + dict1[c])
    return result

def main():
    import json
    stage2odic = readcsv('ocean2.csv')
    stage1odic = readcsv('ocean1.csv')
    with open('result2.json') as f:
        stage2c = json.load(f)[:61]
        res = [','.join(['rater_id', 'block', 'E', 'A', 'C', 'N', 'O', 'candidate_id', 'rating', 'E', 'A', 'C', 'N', 'O'])]
        for candidate in stage2c:
            res += merge(candidate, stage1odic, stage2odic)
    with open('merge.csv', 'w') as f:
        f.write('\n'.join(res))
        f.close()
if __name__ == '__main__':
    main()
