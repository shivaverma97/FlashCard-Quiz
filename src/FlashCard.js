import React, { useState } from 'react'

export default function FlashCard(props) {
  const {
    question
  } = props

  const [flip, setFlip] = useState(false)

  function handleFlip() {
    setFlip(!flip)
  }

  return (
    <div className='card' onClick={handleFlip}>
      {flip && <div className='card-answer'>{question.answer}</div>}
      {
        !flip && <><div className='card-question'>{question.question}</div>
          <div className='card-options'>
            {question.options.map((option) => {
              return <div key={option} className='card-option'>{option}</div>
            })}
          </div>
        </>
      }
    </div>
  )
}
