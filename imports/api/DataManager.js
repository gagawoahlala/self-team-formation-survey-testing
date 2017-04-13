import {Candidate} from './Candidate.js';
import {Question} from './Question.js';
import * as Const from './Constants.jsx';

export default class DataManager {
  fakeData() {
    return {
      "intro": {"mturk_id": "", "name": ""},
    };
  }

  static prepareCandidates() {
    result_arr = [];
    stage1C = Candidate.find({stage: 1}).fetch();
    questions = Question.find({}).fetch();
    basic_info_q = DataManager.q4block(questions, "basic_info");
    personality_q = DataManager.q4block(questions, "personality");
    performance_q = DataManager.q4block(questions, "performance");
    for(let i = 0; i < stage1C.length; i++){
      candidate = stage1C[i];
      map = {mturk_id: candidate.mturk_id,
        name: "Candidate " + (i+1),
        stage: candidate.stage,
        basic_info: {},
        personality: {},
        performance: {}
      };

      bigFive = {
        extraversion: 0,
        agreeableness: 0,
        conscientiousness: 0,
        neuroticism: 0,
        openness: 0
      }

      for(let j = 0; j < candidate.answers.length; j ++){
        ans = candidate.answers[j];
        qualtricsid = Object.keys(ans)[0];
        q = Question.find({qualtricsid: qualtricsid}).fetch()[0];
        qid = undefined;
        if(q) qid = Number(q.qid.substring(1));

        if(qualtricsid in basic_info_q){
          if (qualtricsid == "Q20") {
            map.basic_info["Where do you see yourself in 5 years? - Write about your goals for your education, career, family, travel, or any other aspect of life. What will be your definition of success in measuring the achievement of those goals?"] = ans[qualtricsid];
          } else {
            map.basic_info[basic_info_q[qualtricsid]] = ans[qualtricsid];
          }
        }else if(qualtricsid in personality_q){
          map.personality[personality_q[qualtricsid]] = ans[qualtricsid];
          bigFive = DataManager.updatePoints(bigFive, qid, ans[qualtricsid]);
        }else{
          if(qualtricsid == "Q23") {
            map.performance["Found words"] = ans[qualtricsid];
          } else {
            map.performance[performance_q[qualtricsid]] = ans[qualtricsid];
          }
        }
      }
      map.personality["ocean"] = bigFive;
      result_arr.push(map);
    }
    return result_arr;
  }
  static q4block(questions, block){
    qs = questions.filter((q) => q.block === block);
    map = {};
    for(let i = 0; i < qs.length; i++){
      q = qs[i];
      map[q.qualtricsid] = q.content;
    }
    return map;
  }

  static calculateBigFivePoints(questions) {
    bigFive = {
      extraversion: 0,
      agreeableness: 0,
      conscientiousness: 0,
      neuroticism: 0,
      openness: 0
    }

    for (var key in questions) {
      tempKey = Number(key.substring(1));
      bigFive = DataManager.updatePoints(bigFive, tempKey, questions[key])
    }
    return bigFive;
  }

  static updatePoints(bigFive, qid, answer) {
    points = 0;
    tempBigFive = bigFive;
    if (Const.POS_POINTS.indexOf(qid) > -1) {
      points = Const.POS_LIKERT_SCALE[answer];
    } else {
      points = Const.REV_LIKERT_SCALE[answer];
    }

    if (Const.O.indexOf(qid) > -1) {
      tempBigFive.openness += points;
    } else if (Const.C.indexOf(qid) > -1) {
      tempBigFive.conscientiousness += points;
    } else if (Const.E.indexOf(qid) > -1) {
      tempBigFive.extraversion += points;
    } else if (Const.A.indexOf(qid) > -1) {
      tempBigFive.agreeableness += points;
    } else if (Const.N.indexOf(qid) > -1) {
      tempBigFive.neuroticism += points;
    } else {
      console.log("alert something went wrong!");
    }

    return tempBigFive;
  }
}
