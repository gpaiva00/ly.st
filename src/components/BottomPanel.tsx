import Button from '@components/Button'
import ProgressBar from '@components/ProgressBar'
import ScreenTitle from '@components/ScreenTitle'
import TextPlaceholder from '@components/TextPlaceholder'
import tw from '@lib/twrnc'
import { List } from '@typings/List'
import React from 'react'
import { View } from 'react-native'

export default function BottomPanel({
  progress,
  handleOnPressFinishList,
  list,
}: BottomPanelProps) {
  // const listTotal = Number(list?.total.split('R$')[1].replace(',', '.'))
  // const remainingCash = list?.spendingLimit - listTotal

  return (
    <View style={tw`flex-1 absolute bottom-0 w-full`}>
      <ProgressBar progress={progress} />
      <View
        style={tw`flex-1 flex-row px-5 items-center justify-between h-16 ios:h-22 ios:pb-4 bg-background`}>
        <View style={tw`flex-1 items-start`}>
          <TextPlaceholder text={`total・${list?.items?.length} itens`} />
          <ScreenTitle>{list?.total || 'R$ 0,00'}</ScreenTitle>
        </View>

        <Button
          text="finalizar"
          onPress={handleOnPressFinishList}
        />
      </View>
    </View>
  )
}

interface BottomPanelProps {
  handleOnPressFinishList: () => void
  progress: number
  list: List
}
