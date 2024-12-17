import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Modal.css";
const API_BASE_URL = "https://citywatch-services-5b54bb1f3d47.herokuapp.com/";

const Modal = ({ showModal, report, onClose, refreshReports }) => {
  const [status, setStatus] = useState(report?.status || ""); 
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setStatus(report?.status || "");
    checkIfAdmin(); 
  }, [report]);

  // Check if the logged-in user is an admin
  const checkIfAdmin = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await axios.get(`${API_BASE_URL}getusertype.php`, {
          params: { user_id: userId },
        }
      );

      if (response.data.success && response.data.role === "admin") {
        setIsAdmin(true); // Set admin status
      } else {
        setIsAdmin(false); 
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const handleStatusChange = async () => {
    if (!report?.id || !status) {
      alert("Missing required fields");
      return;
    }
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}updateReportStatus.php`,
        {
          report_id: report.id, 
          status: status,
        }
      );
  
      if (response.data.success) {
        alert("Status updated successfully!");
  
        // Call refreshReports only if it exists
        if (typeof refreshReports === "function") {
          refreshReports(); // Refresh reports after update
        }
  
        onClose(); // Close modal
      } else {
        alert("Error updating status: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An unexpected error occurred.");
    }
  };
  

  if (!showModal || !report) return null;

  const severityMap = { 1: "Low", 2: "Medium", 3: "High" };
  const severity = severityMap[report.priority] || "Unknown";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2 className="modal-title">{report.title || "Report Details"}</h2>

        <div className="modal-body">
          <p>
            <strong>Category:</strong> {report.category || "Unknown"}
          </p>
          <p>
            <strong>Location:</strong> {report.phyaddress || "Unknown"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {report.description || "No description provided"}
          </p>
          <p>
            <strong>Severity:</strong> {severity}
          </p>
          <p>
            <strong>Status:</strong> {status || "No status available"}
          </p>

          {isAdmin && (
            <div className="form-group">
              <label htmlFor="status">
                <strong>Change Status:</strong>
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-input"
              >
                <option value="Reported">Reported</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              <button
                onClick={handleStatusChange}
                className="update-status-btn"
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#6941C6",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Update Status
              </button>
            </div>
          )}
        </div>

        <div className="image-container">
          <img
            src={report.imageurl}
            alt={report.title || "Report Image"}
            className="report-image"
            onError={(e) => {
              e.target.src = "/assets/image-placeholder.jpg"; 
              console.error(`Failed to load image from: ${report.imageurl}`);

            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
