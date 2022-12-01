import Divider from '@components/Divider'
import ListTitle from '@components/ListTitle'
import tw from '@lib/twrnc'
import colors from '@style/colors'
import { ICON_SIZES, INPUT_SIZE } from '@style/sizes'
import { Category } from '@typings/Category'
import { List, ListItem as ListItemTypings } from '@typings/List'
import { Variants } from '@typings/ListVariant'
import { CaretRight } from 'phosphor-react-native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

export default function ListItem({
  item,
  icon,
  variant = 'default',
  onPress,
  onLongPress,
  alignCenter = false,
  style,
}: ListItemProps) {
  return (
    <TouchableOpacity key={item.id} onPress={onPress} onLongPress={onLongPress}>
      <View
        style={tw.style('flex-row items-center justify-between', style, {
          height: INPUT_SIZE,
        })}
      >
        <View
          style={tw.style('flex-row', {
            'flex-1 items-center justify-center': alignCenter,
          })}
        >
          {icon && <View style={tw`mr-2`}>{icon}</View>}
          <ListTitle variant={variant}>{item.title}</ListTitle>
        </View>

        {onPress && (
          <CaretRight
            size={ICON_SIZES.SMALL}
            color={colors[variant] || colors.lightGray}
            weight="bold"
          />
        )}
      </View>
      <Divider />
    </TouchableOpacity>
  )
}

interface ListItemProps {
  item: List | ListItemTypings | Category | { id: number | string; title: string }
  icon?: JSX.Element
  onPress?: () => void
  onLongPress?: () => void
  variant?: Variants
  alignCenter?: boolean
  style?: any
}
