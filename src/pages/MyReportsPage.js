import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import ReportCard from '../components/ReportCard/ReportCard';
import Pagination from '../components/Pagination/Pagination';
import Modal from '../components/Modal/Modal';
import './styles/MyReportsPage.css';

// Need to implement logic to fetch only currently logged in user's reports

// Static data for user-specific reports (simulated data)
const reports = [
  {
    id: 1,
    username: 'JohnDoe',
    location: 'Downtown',
    category: 'Road Issue',
    image: '/assets/img.png',
    title: 'Pothole on Main Street',
    description: 'A large pothole causing traffic delays.',
    severity: 'High',
    status: 'In Progress',
  },
  {
    id: 2,
    username: 'JohnDoe',
    location: 'Eastside Park',
    category: 'Lighting',
    image: '/assets/img.png',
    title: 'Broken Street Light',
    description: 'A broken light making the park unsafe at night.',
    severity: 'Medium',
    status: 'Reported',
  },
  // Add more reports here as needed
];

const REPORTS_PER_PAGE = 6;

const MyReportsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const totalPages = Math.ceil(reports.length / REPORTS_PER_PAGE);

  const currentReports = reports.slice(
    (currentPage - 1) * REPORTS_PER_PAGE,
    currentPage * REPORTS_PER_PAGE
  );

  // Function to handle opening the modal
  const openModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  return (
    <div className="my-reports-layout">
      <Header />
      <div className="content-wrapper">
        <Navbar />
        <div className="reports-page">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <div className="reports-container">
            {currentReports.map((report) => (
              <div key={report.id} onClick={() => openModal(report)}>
                <ReportCard report={report} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <Modal showModal={showModal} report={selectedReport} onClose={closeModal} />
    </div>
  );
};

export default MyReportsPage;
