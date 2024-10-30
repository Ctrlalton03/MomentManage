import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SignUpForm from '../components/auth/SignUpForm';
import { FormData } from '../types/auth';
import styles from '../styles/modules/SignUpPage.module.css';

const SignUpPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (formData: FormData) => {
    setError("");
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      // Handle successful signup here
    } catch (err) {
      setError("An error occurred during sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.formWrapper}>
          <div className={styles.formContainer}>
            <div className={styles.headerText}>
              <h1 className={styles.title}>Create your account</h1>
              <p className={styles.subtitle}>Start managing your moments efficiently</p>
            </div>
            <SignUpForm 
              onSubmit={handleSignUp}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
