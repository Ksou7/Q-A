import React, {useState} from 'react';
import moment from 'moment';
import axios from 'axios';

export default function Answer({answer, reporting, render}) {
let [report, setReported] = useState(reporting.reported)
const [clicked, setClicked] = useState(false);

//function to vote helpful for each answer
function voteAnswer() {
    
        if(clicked === false) {
        
          
    
           axios.put(`http://64.225.105.221:3002/questions/answers/${answer.id}`, {},  { headers: {'Content-Type': 'application/json'} }).then(res => {
             console.log("sent");
             setClicked(true);
             render();
           }).catch(err => console.log(err))
          }
        else {return}  
}


let rep = report === false ? "Report" : "Reported" 

//function to report question
function reportQ() {
    if(report === false) {
        axios.put(`http://64.225.105.221:3002/questions/report/${reporting.question_id}`).then(res => {
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
            <p style={{fontSize:"1.25rem", color:'#1C2321'}}>-{answer.body}</p>
            <div className="AnswerimagePanel">
                    {answer.photos.map((img, i) => {
                        return <img src={img} key={i} />
                    })}
                </div>
            
            <div style={{display:"flex", flexDirection:"row", height:"10%"}}>
                <div style={{color:"#A9B4C2", marginRight:'1.25rem'}}>by {answer.answerer_name}</div>
                <div style={{color:"#A9B4C2"}} style={{borderRight:"2px solid #A9B4C2", paddingRight:"1.25rem" ,color:"#A9B4C2"}}>{moment(answer.date).format('LL')}</div>
                <div style={{color:"#A9B4C2",cursor:"pointer", marginLeft:"1.25rem",borderRight:"2px solid #A9B4C2", paddingRight:"1.25rem", textDecoration:"underline" }}><span style={{textDecoration:"none", color:'gray'}}>Helpful?</span><span style={{color:'gray'}} onClick={() => {voteAnswer()}}>Yes ({answer.helpfulness})</span></div>
                <div onClick={() => {reportQ()}} style={{color:"gray", marginLeft:"1.25rem", textDecoration:"underline", cursor:"pointer"}}>{rep}</div>
               
            </div>
        </div>
    )
}
