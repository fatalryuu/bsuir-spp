import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { FieldValues, UseFormRegister, Path, FieldError } from 'react-hook-form';

interface PasswordInputProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
}

function PasswordInput<T extends FieldValues>({
  label,
  register,
  name,
  error,
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth variant="standard" margin="dense">
      <InputLabel>{label}</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        fullWidth
        {...register(name)}
        error={!!error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && (
        <Typography color="error" fontSize={12} mt="3px">
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
}

export default PasswordInput;
