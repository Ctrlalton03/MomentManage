import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from '../../styles/modules/Auth/PasswordInput.module.css';

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  value,
  onChange,
  placeholder,
  error,
  className
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        Password
      </label>
      <div className={styles.relative}>
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${className || ''}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={styles.toggleButton}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default PasswordInput;