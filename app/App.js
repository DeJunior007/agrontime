// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import GerenciarFazendaPage from './pages/GerenciarFazendas/GerenciarFazendaPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/gerenciar-fazenda/:id" component={GerenciarFazendaPage} />
          {/* Outras rotas da sua aplicação */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
