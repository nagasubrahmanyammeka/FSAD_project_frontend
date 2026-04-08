import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <section className="home-hero">
        <div className="hero-content">
          <h1>Empowering Farmers, Connecting Communities</h1>
          <p>
            Join AgriConnect to access modern farming techniques, expert advice,
            and a digital marketplace that helps you grow smarter and earn better.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn btn--primary btn--lg">
              Get Started
            </Link>
            <Link to="/services" className="btn btn--outline btn--lg">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;