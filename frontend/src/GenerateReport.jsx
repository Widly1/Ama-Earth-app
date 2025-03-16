// GenerateReport.jsx
import { useState } from 'react';

const GenerateReport = () => {
  const [input, setInput] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: input }),
      });

      if (response.ok) {
        const data = await response.json();
        setReport(data.report);
      } else {
        console.error('Failed to generate report', response);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{
      padding: '30px',
      maxWidth: '700px',
      margin: '0 auto',
      backgroundColor: '#f5f9f6',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#2E7D32', fontSize: '24px' }}>Ama Earth's Environmental Report Generator</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter environmental data..."
        rows="6"
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          marginTop: '10px',
          resize: 'none'
        }}
      />
      <button
        onClick={generateReport}
        style={{
          padding: '12px 20px',
          backgroundColor: loading ? '#A5D6A7' : '#4CAF50',
          color: 'white',
          cursor: 'pointer',
          marginTop: '15px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px'
        }}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Report'}
      </button>

      {report && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#E8F5E9', borderRadius: '8px' }}>
          <h3 style={{ color: '#2E7D32' }}>Generated Report:</h3>
          <p style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{report}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateReport;