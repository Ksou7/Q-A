import React from 'react'

export default function Answer({answer}) {
    return (
        <div>
            <p>A: {answer.body}</p>
            <div style={{display:"flex", }}></div>
        </div>
    )
}
