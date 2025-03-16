// GenerateReport.jsx
// updated with our new GR(generate report) module.css file
import { useState } from 'react';
import styles from './GenerateReport.module.css'; // Import the CSS Module

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
    <div className={styles.container}>
      <h1 className={styles.title}>Ama Earth's Environmental Report Generator</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter environmental data..."
        rows="6"
        className={styles.textarea}
      />
      <button onClick={generateReport} className={styles.button} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Report'}
      </button>

      {report && (
        <div className={styles.reportContainer}>
          <h3>Generated Report:</h3>
          <p style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{report}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateReport;