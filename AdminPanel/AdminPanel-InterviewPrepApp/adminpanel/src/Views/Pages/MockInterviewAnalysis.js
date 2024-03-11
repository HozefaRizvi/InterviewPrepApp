import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { trashBin, eye ,download} from 'ionicons/icons';
import { collection, getDocs, deleteDoc, doc, where, query, limit } from 'firebase/firestore';
import { jsPDF } from 'jspdf';

const MockInterviewAnalysis = () => {
  const [videoLink, setVideoLink] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyseClick = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://192.168.18.136:5002/VideoModel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Video: videoLink }),
      });

      if (!response.ok) {
        console.error('Failed to analyze video');
        return;
      }

      const data = await response.json();
      setAnalysisResult(data.ConfidenceData);
    } catch (error) {
      console.error('Error analyzing video:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleClearClick = () => {
    setVideoLink('');
    setAnalysisResult(null);
  };



  return (
    <div className="container bg-white min-vh-100 d-flex flex-column p-4">
    <h2 className="text-center mb-4">Mock Interview Analysis of User's Given Interview</h2>
    {/* Input Field and Analyse Button */}
    <div className="my-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter video link..."
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleAnalyseClick}>
            <IonIcon icon={eye} className="mr-2" /> Analyse
          </button>
          <button className="btn btn-secondary ml-2" onClick={handleClearClick}>
            <IonIcon icon={trashBin} className="mr-2" /> Clear
          </button>
        </div>
      </div>
    </div>

    {loading && (
      <div className="my-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )}

    {analysisResult && (
      <div className="my-4 bg-light p-4 rounded analysis-result-container" style={{ maxWidth:'950px' ,maxHeight: '300px', overflowY: 'auto' }}>
       <h4>Analysis Result:</h4>
       {analysisResult.confidence_level && (
            <p>
            <strong>Confidence Level:</strong> {analysisResult.confidence_level}
            </p>
        )}
        {analysisResult.dominant_emotions && (
            <p>
            <strong>Dominant Emotions:</strong> {JSON.stringify(analysisResult.dominant_emotions)}
            </p>
        )}
        {analysisResult.Tips && (
        <div>
            <h5>Recommendations:</h5>
            <p>
            {analysisResult.Tips.split('\n').filter((tip) => tip.trim() !== '').map((tip, index) => (
                <p key={index}>{tip}</p>
            ))}
            </p>
        </div>
        )}
        {analysisResult['Additional Notes'] && (
        <div>
            <h5>Additional Expression Notes:</h5>
            <ul>
            {analysisResult['Additional Notes'].split('\n').filter((note) => note.trim() !== '').map((note, index) => (
                <li key={index}>{note}</li>
            ))}
            </ul>
        </div>
        )}
       
      </div>
    )}

    <div className="overflow-auto">
      <p className="text-muted">Scroll down to see the analysis content.</p>
    </div>
  </div>
  );
};

export default MockInterviewAnalysis;
