import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import "./styles/MapPage.css";
import mylocation from "../assets/mylocation.svg";
import pinlocation from "../assets/pinlocation.svg";

// Status-based Icons
import reportedIcon from "../assets/reported.svg";
import inProgressIcon from "../assets/inprogress.svg";
import closedIcon from "../assets/closed.svg";

const API_BASE_URL = "https://citywatch-services-5b54bb1f3d47.herokuapp.com/";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const mapStyles = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "landscape.man_made", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ebe2f6" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#4f378a" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#d5c5ed" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#cec3f1" }] },
];

const DEFAULT_LOCATION = { lat: 37.7749, lng: -122.4194 };

const GoogleMapsPage = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [currentLocation, setCurrentLocation] = useState(DEFAULT_LOCATION);
  const [mapRef, setMapRef] = useState(null);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const getMarkerIcon = (status) => {
    switch (status.toLowerCase()) {
      case "reported":
        return reportedIcon;
      case "in progress":
        return inProgressIcon;
      case "closed":
        return closedIcon;
      default:
        return reportedIcon;
    }
  };

  const fetchCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          mapRef?.panTo(location);
          mapRef?.setZoom(15);
        },
        () => {
          console.error("Location access denied. Using default.");
          setCurrentLocation(DEFAULT_LOCATION);
        }
      );
    } else {
      console.error("Geolocation is not supported.");
      setCurrentLocation(DEFAULT_LOCATION);
    }
  }, [mapRef]);

  const fetchReports = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports.php`);
      const data = await response.json();
      if (data.success && data.data) {
        setReports(data.data);
      } else {
        console.error("Failed to fetch reports:", data.message);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    fetchCurrentLocation();
  }, [fetchCurrentLocation]);

  const handleMarkerClick = (report) => {
    setSelectedReport(report);
    mapRef?.panTo({
      lat: parseFloat(report.latitude),
      lng: parseFloat(report.longitude),
    });
    mapRef?.setZoom(15);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="google-maps-layout">
      <div className="content-wrapper">
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={8}
            options={{
              styles: mapStyles,
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMapRef(map)}
            onClick={() => setSelectedReport(null)}
          >
            <Marker
              position={currentLocation}
              icon={{
                url: mylocation,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />

            {reports.map((report) => {
              const lat = parseFloat(report.latitude);
              const lng = parseFloat(report.longitude);
              if (!isNaN(lat) && !isNaN(lng)) {
                return (
                  <Marker
                    key={report.id}
                    position={{ lat, lng }}
                    icon={{
                      url: getMarkerIcon(report.status),
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    animation={
                      selectedReport?.id === report.id
                        ? window.google.maps.Animation.BOUNCE
                        : null
                    }
                    onClick={() => handleMarkerClick(report)}
                  />
                );
              }
              return null;
            })}

            {selectedReport && (
             <InfoWindow
             position={{
               lat: parseFloat(selectedReport.latitude) + 0.002,
               lng: parseFloat(selectedReport.longitude),
             }}
           >
             <div 
               className="info-window" 
               style={{
                 padding: "8px",
                 maxWidth: "300px",
                 color: "#333",
                 fontSize: "13px",
                 fontFamily: "Arial, sans-serif",
                 lineHeight: "1.4",
               }}
             >
               <h3 style={{ marginBottom: "5px", color: "#4f378a", fontSize: "16px" }}>
                 Report Details
               </h3>
               <p><strong>Category:</strong> {selectedReport.category}</p>
               <p><strong>Description:</strong> {selectedReport.description}</p>
               <p><strong>Date Reported:</strong> {new Date(selectedReport.date_reported).toLocaleString()}</p>
               <p><strong>Status:</strong> {selectedReport.status}</p>
             </div>
           </InfoWindow>
           
            )}
          </GoogleMap>
        </div>
        <div className="map-button-container">
          <button
            onClick={fetchCurrentLocation}
            className="pin-location-button"
            aria-label="Pin My Location"
          >
            <img src={pinlocation} alt="Pin Location" className="pin-location-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapsPage;
