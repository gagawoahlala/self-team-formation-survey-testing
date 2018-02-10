export const SURVEY_PERSONALITY = {
 locale: "en",
 focusFirstQuestionAutomatic: false,
 pages: [
  {
   name: "page1",
   elements: [
    {
     type: "html",
     name: "Consent Form",
     html: "<h2>Consent Form for Research Study</h2>\n  <p>This survey is part of a research study on <b>Team Formation</b>. This study is being done by Andrew Dennis, Markus Duecker and Dr. Steven Dow from the<b> University of California - San Diego (UCSD).</b> You were recruited for this study through Amazon Mechanical Turk,<b> you're taking part in it voluntarily</b> and <b>you’re at least 18 years old.</b><br><br>\n\n\nThere may or may not be any direct benefit to you from this research. The investigator(s), however, may learn more about<b> how we can better facilitate conflict resolution on group decision-making.</b><br><br>\n\n\nThere are minimal risks associated with this research study. <b> Although you may be asked to provide your nickname, no personal identifier can be accessed outside of the research team. You may also experience some emotional changes, but the risks and discomfort associated with the tasks are no greater than ordinarily encountered in daily life. </b>Research records will be kept confidential to the extent allowed by law and may be reviewed by the UCSD Institutional Review Board. <br><br>\n\n\nYour participation in this study is completely voluntary and you can withdraw at any time by simply exiting the survey. Choosing not to participate or withdrawing will result in no penalty or loss of benefits to which you are entitled. <br><br>\n\n\nIf you have questions about this project you can send us a message through the Amazon Mechanical Turk platform. If you have any questions concerning your rights as a research subject, you may contact the UCSD Human Research Protections Program Office at 858-246-HRPP (+1 858-246-4777). <br><br>\n\n\nBy clicking <b>“Next”</b> below you are indicating that you are at least 18 years old, have read this consent form, and agree to participate in this research study. You may print a copy of this page for your records. \n<br></p>\n"
    }
   ]
  },
  {
   name: "page2",
   elements: [
    {
     type: "radiogroup",
     name: "Q1",
     title: {
      en: "Gender"
     },
     isRequired: true,
     choices: [
      "Female",
      "Male",
      "Other",
      "Prefer not to say"
     ]
    },
    {
     type: "text",
     name: "Q3",
     title: {
      en: "Age (in years)"
     },
     isRequired: true,
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
     name: "Q5",
     visible: false,
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
    },
    {
     type: "text",
     name: "Q9",
     title: {
      en: "In which field/industry are you working?"
     },
     isRequired: true
    },
    {
     type: "html",
     name: "Mechanical Turk Statistics",
     html: {
      en: "<h3>Mechanical Turk statistics</h3><br>\n<p>You can look up this information in your MTurk Dashboard:\n<br>\n<a href=\"https://www.mturk.com/mturk/dashboard\" target=\"_blank\">https://www.mturk.com/mturk/dashboard</a></p>"
     }
    },
    {
     type: "text",
     name: "mturk_id",
     title: {
      en: "Please enter your mTurk ID"
     },
     isRequired: true
    }
   ]
  },
  {
   name: "page15",
   elements: [
    {
     type: "multipletext",
     name: "Q99",
     title: {
      en: "What qualities do you look for in a team member? (Fill as many as you need. Write as much as you need for each response, one quality per box.)"
     },
     items: [
      {
       name: "Most Important"
      },
      {
       name: "2nd most important"
      },
      {
       name: "3rd most important"
      },
      {
       name: "4th most important"
      },
      {
       name: "5th most important"
      },
      {
       name: "6th most important"
      },
      {
       name: "7th most important"
      }
     ],
     itemSize: 29
    }
   ],
   visible: false
  },
  {
   name: "page16",
   elements: [
    {
     type: "html",
     name: "question9",
     html: "<h2>Writing Task</h2>\n<p>\nPlease answer the following question, your answer should be <b> at least 500 characters </b> long. You can take as much time as you need. \n<br> <br>\n<h2>Where do you see yourself in 5 years?</h2>\n-Write about your goals for your education, career, family, travel or any other aspect of life. <br>\n-What will be your definition of success in measuring the achievement of those goals? </p>"
    },
    {
     type: "text",
     name: "Q20",
     title: {
      en: "Writing Task"
     },
     isRequired: true
    }
   ],
   visible: false
  },
  {
   name: "page17",
   elements: [
    {
     type: "html",
     name: "question10",
     html: "<h2>Write an advertisement slogan for this electrical bicycle </h2>\n\n<p>-the slogan should be short (1-2 sentences) <br> -it should highlight the product's main benefits and ultimately persuade people to buy it <br> -you can make up a new name and invent realistic features that the bicycle should have\n<br><br>\nAs an example you can look at these slogans that workers generated for a backpack: \n<br>\n<ul>\n<li>\"Backpacking gear that changes the way you hit the road. Get yours and start a journey of a lifetime!\"</li>\n<li>\"The ultimate drawstring backpack that lets you create more epic moments and crush life\"</li>\n<li>\"Fashion meets functionality in one yoga inspired backpack\"</li>\n</ul>\n<br>\nPlease spend <b> 4 minutes </b> on this task until the countdown runs out. <br>\nThe form will then automatically submit your result \n"
    },
    {
     type: "html",
     name: "question13",
     html: {
      en: "<img src=\"http://www.electricvelocity.com.au/Upload/Blogs/smart-e-bike-side_2.jpg\"> </img>"
     }
    },
    {
     type: "text",
     name: "Q86",
     title: {
      en: "Advertisement Slogan"
     }
    }
   ],
   visible: false
  },
  {
   name: "page18",
   elements: [
    {
     type: "html",
     name: "question11",
     html: {
      en: "<p><b>Please write down all the words that you can find in the word puzzle below. </b>All the hidden words are <b>related to Christmas</b> and <b> at least 3 characters long. </b>\n<br><br>\nYou are given 5 minutes on this task until the countdown runs out. <br>\nThe form will then submit automatically. \n\n"
     }
    },
    {
     type: "html",
     name: "question12",
     html: {
      en: "<img src=\"http://www.electricvelocity.com.au/Upload/Blogs/smart-e-bike-side_2.jpg\"> </img>"
     }
    },
    {
     type: "text",
     name: "Q23",
     title: {
      en: "Found words (using one line per word). This form will automatically submit after 5 min countdown has run out"
     }
    }
   ],
   visible: false
  }
 ],
 showQuestionNumbers: "off",
 showProgressBar: "bottom",
 requiredText: ""
}

export const SURVEY_TASK = {
 locale: "en",
 focusFirstQuestionAutomatic: false,
 pages: [
  {
   name: "page16",
   elements: [
    {
     type: "html",
     name: "question10",
     html: {
      default: "<h2>Write an advertisement slogan for this electrical bicycle </h2>\n\n<p>-the slogan should be short (1-2 sentences) <br> -it should highlight the product's main benefits and ultimately persuade people to buy it <br> -you can make up a new name and invent realistic features that the bicycle should have\n<br><br>\nAs an example you can look at these slogans that workers generated for a backpack: \n<br>\n<ul>\n<li>\"Backpacking gear that changes the way you hit the road. Get yours and start a journey of a lifetime!\"</li>\n<li>\"The ultimate drawstring backpack that lets you create more epic moments and crush life\"</li>\n<li>\"Fashion meets functionality in one yoga inspired backpack\"</li>\n</ul>\n<br>\nPlease spend <b> 4 minutes </b> on this task until the countdown runs out. <br>\nThe form will then automatically submit your result \n",
      en: "<h3>Write an 3 sentence advertising slogan for this transportation device. </h3>\n<h3>This slogan will be shared with your partners for the team task.</h3>\nYou will spend <b style=\"font-size: 20px;\">4 minutes</b> on this task until the countdown runs out.  After the team task, you will automatically be moved to an exit survey.\n<br><br>\n<p>&nbsp- the slogan should be short (3 sentences) <br>&nbsp - use your imagination <br>&nbsp - it should highlight the product's main benefits and ultimately persuade people to buy it <br>&nbsp - you can make up a new name and invent realistic features that the bicycle should have\n<br><br>\nAs an example you can look at these slogans that workers generated for a backpack: \n<br>\n\n<i style=\"text-decoration: underline;\">\"Backpacking gear that changes the way you hit the road. Be prepared for new adventures. Get yours and start a journey of a lifetime!\"</i>\n\n<br>\n"
     }
    },
    {
     type: "html",
     name: "question13",
     html: {
      en: "<img src=\"http://www.electricvelocity.com.au/Upload/Blogs/smart-e-bike-side_2.jpg\"> </img>"
     }
    },
    {
     type: "text",
     name: "Q86",
     title: {
      en: "Advertisement Slogan"
     },
     isRequired: true
    }
   ]
  }
 ],
 showQuestionNumbers: "off",
 showProgressBar: "bottom",
 requiredText: ""
}

export const PERSONALITY_TASK = {
 locale: "en",
 focusFirstQuestionAutomatic: false,
 pages: [
  {
   name: "page1",
   elements: [
    {
     type: "html",
     name: "question1",
     html: {
      en: "<p>A little later, we will ask you to work with a team member on a collaborative writing task. You will first have a chance to rate potential teammates based on your preferences. Once paired with a partner, together you will spend 10 minutes writing a television advertisement for the same transportation device for which you just wrote a slogan.<p>"
     }
    },
    {
     type: "comment",
     name: "Q98",
     title: {
      en: "What is your first name or nickname (we will need it later for the team task)?"
     },
     isRequired: true
    }
   ]
  },
  {
   name: "page15",
   elements: [
    {
     type: "multipletext",
     name: "Q99",
     title: {
      en: "What qualities do you look for in a team member? (Fill as many as you need. Write as much as you need for each response, one quality per box.)"
     },
     items: [
      {
       name: "Most Important"
      },
      {
       name: "2nd most important"
      },
      {
       name: "3rd most important"
      },
      {
       name: "4th most important"
      },
      {
       name: "5th most important"
      },
      {
       name: "6th most important"
      },
      {
       name: "7th most important"
      }
     ],
     itemSize: 29
    },
    {
     type: "radiogroup",
     name: "Q100",
     title: {
      en: "On a team:"
     },
     isRequired: true,
     choices: [
      "I have to lead",
      "I strongly prefer to lead",
      "I prefer to lead",
      "I can follow or lead - no preference",
      "I prefer to follow",
      "I strongly prefer to follow",
      "I have to follow"
     ]
    },
    {
     type: "comment",
     name: "Q20",
     title: {
      en: "Describe your personality strengths and weaknesses in 50 words or less."
     },
     isRequired: true
    }
   ]
  }
 ],
 showQuestionNumbers: "off",
 showProgressBar: "bottom",
 requiredText: ""
}

export const SURVEY_TASK_TEST = {
 focusFirstQuestionAutomatic: false,
 locale: "en",
 pages: [
  {
   elements: [
    {
     type: "html",
     name: "Consent Form",
     html: "<h2>Consent Form for Research Study</h2>\n  <p>This survey is part of a research study on <b>Team Formation</b>. This study is being done by Andrew Dennis, Markus Duecker and Dr. Steven Dow from the<b> University of California - San Diego (UCSD).</b> You were recruited for this study through Amazon Mechanical Turk,<b> you're taking part in it voluntarily</b> and <b>you’re at least 18 years old.</b><br><br>\n\n\nThere may or may not be any direct benefit to you from this research. The investigator(s), however, may learn more about<b> how we can better facilitate conflict resolution on group decision-making.</b><br><br>\n\n\nThere are minimal risks associated with this research study. <b> Although you may be asked to provide your nickname, no personal identifier can be accessed outside of the research team. You may also experience some emotional changes, but the risks and discomfort associated with the tasks are no greater than ordinarily encountered in daily life. </b>Research records will be kept confidential to the extent allowed by law and may be reviewed by the UCSD Institutional Review Board. <br><br>\n\n\nYour participation in this study is completely voluntary and you can withdraw at any time by simply exiting the survey. Choosing not to participate or withdrawing will result in no penalty or loss of benefits to which you are entitled. <br><br>\n\n\nIf you have questions about this project you can send us a message through the Amazon Mechanical Turk platform. If you have any questions concerning your rights as a research subject, you may contact the UCSD Human Research Protections Program Office at 858-246-HRPP (+1 858-246-4777). <br><br>\n\n\nBy clicking <b>“Next”</b> below you are indicating that you are at least 18 years old, have read this consent form, and agree to participate in this research study. You may print a copy of this page for your records. \n<br></p>\n"
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
     name: "Q3",
     title: {
      en: "Age (in years)"
     },
     isRequired: true,
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
     name: "Q5",
     title: {
      en: "Country of Residence"
     },
     isRequired: true
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
  }
 ],
 requiredText: "",
 showProgressBar: "bottom",
 showQuestionNumbers: "off"
}
