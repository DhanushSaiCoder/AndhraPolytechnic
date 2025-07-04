import React from 'react';
import '../../styles/AboutUsStyles/Map.css'; // Import the CSS file for styling

const Map = () => {
    return (<div className="map-container">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238.55607592540272!2d82.2323202815691!3d16.93036163169194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3827eb32268f59%3A0xf1eaf501d757f10e!2sAndhra%20Polytechnic!5e0!3m2!1sen!2sin!4v1751620958521!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Andhra Polytechnic Location"
            className="map-iframe"
        /> <div className="map-overlay" /> </div>
    );
};

export default Map;
