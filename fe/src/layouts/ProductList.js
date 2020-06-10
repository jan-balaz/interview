import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Typography, ButtonGroup, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  heading: {
    textAlign: 'center'
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  listItemText: {
    paddingRight: '150px'
  }
})

const ProductList = () => {
  const {products} = useContext(AppContext)
  const classes = useStyles()

  if (products.length === 0) return (
    <Typography variant="h2" className={classes.heading}>There are no products</Typography>
  )

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h3" className={classes.heading}>Product List</Typography>
      <List>
        {products.map(product => (
          <ListItem key={product.id} divider>
            <ListItemText 
              primary={product.name}
              secondary={`Price: ${product.price} €`}
              className={classes.listItemText }
            />
            <ListItemSecondaryAction>
              <ButtonGroup>
                <Button color="primary" component={Link} to={`/buy/${product.id}`}>
                  Buy
                </Button>
                <Button color="primary" component={Link} to={`/product/${product.id}`}>
                  View detail
                </Button>
              </ButtonGroup>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Grid>
  )
}

export default ProductList