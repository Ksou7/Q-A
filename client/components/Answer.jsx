import React from 'react'
import moment from 'moment'

export default function Answer({answer}) {
    return (
        <div className="answer">
            <p style={{fontSize:"1.25rem"}}>{answer.body}</p>
            
            <div style={{display:"flex", flexDirection:"row", height:"10%"}}>
                <div style={{color:"gray"}}>by {answer.answerer_name}</div>
                <div style={{color:"gray"}} style={{borderRight:"2px solid gray", paddingRight:"1.25rem" ,color:"gray"}}>{moment(answer.date).format('LL')}</div>
                <div style={{color:"gray", marginLeft:"1.25rem",borderRight:"2px solid gray", paddingRight:"1.25rem", textDecoration:"underline" }}><span style={{textDecoration:"none"}}>Helpful?</span>  Yes ({answer.helpfulness})</div>
                <div style={{color:"gray", marginLeft:"1.25rem", textDecoration:"underline"}}>Report</div>
            </div>
        </div>
    )
}
