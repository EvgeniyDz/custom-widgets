import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherComponent from './components/WeatherComponent';
import FuelComponent from './components/FuelComponent';
import CurrencyComponent from './components/CurrencyComponent';
import NavbarMenu from './components/NavbarMenu';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavbarMenu />
      <Container className="pt-5 pb-5">
        <Switch>
          <Route component={WeatherComponent} path="/" exact />
          <Route component={CurrencyComponent} path="/currency" />
          <Route component={FuelComponent} path="/fuel" />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
