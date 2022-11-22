import tw from '@lib/twrnc'
import { Variants } from '@typings/ListVariant'
import React from 'react'
import { View } from 'react-native'

export default function ProgressBar({ progress, variant = 'primary' }: ProgressBarProps) {
  return (
    <View style={tw` w-full bg-lightGray h-[3px]`}>
      <View
        style={tw.style('h-[3px]', {
          width: `${progress}%`,
          'bg-primary': variant === 'primary',
        })}
      />
    </View>
  )
}

interface ProgressBarProps {
  progress: number
  variant?: Variants
}
