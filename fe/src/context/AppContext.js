import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const [products, setProducts] = useState([])

  const addProduct = (product) => {
    setProducts([...products, product])
  }

  const fetchProducts = async () => {
    fetch('/api/products').then(
      (res) => res.json().then(data => setProducts(data))
    )
  }

  useEffect(() => {
    const fetchData = async () => fetchProducts()
    fetchData()
  }, [])

  const ctx = {products, addProduct}

  return <AppContext.Provider value={ctx}>{props.children}</AppContext.Provider>

}

export default AppContextProvider