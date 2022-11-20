import tw from '@lib/twrnc'
import { Text, TouchableOpacity } from 'react-native'

export default function Pill({
  text,
  onPress,
  variant = 'default',
  disabled = false,
  icon = null,
}: PillProps) {
  return (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center justify-between rounded-lg p-2 mr-2 mb-2 border-[1px] border-primary',
        {
          'bg-primary': variant === 'primary',
          'bg-white': variant === 'secondary',
          'bg-transparent': variant === 'default',
          'opacity-40 border-zinc-400': disabled,
        }
      )}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={tw.style('text-sm', {
          'text-white': variant === 'primary',
          'text-primary': variant === 'secondary' || variant === 'default',
          'mr-2': !!icon,
          'text-zinc-400': disabled,
        })}>
        {text}
      </Text>
      {icon}
    </TouchableOpacity>
  )
}

interface PillProps {
  text: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'default'
  icon?: React.ReactNode
  disabled?: boolean
}
