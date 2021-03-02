import React from 'react';
import Question from './Question.jsx';

export default function QuestionList({questions, loadMore, clicked,render}) {
 
    


    let button = clicked === false ?  (<div className="button" >
    <a className="btn btn-dark btn-big"  onClick={loadMore}>more answered questions</a>
    </div>) : (<div></div>)
            // console.log("q",questions);
    return (

        <div>        
            <div className="List" style={{overflow:'auto'}}>
            {questions.map((question) => {
                return <Question reporting={question} render={render}  questions = {question} key={question.question_id} />
            })}
           
        </div>
         {button}
            </div>

    )
}
