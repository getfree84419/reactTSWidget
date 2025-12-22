import { useState, FormEvent } from 'react'
import './RegistrationForm.css'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  phone: string
}

interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  phone?: string
}

interface RegistrationFormProps {
  onSuccess?: (data: {
    username: string
    email: string
    phone: string
  }) => void
  onSubmit?: (data: {
    username: string
    email: string
    phone: string
  }) => void
}

const RegistrationForm = ({ onSuccess, onSubmit }: RegistrationFormProps = {}) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = '使用者名稱為必填項'
    } else if (formData.username.length < 3) {
      newErrors.username = '使用者名稱至少需要 3 個字元'
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = '電子郵件為必填項'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子郵件地址'
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = '密碼為必填項'
    } else if (formData.password.length < 6) {
      newErrors.password = '密碼至少需要 6 個字元'
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '請確認密碼'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '密碼不一致'
    }

    // Validate phone (optional but if provided, should be valid)
    if (formData.phone && !/^[0-9]{8,10}$/.test(formData.phone)) {
      newErrors.phone = '請輸入有效的手機號碼（8-10 位數字）'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)

    // Prepare registration data (without password for security)
    const registrationData = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone || '',
    }

    // Call onSubmit callback if provided
    if (onSubmit) {
      onSubmit(registrationData)
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log('Registration data:', registrationData)

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(registrationData)
      }

      setSubmitSuccess(true)
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      })
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="registration-form-container">
      <div className="registration-form-card">
        <h1 className="form-title">註冊表單</h1>

        {submitSuccess && (
          <div className="success-message">
            ✓ 註冊成功！感謝您的註冊。
          </div>
        )}

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="username">使用者名稱 *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              placeholder="請輸入使用者名稱"
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">電子郵件 *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="example@email.com"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">密碼 *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="至少 6 個字元"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">確認密碼 *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="請再次輸入密碼"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">手機號碼</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="選填，8-10 位數字"
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? '註冊中...' : '註冊'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm

