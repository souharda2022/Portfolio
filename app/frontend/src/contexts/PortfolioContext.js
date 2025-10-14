// src/contexts/PortfolioContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const PortfolioContext = createContext({
  portfolio: null,
  loading: true,
  error: null,
});

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Works locally and on GitHub Pages
    const url = `${process.env.PUBLIC_URL || ''}/data/portfolio.json`;

    const load = async () => {
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPortfolio(data);
      } catch (e) {
        console.error('Failed to load portfolio.json:', e);
        setPortfolio({}); // minimal safe fallback
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolio, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
