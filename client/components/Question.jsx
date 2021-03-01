import React from 'react'

export default function Question({questions}) {
    return (
        <div>
          

            
            {/* <h2 >Q: {questions.question_body} <span className="had">|</span><span className="Yes">Yes</span><span  className="qCount">({questions.question_helpfulness})</span><span span */}
            
            <h2 className="question">Q: {questions.question_body}<span className="mother"><span className="Helpful">Helpful?</span><span className="had">|</span><span className="Yes">Yes</span><span  className="qCount">({questions.question_helpfulness})</span></span></h2>

            


        </div>
    )
}

