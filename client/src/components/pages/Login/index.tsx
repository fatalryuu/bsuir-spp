import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Paper, TextField, Link as MUILink, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '../../../api/auth';
import PasswordInput from '../../common/PasswordInput';
import { LoginSchema, schema } from './login.schema';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../types/router';

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(APP_ROUTES.USERS);
    },
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    mutate(data);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto', marginTop: 8 }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Email"
          variant="standard"
          type="text"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <PasswordInput
          label="Password"
          register={register}
          name="password"
          error={errors.password}
        />

        <Button type="submit" variant="contained" color="primary" disabled={isPending} fullWidth>
          Login
        </Button>

        <MUILink component={RouterLink} to={APP_ROUTES.USERS} underline="none" color="primary">
          <Typography>Go to users</Typography>
        </MUILink>

        {isError && (
          <Typography color="error" variant="body2">
            Invalid email or password
          </Typography>
        )}
      </form>
    </Paper>
  );
};

export default LoginPage;
