import { Box, Typography, Modal } from '@mui/material';

const style = {
  position: 'fixed',
  color: '#000',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '25px',
  boxShadow: 24,
  p: 4,
};

interface BasicModalInterface {
  open: boolean;
  handleClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void);
  width?: string;
  top?: string;
  title: string;
  body: string | null;
  border?: string;
  backgroundColor?: string;
  color?: string;
};

const BasicModal = (props: BasicModalInterface) => (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
      <Box sx={{
        ...style,
        width: props.width ?? style.width,
        top: props.top ?? style.top,
        border: props.border ?? style.border,
        bgcolor: props.backgroundColor ?? style.bgcolor,
        color: props.color ?? style.color,
      }}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.body}
        </Typography>
      </Box>
    </Modal>
);

export default BasicModal;