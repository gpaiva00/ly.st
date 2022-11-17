import { Text } from 'react-native'

import tw from '@lib/twrnc'

export default function TextPlaceholder({ text }: TextPlaceholderProps) {
  return <Text style={tw`text-gray text-center font-regular`}>{text}</Text>
}

interface TextPlaceholderProps {
  text: string | JSX.Element
}
