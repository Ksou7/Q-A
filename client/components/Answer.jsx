import React, {useState} from 'react';
import moment from 'moment';
import axios from 'axios';

export default function Answer({answer, reporting}) {
let [report, setReported] = useState(reporting.reported)
console.log(report);
console.log(reporting);
let rep = report === false ? "Report" : "Reported" 

function reportAnswer() {
    if(report === false) {
        axios.put(`http://localhost:3001/report/${reporting.question_id}`).then(res => {
        setReported(true)

        }).catch(err => {
            console.log(err);
        })
    }
    
    else {
        return
    }
}

    return (
        <div className="answer">
            <p style={{fontSize:"1.25rem"}}>{answer.body}</p>
            
            <div style={{display:"flex", flexDirection:"row", height:"10%"}}>
                <div style={{color:"gray"}}>by {answer.answerer_name}</div>
                <div style={{color:"gray"}} style={{borderRight:"2px solid gray", paddingRight:"1.25rem" ,color:"gray"}}>{moment(answer.date).format('LL')}</div>
                <div style={{color:"gray", marginLeft:"1.25rem",borderRight:"2px solid gray", paddingRight:"1.25rem", textDecoration:"underline" }}><span style={{textDecoration:"none"}}>Helpful?</span>  Yes ({answer.helpfulness})</div>
                <div onClick={() => {reportAnswer()}} style={{color:"gray", marginLeft:"1.25rem", textDecoration:"underline"}}>{rep}</div>
                {/* display images */}
            </div>
        </div>
    )
}
