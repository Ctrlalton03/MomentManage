import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormData, ValidationErrors } from '../../types/auth';
import { validateForm } from '../../utils/validation';
import PasswordInput from '../auth/PasswordInput';
import LoadingButton from '../../components/ui/LoadingButton';
import classes from '../../styles/modules/SignUpForm.module.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';

interface SignUpFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, isLoading = false, error }) => {

  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    terms: false
  });
  
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      terms: false
    });
    setValidationErrors({});
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });
      }

      if (onSubmit) {
        await onSubmit(formData);
      }
      resetForm();
    } catch (error: any) {
      console.error('Signup error:', error);
      let errorMessage = 'Failed to create an account';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email is already registered';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        default:
          errorMessage = error.message || 'Failed to create an account';
      }
      
      setValidationErrors(prev => ({
        ...prev,
        email: errorMessage
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {error && (
        <div className={classes.errorMessage}>
          {error}
        </div>
      )}

      <div className={classes.inputGroup}>
        <div className={classes.inputWrapper}>
          <label htmlFor="name" className={classes.label}>
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className={classes.input}
          />
          {validationErrors.name && (
            <p className={classes.validationError}>{validationErrors.name}</p>
          )}
        </div>

        <div className={classes.inputWrapper}>
          <label htmlFor="username" className={classes.label}>
            Username
          </label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="johndoe123"
            className={classes.input}
          />
          {validationErrors.username && (
            <p className={classes.validationError}>{validationErrors.username}</p>
          )}
        </div>

        <div className={classes.inputWrapper}>
          <label htmlFor="email" className={classes.label}>
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className={classes.input}
          />
          {validationErrors.email && (
            <p className={classes.validationError}>{validationErrors.email}</p>
          )}
        </div>

        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
          error={validationErrors.password}
          className={classes.input}  // Add this line
        />
      </div>

      <div className={classes.termsWrapper}>
        <div className={classes.termsLabel}>
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleInputChange}
            className={classes.checkbox}
          />
          <label htmlFor="terms" className={classes.termsText}>
            I agree to the <a href="#" className={classes.link}>Terms of Service</a> and{" "}
            <a href="#" className={classes.link}>Privacy Policy</a>
          </label>
        </div>
        {validationErrors.terms && (
          <p className={classes.validationError}>{validationErrors.terms}</p>
        )}
      </div>

      <LoadingButton type="submit" className={classes.button} isLoading={isLoading} loadingText="Signing up...">
        Sign Up
      </LoadingButton>

      <p className={classes.footer}>
        Already have an account?{" "}
        <Link to="/login" className={classes.link}>
          Log in
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;