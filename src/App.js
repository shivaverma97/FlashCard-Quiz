import { useEffect, useRef, useState } from "react";
import FlashCardList from "./FlashCardList";
import axios from "axios";

function App() {
  
  const [categories, setCategories] = useState([''])
  const [flashCards, setFlashCards] = useState([])
  const [loading, setLoading] = useState(false)

  const categoryRef = useRef()
  const amountRef = useRef()

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    setFlashCards([])
    setLoading(true)
    axios.get("https://opentdb.com/api.php", {
      params: {
        amount: amountRef.current.value,
        category: categoryRef.current.value
      }
    }).then(res => {
      setFlashCards((res.data.results.map((questionItem, index) => {

        const answer = questionItem.correct_answer
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)), answer
        ]

        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5) // generating a key to sort array
        }
      })))
      setLoading(false)
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
              {categories && categories.map((category) => {
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
      </form>
      {flashCards.length === 0 && loading ? ( <div>Loading...</div>) : (<FlashCardList questions={flashCards} />)}
    </>
  );
}

export default App;
