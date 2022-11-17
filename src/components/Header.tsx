import { SMALL_ICON_SIZE } from '@common/iconSizes'
import Button from '@components/Button'
import Title from '@components/Title'
import tw from '@lib/twrnc'
import colors from '@style/colors'
import { CaretLeft } from 'phosphor-react-native'
import React from 'react'
import { View } from 'react-native'

export default function Header({
  title,
  options,
  style,
  onPressBackButton,
}: HeaderProps) {
  return (
    <View style={tw.style('flex-row items-center justify-between', style)}>
      <View style={tw`flex-row items-center`}>
        {onPressBackButton && (
          <Button
            onPress={onPressBackButton}
            variant="transparent"
            icon={
              <CaretLeft
                color={colors.black}
                size={SMALL_ICON_SIZE}
                weight="bold"
              />
            }
          />
        )}
        <Title>{title}</Title>
      </View>
      {options}
    </View>
  )
}

interface HeaderProps {
  title: string
  options?: JSX.Element
  style?: string
  onPressBackButton?: () => void
}
