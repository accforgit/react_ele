let data = [{
    id: Date.now(),
    img: '//127.0.0.1:9000/order/sale1.jpeg',
    title: '棒约翰（北京驼房营店）',
    orderState: 2,
    time: 1499408220000,
    products: ['超级棒约翰传统（6寸）', '招牌棒约翰意面'],
    price: 36.00,
    commentState: 0,
  },
  {
    id: Date.now(),
    img: '//127.0.0.1:9000/order/sale2.jpeg',
    title: '我是一只鸡',
    orderState: 1,
    time: 1499587338000,
    products: ['❤招牌❤一只没有故事的鸡（赠酱）-默认一只鸡'],
    price: 28.80,
    commentState: 1
  },
  {
    id: Date.now(),
    img: '//127.0.0.1:9000/order/sale3.png',
    title: '满座儿',
    orderState: 2,
    time: 1499574496000,
    products: ['椒香鸡排', '铁板鱼豆腐'],
    price: 29.00,
    commentState: 0
  },
  {
    id: Date.now(),
    img: '//127.0.0.1:9000/order/sale4.png',
    title: '霸王别鸡鸡汤泡饭',
    orderState: 1,
    time: 1499572922000,
    products: ['盐酥鸡'],
    price: 21.20,
    commentState: 1
  },
  {
    id: Date.now(),
    img: '//127.0.0.1:9000/order/sale5.png',
    title: '港式铁板炒饭',
    orderState: 2,
    time: 1498969736000,
    products: ['招牌炒饭', '果饮'],
    price: 21.20,
    commentState: 1
  },
  {
    id: Date.now(),
    img: '//127.0.0.1:9000/order/sale6.png',
    title: '堕落小龙虾',
    orderState: 2,
    time: 1501940130348,
    products: ['百事可乐', '经典十三香麻辣小龙虾'],
    price: 21.20,
    commentState: 1
  },
]

module.exports = {
  data,
  hasMore: true
}