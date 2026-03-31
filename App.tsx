import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Stars from './pages/Stars';
import Films from './pages/Films';
import Decades from './pages/Decades';
import Shop from './pages/Shop';
import About from './pages/About';
import Newsletter from './pages/Newsletter';
import Article from './pages/Article';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="stars" element={<Stars />} />
          <Route path="films" element={<Films />} />
          <Route path="decades" element={<Decades />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="articles/:slug" element={<Article />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
