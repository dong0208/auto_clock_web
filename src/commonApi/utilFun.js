
/**
 * 套餐规格文字转换 传入 `商品名#!绑定的商品id#!绑定的商品数量` 转化 `商品名(绑定的商品id) x绑定的商品数量`
 */
const convertText = (text, count) => ((text).split('#!')[0] + ((text).split('#!')[1]? `(${(text).split('#!')[1]})`:'')  + ((text).split('#!')[2]? ` x${(text).split('#!')[2]}`:''))

/**
 * 套餐规格文字转换 传入 `商品名#!绑定的商品id#!绑定的商品数量` 转化 `商品名(绑定的商品id) x绑定的商品数量`
 */
const convertText2 = (text,count) => ((text).split('#!')[0] + ((text).split('#!')[1]? `(${(text).split('#!')[1]})`:'')  + ((text).split('#!')[2]? ` x${((text).split('#!')[2]*count).toFixed(0)}`:''))

export {
  convertText,
  convertText2
}
