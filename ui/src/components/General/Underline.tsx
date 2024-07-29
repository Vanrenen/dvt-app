import { makeStyles } from '@mui/styles';
import { Box, Container } from '@mui/material';

const useStyles = makeStyles(() => ({
  container: {
    height: '2px',
    background: '-webkit-linear-gradient(left, rgb(255,255,255) 0%, rgb(50,50,50) 50%, rgb(255,255,255) 100%)',
    margin: '5px 0',

    '&:before': {
      position: 'relative',
      float: 'left',
      background: 'linear-gradient(to right, rgba(200, 200, 200, 0), rgba(200, 200, 200, 1) 50%)',
      marginTop: '2px',
      width: '50%',
      height: '.5px',
      content: '',
    },

    '&:after': {
      position: 'relative',
      float: 'right',
      background: 'linear-gradient(to left, rgba(100, 200, 200, 0), rgba(200, 200, 200, 1) 50%)',
      marginTop: '2px',
      width: '50%',
      height: '.5px',
      content: '',  
    }
  }
}));

const Underline = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container} />
  )
};

export default Underline;