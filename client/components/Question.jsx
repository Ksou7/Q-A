import axios from 'axios';
import React, {useState} from 'react';
import Answer from './Answer.jsx';


export default function Question({questions, render, reporting}) {

  const [clicked, setClicked] = useState(false);
  const [loaded, setloaded] = useState(false);


    //update helpfulness count function
    function vote() {
      if(clicked === false) {
      
        
  
         axios.put(`http://localhost:3001/questions/${questions.question_id}`, {},  { headers: {'Content-Type': 'application/json'} }).then(res => {
           console.log("sent");
           setClicked(true)
           render()
         }).catch(err => console.log(err))
        }
      else {return}
    }
 
  

  

 //convert the answers from object of objects to an array of objects
  let answers = [];
  for(var key in questions.answers) {
      answers.push(questions.answers[key])
  };
answers.sort((a, b) => (a.helpfulness < b.helpfulness) ? 1 : -1 );


//functionality to load more answers
function loadd() {
  setloaded(true);
}


let loadAnswers = loaded === false && answers.length < 2  ?  (<a className="loadMoreAnswers" onClick={()=>{loadd()}} >Load More Answers</a>) : (<div></div>);
console.log(answers);


    return (
        <div>
            <h2 className="question">Q: {questions.question_body}<span className="mother"><span className="Helpful">Helpful?</span><span className="had">|</span><span  className="Yes"  onClick={()=>{vote()}}>Yes</span><span  className="qCount">({questions.question_helpfulness})</span></span></h2>
          <div><span style={{}}>A:</span>
             {answers.map(answer => {
                return <Answer render={render} reporting={reporting} key={answer.id} answer = {answer} />
            })}

        </div>
        {loadAnswers}
          </div>
    )
}

