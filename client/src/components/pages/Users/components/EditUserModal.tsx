import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { socket } from '../../../../App';
import { WS_MESSAGES } from '../../../../types/ws';
import { EditUserSchema } from './edit-user.schema';

interface EditUserModalProps {
  open: boolean;
  closeModal: () => void;
  editingId: string;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, closeModal, editingId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useFormContext<EditUserSchema>();

  const onSubmit: SubmitHandler<EditUserSchema> = async (data) => {
    socket.emit(WS_MESSAGES.EDIT_USER, { id: editingId!, ...data });
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="dense"
            label="Full name"
            type="text"
            fullWidth
            variant="standard"
            {...register('fullName')}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <FormControlLabel
            control={<Checkbox {...register('admin')} color="primary" checked={!!watch('admin')} />}
            label="Admin"
          />
          <DialogActions sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', px: 0 }}>
            <Button onClick={closeModal} color="error" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
