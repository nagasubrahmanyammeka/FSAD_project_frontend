import React from "react";

const Schemes = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Government Agricultural Schemes</h1>

      <p className="page-intro">
        The Government of India and various state governments provide financial
        assistance, subsidies, crop insurance, and modernization support to farmers.
        These schemes aim to increase productivity, reduce financial risk, and
        promote sustainable agriculture.
      </p>

      <div className="card-container">

        <div className="info-card">
          <h2>PM-KISAN</h2>
          <p>
            Provides ₹6000 per year to eligible farmers in three installments.
          </p>
          <ul>
            <li>Direct income support</li>
            <li>DBT (Direct Benefit Transfer)</li>
            <li>Supports small farmers</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>PM Fasal Bima Yojana</h2>
          <p>
            Crop insurance scheme protecting farmers against natural disasters.
          </p>
          <ul>
            <li>Low premium</li>
            <li>Coverage for crop loss</li>
            <li>Financial security</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Kisan Credit Card (KCC)</h2>
          <p>
            Provides easy agricultural loans with minimal interest rates.
          </p>
          <ul>
            <li>Short-term crop loans</li>
            <li>Flexible repayment</li>
            <li>Emergency financial support</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Paramparagat Krishi Vikas Yojana</h2>
          <p>
            Promotes organic farming and sustainable agricultural practices.
          </p>
          <ul>
            <li>Organic certification support</li>
            <li>Reduced chemical usage</li>
            <li>Improves soil fertility</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>National Mission on Sustainable Agriculture</h2>
          <p>
            Focuses on climate-resilient farming and water conservation.
          </p>
          <ul>
            <li>Rainwater harvesting</li>
            <li>Efficient irrigation</li>
            <li>Climate adaptation support</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Schemes;