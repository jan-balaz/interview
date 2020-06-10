import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppContextProvider from './context/AppContext';
import Navbar from './components/Navbar';
import ProductList from './layouts/ProductList';
import ProductDetail from './layouts/ProductDetail';
import AddProduct from './layouts/AddProduct';
import BuyProduct from './layouts/BuyProduct';
import { Grid } from '@material-ui/core';

function App() {
  return (
    <Router>
      <AppContextProvider>
        <Navbar />
        <Grid container justify='center' alignItems='center'>
          <Route path='/' component={ProductList} exact />
          <Route path='/product/:id' component={ProductDetail} />
          <Route path='/buy/:id' component={BuyProduct} />
          <Route path='/add_product' component={AddProduct} />
        </Grid>
      </AppContextProvider>
    </Router>
  );
}

export default App;
