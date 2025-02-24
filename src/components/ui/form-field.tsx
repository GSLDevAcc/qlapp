// src/components/ui/form-field.tsx
import { Input } from './input'
import { Label } from './label'

interface FormFieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  className?: string
}

export function FormField({
  label,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  placeholder,
  error,
  className = ''
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={error ? 'border-red-500' : ''}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}