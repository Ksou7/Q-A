
import React from 'react'
import Answer from './Answer.jsx'



export default function Question({questions}) {
  let answers = [];
 
  for(var key in questions.answers) {
      answers.push(questions.answers[key])
  };

    return (
        <div>
    
            <h2 className="question">Q: {questions.question_body}<span className="mother"><span className="Helpful">Helpful?</span><span className="had">|</span><span className="Yes">Yes</span><span  className="qCount">({questions.question_helpfulness})</span></span></h2>
            {answers.map(answer => {
                return <Answer key={answer.id} answer = {answer} />
            })}
            
        </div>
    )
}

