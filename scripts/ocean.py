# def calculateOCEAN(data):
# 	DENOMINATOR = 50
# 	O = ["q5", "q10", "q15", "q20", "q25", "q30", "q35", "q40", "q41", "q44"]
# 	C = ["q3", "q8", "q13", "q18", "q23", "q28", "q33", "q38", "q43"]
# 	E = ["q1", "q6", "q11", "q16", "q21", "q26", "q31", "q36"]
# 	A = ["q2", "q7", "q12", "q17", "q22", "q27", "q32", "q37", "q42"]
# 	N = ["q4", "q9", "q14", "q19", "q24", "q29", "q34", "q39"]
# 	POS_POINTS = ["q1", "q3", "q4", "q5", "q7", "q10", "q11", "q13", "q14", "q15", "q16", "q17",
# 					"q19", "q20", "q22", "q25", "q26", "q28", "q29", "q30", "q32", "q33", "q36",
# 					"q38", "q39", "q40", "q42", "q44"]
# 	REV_LIKERT_SCALE = {
# 							"Strongly disagree": 5,
# 							"Somewhat disagree": 4,
# 							"Neither agree nor disagree": 3,
# 							"Somewhat agree": 2,
# 							"Strongly agree": 1
# 						};
#
# 	POS_LIKERT_SCALE = {
# 							"Strongly disagree": 1,
# 							"Somewhat disagree": 2,
# 							"Neither agree nor disagree": 3,
# 							"Somewhat agree": 4,
# 							"Strongly agree": 5
# 						};
# 	DENOMINATORS = {"O":50, "C":45, "E":40, "A":45, "N":40}
#
# 	ocean_score = {"O":0, "C":0, "E":0, "A":0, "N":0}
#
# 	for key, value in data.items():
# 		if value not in POS_LIKERT_SCALE.keys():
# 			print "Error! Question id " + key + " does not have a valid answer!"
# 			break
# 		points = POS_LIKERT_SCALE[value] if key in POS_POINTS else REV_LIKERT_SCALE[value]
# 		if key in O:
# 			ocean_score["O"] += points;
# 		elif key in C:
# 			ocean_score["C"] += points;
# 		elif key in E:
# 			ocean_score["E"] += points;
# 		elif key in A:
# 			ocean_score["A"] += points;
# 		elif key in N:
# 			ocean_score["N"] += points;
# 		else:
# 			print "Error! Question id " + key + " is not valid!"
# 			break;
#
# 	for key, value in ocean_score.items():
# 		ocean_score[key] = value * 50 / DENOMINATORS[key]
#
# 	return ocean_score

def calculateOCEAN(data):
	DENOMINATOR = 50
	O = ["q5", "q10", "q15", "q20", "q25", "q30", "q35", "q40", "q41", "q44"]
	C = ["q3", "q8", "q13", "q18", "q23", "q28", "q33", "q38", "q43"]
	E = ["q1", "q6", "q11", "q16", "q21", "q26", "q31", "q36"]
	A = ["q2", "q7", "q12", "q17", "q22", "q27", "q32", "q37", "q42"]
	N = ["q4", "q9", "q14", "q19", "q24", "q29", "q34", "q39"]
	POS_POINTS = ["q1", "q3", "q4", "q5", "q7", "q10", "q11", "q13", "q14", "q15", "q16", "q17",
					"q19", "q20", "q22", "q25", "q26", "q28", "q29", "q30", "q32", "q33", "q36",
					"q38", "q39", "q40", "q42", "q44"]
	REV_LIKERT_SCALE = {
							"Strongly disagree": 5,
							"Somewhat disagree": 4,
							"Neither agree nor disagree": 3,
							"Somewhat agree": 2,
							"Strongly agree": 1
						};

	POS_LIKERT_SCALE = {
							"Strongly disagree": 1,
							"Somewhat disagree": 2,
							"Neither agree nor disagree": 3,
							"Somewhat agree": 4,
							"Strongly agree": 5
						};
	DENOMINATORS = {"O":50, "C":45, "E":40, "A":45, "N":40}

	ocean_score = {"O":0, "C":0, "E":0, "A":0, "N":0}

	for key, value in data.items():
		if value not in POS_LIKERT_SCALE.keys():
			print "Error! Question id " + key + " does not have a valid answer!"
			break
		points = POS_LIKERT_SCALE[value] if key in POS_POINTS else REV_LIKERT_SCALE[value]
		if key in O:
			ocean_score["O"] += points;
		elif key in C:
			ocean_score["C"] += points;
		elif key in E:
			ocean_score["E"] += points;
		elif key in A:
			ocean_score["A"] += points;
		elif key in N:
			ocean_score["N"] += points;
		else:
			print "Error! Question id " + key + " is not valid!"
			break;
	return ocean_score

def prepareAnswers(raw_answers, mapi):
	result = {}
	for a in raw_answers:
		k = a.keys()[0]
		if k[0] == 'Q':
			if k not in mapi: continue
			result[mapi[k]] = a[k]
		elif k[0] == 'q':
			result[k] = a[k]
	return result

def tocsv(arrofdict):
	keys = ['mturk_id', 'E', 'A', 'C', 'N', 'O']
	return '\n'.join([','.join(keys)] + [','.join([str(d[k]) for k in keys]) for d in arrofdict])


def main():
	import json
	with open('questions.json') as f:
		qs = json.load(f)
		qual2qid = {q['qualtricsid']: q['qid'] for q in qs if q['answertype'] == '5_likert'}
		shift = {k: ('q' + str(int(qual2qid[k][1:])-10)) for k in qual2qid}
	with open('result2.json') as f:
		data = json.load(f)
		# stage2c = data[:61]
		# result = [dict({'mturk_id': c['mturk_id']}, **calculateOCEAN(prepareAnswers(c['answers'], shift))) for c in stage2c]
		stage1c = [d for d in data if d['stage'] == 1]
		result = [dict({'mturk_id': c['mturk_id']}, **calculateOCEAN(prepareAnswers(c['answers'], shift))) for c in stage1c]
	with open('ocean1.csv', 'w') as f:
		f.write(tocsv(result))
		f.close()

if __name__ == '__main__':
	main()
