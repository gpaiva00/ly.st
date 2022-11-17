import DefaultContainer from '@components/DefaultContainer'
import Header from '@components/Header'
import TextPlaceholder from '@components/TextPlaceholder'
import tw from '@lib/twrnc'
import React from 'react'
import { View } from 'react-native'

export default function Categories({ navigation }) {
  const handleGoBack = () => navigation.goBack()

  return (
    <DefaultContainer>
      <Header
        title="miguel"
        onPressBackButton={handleGoBack}
      />
      <View style={tw`flex-1 justify-center items-center`}>
        <TextPlaceholder text="Em breve" />
      </View>
    </DefaultContainer>
  )
}
