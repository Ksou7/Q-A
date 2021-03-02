import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Answer from './Answer.jsx';


export default function Question({questions, handleclick,render}) {

  const [clicked, setClicked] = useState(false);

  
    //update helpfulness count function
    function vote() {
      if(clicked === false) {
        console.log(questions.question_id);
        console.log('clicked');
  
         axios.put(`http://localhost:3001/questions/${questions.question_id}`, {},  { headers: {'Content-Type': 'application/json'} }).then(res => {
           console.log("sent");
           setClicked(true)
           console.log(clicked);
           render()
         }).catch(err => console.log(err))
        }
      else {return}
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
            <h2 className="question">Q: {questions.question_body}<span className="mother"><span className="Helpful">Helpful?</span><span className="had">|</span><span  className="Yes"  onClick={()=>{vote()}}>Yes</span><span  className="qCount">({questions.question_helpfulness})</span></span></h2>
          <div><span>A:</span>
             {answers.map(answer => {
                return <Answer key={answer.id} answer = {answer} />
            })}

        </div>
        <a href="#">Load More Answers</a>
          </div>
    )
}

