import { useEffect, useRef, useState } from "react";
import FlashCardList from "./FlashCardList";
import axios from "axios";

function App() {
  
  const [categories, setCategories] = useState([''])
  const [flashCards, setFlashCards] = useState([])

  const categoryRef = useRef()
  const amountRef = useRef()

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.get("https://opentdb.com/api.php", {
      params: {
        amount: amountRef.current.value,
        category: categoryRef.current.value
      }
    }).then(res => {
      setFlashCards((res.data.results.map((questionItem, index) => {
        const answer = questionItem.correct_answer
        const options = [

          ...questionItem.incorrect_answer.map(a => decodeString(a)), answer
        ]

        return {
          id: `${index}-${Date.now()}`,
          question: questionItem.question,
          answer: answer,
          options: options.sort(() => Math.random() - .5) // generating a key to sort array
        }
      })))
    })
  }

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then(res => setCategories(res.data.trivia_categories))
  }, [])

  return (
    <>
      <form  onSubmit={handleSubmit}> 
        <div className='header'>
          <div>
            <label htmlFor="category">Choose category:</label>
            <select name="category" id="category" ref={categoryRef}>
              {categories.map((category) => {
                return <option key= {category.id} value={category.id}>{category.name}</option>
              })}
            </select>
          </div>
          <div>
            <label htmlFor="amount">Amount :</label>
            <input type="amount" id="amount" name="amount" min="1" step={1} defaultValue={10} ref={amountRef} />
          </div>
          <button type='submit'>Generate</button>
        </div>
        <FlashCardList questions={flashCards} />
      </form>
    </>
  );
}

export default App;
