import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle, FaListAlt, FaCode, FaLightbulb } from "react-icons/fa";
import { MdSpeed, MdAnimation, MdTimeline, MdQuestionAnswer, MdPlayArrow } from "react-icons/md";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [randomColor, setRandomColor] = useState(getRandomColor());
  const heroTitleRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomColor(getRandomColor());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (heroTitleRef.current) {
      heroTitleRef.current.classList.add("hero-title-animated");
    }
  }, []);

  function getRandomColor() {
    const colors = ["#ff6b6b", "#4ecdc4", "#ffc75f", "#8e44ad", "#3498db", "#2ecc71"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function adjustBrightness(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    const RR = R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
    const GG = G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
    const BB = B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  }

  useEffect(() => {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
      const color1 = getRandomColor();
      const color2 = adjustBrightness(color1, 50);
      card.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;

      const leaves = document.createElement('div');
      leaves.classList.add('leaves');
      card.appendChild(leaves);

      const flowers = document.createElement('div');
      flowers.classList.add('flowers');
      card.appendChild(flowers);

      const snow = document.createElement('div');
      snow.classList.add('snow');
      card.appendChild(snow);
    });
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section" style={{ background: `linear-gradient(to right, ${randomColor}, ${adjustBrightness(randomColor, 80)})` }}>
        <div className="hero-content">
          <h1 ref={heroTitleRef} className="hero-title">Sorting Visualizer</h1>
          <p className="hero-description">
            Visualize sorting algorithms with interactive animations and learn how they work.
          </p>
          <button className="explore-btn" onClick={() => navigate("/sorting-visualizer")}>
            <FaPlayCircle /> Start Visualizing
          </button>
        </div>
      </header>

      <section className="about-section">
        <h2 className="section-title">About This Project</h2>
        <p className="section-description">
          Sorting Visualizer is a tool built using React that helps you understand sorting algorithms. It displays a dynamic visualization of various sorting algorithms such as Bubble Sort, Merge Sort, Quick Sort, and more.
        </p>
      </section>

      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaListAlt className="feature-icon" />
            <h3>Multiple Algorithms</h3>
            <p>Supports a variety of sorting algorithms.</p>
          </div>
          <div className="feature-card">
            <MdAnimation className="feature-icon" />
            <h3>Interactive Visualization</h3>
            <p>Real-time array element changes.</p>
          </div>
          <div className="feature-card">
            <MdSpeed className="feature-icon" />
            <h3>Speed Control</h3>
            <p>Adjust sorting speed for better understanding.</p>
          </div>
          <div className="feature-card">
            <FaCode className="feature-icon" />
            <h3>Code Snippets</h3>
            <p>View code snippets of each algorithm.</p>
          </div>
          <div className="feature-card">
            <FaLightbulb className="feature-icon" />
            <h3>Educational Tool</h3>
            <p>Ideal for students and developers.</p>
          </div>
          <div className="feature-card">
            <MdTimeline className="feature-icon" />
            <h3>Performance Analysis</h3>
            <p>Analyze algorithm performance.</p>
          </div>
          <div className="feature-card">
            <MdQuestionAnswer className="feature-icon" />
            <h3>Algorithm Info</h3>
            <p>Detailed algorithm information.</p>
          </div>
          <div className="feature-card">
            <MdPlayArrow className="feature-icon" />
            <h3>Step-by-Step Mode</h3>
            <p>Control visualization step by step.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;