import Button from '@components/Button'
import CustomCurrencyInput from '@components/CurrencyInput'
import DefaultContainer from '@components/DefaultContainer'
import Expandable from '@components/Expandable'
import Header from '@components/Header'
import HistoryItem from '@components/HistoryItem'
import ListItem from '@components/ListItem'
import TextPlaceholder from '@components/TextPlaceholder'
import tw from '@lib/twrnc'
import { getList as getListFromStorage, updateList } from '@repositories/List'
import colors from '@style/colors'
import { ICON_SIZES } from '@style/sizes'
import { Category } from '@typings/Category'
import { List } from '@typings/List'
import { ClockClockwise, Question } from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import Toast from 'react-native-root-toast'

export default function ListConfigs({ navigation, route }) {
  const { list, categories }: RouteProps = route.params

  const [spendingLimit, setSpendingLimit] = useState(null)

  const handleGoBack = () => navigation.goBack()

  const handleGoToHelp = () => Toast.show('em breve')

  const handleOnChangeSpendingLimitInput = (value: number) => setSpendingLimit(value)

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
      'limpar todos os preços',
      'tem certeza que deseja limpar todos os preços?',
      [
        {
          text: 'cancelar',
          style: 'cancel',
        },
        {
          text: 'sim',
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
                total: '0',
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
      setSpendingLimit(listFromStorage.spendingLimit ?? null)
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
            onPress={handleGoToHelp}
            variant="transparent"
            icon={
              <Question color={colors.black} size={ICON_SIZES.MEDIUM} weight="bold" />
            }
            size="sm"
          />
        }
      />

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-grow pb-4`}
        showsVerticalScrollIndicator={false}
      >
        <Expandable title="limite de gastos da lista">
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <CustomCurrencyInput
              placeholder="R$ 0,00"
              value={spendingLimit}
              onChangeValue={handleOnChangeSpendingLimitInput}
              onSubmitEditing={handleUpdateList}
              onBlur={handleUpdateList}
              returnKeyLabel="Pronto"
              prefix="R$ "
              size="md"
            />
            <Button text="alterar" onPress={handleUpdateList} size="md" />
          </View>
        </Expandable>

        <ListItem
          item={{ id: 2, title: 'limpar todos os preços' }}
          onPress={handleClearAllPrices}
          variant="danger"
        />

        <Expandable title="histórico">
          <View style={tw`flex-1`}>
            {!list?.history?.length && (
              <View style={tw`flex-1 items-center justify-center py-10`}>
                <TextPlaceholder
                  icon={<ClockClockwise size={ICON_SIZES.MEDIUM} color={colors.gray} />}
                  text="sem histórico por enquanto"
                />
              </View>
            )}

            {list?.history?.map(history => (
              <HistoryItem history={history} categories={categories} />
            ))}
          </View>
        </Expandable>
      </ScrollView>
    </DefaultContainer>
  )
}

interface RouteProps {
  list: List
  categories: Category[]
}
