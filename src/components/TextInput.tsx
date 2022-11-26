import { TextInput as NativeTextInput, TextInputProps } from 'react-native'

import tw from '@lib/twrnc'
import colors from '@style/colors'
import { INPUT_SIZE } from '@style/sizes'

export default function TextInput({
  placeholder,
  value,
  onChangeText,
  size = 'full',
  style,
  ...props
}: CustomTextInputProps) {
  return (
    <NativeTextInput
      style={tw.style(
        'border-[0.5px] border-lightGray active:border-primary focus:border-primary rounded-xl px-2 w-full shadow-lg',
        {
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
      {...props}
    />
  )
}

interface CustomTextInputProps extends TextInputProps {
  placeholder: string
  value?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full'
  style?: string
}
