import {
  useState,
  useEffect,
  useRef,
} from 'react';
import BasicModal from 'components/modals/Modal';

interface ErrorModalInterface {
  error: string | null;
}

const ErrorModal = (props: ErrorModalInterface) => {
  const [open, setOpen ] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (props.error) {
      setOpen(true);
    }
  }, [props.error]);

  useEffect(() => {
    if (open) {
      timerId.current = setTimeout(() => {
        setOpen(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timerId.current);
    };
  }, [open]);

  return (
    <BasicModal
      width='100%'
      top='58px'
      title='oops I did it again'
      body={props.error}
      open={open}
      handleClose={() => setOpen(false)}
      border='1px  solid red'
      backgroundColor='#FF7F7F'
      color='#FFF'
    />
  )
};

export default ErrorModal;