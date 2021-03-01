
import React from 'react';
import Answer from './Answer.jsx';


export default function Question({questions}) {
  let answers = [];
 
  for(var key in questions.answers) {
      answers.push(questions.answers[key])
  };

//sort by helpfulness and Seller
answers.sort((a, b) => (a.helpfulness < b.helpfulness) ? 1 : -1 );
answers.sort((a) => (a.answerer_name === "Seller") ? 1 : -1);


     

    return (
        <div>
            <h2 className="question">Q: {questions.question_body}<span className="mother"><span className="Helpful">Helpful?</span><span className="had">|</span><span className="Yes">Yes</span><span  className="qCount">({questions.question_helpfulness})</span></span></h2>
          <div>
             {answers.map(answer => {
                return <Answer key={answer.id} answer = {answer} />
            })}
            
        </div>
        <a href="#">Load More Answers</a>
          </div>
    )
}

