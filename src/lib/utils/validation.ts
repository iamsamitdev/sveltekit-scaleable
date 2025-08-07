export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('รหัสผ่านต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว')
  }
  
  if (!/\d/.test(password)) {
    errors.push('รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateForm(data: Record<string, any>, rules: Record<string, string[]>): {
  isValid: boolean
  errors: Record<string, string[]>
} {
  const errors: Record<string, string[]> = {}
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field]
    const fieldErrors: string[] = []
    
    for (const rule of fieldRules) {
      if (rule === 'required' && (!value || value.trim() === '')) {
        fieldErrors.push(`${field} จำเป็นต้องกรอก`)
      }
      
      if (rule === 'email' && value && !validateEmail(value)) {
        fieldErrors.push('รูปแบบอีเมลไม่ถูกต้อง')
      }
      
      if (rule.startsWith('min:')) {
        const minLength = parseInt(rule.split(':')[1])
        if (value && value.length < minLength) {
          fieldErrors.push(`${field} ต้องมีอย่างน้อย ${minLength} ตัวอักษร`)
        }
      }
    }
    
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
