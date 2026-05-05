const express = require('express')
const cors = require('cors')
const { Document, Packer, Paragraph } = require('docx')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('API is working ✅')
})

app.post('/generate', async (req, res) => {
  const { name, recipient, details, docType } = req.body

  let content = []

  if (docType === 'affidavit') {
    content = ['AFFIDAVIT', `I, ${name}, hereby state:`, '', details]
  } else if (docType === 'motion') {
    content = [
      'NOTICE OF MOTION',
      `Applicant: ${name}`,
      `Respondent: ${recipient}`,
      '',
      details,
    ]
  } else {
    content = [
      'LETTER OF DEMAND',
      `From: ${name}`,
      `To: ${recipient}`,
      '',
      details,
    ]
  }

  const doc = new Document({
    sections: [{ children: content.map((line) => new Paragraph(line)) }],
  })

  const buffer = await Packer.toBuffer(doc)

  res.setHeader('Content-Disposition', 'attachment; filename=document.docx')

  res.send(buffer)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
