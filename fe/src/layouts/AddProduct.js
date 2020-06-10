import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Alert from '@material-ui/lab/Alert';
import { Card, CardContent, Button, CardActions, FormGroup, FormControlLabel, FormLabel, TextField, FormControl, Checkbox, makeStyles, Typography, Snackbar, Grid } from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    display: 'inline-block'
  },
  input: {
    marginBottom: '10px',
    width: '100%'
  }
})

const AddProduct= () => {
  const [availableCategories, setAvailableCategories] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0.0.toFixed(2))
  const [categories, setCategories] = useState([])

  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const { addProduct } = useContext(AppContext)
  const classes = useStyles()

  useEffect(() => {
    fetch("/api/categories").then(
      (res) => res.json().then((categories) => setAvailableCategories(categories))
    )
  }, [])

  const changeSelectedCategories = (categorie) => {
    if (categories.includes(categorie)) {
      setCategories(categories.filter((c) => c !== categorie))
    } else {
      setCategories([...categories, categorie])
    }
  }

  const areFieldsValid = () => (name && description && price > 0.001 && categories.length > 0)

  const showSnackbar = (severity, message) => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const clearFields = () => {
    setName('')
    setDescription('')
    setPrice(0.0)
    setCategories([])
  }

  const createProduct = () => {
    if (areFieldsValid()) {
      fetch("/api/product", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, description, price, animalCategories: categories.map(c => ({name: c}))
        })
      })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            addProduct({
              id: data.id,
              name: data.name,
              price: data.price
            })
            showSnackbar('success', 'Product vas successfully added')
            clearFields()
          })
        } else {
          showSnackbar('error', 'Oops, an error occured')
        }
      })
    } else {
      showSnackbar('warning', 'All fields must be filled')
    }
  }

  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardContent>
          <Typography variant="h3">
            Add product
          </Typography>
          <TextField 
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.input}
          />
          <br />
          <TextField 
            type="text"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rowsMax={4}
            className={classes.input}
          />
          <br />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlur={(e) => setPrice(parseFloat(e.target.value).toFixed(2))}
            className={classes.input}
          />
          <br />
          <FormControl>
            <FormLabel>
              Categories
            </FormLabel>
            <FormGroup>
              {availableCategories.map(categorie => (
                <FormControlLabel
                  key={categorie.name}
                  label={categorie.name}
                  control={
                    <Checkbox
                      checked={categories.includes(categorie.name)}
                      onChange={() => changeSelectedCategories(categorie.name)}
                    />
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={() => createProduct()}>
            Add product
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

export default AddProduct
