import React from 'react';
import './ReportCard.css';

const ReportCard = ({ report }) => {
  return (
    <div className="report-card">
      <div className="report-header">
        <p><strong>User:</strong> {report.username}</p>
        <p><strong>Location:</strong> {report.location}</p>
        <p><strong>Category:</strong> {report.category}</p>
      </div>
      <img src={report.image} alt={report.title} className="report-image" />
      <div className="report-details">
        <h3>{report.title}</h3>
        <p>{report.description}</p>
        <p><strong>Severity:</strong> {report.severity}</p>
        <p><strong>Status:</strong> {report.status}</p>
      </div>
    </div>
  );
};

export default ReportCard;
