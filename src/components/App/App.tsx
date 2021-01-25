import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header } from '../../containers/Header/Header';
import { ContentRouter } from '../ContentRouter/ContentRouter';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <ContentRouter />
    </Router>
  );
};

export default App;
