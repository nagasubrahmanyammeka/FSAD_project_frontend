import React from "react";

const Devices = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Smart Agricultural Devices</h1>

      <p className="page-intro">
        Modern farms are increasingly adopting smart devices and IoT-based
        systems to enhance productivity and reduce operational costs.
      </p>

      <div className="card-container">

        <div className="info-card">
          <h2>Soil Moisture Sensors</h2>
          <p>
            Measures soil water levels to optimize irrigation schedules.
          </p>
          <ul>
            <li>Water conservation</li>
            <li>Prevents root damage</li>
            <li>Improves yield</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Smart Irrigation Controllers</h2>
          <p>
            Automatically adjusts water supply based on weather and soil data.
          </p>
          <ul>
            <li>Remote mobile control</li>
            <li>Energy efficient</li>
            <li>Reduces water wastage</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Agricultural Drones</h2>
          <p>
            Used for crop spraying, health monitoring, and land surveying.
          </p>
          <ul>
            <li>Precision spraying</li>
            <li>Time-saving</li>
            <li>Lower labor costs</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>GPS-enabled Tractors</h2>
          <p>
            Advanced tractors with GPS systems for accurate field operations.
          </p>
          <ul>
            <li>Accurate plowing</li>
            <li>Fuel efficiency</li>
            <li>Reduced overlap errors</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Automated Harvesters</h2>
          <p>
            Machines that automate crop harvesting to save time and labor.
          </p>
          <ul>
            <li>High efficiency</li>
            <li>Reduced crop damage</li>
            <li>Faster harvesting</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Devices;