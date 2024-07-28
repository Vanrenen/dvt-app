import { useState, useEffect } from 'react';
import BasicModal from './Modal';

interface ErrorModalInterface {
  error: string;
}

const ErrorModal = (props: ErrorModalInterface) => {
  const [open, setOpen ] = useState(false);
  useEffect(() => {
    if (props.error) {
      setOpen(true);
    }
  }, [props.error]);

  return (
    <BasicModal
      width='100%'
      top='58px'
      title='oops I did it again'
      body={props.error}
      open={open}
      handleClose={() => setOpen(false)}
    />
  )
};

export default ErrorModal;