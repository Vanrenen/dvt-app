import {FC, ReactNode} from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Paper, Box } from '@mui/material';

interface FormInterface {
  children: ReactNode
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  paper: {
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5),
    },
    width: '100%',
    maxWidth: 400,
  },
}));

const FormContainer: FC<FormInterface> = ({ children }) => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Box>
          {children}
        </Box>
      </Paper>
    </Container>
  );
};

export default FormContainer;
