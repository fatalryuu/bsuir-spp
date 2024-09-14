import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { upload } from '../../../../api/media';
import { createUser } from '../../../../api/users';
import PasswordInput from '../../../common/PasswordInput';
import { CreateUserSchema, schema } from './create-user.schema';

interface CreateUserModalProps {
  open: boolean;
  closeModal: () => void;
  openErrorSnackbar: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  closeModal,
  openErrorSnackbar,
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: createUser,
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

  const onSubmit: SubmitHandler<CreateUserSchema> = async (data) => {
    const { avatar: files, ...user } = data;

    const avatarFile = files[0];
    setIsLoading(true);
    const { url: avatarUrl } = await upload(avatarFile);

    mutate({ ...user, avatarUrl });
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create User</DialogTitle>
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
          <PasswordInput
            label="Password"
            register={register}
            name="password"
            error={errors.password}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  color={errors.avatar ? 'error' : 'primary'}
                  disabled={isLoading}
                >
                  Upload Profile Picture
                  <input type="file" accept="image/*" hidden {...register('avatar')} />
                </Button>
                {!!watch('avatar')?.length && (
                  <img
                    src={URL.createObjectURL(watch('avatar')[0])}
                    alt="avatar"
                    style={{ width: 24, height: 24, objectFit: 'cover', borderRadius: '50%' }}
                  />
                )}
              </Box>
              {errors.avatar && (
                <Typography color="error" fontSize={12} mt="3px">
                  {errors.avatar.message}
                </Typography>
              )}
            </Box>
            <FormControlLabel
              control={
                <Checkbox {...register('admin')} color="primary" checked={!!watch('admin')} />
              }
              label="Admin"
            />
          </Box>
          <DialogActions sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', px: 0 }}>
            <Button onClick={handleClose} color="error" variant="outlined" disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" disabled={isLoading}>
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
