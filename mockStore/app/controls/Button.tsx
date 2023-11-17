import React, { CSSProperties } from 'react'

import { controlStyles } from '../styles/styles'
import { HStack } from '../coreComponents/components'
import { Text } from '../coreComponents/components'

interface ButtonProps {
  className?: string
  text?: string
  onClick?: () => void
  disabled?: boolean
  style?: CSSProperties
  title?: string
  children?: any
}

function Button({
  className,
  text,
  onClick,
  disabled,
  style,
  title,
  children,
}: ButtonProps) {

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{ ...style, ...controlStyles.button }}
      title={title}
    >
      <HStack spacing={5} align="center">
        {text && <Text size={8}>{text}</Text>}
        {children && children}
      </HStack>
    </button>
  )
}

export default Button
