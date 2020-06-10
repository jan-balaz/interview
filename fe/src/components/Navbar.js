import React from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button  from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  title: {
    flexGrow: 1
  },
  button: {
    color: 'white'
  }
})

const Navbar = () => {
  const classes = useStyles()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link to="/" className={classes.link}>
            PetShop
          </Link>
        </Typography>
        
        <Button
          component={Link}
          to="/add_product"
          size="small"
          className={classes.button}
        >
          Add product
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
