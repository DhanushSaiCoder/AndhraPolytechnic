import React from 'react';
import '../../styles/AboutUsStyles/Map.css'; // Import the CSS file for styling

const Map = () => {
    const latitude = 15.9041;
    const longitude = 80.4669;

    return (<div className="map-container">
        \<iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.892!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDU0JzE0LjgiTiA4MMKwMjgnMDAuOCJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin&q=Andhra+Polytechnic+Bapatla`}
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
