import React from 'react';

const filmIndex = ['An American in Paris', 'To Catch a Thief', 'Roman Holiday', 'Casablanca', 'La Dolce Vita', 'From Here to Eternity'];
const starIndex = ['Ava Gardner', 'Brigitte Bardot', 'Cary Grant', 'Elizabeth Taylor', 'Frank Sinatra', 'Humphrey Bogart'];

const Films: React.FC = () => (
  <section className="section programme">
    <h1 className="page-title">Film & Star Index</h1>
    <div className="index-columns">
      <div>
        <h2>Stars A–Z</h2>
        <ul>{starIndex.map((name) => <li key={name}>{name}</li>)}</ul>
      </div>
      <div>
        <h2>Films A–Z</h2>
        <ul>{filmIndex.map((name) => <li key={name}>{name}</li>)}</ul>
      </div>
    </div>
  </section>
);

export default Films;
