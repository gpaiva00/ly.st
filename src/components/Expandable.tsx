import { SMALL_ICON_SIZE } from '@common/iconSizes'
import ContentTitle from '@components/ContentTitle'
import Divider from '@components/Divider'
import ListTitle from '@components/ListTitle'
import tw from '@lib/twrnc'
import colors from '@style/colors'
import { ListVariant } from '@typings/ListVariant'
import { CaretRight, Check } from 'phosphor-react-native'
import React, { useState } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

export default function Expandable({
  title,
  children,
  variant = 'default',
  highlight = false,
  style,
  onToggle = () => {},
  onLongPress = () => {},
}: ExpandableProps) {
  const [showContent, setShowContent] = useState(false)

  const toggleShowContent = () => {
    onToggle(!showContent)
    setShowContent(!showContent)
  }

  return (
    <>
      <View style={tw.style('', style)}>
        <TouchableWithoutFeedback
          onPress={toggleShowContent}
          onLongPress={onLongPress}>
          <View style={tw`flex-row items-center justify-between py-3`}>
            {highlight ? (
              <ContentTitle variant="primary">{title}</ContentTitle>
            ) : (
              <ListTitle variant={variant}>{title}</ListTitle>
            )}
            {variant === 'completed' ? (
              <Check
                size={SMALL_ICON_SIZE}
                color={colors.completed}
                weight="bold"
              />
            ) : (
              <CaretRight
                size={SMALL_ICON_SIZE}
                color={colors[variant] || colors.lightGray}
                weight="bold"
                style={tw.style({
                  transform: showContent && [{ rotate: '90deg' }],
                })}
              />
            )}
          </View>
        </TouchableWithoutFeedback>

        {showContent && children}
      </View>
      <Divider variant={variant} />
    </>
  )
}

interface ExpandableProps {
  variant?: ListVariant
  children: React.ReactNode
  title: string
  highlight?: boolean
  style?: string
  onToggle?: (showContent: boolean) => void
  onLongPress?: () => void
}
