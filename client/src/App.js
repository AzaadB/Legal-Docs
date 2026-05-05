import { useState } from 'react'
import './App.css'

function App() {
  const [docType, setDocType] = useState('demand')
  const [name, setName] = useState('')
  const [recipient, setRecipient] = useState('')
  const [details, setDetails] = useState('')

  const generateDoc = async () => {
    const res = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ docType, name, recipient, details }),
    })

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'document.docx'
    a.click()
  }

  return (
    <div className='app'>
      <div className='card'>
        <h1>LegalDocs</h1>

        <select onChange={(e) => setDocType(e.target.value)}>
          <option value='demand'>Letter of Demand</option>
          <option value='affidavit'>Affidavit</option>
          <option value='motion'>Notice of Motion</option>
        </select>

        <input
          placeholder='Your Name'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder='Recipient'
          onChange={(e) => setRecipient(e.target.value)}
        />
        <textarea
          placeholder='Details'
          onChange={(e) => setDetails(e.target.value)}
        />

        <button onClick={generateDoc}>Generate Document</button>
      </div>
    </div>
  )
}

export default App
