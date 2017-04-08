import {Candidate} from './Candidate.js';
import {Question} from './Question.js';

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
        stage: candidate.stage,
        basic_info: {},
        personality: {},
        performance: {}
      };
      for(let j = 0; j < candidate.answers.length; j ++){
        ans = candidate.answers[j];
        qualtricsid = Object.keys(ans)[0];
        if(qualtricsid in basic_info_q){
          map.basic_info[basic_info_q[qualtricsid]] = ans[qualtricsid];
        }else if(qualtricsid in personality_q){
          map.personality[personality_q[qualtricsid]] = ans[qualtricsid];
        }else{
          map.performance[performance_q[qualtricsid]] = ans[qualtricsid];
        }
      }
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
}
