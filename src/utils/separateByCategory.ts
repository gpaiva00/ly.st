export const separateByCategory = (data: any) => {
  const result = data.reduce((acc: any, item: any) => {
    if (!acc[item.categoryID]) {
      acc[item.categoryID] = [];
    }
    acc[item.categoryID].push(item);
    return acc;
  }
  , {});

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