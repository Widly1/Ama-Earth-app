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
      <h2 className ={styles.multicolor}>Featuring Google's Gemini</h2>
        <div className= {styles.aboutUs}>
          <h3>About Ama Earth's Environmental Report Generator: </h3> 
          <p>The purpose of this site is to educate and inform individuals who are curious about our environmental health, progress, and more. </p>
          <p>Powered by Google's AI, Gemini, all you have to do is type below in the text box and a report will be generated for you based on your inquiry. </p>
        </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)} // update "input" state with the value being typed in the input field  
        placeholder="Enter your environmental question. I'll generate the report for you 😄" style = {{fontSize: '13px'}}
        rows="8"
        className={styles.textarea}
      />
      <button onClick={generateReport} className={styles.button} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Report'}
      </button>
      {report && (
        <div className={styles.reportContainer}>
          <h3 className = {styles.multicolor}>Generated Report:</h3>
          <p style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{report}</p>
        </div>
      )}
    
    </div>
  );
};

export default GenerateReport;