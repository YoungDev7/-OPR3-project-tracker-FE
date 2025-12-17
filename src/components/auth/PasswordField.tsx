import { Button, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import type { PasswordFieldProps } from '../../types/passwordField';

/**
 * PasswordField component with show/hide functionality.
 * 
 * Provides a password input field with a toggle button to show/hide the password.
 * Styled for dark theme with white text and borders.
 * 
 * @param {PasswordFieldProps} props - Component props
 * @returns {React.ReactElement} Password field with show/hide toggle
 */
export default function PasswordField({
  label,
  value,
  onChange,
  error = false,
  helperText = ' ',
  disabled = false,
  id,
  name,
  autoComplete
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth
      label={label}
      placeholder={label}
      type={showPassword ? 'text' : 'password'}
      id={id}
      name={name}
      autoComplete={autoComplete}
      variant="outlined"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
              size="small"
              sx={{
                minWidth: 'auto',
                textTransform: 'none'
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputAdornment>
        )
      }}
      error={error}
      helperText={helperText}
      color={error ? 'error' : 'primary'}
      sx={{ mb: 1 }}
    />
  );
}
