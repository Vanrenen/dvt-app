import { Box, Typography, Modal } from '@mui/material';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface BasicModalInterface {
  open: boolean;
  handleClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
  width: string;
  top: string;
  title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
  body: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
};

const BasicModal = (props: BasicModalInterface) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, width: props.width, top: props.top}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.body}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;