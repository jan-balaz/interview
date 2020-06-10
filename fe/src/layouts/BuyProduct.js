import React, { useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Typography, TextField, Card, Button, CardActions, CardContent, Grid, Snackbar } from '@material-ui/core'
import { AppContext } from '../context/AppContext'
import Alert from '@material-ui/lab/Alert'

const BuyProduct = () => {
  const [quantity, setQuantity] = useState(1)
  const {products} = useContext(AppContext)
  const {id} = useParams()
  const history = useHistory()

  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const product = products.find((product) => product.id === parseInt(id))

  const showSnackbar = (severity, message) => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const buyProduct = () => {
    if (quantity <= 0) {
      showSnackbar('warning', 'You have to order at least one piece')
    } else {
      fetch("/api/order", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity,
          productId: id
        })
      })
      .then((response) => {
        if (response.status === 200) {
          showSnackbar('success', 'Product was ordered')
          setTimeout(() => history.push('/'), 3000)
        } else {
          showSnackbar('error', 'Product was not ordered')
        }
      })
    }
  }

  if (!product) return <Typography variant="h3">Product not found</Typography>

  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardContent>
          <Typography variant="h3" gutterBottom>Buy {product.name}</Typography>
          <Typography variant="body1" gutterBottom>
            Price per piece: {product.price} €
          </Typography>
          <Typography variant="body1" gutterBottom display="inline">
            Select quantity: 
          </Typography>
          <TextField
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            size="small"
          />
          <Typography variant="body1">
            Total price: {(quantity*product.price).toFixed(2)} €
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={() => buyProduct()}>
            Buy
          </Button>
        </CardActions>
      </Card>

      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default BuyProduct
