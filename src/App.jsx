import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/base/0x09488feD72D063Bf36784ffEFBDF57A6ec81Ad9b');
        const data = await response.json();
        if (data.pair) {
          setPriceData({
            price: parseFloat(data.pair.priceUsd).toFixed(6),
            change24h: parseFloat(data.pair.priceChange.h24).toFixed(2),
            volume24h: parseFloat(data.pair.volume.h24).toLocaleString('en-US', { maximumFractionDigits: 0 }),
            liquidity: parseFloat(data.pair.liquidity.usd).toLocaleString('en-US', { maximumFractionDigits: 0 })
          });
        }
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {priceData && (
        <div className="price-ticker">
          <div className="ticker-content">
            <span className="ticker-item">
              <strong>$PONY</strong> ${priceData.price}
            </span>
            <span className={`ticker-item ${priceData.change24h >= 0 ? 'positive' : 'negative'}`}>
              24h: {priceData.change24h >= 0 ? '+' : ''}{priceData.change24h}%
            </span>
            <span className="ticker-item">
              Vol: ${priceData.volume24h}
            </span>
            <span className="ticker-item">
              Liq: ${priceData.liquidity}
            </span>
            {/* Duplicate for seamless loop */}
            <span className="ticker-item">
              <strong>$PONY</strong> ${priceData.price}
            </span>
            <span className={`ticker-item ${priceData.change24h >= 0 ? 'positive' : 'negative'}`}>
              24h: {priceData.change24h >= 0 ? '+' : ''}{priceData.change24h}%
            </span>
            <span className="ticker-item">
              Vol: ${priceData.volume24h}
            </span>
            <span className="ticker-item">
              Liq: ${priceData.liquidity}
            </span>
          </div>
        </div>
      )}
      <header className="header">
        <img src="/logo.png" alt="Pony Labs" className="logo" />
        <h1 className="title visually-hidden">Pony Labs</h1>
      </header>

      <section className="mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p className="lead">
            We exist to Make Crypto Fun Again through gamification and excellent game design
            that can be applied across the crypto ecosystem.
          </p>
          <p>
            We design games that prove economic and behavioral concepts in the real world,
            turning abstract blockchain mechanics into intuitive, playable experiences.
          </p>
        </div>
      </section>

      <section className="products">
        <div className="container">
          <h2>Our Products</h2>
          <div className="product-grid">
            <a href="https://pxpony.com" className="product-card" target="_blank" rel="noopener noreferrer">
              <div className="product-content">
                <h3>PxPony</h3>
                <p>On-chain racing game with real economic mechanics. Race, compete, and learn.</p>
                <span className="product-link">Visit pxpony.com →</span>
              </div>
            </a>

            <a href="https://deveats.com" className="product-card" target="_blank" rel="noopener noreferrer">
              <div className="product-content">
                <h3>DevEats</h3>
                <p>Where developers meet, eat, and build together. Community-driven dining.</p>
                <span className="product-link">Visit deveats.com →</span>
              </div>
            </a>

            <a href="https://dexscreener.com/base/0x09488feD72D063Bf36784ffEFBDF57A6ec81Ad9b" className="product-card" target="_blank" rel="noopener noreferrer">
              <div className="product-content">
                <h3>$PONY Token</h3>
                <p>Track our token metrics, liquidity, and trading activity on DexScreener.</p>
                <span className="product-link">View on DexScreener →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="philosophy">
        <div className="container">
          <h2>Design Philosophy</h2>
          <blockquote>
            "Design is the method of putting form and content together."
            <cite>— Paul Rand</cite>
          </blockquote>

          <div className="principles">
            <div className="principle">
              <h3>Fun Is a Feature</h3>
              <p>If it isn't fun, it doesn't matter how clever the math is.</p>
            </div>

            <div className="principle">
              <h3>Simplicity Is Earned</h3>
              <p>We reduce systems until only what matters remains.</p>
            </div>

            <div className="principle">
              <h3>Games Are Research</h3>
              <p>Every game is an experiment. We observe, learn, and iterate.</p>
            </div>

            <div className="principle">
              <h3>Transparency</h3>
              <p>Players should always understand what they're risking and what they can gain.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="vision">
        <div className="container">
          <h2>Our Vision</h2>
          <p className="lead">
            To reintroduce fun, clarity, and meaning to crypto by designing games and systems
            people actually want to play — and learn from.
          </p>
          <p>
            We believe crypto does not suffer from a lack of technology.
            It suffers from a lack of engagement, joy, and human-centered design.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>Pony Labs — Turning complex blockchain systems into honest, engaging games that teach through play.</p>
          <p className="small">© 2024 Pony Labs. We are a studio, not a casino.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
