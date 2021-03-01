import React from 'react';
import Question from './Question.jsx';

export default function QuestionList({questions, loadMore, clicked}) {

    


    let button = clicked === false ?  (<div className="button" >
    <a className="btn btn-dark btn-big"  onClick={loadMore}>more answered questions</a>
    </div>) : (<div></div>)
            // console.log("q",questions);
    return (

        <div>        
            <div className="List" style={{overflow:'auto'}}>
            {questions.map((question) => {
                return <Question  questions = {question} key={question.question_id} />
            })}
           
        </div>
         {button}
            </div>

    )
}
