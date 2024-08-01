export interface ErrorModalInterface {
  error: string | null;
};

export interface BasicModalInterface {
  open: boolean;
  handleClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void);
  width?: string;
  top?: string;
  title: string;
  body: string | null;
  border?: string;
  backgroundColor?: string;
  color?: string;
};
