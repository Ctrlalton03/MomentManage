import React, { useState, FormEvent, ChangeEvent } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox" 
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import styles from "../styles/modules/pages/Login.module.css"
import { auth } from "@/config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev)
  }

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      // Add your login logic here
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (userCredential.user) {
        navigate('/dashboard'); // Navigate to dashboard after successful login
      }
      
      console.log("Form submitted:", formData)
    } catch (error) {
      console.error("Login error:", error)
      setErrors({
        password: "Invalid email or password",
      })
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft className={styles.backIcon} />
          Back to Home
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>Log in to your Moment Manager account</p>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className={styles.input}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email}</p>
              )}
            </div>
            <div className={styles.inputGroup}>
              <Label htmlFor="password">Password</Label>
              <div className={styles.passwordWrapper}>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.passwordToggle}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>
            <div className={styles.rememberMeRow}>
              <div className={styles.checkboxWrapper}>
                <Checkbox
                  id="remember-me"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked: boolean) =>
                    setFormData((prev) => ({ ...prev, rememberMe: checked }))
                  }
                  className={styles.checkbox}
                />
                <Label htmlFor="remember-me" className={styles.checkboxLabel}>
                  Remember me
                </Label>
              </div>
              <Link to="/forgot-password" className={styles.forgotPassword}>
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className={styles.submitButton}>
              Log In
            </Button>
          </form>
          <p className={styles.subtitle}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.forgotPassword}>
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Moment Manager. All rights reserved.
      </footer>
    </div>
  )
}

export default LoginPage