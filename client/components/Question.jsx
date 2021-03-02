import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Answer from './Answer.jsx';


export default function Question({questions}) {

  const [loaded, setLoaded] = useState(false);

  
  function vote() {
    
     console.log('clicked');
      axios.put("/questions", {id: questions.question_id}).then(res => {
        console.log("sent");
      }).catch(err => console.log(err))

  }
  // let loaded = false;
  

  

 //convert the answers from object of objects to an array of objects
  let answers = [];
  for(var key in questions.answers) {
      answers.push(questions.answers[key])
  };

//sort by helpfulness and Seller
answers.sort((a, b) => (a.helpfulness < b.helpfulness) ? 1 : -1 );
answers.sort((a) => (a.answerer_name === "Seller") ? 1 : -1);




// let loadedAnswers = loaded === false ? answers.slice(0, 2) : answers;


// function vote() {
// useEffect(()=> {
//   axios.put()
// })
// }
     

    return (
        <div>
            <h2 className="question">Q: {questions.question_body}<span className="mother"><span className="Helpful">Helpful?</span><span className="had">|</span><span  className="Yes"  onClick={vote()}>Yes</span><span  className="qCount">({questions.question_helpfulness})</span></span></h2>
          <div>
             {answers.map(answer => {
                return <Answer key={answer.id} answer = {answer} />
            })}

        </div>
        <a href="#">Load More Answers</a>
          </div>
    )
}

