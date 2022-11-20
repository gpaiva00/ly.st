export const separateByCategory = (data: any) => {
  // reduce the data to an object with the categoryID as the key
  // and an array of items as the value
  const result = data.reduce((acc: any, item: any) => {
    if (!acc[item.categoryID]) {
      acc[item.categoryID] = [];
    }
    acc[item.categoryID].push(item);
    return acc;
  }
  , {});

  // return an array of objects with the categoryID as the key
  // and the array of items as the value
  return Object.keys(result).map(key => ({
    categoryID: key,
    items: result[key]
  }));

}


/**
 * { 
 *    category: "comidas",
  *   items: [
  *    { id: 1, title: 'feijão', quantity: 1, price: 2.5 },
  *   ]
  * }
 */