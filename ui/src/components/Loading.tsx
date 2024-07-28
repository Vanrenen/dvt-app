import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Box } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  container : {
    height: '24px'
  },
  loader: {
    margin: '0 auto',
    color: '#1876d2',
    width: '4px',
    top: '50%',
    position: 'relative',
    aspectRatio: '1',
    borderRadius: '50%',
    boxShadow: '19px 0 0 7px, 38px 0 0 3px, 57px 0 0 0',
    transform: 'translateX(-38px)',
    animation: '$l21 .5s infinite alternate linear',
  },
  '@keyframes l21': {
    '50%': {
      boxShadow: '19px 0 0 3px, 38px 0 0 7px, 57px 0 0 3px'
    },
    '100%': {
      boxShadow: '19px 0 0 0  , 38px 0 0 3px, 57px 0 0 7px',
    }
  },
}));

const Loading: FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Box className={classes.loader} />
    </Container>
  )
};

export default Loading;
