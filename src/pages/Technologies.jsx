import React from "react";

const Technologies = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Modern Agricultural Technologies</h1>

      <p className="page-intro">
        Emerging technologies are transforming traditional agriculture into
        smart, data-driven, and sustainable farming systems.
      </p>

      <div className="card-container">

        <div className="info-card">
          <h2>Precision Farming</h2>
          <p>
            Uses GPS and sensors to monitor crop health and optimize resources.
          </p>
          <ul>
            <li>Higher productivity</li>
            <li>Reduced input cost</li>
            <li>Better yield prediction</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Artificial Intelligence</h2>
          <p>
            AI-powered systems analyze weather and crop data for smart decisions.
          </p>
          <ul>
            <li>Disease detection</li>
            <li>Yield forecasting</li>
            <li>Smart crop recommendations</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Internet of Things (IoT)</h2>
          <p>
            Connects farm devices and sensors for real-time monitoring.
          </p>
          <ul>
            <li>Live soil data</li>
            <li>Remote farm control</li>
            <li>Instant alerts</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Blockchain in Agriculture</h2>
          <p>
            Ensures transparency and traceability in supply chains.
          </p>
          <ul>
            <li>Secure transactions</li>
            <li>Food traceability</li>
            <li>Prevents fraud</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Vertical Farming</h2>
          <p>
            Growing crops in stacked layers using controlled environments.
          </p>
          <ul>
            <li>Space-efficient</li>
            <li>Year-round production</li>
            <li>Less water usage</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Technologies;