import { useState } from 'react'
import './App.css'
import API_URL from './config'

function App() {
  const [docType, setDocType] = useState('demand')
  const [name, setName] = useState('')
  const [recipient, setRecipient] = useState('')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)

  // ...

  const generateDoc = async () => {
    setLoading(true)

    const res = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ docType, name, recipient, details }),
    })

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'document.docx'
    a.click()

    setLoading(false)
  }

  ;<button onClick={generateDoc}>
    {loading ? 'Generating...' : 'Generate Document'}
  </button>

  return (
    <div className='app'>
      <div className='card'>
        <h1>LegalDocs</h1>

        <p style={{ color: '#666', marginBottom: '15px' }}>
          Generate professional legal documents instantly
        </p>

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
