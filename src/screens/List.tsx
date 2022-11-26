import routesNames from '@common/routesNames'
import Button from '@components/Button'
import ContentTitle from '@components/ContentTitle'
import CustomCurrencyInput from '@components/CurrencyInput'
import Divider from '@components/Divider'
import Expandable from '@components/Expandable'
import Header from '@components/Header'
import Pill from '@components/Pill'
import ProgressBar from '@components/ProgressBar'
import ScreenTitle from '@components/ScreenTitle'
import TextInput from '@components/TextInput'
import TextPlaceholder from '@components/TextPlaceholder'
import tw from '@lib/twrnc'
import { getCategories as getCategoriesFromStorage } from '@repositories/Category'
import { getList as getListFromStorage, updateList } from '@repositories/List'
import colors from '@style/colors'
import { ICON_SIZES } from '@style/sizes'
import { Category } from '@typings/Category'
import { HistoryItem } from '@typings/History'
import {
  ItemsByCategory,
  List as ListTyping,
  ListItem as ListItemTyping,
} from '@typings/List'
import { calculateListTotal } from '@utils/calculateListTotal'
import calculateProgress from '@utils/calculateProgress'
import generateID from '@utils/generateID'
import { getCategoryTitleByID } from '@utils/getCategoryByID'
import { separateByCategory } from '@utils/separateByCategory'
import { GearSix, Minus, Plus, TagSimple } from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import Toast from 'react-native-root-toast'

export default function List({ navigation, route }) {
  const { listParam }: RouteProps = route.params

  const [categories, setCategories] = useState<Category[]>([])
  const [newItem, setNewItem] = useState<ListItemTyping>({} as ListItemTyping)
  const [list, setList] = useState<ListTyping>(listParam)
  const [itemName, setItemName] = useState('')
  const [showOverlay, setShowOverlay] = useState(false)
  const [listProgress, setListProgress] = useState(0)

  const handleGoBack = () => navigation.goBack()

  const handleGoToCategories = () => navigation.navigate(routesNames.CATEGORIES)

  const handleGoToConfigs = () =>
    navigation.navigate(routesNames.LIST_CONFIGS, { list, categories })

  const handleOnChangeItemNameInput = (value: string) => {
    setItemName(value)
    setNewItem({ ...newItem, title: value })
  }

  const handleOnPressCategory = (categoryID: string) => {
    const newCategories = categories.map(categoryFromStorage => {
      if (categoryFromStorage.id === categoryID) {
        return {
          ...categoryFromStorage,
          selected: true,
        }
      }

      return {
        ...categoryFromStorage,
        selected: false,
      }
    })

    setCategories(newCategories)
    setNewItem({ ...newItem, categoryID })
  }

  const handleAddItem = (data: ListItemTyping) => {
    try {
      if (!data?.title) return Toast.show('insira um nome para o item')
      if (!data?.categoryID) return Toast.show('selecione uma categoria')

      data.id = generateID()
      data.quantity = 1

      const newList = {
        ...list,
        items: [...list.items, data],
      }

      setList(newList)
      updateList(newList)
      clearFields()
      Toast.show('item adicionado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFields = () => {
    setItemName('')
    setNewItem({} as ListItemTyping)

    const newCategories = categories.map(categoryFromStorage => {
      return {
        ...categoryFromStorage,
        selected: false,
      }
    })

    setCategories(newCategories)
  }

  const getCategories = async () => {
    try {
      const categoriesFromStorage = await getCategoriesFromStorage()
      setCategories(categoriesFromStorage)
    } catch (error) {
      console.log(error)
    }
  }

  const getList = async () => {
    try {
      const listFromStorage = await getListFromStorage(listParam.id)
      const newListProgress = calculateProgress(listFromStorage)
      setListProgress(newListProgress)
      setList(listFromStorage)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnToggleInsertItemContainer = (toggle: boolean) => setShowOverlay(toggle)

  const handleOnLongPressItem = (itemID: string) => {
    Alert.alert('remover item', 'tem certeza que deseja remover este item?', [
      {
        text: 'cancelar',
        style: 'cancel',
      },
      {
        text: 'sim',
        onPress: () => {
          const newItems = list.items.filter(item => item.id !== itemID)
          const newList = {
            ...list,
            items: newItems,
          }

          setList(newList)
          updateListTotal(newList)
          Toast.show('item removido com sucesso')
        },
      },
    ])
  }

  const handleOnChangeItemPrice = (price: number, itemID: string) => {
    try {
      const newItems = list.items.map(item => {
        if (item.id === itemID) {
          return {
            ...item,
            price,
            completed: price > 0,
          }
        }

        return item
      })

      const newList = {
        ...list,
        items: newItems,
      }

      setList(newList)
      updateListTotal(newList)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChangeItemQuantity = (quantity: string, itemID: string) => {
    try {
      const newItems = list.items.map(item => {
        if (item.id === itemID) {
          return {
            ...item,
            quantity: Number(quantity),
          }
        }

        return item
      })

      const newList = {
        ...list,
        items: newItems,
      }

      setList(newList)
      updateListTotal(newList)
    } catch (error) {
      console.log(error)
    }
  }

  const updateListTotal = (list: ListTyping) => {
    try {
      const total = calculateListTotal(list.items)
        .toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })
        .replace('.', ',')

      const newList = {
        ...list,
        total,
      }

      const newListProgress = calculateProgress(newList)

      if (newListProgress >= 100) Toast.show('atenção: limite de gastos atingido')

      setList(newList)
      updateList(newList)
      setListProgress(newListProgress)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnPressFinishList = () => {
    if (!list.items.length) return Toast.show('adicione itens para finalizar a lista')

    const isAllPricesEmpty = list.items.every(item => !item.price)

    if (isAllPricesEmpty) return Toast.show('todos os itens estão sem preço')

    Alert.alert(
      'finalizar compras',
      'os preços serão zerados e tudo será salvo no histórico da lista',
      [
        {
          text: 'cancelar',
          style: 'cancel',
        },
        {
          text: 'finalizar',
          onPress: () => {
            try {
              const historyItem: HistoryItem = {
                id: generateID(),
                createdAt: new Date().toLocaleDateString(),
                listItems: list.items,
                total: list.total,
              }

              const newItems = list.items.map(item => ({
                ...item,
                price: null,
                quantity: 1,
                completed: false,
              }))

              const newList = {
                ...list,
                history: [...(list.history || []), historyItem],
                items: newItems,
                total: 'R$ 0,00',
              }

              const newListProgress = calculateProgress(newList)

              setList(newList)
              updateList(newList)
              setListProgress(newListProgress)
            } catch (error) {
              console.log(error)
            }
          },
        },
      ]
    )
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getList()
      getCategories()
    })

    return unsubscribe
  }, [])

  return (
    <>
      <View style={tw`flex-1 bg-background pt-10 ios:pt-12`}>
        <Header
          title={list?.title}
          onPressBackButton={handleGoBack}
          options={
            <Button
              onPress={handleGoToConfigs}
              variant="transparent"
              icon={
                <GearSix
                  size={ICON_SIZES.MEDIUM}
                  color={colors.black}
                  weight="bold"
                />
              }
              size="sm"
            />
          }
          style={tw`px-5`}
        />

        {/* insert item */}
        <Expandable
          variant="primary"
          title="inserir item"
          highlight
          style={tw`px-5`}
          onToggle={handleOnToggleInsertItemContainer}>
          <View>
            <View style={tw`items-start`}>
              <TextInput
                placeholder="ex: feijão, arroz, etc."
                value={itemName}
                onChangeText={handleOnChangeItemNameInput}
                onSubmitEditing={() => handleAddItem(newItem)}
                style={tw`mb-4 mt-2`}
                returnKeyLabel="Pronto"
              />

              <TextPlaceholder text="categoria do item" />

              {/* categories */}
              <ScrollView
                style={tw`my-2`}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {categories.map(category => (
                  <Pill
                    onPress={() => handleOnPressCategory(category.id)}
                    key={category.id}
                    text={category.title}
                    variant={category.selected ? 'primary' : 'default'}
                  />
                ))}
                <Pill
                  onPress={handleGoToCategories}
                  icon={
                    <TagSimple
                      size={ICON_SIZES.SMALL}
                      color={colors.background}
                    />
                  }
                  variant="primary"
                />
              </ScrollView>
            </View>
            <Button
              text="adicionar"
              onPress={() => handleAddItem(newItem)}
              style={tw`mt-2 mb-5`}
              size="full"
            />
          </View>
        </Expandable>

        {/* items */}
        <KeyboardAvoidingView
          style={tw`flex-1`}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            style={tw`flex-1`}
            contentContainerStyle={tw`flex-grow`}
            showsVerticalScrollIndicator={false}>
            {showOverlay && (
              <View style={tw`absolute w-full h-full z-50 bg-black opacity-70`} />
            )}

            <View style={tw`flex-1 px-5 pb-40`}>
              {!list?.items?.length && (
                <View style={tw`flex-1 items-center justify-center`}>
                  <TextPlaceholder text="sem itens por enquanto" />
                </View>
              )}

              {separateByCategory(list?.items).map(
                ({ categoryID, items }: ItemsByCategory) => (
                  <View key={categoryID}>
                    <ContentTitle
                      variant="primary"
                      alignCenter
                      style={tw`py-4 font-regular`}>
                      {getCategoryTitleByID(categoryID, categories)}
                    </ContentTitle>

                    <Divider />

                    {items.map(item => (
                      <Expandable
                        key={item.id}
                        title={item.title}
                        variant={item.completed ? 'completed' : 'default'}
                        onLongPress={() => handleOnLongPressItem(item.id)}>
                        <View style={tw`flex-row px-5 items-center mb-5`}>
                          {/* price */}
                          <View style={tw`flex-1 items-start`}>
                            <TextPlaceholder text="preço" />
                            <View style={tw`flex-row items-center mt-2`}>
                              <CustomCurrencyInput
                                placeholder="R$ 0,00"
                                value={item.price || null}
                                onChangeValue={price =>
                                  handleOnChangeItemPrice(price, item.id)
                                }
                                size="lg"
                                prefix="R$ "
                              />
                            </View>
                          </View>
                          {/* quantity */}
                          <View style={tw`items-start`}>
                            <TextPlaceholder text="quantidade" />
                            <View style={tw`flex-row items-center mt-2`}>
                              <Button
                                icon={
                                  <Minus
                                    size={ICON_SIZES.SMALL}
                                    color={colors.background}
                                  />
                                }
                                onPress={() =>
                                  handleOnChangeItemQuantity(
                                    String((item.quantity || 1) - 1),
                                    item.id
                                  )
                                }
                                variant="circle-primary"
                                style={tw`h-6 w-6`}
                              />
                              <TextInput
                                value={String(item.quantity || '1')}
                                onChangeText={quantity =>
                                  handleOnChangeItemQuantity(quantity, item.id)
                                }
                                size="sm"
                                style={tw`mx-2`}
                                placeholder="quantidade de itens"
                                textAlign="center"
                                keyboardType="numeric"
                              />
                              <Button
                                icon={
                                  <Plus
                                    size={ICON_SIZES.SMALL}
                                    color={colors.background}
                                  />
                                }
                                onPress={() =>
                                  handleOnChangeItemQuantity(
                                    String((item.quantity || 1) + 1),
                                    item.id
                                  )
                                }
                                variant="circle-primary"
                                style={tw`h-6 w-6`}
                              />
                            </View>
                          </View>
                        </View>
                      </Expandable>
                    ))}
                  </View>
                )
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* bottom panel */}
      <View style={tw`flex-1 absolute bottom-0 w-full`}>
        <ProgressBar progress={listProgress} />
        <View
          style={tw`flex-1 flex-row px-5 items-center justify-between h-16 ios:h-20 bg-background`}>
          <View style={tw`items-start`}>
            <TextPlaceholder text={`total・${list.items.length} itens`} />
            <ScreenTitle>{list?.total || 'R$ 0,00'}</ScreenTitle>
          </View>

          <Button
            text="finalizar"
            onPress={handleOnPressFinishList}
          />
        </View>
      </View>
    </>
  )
}

interface RouteProps {
  listParam: ListTyping
}
