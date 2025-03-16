// GenerateReport.jsx
import { useState } from 'react';

const GenerateReport = () => {
  const [input, setInput] = useState('');
  const [report, setReport] = useState('');

  const generateReport = async () => {
    try {
      const response = await fetch('http://localhost:5001/generate-report', {  // Make sure to match your backend port
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: input }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Display the report
        setReport(data.report)
      } else {
        console.error('Failed to generate report', response);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Ama Earth's Environmental Report Generator</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tell me the environmental data you'd like to generate..."
        rows="8"
        style={{ width: '100%', padding: '10px' }}
      />
      <button
        onClick={generateReport}
        style={{
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer',
          marginTop: '10px',
          borderRadius: '15px',
          borderBlockColor: 'bisque'
        }}
      >
        Generate Report
      </button>

      {report && (
        <div style={{ marginTop: '20px' }}>
          <h3>Generated Report:</h3>
          <p>{report}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
