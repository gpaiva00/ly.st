import { TextInput as NativeTextInput, TextInputProps } from 'react-native'

import tw from '@lib/twrnc'
import colors from '@style/colors'
import { INPUT_SIZE } from '@style/sizes'
import { useEffect, useState } from 'react'

export default function TextInput({
  placeholder,
  value,
  onChangeText,
  size = 'full',
  style,
  ...props
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const toggleFocus = () => setIsFocused(!isFocused)

  useEffect(() => {
    return () => {
      setIsFocused(false)
    }
  }, [])

  return (
    <NativeTextInput
      style={tw.style(
        'border border-lightGray rounded-xl px-2 w-full shadow-sm',
        {
          'border-primary': isFocused,
          'w-1/6': size === 'xs',
          'w-[50px]': size === 'sm',
          'w-1/3': size === 'md',
          'w-1/2': size === 'lg',
          'w-full': size === 'full',
          height: INPUT_SIZE,
        },
        style
      )}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
      clearButtonMode="while-editing"
      onFocus={toggleFocus}
      onBlur={toggleFocus}
      {...props}
    />
  )
}

interface CustomTextInputProps extends TextInputProps {
  placeholder: string
  value?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full'
  style?: any
}
