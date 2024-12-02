import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import ReportCard from '../components/ReportCard/ReportCard';
import Pagination from '../components/Pagination/Pagination';
import Modal from '../components/Modal/Modal';
import './styles/AllReportsPage.css';

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
      username: 'JaneSmith',
      location: 'Eastside Park',
      category: 'Lighting',
      image: '/assets/img.png',
      title: 'Broken Street Light',
      description: 'A broken light making the park unsafe at night.',
      severity: 'Medium',
      status: 'Reported',
    },
    {
      id: 3,
      username: 'MikeJohnson',
      location: 'West Plaza',
      category: 'Garbage',
      image: '/assets/img.png',
      title: 'Overflowing Trash Bin',
      description: 'Trash bin overflowing, attracting pests.',
      severity: 'Low',
      status: 'Resolved',
    },
    {
      id: 4,
      username: 'SarahLee',
      location: 'City Square',
      category: 'Signage',
      image: '/assets/img.png',
      title: 'Fallen Street Sign',
      description: 'A street sign has fallen and poses a hazard.',
      severity: 'High',
      status: 'Pending Review',
    },
    {
      id: 5,
      username: 'TomWilson',
      location: 'Old Town',
      category: 'Graffiti',
      image: '/assets/img.png',
      title: 'Graffiti on Public Wall',
      description: 'Unapproved graffiti on the community center wall.',
      severity: 'Medium',
      status: 'In Progress',
    },
    {
      id: 6,
      username: 'AliceBrown',
      location: 'Market Street',
      category: 'Water Leak',
      image: '/assets/img.png',
      title: 'Water Leak Near Store',
      description: 'Water leaking from a broken pipe near a store entrance.',
      severity: 'High',
      status: 'Reported',
    },
    {
      id: 7,
      username: 'ChrisEvans',
      location: 'Riverbank',
      category: 'Environmental',
      image: '/assets/img.png',
      title: 'Pollution in River',
      description: 'Plastic waste accumulating along the riverbank.',
      severity: 'Critical',
      status: 'Under Investigation',
    },
    {
      id: 8,
      username: 'NinaGarcia',
      location: 'City Park',
      category: 'Animal Control',
      image: '/assets/img.png',
      title: 'Stray Dog Sightings',
      description: 'Several stray dogs reported roaming the park.',
      severity: 'Medium',
      status: 'Resolved',
    },
];


const REPORTS_PER_PAGE = 6;

const AllReportsPage = () => {
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
    <div className="all-reports-layout">
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

export default AllReportsPage;