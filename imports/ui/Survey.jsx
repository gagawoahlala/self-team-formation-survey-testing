import React from 'react';
import ReactDOM from 'react-dom';
import Survey from 'survey-react';
import {Candidate} from '../api/Candidate.js';
import { browserHistory } from 'react-router';
import ReactCountdownClock from 'react-countdown-clock';



Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

window.survey = new Survey.Model({
 focusFirstQuestionAutomatic: false,
 locale: "en",
 pages: [
  {
   elements: [
    {
     type: "html",
     html: "<h2>Consent Form for Research Study</h2>\n  <p>This survey is part of a research study on <b>Team Formation</b>. This study is being done by Andrew Dennis, Markus Duecker and Dr. Steven Dow from the<b> University of California - San Diego (UCSD).</b> You were recruited for this study through Amazon Mechanical Turk,<b> you're taking part in it voluntarily</b> and <b>you’re at least 18 years old.</b><br><br>\n\n\nThere may or may not be any direct benefit to you from this research. The investigator(s), however, may learn more about<b> how we can better facilitate conflict resolution on group decision-making.</b><br><br>\n\n\nThere are minimal risks associated with this research study. <b> Although you may be asked to provide your nickname, no personal identifier can be accessed outside of the research team. You may also experience some emotional changes, but the risks and discomfort associated with the tasks are no greater than ordinarily encountered in daily life. </b>Research records will be kept confidential to the extent allowed by law and may be reviewed by the UCSD Institutional Review Board. <br><br>\n\n\nYour participation in this study is completely voluntary and you can withdraw at any time by simply exiting the survey. Choosing not to participate or withdrawing will result in no penalty or loss of benefits to which you are entitled. <br><br>\n\n\nIf you have questions about this project you can send us a message through the Amazon Mechanical Turk platform. If you have any questions concerning your rights as a research subject, you may contact the UCSD Human Research Protections Program Office at 858-246-HRPP (+1 858-246-4777). <br><br>\n\n\nBy clicking <b>“Next”</b> below you are indicating that you are at least 18 years old, have read this consent form, and agree to participate in this research study. You may print a copy of this page for your records. \n<br></p>\n",
     name: "Consent Form"
    }
   ],
   name: "page1"
  },
  {
   elements: [
    {
     type: "radiogroup",
     name: "Q1",
     title: {
      en: "Gender"
     },
     isRequired: true,
     choices: [
      "Male",
      "Female"
     ]
    },
    {
     type: "text",
     isRequired: true,
     name: "Q3",
     title: {
      en: "Age (in years)"
     },
     validators: [
      {
       type: "numeric",
       minValue: 18,
       maxValue: 150
      }
     ]
    },
    {
     type: "text",
     isRequired: true,
     name: "Q5",
     title: {
      en: "Country of Residence"
     }
    },
    {
     type: "radiogroup",
     name: "Q7",
     title: {
      en: "What is the highest degree or level of education you have completed?"
     },
     isRequired: true,
     choices: [
      "Less than high school",
      "High school graduate (includes equivalency)",
      "Some college, no degree",
      "Associate's Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "Ph.D.",
      "Currently pursuing a college degree",
      "Other"
     ]
    },
    {
     type: "radiogroup",
     name: "Q6",
     title: {
      en: "Ethnicity"
     },
     isRequired: true,
     choices: [
      "African American",
      "Asian",
      "Hispanic",
      "Pacific Islander",
      "White",
      "Other"
     ]
    },
    {
     type: "radiogroup",
     name: "Q8",
     title: {
      en: "Do you have a job besides working on Amazon Mechanical Turk?"
     },
     isRequired: true,
     choices: [
      "Yes",
      "No"
     ]
    }
   ],
   name: "page2"
  },
  {
   elements: [
    {
     type: "text",
     isRequired: true,
     name: "Q9",
     title: {
      en: "In which field/industry are you working?"
     }
    }
   ],
   name: "page3"
  },
  {
   elements: [
    {
     type: "html",
     html: "<h3>Mechanical Turk statistics</h3><br>\n<p>You can look up this information in your MTurk Dashboard:\n<br>\n<a href=\"https://www.mturk.com/mturk/dashboard\">https://www.mturk.com/mturk/dashboard</a></p>",
     name: "Mechanical Turk Statistics"
    },
    {
     type: "text",
     isRequired: true,
     name: "mturk_id",
     title: {
      en: "Mechanical Turk ID"
     }
    },
    {
     type: "dropdown",
     name: "Q10",
     title: {
      en: "Registered on Mechanical Turk since:"
     },
     isRequired: true,
     choices: [
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017"
     ]
    },
    {
     type: "text",
     isRequired: true,
     name: "Q11",
     title: {
      en: "Number of approved HITs:"
     }
    },
    {
     type: "text",
     isRequired: true,
     name: "Q12",
     title: {
      en: "Rate of approved HITs (in %):"
     },
     validators: [
      {
       type: "numeric",
       maxValue: 100
      }
     ]
    }
   ],
   name: "page4"
  },
  {
   elements: [
    {
     type: "html",
     html: "<h3>Personality Test</h3>\n<br>\n<p>You will be shown 44 personality statements. Please specify for each statement how much you agree with it on a scale of 1-5, where \n<br><br>\n1 = Strongly disagree <br>\n2 = Somewhat disagree <br>\n3 = Neutral (neither agree nor disagree) <br>\n4 = Somewhat Agree <br>\n5 = Strongly agree\n\n",
     name: "Personality Test"
    },
    {
     type: "matrix",
     name: "Example",
     title: "Example:\nI see Myself as Someone Who...",
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Likes to work in a team with others"
     ]
    }
   ],
   name: "page5"
  },
  {
   elements: [
    {
     type: "matrix",
     name: "Q70_6",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is talkative"
     ]
    },
    {
     type: "matrix",
     name: "Q70_7",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Tends to find fault with others"
     ]
    },
    {
     type: "matrix",
     name: "Q70_8",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Does a thorough job"
     ]
    },
    {
     type: "matrix",
     name: "Q70_9",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is depressed, blue"
     ]
    },
    {
     type: "matrix",
     name: "Q70_10",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is original, comes up with new ideas"
     ]
    }
   ],
   name: "page6"
  },
  {
   elements: [
    {
     type: "matrix",
     name: "Q71_1",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is reserved"
     ]
    },
    {
     type: "matrix",
     name: "Q71_2",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is helpful and unselfish with others"
     ]
    },
    {
     type: "matrix",
     name: "Q71_3",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Can be somewhat careless"
     ]
    },
    {
     type: "matrix",
     name: "Q71_4",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is relaxed, handles stress well"
     ]
    },
    {
     type: "matrix",
     name: "Q71_5",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is curious about many different things"
     ]
    }
   ],
   name: "page7"
  },
  {
   elements: [
    {
     type: "matrix",
     name: "Q78_4",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is full of energy"
     ]
    },
    {
     type: "matrix",
     name: "Q78_5",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Starts quarrels with others"
     ]
    },
    {
     type: "matrix",
     name: "Q78_6",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is a reliable worker"
     ]
    },
    {
     type: "matrix",
     name: "Q78_7",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Can be tense"
     ]
    },
    {
     type: "matrix",
     name: "Q78_8",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is ingenious, a deep thinker"
     ]
    }
   ],
   name: "page8"
  },
  {
   elements: [
    {
     type: "matrix",
     name: "Q79_4",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Generates a lot of enthusiasm"
     ]
    },
    {
     type: "matrix",
     name: "Q79_5",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Has a forgiving nature"
     ]
    },
    {
     type: "matrix",
     name: "Q79_6",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Tends to be disorganized"
     ]
    },
    {
     type: "matrix",
     name: "Q79_7",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Worries a lot"
     ]
    },
    {
     type: "matrix",
     name: "Q79_8",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Has an active imagination"
     ]
    }
   ],
   name: "page9"
  },
  {
   elements: [
    {
     type: "matrix",
     name: "Q80_4",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Tends to be quiet"
     ]
    },
    {
     type: "matrix",
     name: "Q80_5",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is generally trusting"
     ]
    },
    {
     type: "matrix",
     name: "Q80_6",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Tends to be lazy"
     ]
    },
    {
     type: "matrix",
     name: "Q80_7",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is emotionally stable, not easily upset"
     ]
    },
    {
     type: "matrix",
     name: "Q80_8",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is inventive"
     ]
    }
   ],
   name: "page10"
  },
  {
   elements: [
    {
     type: "matrix",
     name: "Q81_4",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Has an assertive personality"
     ]
    },
    {
     type: "matrix",
     name: "Q81_5",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Can be cold and aloof"
     ]
    },
    {
     type: "matrix",
     name: "Q81_6",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Perseveres until the task is finished"
     ]
    },
    {
     type: "matrix",
     name: "Q81_7",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Can be moody"
     ]
    },
    {
     type: "matrix",
     name: "Q81_8",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Values artistic, aesthetic experiences"
     ]
    }
   ],
   name: "page11"
  },
  {
   elements: [
    {
     type: "matrix",
     name: "Q82_4",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is sometimes shy, inhibited"
     ]
    },
    {
     type: "matrix",
     name: "Q82_5",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is considerate and kind to almost everyone"
     ]
    },
    {
     type: "matrix",
     name: "Q82_6",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Does things efficiently"
     ]
    },
    {
     type: "matrix",
     name: "Q82_7",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Remains calm in tense situations"
     ]
    },
    {
     type: "matrix",
     name: "Q82_8",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Prefers work that is routine"
     ]
    }
   ],
   name: "page12"
  },
  {
   elements: [
    {
     type: "matrix",
     name: "Q83_4",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is outgoing, sociable"
     ]
    },
    {
     type: "matrix",
     name: "Q83_5",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is sometimes rude to others"
     ]
    },
    {
     type: "matrix",
     name: "Q83_6",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Makes plans and follows through with them"
     ]
    },
    {
     type: "matrix",
     name: "Q83_7",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Gets nervous easily"
     ]
    },
    {
     type: "matrix",
     name: "Q83_8",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Likes to reflect, play with ideas"
     ]
    }
   ],
   name: "page13"
  },
  {
   elements: [
    {
     type: "matrix",
     name: "Q84_4",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Has few artistic interests"
     ]
    },
    {
     type: "matrix",
     name: "Q84_5",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Likes to cooperate with others"
     ]
    },
    {
     type: "matrix",
     name: "Q84_6",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is easily distracted"
     ]
    },
    {
     type: "matrix",
     name: "Q84_7",
     title: "I see Myself as Someone Who...",
     isRequired: true,
     columns: [
      "Strongly disagree",
      "Somewhat disagree",
      "Neither agree nor disagree",
      "Somewhat agree",
      "Strongly agree"
     ],
     rows: [
      "Is sophisticated in art, music, or literature"
     ]
    }
   ],
   name: "page14"
  },
  {
   elements: [
    {
     type: "html",
     html: "<h2>Writing Task</h2>\n<p>\nPlease answer the following question, your answer should be <b> at least 500 characters </b> long. You can take as much time as you need. \n<br> <br>\n<h2>Where do you see yourself in 5 years?</h2>\n-Write about your goals for your education, career, family, travel or any other aspect of life. <br>\n-What will be your definition of success in measuring the achievement of those goals? </p>",
     name: "question9"
    },
    {
     type: "text",
     isRequired: true,
     name: "Q20",
     title: {
      en: "Writing Task"
     }
    }
   ],
   name: "page15",
   visible: false
  },
  {
   elements: [
    {
     type: "html",
     html: "<h2>Write an advertisement slogan for this electrical bicycle </h2>\n\n<p>-the slogan should be short (1-2 sentences) <br> -it should highlight the product's main benefits and ultimately persuade people to buy it <br> -you can make up a new name and invent realistic features that the bicycle should have\n<br><br>\nAs an example you can look at these slogans that workers generated for a backpack: \n<br>\n<ul>\n<li>\"Backpacking gear that changes the way you hit the road. Get yours and start a journey of a lifetime!\"</li>\n<li>\"The ultimate drawstring backpack that lets you create more epic moments and crush life\"</li>\n<li>\"Fashion meets functionality in one yoga inspired backpack\"</li>\n</ul>\n<br>\nPlease spend <b> 4 minutes </b> on this task until the countdown runs out. <br>\nThe form will then automatically submit your result \n",
     name: "question10"
    },
    {
     type: "html",
     html: {
      en: "<img src=\"http://www.electricvelocity.com.au/Upload/Blogs/smart-e-bike-side_2.jpg\"> </img>"
     },
     name: "question13"
    },
    {
     type: "text",
     name: "Q86",
     title: {
      en: "Advertisement Slogan"
     }
    }
   ],
   name: "page16",
   startWithNewLine: false
  },
  {
   elements: [
    {
     type: "html",
     html: {
      en: "<p><b>Please write down all the words that you can find in the word puzzle below. </b>All the hidden words are <b>related to Christmas</b> and <b> at least 3 characters long. </b>\n<br><br>\nYou are given 5 minutes on this task until the countdown runs out. <br>\nThe form will then submit automatically. \n\n"
     },
     name: "question11"
    },
    {
     type: "html",
     html: {
      en: "<img src=\"http://www.electricvelocity.com.au/Upload/Blogs/smart-e-bike-side_2.jpg\"> </img>"
     },
     name: "question12"
    },
    {
     type: "text",
     name: "Q23",
     title: {
      en: "Found words (using one line per word). This form will automatically submit after 5 min countdown has run out"
     }
    }
   ],
   name: "page17",
   visible: false
  }
 ],
 requiredText: "",
 showProgressBar: "bottom",
 showQuestionNumbers: "off"
});

// window.survey = new Survey.Model({focusFirstQuestionAutomatic:false,locale:"en",pages:[{elements:[{type:"radiogroup",name:"Q1",title:{en:"Gender"},isRequired:true,choices:["Male","Female"]},{type:"text",isRequired:true,name:"Q3",title:{en:"Age (in years)"},validators:[{type:"numeric",minValue:18,maxValue:150}]},{type:"text",isRequired:true,name:"Q5",title:{en:"Country of Residence"}},{type:"radiogroup",name:"Q7",title:{en:"What is the highest degree or level of education you have completed?"},isRequired:true,choices:["Less than high school","High school graduate (includes equivalency)","Some college, no degree","Associate's Degree","Bachelor's Degree","Master's Degree","Ph.D.","Currently pursuing a college degree","Other"]},{type:"radiogroup",name:"Q6",title:{en:"Ethnicity"},isRequired:true,choices:["African American","Asian","Hispanic","Pacific Islander","White","Other"]},{type:"radiogroup",name:"Q8",title:{en:"Do you have a job besides working on Amazon Mechanical Turk?"},isRequired:true,choices:["Yes","No"]}],name:"page2"},{elements:[{type:"text",isRequired:true,name:"Q9",title:{en:"In which field/industry are you working?"}}],name:"page3"},{elements:[{type:"matrix",name:"Q70_6",title:"I see Myself as Someone Who...",isRequired:true,columns:["Strongly disagree","Somewhat disagree","Neither agree nor disagree","Somewhat agree","Strongly agree"],rows:["Is talkative"]},{type:"matrix",name:"Q70_7",title:"I see Myself as Someone Who...",isRequired:true,columns:["Strongly disagree","Somewhat disagree","Neither agree nor disagree","Somewhat agree","Strongly agree"],rows:["Tends to find fault with others"]},{type:"matrix",name:"Q70_8",title:"I see Myself as Someone Who...",isRequired:true,columns:["Strongly disagree","Somewhat disagree","Neither agree nor disagree","Somewhat agree","Strongly agree"],rows:["Does a thorough job"]},{type:"matrix",name:"Q70_9",title:"I see Myself as Someone Who...",isRequired:true,columns:["Strongly disagree","Somewhat disagree","Neither agree nor disagree","Somewhat agree","Strongly agree"],rows:["Is depressed, blue"]},{type:"matrix",name:"Q70_10",title:"I see Myself as Someone Who...",isRequired:true,columns:["Strongly disagree","Somewhat disagree","Neither agree nor disagree","Somewhat agree","Strongly agree"],rows:["Is original, comes up with new ideas"]}],name:"page6"},{elements:[{type:"html",name:"question9",html:"<h2>Writing Task</h2>\n<p>\nPlease answer the following question, your answer should be <b> at least 500 characters </b> long. You can take as much time as you need. \n<br> <br>\n<h2>Where do you see yourself in 5 years?</h2>\n-Write about your goals for your education, career, family, travel or any other aspect of life. <br>\n-What will be your definition of success in measuring the achievement of those goals? </p>"},{type:"text",isRequired:true,name:"Q20",title:{en:"Writing Task"}}],name:"page15"}],requiredText:"",showProgressBar:"bottom",showQuestionNumbers:"off"}
// );







export default class SurveyStage extends React.Component {
  constructor(props){
    super(props);
    this.displayPanel = this.displayPanel.bind(this);
    this.sendDataToServer = this.sendDataToServer.bind(this);
    this.goToApp = this.goToApp.bind(this);
    this.state = {
      isFinished: false,
      mturk_id: ""
    }
  }



  sendDataToServer(survey) {
    var resultAsJSON = survey.data;
    var answers = [];
    candidate = {
      "mturk_id" : resultAsJSON.mturk_id,
      "stage" : 1
    }
    delete resultAsJSON.mturk_id;
    delete resultAsJSON.Example;

    var ret = Object.keys(resultAsJSON).map(function(key) {
      var ret = {};
      if(typeof resultAsJSON[key] === 'object'){
        ret[key] = Object.values(resultAsJSON[key])[0];
      } else if(typeof resultAsJSON[key] === "number") {
        ret[key] = resultAsJSON[key].toString();
      } else {
        ret[key] = resultAsJSON[key];

      }
      return ret;
    });

    answers = ret;
    candidate.answers = answers;
    console.log(candidate);
    Candidate.insert(candidate);
    this.setState({isFinished: true, mturk_id: candidate.mturk_id});
    // browserHistory.push(`/?mturk_id=${candidate.mturk_id}`);
  }

  displayPanel() {
    if (this.state.isFinished) {
      return(<div>Please wait until the timer goes off. You will be automatically redirected shortly</div>);
    } else {
      return(<Survey.Survey model={survey} onComplete={this.sendDataToServer}/>);
    }
  }

  goToApp() {
    browserHistory.push(`/?mturk_id=${this.state.mturk_id}`);
  }
  render() {
    return (
      <div>
        <div className="container survey-header">
          <h2 className="survey-site-logo col-sm-6">Background Survey</h2>
          <div id="survey-counter" className="col-sm-6">
            Time left:
            <ReactCountdownClock  seconds={120} color="#000" alpha={1.0} size={70} onComplete={this.goToApp}/>
          </div>
        </div>
        {this.displayPanel()}
        {/* <Survey.Survey model={survey} onComplete={this.sendDataToServer}/> */}
      </div>
    );
  }

}
