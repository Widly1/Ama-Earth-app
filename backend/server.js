const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());  // for parsing application/json

app.post('/generate-report', (req, res) => {
  // Your code to generate the report
  const userInput = req.body.userInput;
  const generatedReport = `Report for: ${userInput}`;
  res.json({ report: generatedReport });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
