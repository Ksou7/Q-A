import axios from 'axios';
import React, {useState} from 'react';
import Answer from './Answer.jsx';


export default function Question({questions, render, reporting}) {

  const [clicked, setClicked] = useState(false);
  const [loaded, setloaded] = useState(false);


    //update helpfulness count function
    function vote() {
      if(clicked === false) {
         axios.put(`http://64.225.105.221:3002/api/questions/${questions.question_id}`, {},  { headers: {'Content-Type': 'application/json'} }).then(res => {
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

let link = loaded === false ? (<a style={{marginLeft:"1.25rem"}} className="loadMoreAnswers" onClick={()=>{loadd()}} >Load More Answers</a>) : <br />

    return (
        <div>
            <h2 className="question">Q: {questions.question_body}<span className="mother"><span className="Helpful">Helpful?</span><span className="had">|</span><span  className="Yes"  onClick={()=>{vote()}}>Yes</span><span  className="qCount">({questions.question_helpfulness})</span></span></h2>
          <div style={{marginLeft:"1.25rem"}}><span style={{fontWeight: 'bold', fontSize:'1.25rem'}}>A:</span>
             {!loaded? answers.slice(0, 2).map(answer => {
                return <Answer render={render} reporting={reporting} key={answer.id} answer = {answer} />
            }) :  answers.map(answer => {
              return <Answer render={render} reporting={reporting} key={answer.id} answer = {answer} />
          })}

        </div>
        {link}
          </div>
    )
}

