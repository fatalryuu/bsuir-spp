import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link as MUILink, Paper, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { socket } from '../../../App';
import { APP_ROUTES } from '../../../types/router';
import { WS_MESSAGES } from '../../../types/ws';
import PasswordInput from '../../common/PasswordInput';
import { LoginSchema, schema } from './login.schema';
import { useEffect, useState } from 'react';
import { setCookie } from '../../../helpers/cookies';
import { jwtDecode } from 'jwt-decode';

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    socket.on(WS_MESSAGES.LOGIN_SUCCESS, async ({ accessToken }) => {
      setIsPending(false);

      socket.auth = { token: accessToken };
      const decoded = jwtDecode(accessToken) as { exp: number };
      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      setCookie('access_token', accessToken, expiresIn);

      socket.disconnect();
      socket.connect();

      navigate(APP_ROUTES.USERS);
    });

    socket.on(WS_MESSAGES.LOGIN_ERROR, () => {
      setIsPending(false);
      setIsError(true);
    });

    return () => {
      socket.off(WS_MESSAGES.LOGIN_SUCCESS);
      socket.off(WS_MESSAGES.LOGIN_ERROR);
    };
  }, []);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setIsPending(true);
    socket.emit(WS_MESSAGES.LOGIN, data);
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
