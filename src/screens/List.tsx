import { MEDIUM_ICON_SIZE, SMALL_ICON_SIZE } from '@common/iconSizes'
import routesNames from '@common/routesNames'
import Button from '@components/Button'
import Expandable from '@components/Expandable'
import Header from '@components/Header'
import ListItem from '@components/ListItem'
import Pill from '@components/Pill'
import ScreenTitle from '@components/ScreenTitle'
import TextInput from '@components/TextInput'
import TextPlaceholder from '@components/TextPlaceholder'
import tw from '@lib/twrnc'
import { getCategories as getCategoriesFromStorage } from '@repositories/Category'
import { getList as getListFromStorage, updateList } from '@repositories/List'
import colors from '@style/colors'
import { Category } from '@typings/Category'
import {
  ItemsByCategory,
  List as ListTyping,
  ListItem as ListItemTyping,
} from '@typings/List'
import { calculateListTotal } from '@utils/calculateListTotal'
import generateID from '@utils/generateID'
import { getCategoryTitleByID } from '@utils/getCategoryByID'
import { separateByCategory } from '@utils/separateByCategory'
import { GearSix, Minus, Plus } from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import Toast from 'react-native-root-toast'

export default function List({ navigation, route }) {
  const { listParam }: RouteProps = route.params

  const [categories, setCategories] = useState<Category[]>([])
  const [newItem, setNewItem] = useState<ListItemTyping>({} as ListItemTyping)
  const [list, setList] = useState<ListTyping>(listParam)
  const [itemName, setItemName] = useState('')
  const [showOverlay, setShowOverlay] = useState(false)

  const handleGoBack = () => navigation.goBack()

  const handleGoToConfigs = () => navigation.navigate(routesNames.LIST_CONFIGS, { list })

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

  const handleAddItem = async (data: ListItemTyping) => {
    try {
      if (!data?.title) return Toast.show('insira um nome para o item')
      if (!data?.categoryID) return Toast.show('selecione uma categoria')

      data.id = generateID()

      const newList = {
        ...list,
        items: [...list.items, data],
      }

      setList(newList)
      await updateList(list)

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
        text: 'remover',
        onPress: async () => {
          const newItems = list.items.filter(item => item.id !== itemID)
          const newList = {
            ...list,
            items: newItems,
          }

          setList(newList)
          await updateList(list)
          Toast.show('item removido com sucesso')
        },
      },
    ])
  }

  const handleOnChangeItemPrice = (newPrice: string, itemID: string) => {
    console.warn(newPrice)
    const price = Number(newPrice)

    try {
      const newItems = list.items.map(item => {
        if (item.id === itemID) {
          return {
            ...item,
            price: price,
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
      updateListTotal(newItems)
      updateList(list)
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
      updateListTotal(newItems)
      updateList(list)
    } catch (error) {
      console.log(error)
    }
  }

  const updateListTotal = async (items: ListItemTyping[]) => {
    try {
      const total = calculateListTotal(items)

      const newList = {
        ...list,
        total,
      }

      setList(newList)
      await updateList(list)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnPressFinishList = () => {}

  useEffect(() => {
    getCategories()

    const unsubscribe = navigation.addListener('focus', () => {
      getList()
    })

    return unsubscribe
  }, [])

  return (
    <>
      <View style={tw`flex-1 bg-background pt-10`}>
        <Header
          title={list.title}
          onPressBackButton={handleGoBack}
          options={
            <Button
              onPress={handleGoToConfigs}
              variant="transparent"
              icon={
                <GearSix
                  size={MEDIUM_ICON_SIZE}
                  color={colors.black}
                />
              }
            />
          }
          style={tw`px-5`}
        />

        {/* insert item */}
        <Expandable
          variant="primary"
          title="inserir item"
          highlight
          style={tw`pb-2 px-5`}
          onToggle={handleOnToggleInsertItemContainer}>
          <View style={tw`items-start`}>
            <TextInput
              placeholder="ex: feijão, arroz, etc."
              value={itemName}
              onChangeText={handleOnChangeItemNameInput}
              onSubmitEditing={() => handleAddItem(newItem)}
              style={tw`mb-4`}
              returnKeyLabel="Pronto"
            />

            <TextPlaceholder text="categoria do item" />

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
            </ScrollView>
          </View>
        </Expandable>

        {/* items */}
        <ScrollView
          style={tw`flex-1`}
          contentContainerStyle={tw`flex-grow`}
          showsVerticalScrollIndicator={false}>
          {showOverlay && (
            <View style={tw`absolute w-full h-full z-50 bg-black opacity-70`} />
          )}

          <View style={tw`flex-1 px-5 pb-40`}>
            {!list.items.length && (
              <View style={tw`flex-1 items-center justify-center`}>
                <TextPlaceholder text="sem itens por enquanto" />
              </View>
            )}

            {separateByCategory(list.items).map(
              ({ categoryID, items }: ItemsByCategory) => (
                <View>
                  <ListItem
                    item={{
                      id: categoryID,
                      title: getCategoryTitleByID(categoryID, categories),
                    }}
                    key={categoryID}
                    variant="primary"
                    alignCenter
                  />

                  {items.map(item => (
                    <Expandable
                      key={item.id}
                      title={item.title}
                      variant={item.completed ? 'completed' : 'default'}
                      onLongPress={() => handleOnLongPressItem(item.id)}>
                      <View style={tw`flex-row px-5 items-center mb-4`}>
                        {/* price */}
                        <View style={tw`flex-1 items-start`}>
                          <TextPlaceholder text="preço" />
                          <View style={tw`flex-row items-center mt-2`}>
                            <TextInput
                              placeholder="R$ 0,00"
                              value={String(item.price || '')}
                              onChangeText={price =>
                                handleOnChangeItemPrice(price, item.id)
                              }
                              size="lg"
                              keyboardType="numeric"
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
                                  size={SMALL_ICON_SIZE}
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
                              size="sm"
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
                                  size={SMALL_ICON_SIZE}
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
                              size="sm"
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
      </View>
      {/* bottom panel */}
      <View
        style={tw`flex-1 flex-row px-5 items-center justify-between absolute bottom-0 w-full h-20 bg-lightGray border-t-[1px] border-t-primary`}>
        <View style={tw`items-start`}>
          <TextPlaceholder text="total" />
          <ScreenTitle>R$ {list.total || 0}</ScreenTitle>
        </View>

        <Button
          text="finalizar"
          onPress={handleOnPressFinishList}
          variant="transparent"
        />
      </View>
    </>
  )
}

interface RouteProps {
  listParam: ListTyping
}
