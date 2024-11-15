// src/pages/Home.js
import React from "react";
import backgroundImage from "../images/123.jpg"; // Adjust the path as needed
import ResponsiveAppBar from "../components/Header";

function BillHome() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      zIndex: 0,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(345, 345, 345, 0.1)", // Light gray with transparency
      zIndex: 1,
    },
    buttonContainer: {
      display: "flex",
      gap: "20px", // Space between bu.ttons
      zIndex: 2,
    },
    button: {
      width: "250px",
      height: "250px",
      backgroundColor: "#F2E7DC", // Button color
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "10px",
      border: "none",
      color: "black",
      fontSize: "24px",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease", // Smooth hover transition
    },
    buttonHover: {
      backgroundColor: "#634F0C", // Darker shade for hover
    },
  };

  return (
    <>
    <ResponsiveAppBar />
    <div style={styles.container}>
      <div style={styles.overlay}></div> {/* Transparent overlay */}
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => (window.location.href = "/BillInfo")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.button.backgroundColor)
          }
        >
          Save Bill
        </button>
        <button
          style={styles.button}
          onClick={() => (window.location.href = "/bill-views")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.button.backgroundColor)
          }
        >
          Bill Information
        </button>
        
      </div>
    </div>
    </>
  );
}

export default BillHome;
