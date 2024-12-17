import React, { useState } from "react";
import { Box, Snackbar, Alert, IconButton } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation"; // Import location icon
import StyledButton from "../StyledButton";
import "./ReportForm.css";
const API_BASE_URL = "https://citywatch-services-5b54bb1f3d47.herokuapp.com/";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    severity: "",
    address: "",
    latitude: null,
    longitude: null,
    image: null, // Restored the image field
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setFormData((prevData) => ({
            ...prevData,
            latitude: lat,
            longitude: lng,
          }));

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();

            if (data.status === "OK" && data.results.length > 0) {
              const address = data.results[0].formatted_address;
              setFormData((prevData) => ({
                ...prevData,
                address,
              }));
              handleSnackbar("Location fetched successfully!", "success");
            } else {
              handleSnackbar("Unable to fetch address.", "error");
            }
          } catch (error) {
            console.error("Geocoding Error:", error);
            handleSnackbar("Error fetching address.", "error");
          }
        },
        () => {
          handleSnackbar("Location access denied.", "error");
        }
      );
    } else {
      handleSnackbar("Geolocation not supported by browser.", "error");
    }
  };

  const geocodeAddress = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formData.address
        )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error("Address not found");
      }
    } catch (error) {
      console.error("Geocoding Error:", error.message);
      handleSnackbar("Unable to find the location. Please enter a valid address.", "error");
      return null;
    }
  };

  const handleSubmit = async () => {
    const priorityMap = { Low: 1, Medium: 2, High: 3 };
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      handleSnackbar("User ID not found. Please log in again.", "error");
      return;
    }

    const coordinates = await geocodeAddress();
    if (!coordinates) return;

    const formDataToSend = new FormData();
    formDataToSend.append("user_id", userId);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("latitude", coordinates.lat);
    formDataToSend.append("longitude", coordinates.lng);
    formDataToSend.append("priority", priorityMap[formData.severity]);
    formDataToSend.append("phyaddress", formData.address);

    if (formData.image) {
      formDataToSend.append("image", formData.image); // Restored image upload
    }

    try {
      const response = await fetch(`${API_BASE_URL}/CreateReport.php`, {
        method: "POST",
        body: formDataToSend,
      });
    
      const text = await response.text(); // Inspect raw text response
      console.log("Raw Response:", text); // Log the response
      
      const result = JSON.parse(text); // Try parsing manually
      if (result.success) {
        handleSnackbar("Report submitted successfully!", "success");
      } else {
        handleSnackbar(`Error: ${result.message}`, "error");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      handleSnackbar("An unexpected error occurred.", "error");
    }
  };

  return (
    <>
      <form className="report-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select a category</option>
            <option value="Infrastructure Issues">Infrastructure Issues</option>
            <option value="Sanitation & Waste Management">Waste Management</option>
            <option value="Environmental Concerns">Environmental Concerns</option>
            <option value="Public Safety">Public Safety</option>
            <option value="Utility Services">Utility Services</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter report title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group address-group">
          <label htmlFor="address">Address</label>
          <div className="address-input-wrapper">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter physical address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
            />
            <IconButton
              onClick={fetchCurrentLocation}
              className="location-button"
              aria-label="Fetch Current Location"
            >
              <MyLocationIcon />
            </IconButton>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="severity">Severity</label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            className="form-input"
          />
        </div>

        <StyledButton
          text="Submit Report"
          onClick={handleSubmit}
          fullWidth
          className="submit-button"
        />
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReportForm;
