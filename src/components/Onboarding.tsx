import OnboardingImage1 from '@assets/images/onboarding1.png'
import OnboardingImage2 from '@assets/images/onboarding2.png'
import routesNames from '@common/routesNames'
import Button from '@components/Button'
import DefaultContainer from '@components/DefaultContainer'
import ScreenTitle from '@components/ScreenTitle'
import tw from '@lib/twrnc'
import colors from '@style/colors'
import { ICON_SIZES } from '@style/sizes'
import { CaretLeft, CaretRight } from 'phosphor-react-native'
import React from 'react'
import { Image, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'

export default function Onboarding({ navigation }) {
  const handleGoToHome = () => navigation.navigate(routesNames.HOME)

  return (
    <DefaultContainer>
      <ScreenTitle style={tw`text-primary`}>ly.st</ScreenTitle>

      <Swiper
        // showsButtons
        buttonWrapperStyle={tw`text-primary`}
        dotColor={colors.lightGray}
        activeDotColor={colors.black}
        nextButton={
          <CaretRight
            size={ICON_SIZES.DEFAULT}
            color={colors.gray}
            // weight="bold"
          />
        }
        prevButton={
          <CaretLeft
            size={ICON_SIZES.DEFAULT}
            color={colors.gray}
            // weight="bold"
          />
        }>
        <View style={tw`flex-1 items-center justify-center`}>
          <Image
            source={OnboardingImage1}
            style={tw`w-64 h-64`}
          />

          <ScreenTitle>lista inteligente</ScreenTitle>
          <Text style={tw`text-gray text-center font-regular text-base mt-3`}>
            Nunca foi tão fácil organizar sua lista de compras e economizar tempo e
            dinheiro.
          </Text>
        </View>
        <View style={tw`flex-1 items-center justify-center`}>
          <Image
            source={OnboardingImage2}
            style={tw`w-64 h-64`}
          />

          <ScreenTitle>histórico de compras</ScreenTitle>
          <Text style={tw`text-gray text-center font-regular text-base mt-3 mb-6`}>
            Saiba exatamente o que você comprou e quando. Assim fica fácil de saber quanto
            você tem gastado nos últimos meses.
          </Text>
          <Button
            onPress={handleGoToHome}
            text="bora lá!"
            size="lg"
          />
        </View>
      </Swiper>
    </DefaultContainer>
  )
}
