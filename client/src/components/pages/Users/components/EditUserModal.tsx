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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { editUser } from '../../../../api/users';
import { EditUserSchema } from './edit-user.schema';

interface EditUserModalProps {
  open: boolean;
  closeModal: () => void;
  openErrorSnackbar: () => void;
  editingId: string;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  closeModal,
  openErrorSnackbar,
  editingId,
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useFormContext<EditUserSchema>();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      closeModal();
    } else if (isError) {
      openErrorSnackbar();
    }
  }, [isPending]);

  const handleClose = () => {
    if (!isLoading) {
      reset();
      closeModal();
    }
  };

  const onSubmit: SubmitHandler<EditUserSchema> = async (data) => {
    mutate({ id: editingId, ...data });

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
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
            <Button onClick={handleClose} color="error" variant="outlined" disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" disabled={isLoading}>
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
