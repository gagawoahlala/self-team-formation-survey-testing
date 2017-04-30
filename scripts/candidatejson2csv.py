import json

FIELDS = ['mturk_id', 'selection', 'rating', 'code', 'blocks', 'metaRating']

def candidate2csvline(candidate_dict, fields):
    return '\t'.join([json.dumps(candidate_dict[field]) for field in fields])

def main():
    with open('result2.json') as f:
        data = json.load(f)[:61]
        return '\n'.join(['\t'.join(FIELDS)] +
            [candidate2csvline(d, FIELDS) for d in data])

if __name__ == '__main__':
    ff = open('stage2.tsv', 'w')
    ff.write(main())
    ff.close()
