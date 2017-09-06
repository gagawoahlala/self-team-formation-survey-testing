import {Candidate} from './Candidate.js';
import {Question} from './Question.js';
import {Team} from './Team.js';
import * as Const from './Constants.jsx';
faker = require('faker');


export default class DataManager {
  fakeData() {
    return {
      "intro": {"mturk_id": "", "name": ""},
    };
  }

  static shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  static randomlyAssign(teamSize) {
    let candidateToForm =  Candidate.find({stage: 2}).fetch();
    candidateToForm = candidateToForm.map(function (candidate) { return [candidate._id ,candidate.mturk_id]});
    candidateToForm = DataManager.shuffle(candidateToForm);
    console.log(candidateToForm);
    let i = 0;
    if (candidateToForm.length % teamSize != 0) {
      let team_id = ++i;
      // let team_id = faker.finance.account();
      let candidateToFormModified = candidateToForm.splice(0, 1).map(function (candidate) {
        Candidate.update({_id: candidate[0]},{$set: {team_id: team_id}});
        return candidate[1];
      });
      // Team.insert({team_id: team_id, members: candidateToForm.splice(0,teamSize+1)});
      Team.insert({team_id: team_id, members: candidateToFormModified});

    }
    while (candidateToForm.length > 0) {
      // let team_id = fakesr.finance.account();
      let team_id = ++i;
      let candidateToFormModified = candidateToForm.splice(0,teamSize).map(function (candidate) {
        Candidate.update({_id: candidate[0]},{$set: {team_id: team_id}});
        return candidate[1];
      });
      // Team.insert({team_id: faker.finance.account(), members: candidateToForm.splice(0,teamSize)});
      Team.insert({team_id: team_id, members: candidateToFormModified});

    }

  }

  static algorithmAssignByScore(teamSize) {
    weights = {
      "extraversion": 0.1,
      "agreeableness": 0.1,
      "conscientiousness": 0.1,
      "neuroticism": 0.1,
      "openness": 0.3,
      "popularity_selection": 0.1,
      "avg_rating": 0.1,
      "demo_score": 0.1,
    }
    let candidateToForm =  Candidate.find({stage: 2}).fetch();
    candidateToForm = candidateToForm.map(function (candidate) {
       let instance = Candidate.find({stage: 1, mturk_id: candidate.mturk_id}).fetch()[0];
      //  console.log(instance);
       let score = DataManager.scoreCalculator(weights, instance.score_base);
       Candidate.update({_id: instance._id},{$set: {score: score}});
       let instanceObject = {
         "_id": candidate._id,
         "mturk_id": instance.mturk_id,
         "score": score
       }
       return instanceObject;
     });
     console.log("Trying to get score ``````````");
     console.log(candidateToForm);
     candidateToForm.sort(function(left, right) {
       return left.score >= right.score ? -1 : 1;
     });
     console.log("After sorting``````````");
     console.log(candidateToForm);
     for (var i = 0; i < candidateToForm.length; i++) {
       Candidate.update({_id: candidateToForm[i]._id},{$set: {rank: i + 1}});
     }
     let j = 0;
     if (candidateToForm.length % teamSize != 0) {
       let team_id = ++j;
      //  let team_id = faker.finance.account();
       let candidateToFormModified = candidateToForm.splice(candidateToForm.length - 1, 1).map(function (candidate) {
         Candidate.update({_id: candidate._id},{$set: {team_id: team_id}});
         return candidate.mturk_id;
       });
       // Team.insert({team_id: team_id, members: candidateToForm.splice(0,teamSize+1)});
       Team.insert({team_id: team_id, members: candidateToFormModified});

     }

    while (candidateToForm.length > 0) {
      let team_id = ++j;
      // let team_id = faker.finance.account();
      let candidateToFormModified = candidateToForm.splice(0,teamSize).map(function (candidate) {
        Candidate.update({_id: candidate._id},{$set: {team_id: team_id}});
        return candidate.mturk_id;
      });
      // Team.insert({team_id: faker.finance.account(), members: candidateToForm.splice(0,teamSize)});
      Team.insert({team_id: team_id, members: candidateToFormModified});

    }

  }

  static algorithmAssignByPair(teamSize) {
    weights = {
      "extraversion": 0.1,
      "agreeableness": 0.1,
      "conscientiousness": 0.1,
      "neuroticism": 0.1,
      "openness": 0.3,
      "mutual_rating_average": 0.3,
    }

    let resultTeam = [];

    let candidateToForm =  Candidate.find({stage: 2}).fetch();
    for (var i = 0; i < candidateToForm.length; i++) {

      for (var j = i + 1; j < candidateToForm.length; j++) {
        let temp_candidate = {
          "_ids": [candidateToForm[i]._id, candidateToForm[j]._id],
          "teammates": [],
          "score": 0
        }
        let score = 0;
        let member1Stage1 = Candidate.find({stage: 1, mturk_id: candidateToForm[i].mturk_id}).fetch()[0];
        let member2Stage1 = Candidate.find({stage: 1, mturk_id: candidateToForm[j].mturk_id}).fetch()[0];
        let member1Stage2 = candidateToForm[i];
        let member2Stage2 = candidateToForm[j];
        score += Math.abs(DataManager.scoreCalculator(weights, member1Stage1.score_base) - DataManager.scoreCalculator(weights, member2Stage1.score_base));
        score += weights["mutual_rating_average"] * (member1Stage2.rating[member2Stage2.mturk_id] + member2Stage2.rating[member1Stage2.mturk_id]) / 2;
        temp_candidate.score = score;
        // console.log(score);
        temp_candidate.teammates = [member1Stage2.mturk_id,member2Stage2.mturk_id];
        // console.log(temp_candidate);

        // heap.push(temp_candidate);
        if (!isNaN(score)) {
          resultTeam.push(temp_candidate);
        }
      }
    }
    console.log("finish finding the combination");
    resultTeam.sort(function(left, right) {
      return left.score >= right.score ? -1 : 1;
    });
    // console.log(resultTeam);

    let set = new Set([]);
    let counter = 0;
    let tempindex = 0;
    for (var i = 0; i < resultTeam.length; i++) {
      // console.log(Math.floor(candidateToForm.length / teamSize));
      if (counter === Math.floor(candidateToForm.length / teamSize)) {
        // console.log("break");
        break;
      }
      let tempObj = resultTeam[i];
      // console.log(tempObj);
      let isValid = true;
      for (var j = 0; j < tempObj.teammates.length; j++) {
        if (set.has(tempObj.teammates[j])) {
          // console.log("Found duplicate");
          isValid  = false;
          break;
        }
      }

      if (isValid) {
        for (var j = 0; j < tempObj.teammates.length; j++) {
          // console.log(tempObj.teammates[j]);
          set.add(tempObj.teammates[j]);
        }
        // let team_id = faker.finance.account();
        let team_id = ++tempindex;
        for (var j = 0; j < tempObj._ids.length; j++) {
          console.log(tempObj._ids[j]);
          Candidate.update({_id: tempObj._ids[j]},{$set: {team_id: team_id}});
        }
        Team.insert({team_id: team_id, members: tempObj.teammates});
        counter++;
      }
    }
    // console.log("The size for the set is:");
    // console.log(set.size);
    // console.log("The size for the total candidate is:");
    // console.log(candidateToForm.length);
    if (set.size < candidateToForm.length) {
      for (var i = 0; i < candidateToForm.length; i++) {
        if (!set.has(candidateToForm[i].mturk_id)) {
          let team_id = ++tempindex;
          // let team_id = faker.finance.account();
          Candidate.update({_id: candidateToForm[i]._id},{$set: {team_id: team_id}});
          Team.insert({team_id: team_id, members: [candidateToForm[i].mturk_id]});
        }
      }
    }


  }

  static getPairingScore(weights, candidate1, candidate2) {
    let score = 0;
    for (var i = 0; i < candidate1.selection.length; i++) {
      if (candidate1.selection[i] === candidate2.mturk_id) {
        score += weights["weight_preference_subweight"][i] * 1;
      }
    }

    for (var i = 0; i < candidate2.selection.length; i++) {
      if (candidate2.selection[i] === candidate1.mturk_id) {
        score += weights["weight_preference_subweight"][i] * 1;
      }
    }

    score *= weights["mutual_rating_average"]
    let score1 = candidate1.rating[candidate2.mturk_id] == undefined? 0 : candidate1.rating[candidate2.mturk_id];
    let score2 = candidate2.rating[candidate1.mturk_id] == undefined? 0 : candidate2.rating[candidate1.mturk_id];
    score += weights["weight_preference"] * (score1 + score2) / 2;
    return score;
  }

  static algorithmAssignByPair2(teamSize) {
    weights = {
      "extraversion": 0.1,
      "agreeableness": 0.1,
      "conscientiousness": 0.1,
      "neuroticism": 0.1,
      "openness": 0.1,
      "mutual_rating_average": 0.3,
      "weight_preference": 0.2,
      "weight_preference_subweight": [0.5, 0.3, 0.2],
    }

    let resultTeam = [];

    let candidateToForm =  Candidate.find({stage: 2}).fetch();
    for (var i = 0; i < candidateToForm.length; i++) {

      for (var j = i + 1; j < candidateToForm.length; j++) {
        let temp_candidate = {
          "_ids": [candidateToForm[i]._id, candidateToForm[j]._id],
          "teammates": [],
          "score": 0
        }
        let score = 0;
        let member1Stage1 = Candidate.find({stage: 1, mturk_id: candidateToForm[i].mturk_id}).fetch()[0];
        let member2Stage1 = Candidate.find({stage: 1, mturk_id: candidateToForm[j].mturk_id}).fetch()[0];
        let member1Stage2 = candidateToForm[i];
        let member2Stage2 = candidateToForm[j];
        score += Math.abs(DataManager.scoreCalculator(weights, member1Stage1.score_base) - DataManager.scoreCalculator(weights, member2Stage1.score_base));
        // score += weights["mutual_rating_average"] * (member1Stage2.rating[member2Stage2.mturk_id] + member2Stage2.rating[member1Stage2.mturk_id]) / 2;
        console.log(score);
        score += DataManager.getPairingScore(weights, member1Stage2, member2Stage2);
        // score += weights["weight_preference"] * DataManager.getPairingScore(weights["weight_preference_subweight"], member1Stage2, member2Stage2);
        console.log(score);
        temp_candidate.score = score;
        // console.log(score);
        temp_candidate.teammates = [member1Stage2.mturk_id,member2Stage2.mturk_id];
        // console.log(temp_candidate);

        // heap.push(temp_candidate);
        if (!isNaN(score)) {
          resultTeam.push(temp_candidate);
        }
      }
    }
    console.log("finish finding the combination");
    resultTeam.sort(function(left, right) {
      return left.score >= right.score ? -1 : 1;
    });
    // console.log(resultTeam);

    let set = new Set([]);
    let counter = 0;
    let tempindex = 0;
    for (var i = 0; i < resultTeam.length; i++) {
      // console.log(Math.floor(candidateToForm.length / teamSize));
      if (counter === Math.floor(candidateToForm.length / teamSize)) {
        // console.log("break");
        break;
      }
      let tempObj = resultTeam[i];
      // console.log(tempObj);
      let isValid = true;
      for (var j = 0; j < tempObj.teammates.length; j++) {
        if (set.has(tempObj.teammates[j])) {
          // console.log("Found duplicate");
          isValid  = false;
          break;
        }
      }

      if (isValid) {
        for (var j = 0; j < tempObj.teammates.length; j++) {
          // console.log(tempObj.teammates[j]);
          set.add(tempObj.teammates[j]);
        }
        // let team_id = faker.finance.account();
        let team_id = ++tempindex;

        for (var j = 0; j < tempObj._ids.length; j++) {
          console.log(tempObj._ids[j]);
          Candidate.update({_id: tempObj._ids[j]},{$set: {team_id: team_id}});
        }
        Team.insert({team_id: team_id, members: tempObj.teammates});
        counter++;
      }
    }
    // console.log("The size for the set is:");
    // console.log(set.size);
    // console.log("The size for the total candidate is:");
    // console.log(candidateToForm.length);
    if (set.size < candidateToForm.length) {
      for (var i = 0; i < candidateToForm.length; i++) {
        if (!set.has(candidateToForm[i].mturk_id)) {
          let team_id = ++tempindex;
          // let team_id = faker.finance.account();
          Candidate.update({_id: candidateToForm[i]._id},{$set: {team_id: team_id}});
          Team.insert({team_id: team_id, members: [candidateToForm[i].mturk_id]});
        }
      }
    }


  }


  static scoreCalculator(weights, score_base) {
    let score = 0;
    if (score_base === {}) {
      return 0;
    }
    for (var weight in weights) {
      if (weights.hasOwnProperty(weight) && score_base[weight] !== undefined) {
        if (weight == "avg_rating" || weights[weight] == 0) {
          continue;
        }
        score += weights[weight] * score_base[weight];
      }
    }
    if (score_base["num_review"] !== 0 && weights["avg_rating"] !== undefined) {
      score += weights["avg_rating"] * (score_base["sum_rating"] / score_base["num_review"]);
    }
    // console.log(score);
    return score;
  }

  static getSloganForTeams(teamId) {
    let teams = Team.find({team_id: Number(teamId)}).fetch();
    console.log(teams);
    let membersId = teams.map(function(team) {
      return team.members;
    });
    console.log(membersId);
    let members = membersId[0].map(function(memberId) {
      return Candidate.find({stage: 1, mturk_id: memberId}).fetch();
    });
    console.log(members);
    console.log("get the answer of the candidate");
    let SloganArray = members.map(function(member) {
      // return member.answers.map(function(answer) {
      //   if (Object.key(answer) == Q86) {
      //     return answer.Q86;
      //   }
      // });
      console.log(member[0].answers[54]);
      return member[0].answers[54].Q86;
    });
    console.log(SloganArray);
    return SloganArray;
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
            answer = ans[qualtricsid].replace("\"", "");
            answer = "\"" + ans[qualtricsid] + "\"";
            map.basic_info["Where do you see yourself in 5 years? - Write about your goals for your education, career, family, travel, or any other aspect of life. What will be your definition of success in measuring the achievement of those goals?"] = answer;
          } else {
            map.basic_info[basic_info_q[qualtricsid]] = ans[qualtricsid];
          }
        }else if(qualtricsid in personality_q){
          map.personality[personality_q[qualtricsid]] = ans[qualtricsid];
          bigFive = DataManager.updatePoints(bigFive, qid-10, ans[qualtricsid]);
        }else{
          if(qualtricsid == "Q23") {
            answer = ans[qualtricsid].replace("\"", "").trim();
            answer = answer + " (Found " + DataManager.countWords(answer) + " words)";
            map.performance["Found words"] = answer;
          } else if (qualtricsid != "Q99"){
            answer = ans[qualtricsid].replace("\"", "");
            answer = "\"" + ans[qualtricsid] + "\"";
            map.performance[performance_q[qualtricsid]] = answer;
          }
        }
      }
      map.personality["ocean"] = DataManager.OCEANScoreBaseChange(bigFive);
      result_arr.push(map);
    }
    return result_arr;
  }

  static updateCompatibility(processedCandidatesArray, candidateObj) {
    for (var i = 0; i < processedCandidatesArray.length; i++) {
      // console.log(processedCandidatesArray[i]);
      // console.log(candidateObj);
      let compScore = 0;
      for (var key in candidateObj["ocean"]) {
        if (candidateObj["ocean"].hasOwnProperty(key)) {
          compScore += (processedCandidatesArray[i].personality["ocean"][key] + candidateObj["ocean"][key]) / 2;
        }
      }
      processedCandidatesArray[i].personality["compatibility"] = compScore / 5;
    }
    return processedCandidatesArray;
  }

  static prepareTesters(mturk_id) {
    stage1C = Candidate.find({"mturk_id": mturk_id, "stage": 1}).fetch();
    console.log("This is inside datamanger");
    console.log(stage1C);
    questions = Question.find({}).fetch();
    basic_info_q = DataManager.q4block(questions, "basic_info");
    personality_q = DataManager.q4block(questions, "personality");
    performance_q = DataManager.q4block(questions, "performance");

    candidate = stage1C[0];
    map = {};

    bigFive = {
      extraversion: 0,
      agreeableness: 0,
      conscientiousness: 0,
      neuroticism: 0,
      openness: 0
    }

    let scoreObject = {
      "extraversion": 0,
      "agreeableness": 0,
      "conscientiousness": 0,
      "neuroticism": 0,
      "openness": 0,
      "popularity_selection": 0,
      "num_review": 0,
      "sum_rating": 0,
      "demo_score": 0,
    }

    for(let j = 0; j < candidate.answers.length; j ++){
      ans = candidate.answers[j];
      qualtricsid = Object.keys(ans)[0];
      q = Question.find({qualtricsid: qualtricsid}).fetch()[0];
      qid = undefined;
      if(q) qid = Number(q.qid.substring(1));
      if(qualtricsid in personality_q){
        map["q"+`${qid-10}`] = ans[qualtricsid];
        // map[personality_q[qualtricsid]] = ans[qualtricsid];

        bigFive = DataManager.updatePoints(bigFive, qid-10, ans[qualtricsid]);
      }
    }
    map["ocean"] = DataManager.OCEANScoreBaseChange(bigFive);
    let candidateId = Candidate.find({mturk_id: mturk_id, stage: 1},{fields: {'_id': 1}}).fetch()[0]._id;
    for (var aspect in map["ocean"]) {
      if (map["ocean"].hasOwnProperty(aspect)) {
        scoreObject[aspect] = map["ocean"][aspect];
      }
    }
    Candidate.update({_id: candidateId}, {$set: {'score_base': scoreObject}});
    return map;
  }

  static getTeamId(mturk_id) {
    if (mturk_id == null) {
      return null;
    }
    let result = Candidate.find({mturk_id: mturk_id, stage: 2},{fields: {'team_id': 1}}).fetch();
    console.log(result[0]);
    if (result[0].team_id != null) {
      return result[0].team_id;
    } else {
      return null;
    }
  }

  static q4block(questions, block) {
    qs = questions.filter((q) => q.block === block);
    map = {};
    for(let i = 0; i < qs.length; i++){
      q = qs[i];
      map[q.qualtricsid] = q.content;
    }
    return map;
  }

  static countWords(str) {
    count = 0;
    flag = false;
    for (var x = 0; x < str.length; x++)
    {
      if(str[x].toLowerCase() != str[x].toUpperCase()) {
        if(!flag){
          flag = true;
          count++;
        }
      } else {
        flag = false;
      }
    }
    return count;
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
      bigFive = DataManager.updatePoints(bigFive, tempKey, questions[key]);
      // console.log(questions[key]);
      // console.log(bigFive);
    }
    return DataManager.OCEANScoreBaseChange(bigFive);
  }

  static OCEANScoreBaseChange(bigFive) {
    newBigFive = bigFive;
    for (var attr in bigFive) {
      newScore = Math.round(bigFive[attr] * 50 / Const.OCEAN_SCORE[attr]);
      newBigFive[attr] = newScore;
    }
    return newBigFive
  }

  static updatePoints(bigFive, qid, answer) {
    if (qid <= 44) {
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
    } else {
      console.log("Wrong qid for big five questions");
    }
  }
}
