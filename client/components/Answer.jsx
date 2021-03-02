import React, {useState} from 'react';
import moment from 'moment';
import axios from 'axios';

export default function Answer({answer, reporting}) {
let [report, setReported] = useState(reporting.reported)
const [clicked, setClicked] = useState(false);

//function to vote helpful for each answer
function voteAnswer() {
    
        if(clicked === false) {
        
          
    
           axios.put(`http://localhost:3001/answers/${answer.id}`, {},  { headers: {'Content-Type': 'application/json'} }).then(res => {
             console.log("sent");
             setClicked(true)
           }).catch(err => console.log(err))
          }
        else {return}  
}


let rep = report === false ? "Report" : "Reported" 

//function to report question
function reportQ() {
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
            <div className="AnswerimagePanel">
                    {answer.photos.map((img, i) => {
                        return <img src={img} key={i} />
                    })}
                </div>
            
            <div style={{display:"flex", flexDirection:"row", height:"10%"}}>
                <div style={{color:"gray", marginRight:'1.25rem'}}>by {answer.answerer_name}</div>
                <div style={{color:"gray"}} style={{borderRight:"2px solid gray", paddingRight:"1.25rem" ,color:"gray"}}>{moment(answer.date).format('LL')}</div>
                <div style={{color:"gray",cursor:"pointer", marginLeft:"1.25rem",borderRight:"2px solid gray", paddingRight:"1.25rem", textDecoration:"underline" }}><span style={{textDecoration:"none"}}>Helpful?</span><span onClick={() => {voteAnswer()}}>Yes ({answer.helpfulness})</span></div>
                <div onClick={() => {reportQ()}} style={{color:"gray", marginLeft:"1.25rem", textDecoration:"underline", cursor:"pointer"}}>{rep}</div>
               
            </div>
        </div>
    )
}
