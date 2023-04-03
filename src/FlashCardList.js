import React from 'react'
import FlashCard from './FlashCard'

export default function FlashCardList(props) {
    const {
        questions
    } = props
  return (
    <div className='cards'>
      {questions.map((question) =>{
        return <FlashCard question = {question} key={question.id}/>
      })}
    </div>
  )
}
