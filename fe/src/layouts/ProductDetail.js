import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core'

const ProductDetail = () => {
  const [product, setProduct] = useState({})
  const {id} = useParams()

  useEffect(() => {
    fetch(`/api/product/${id}`)
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setProduct(data)
        })
      }
    })
  }, [id])

  if (Object.keys(product).length === 0) return (
    <p>Product not found</p>
  )
  
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardContent>        
        <Typography variant="h3" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {product.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price: {product.price} €
        </Typography>
        <Typography variant="body1">
          Categories: {product.animalCategories.map(category => category.name).join(', ')}
        </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/buy/${id}`}
          >
            Buy
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProductDetail
