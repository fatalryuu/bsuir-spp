import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

interface ConfirmModalProps {
  open: boolean;
  text: string;
  handleSubmit: () => void;
  handleClose: () => void;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  text,
  handleSubmit,
  handleClose,
  isLoading,
}) => {
  const handleSubmitClick = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <Typography>{text}</Typography>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3, pb: 2, pt: 0 }}>
        <Button onClick={handleClose} color="error" variant="outlined" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmitClick}
          color="primary"
          variant="contained"
          disabled={isLoading}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
