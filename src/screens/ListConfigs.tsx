import { MEDIUM_ICON_SIZE } from '@common/iconSizes'
import Button from '@components/Button'
import DefaultContainer from '@components/DefaultContainer'
import Expandable from '@components/Expandable'
import Header from '@components/Header'
import ListItem from '@components/ListItem'
import TextInput from '@components/TextInput'
import TextPlaceholder from '@components/TextPlaceholder'
import tw from '@lib/twrnc'
import { getList as getListFromStorage, updateList } from '@repositories/List'
import colors from '@style/colors'
import { List } from '@typings/List'
import { ClockClockwise, Question } from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import Toast from 'react-native-root-toast'

export default function ListConfigs({ navigation, route }) {
  const { list }: RouteProps = route.params

  const [spendingLimit, setSpendingLimit] = useState('')

  const handleGoBack = () => navigation.goBack()

  const handleOnChangeSpendingLimitInput = (value: string) => setSpendingLimit(value)

  const handleUpdateList = async () => {
    try {
      const newList = {
        ...list,
        spendingLimit: Number(spendingLimit),
      }

      await updateList(newList)
      Toast.show('limite atualizado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  const handleClearAllPrices = async () => {
    Alert.alert(
      'Limpar todos os preços',
      'Tem certeza que deseja limpar todos os preços?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              const newItems = list.items.map(item => ({
                ...item,
                price: null,
                quantity: 1,
                completed: false,
              }))

              const newList: List = {
                ...list,
                items: newItems,
                total: 0,
              }

              await updateList(newList)
              Toast.show('preços limpos com sucesso')
            } catch (error) {
              console.log(error)
            }
          },
        },
      ]
    )
  }

  const getSpendingLimitFromStorage = async () => {
    try {
      const listFromStorage = await getListFromStorage(list.id)
      setSpendingLimit(String(listFromStorage.spendingLimit ?? ''))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSpendingLimitFromStorage()
  }, [])

  return (
    <DefaultContainer>
      <Header
        title="configurações"
        subtitle={list.title}
        onPressBackButton={handleGoBack}
        options={
          <Button
            onPress={() => {}}
            variant="transparent"
            icon={
              <Question
                color={colors.black}
                size={MEDIUM_ICON_SIZE}
              />
            }
          />
        }
      />

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-grow pb-4`}
        showsVerticalScrollIndicator={false}>
        <Expandable title="limite de gastos da lista">
          <TextInput
            placeholder="valor em reais"
            value={spendingLimit}
            onChangeText={handleOnChangeSpendingLimitInput}
            onSubmitEditing={handleUpdateList}
            onBlur={handleUpdateList}
            returnKeyLabel="Pronto"
            keyboardType="numeric"
            style={tw`mb-4`}
            size="lg"
          />
        </Expandable>

        <ListItem
          item={{ id: 2, title: 'limpar todos os preços' }}
          onPress={handleClearAllPrices}
          variant="danger"
        />

        <Expandable title="histórico">
          <View style={tw`flex-1 bg-lightGray`}>
            <View style={tw`flex-1 items-center justify-center`}>
              <TextPlaceholder
                icon={
                  <ClockClockwise
                    size={MEDIUM_ICON_SIZE}
                    color={colors.gray}
                  />
                }
                text="sem histórico por enquanto"
              />
            </View>
          </View>
        </Expandable>
      </ScrollView>
    </DefaultContainer>
  )
}

interface RouteProps {
  list: List
}
