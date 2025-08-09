import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Handles conditional classes and conflicts intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a variant-based className function for consistent component styling
 */
export function createVariants<T extends Record<string, Record<string, string>>>(
  base: string,
  variants: T
) {
  return (props: {
    [K in keyof T]?: keyof T[K]
  } & {
    className?: string
  }) => {
    const { className, ...variantProps } = props
    
    const variantClasses = Object.entries(variantProps)
      .map(([key, value]) => {
        const variant = variants[key as keyof T]
        return variant?.[value as string] || ''
      })
      .filter(Boolean)
    
    return cn(base, ...variantClasses, className)
  }
}

/**
 * Utility for conditional className application
 */
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass?: string
): string {
  return condition ? trueClass : (falseClass || '')
}

/**
 * Utility for responsive className application
 */
export function responsiveClass(
  base: string,
  responsive: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
  }
): string {
  const classes = [base]
  
  if (responsive.sm) classes.push(`sm:${responsive.sm}`)
  if (responsive.md) classes.push(`md:${responsive.md}`)
  if (responsive.lg) classes.push(`lg:${responsive.lg}`)
  if (responsive.xl) classes.push(`xl:${responsive.xl}`)
  if (responsive['2xl']) classes.push(`2xl:${responsive['2xl']}`)
  
  return cn(...classes)
}