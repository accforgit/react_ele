const promotion_type = [{id: 0, name: '减'}, {id: 1, name: '特'}, {id: 2, name: '新'}, {id: 3, name: '折'}]
const data = [
  {
    id:0,
    title: '吉野家',
    img: 'http://localhost:9000/home/ad/jiyejia.png',
    isNewSale: true,
    isBrand: true,
    ratingScore: 4.6,
    monthSaleCount: 1020,
    tags: [{id: 1, name: '保'}, {id:2, name:'票'}, {id: 3, name:'准'}],
    labels: [{id: 1, name: '准时达'}, {id:2, name:'蜂鸟专送'}],
    startPrice: 20,
    freightPrice: 5,
    averagePrice: 15,
    range: 1556,
    time: 36,
    promotion: [
      {type: promotion_type[0], detail: '满30减15，满60减30'},
      {type: promotion_type[1], detail: '10人套餐A 原价245元，下单立减70元'},
      {type: promotion_type[2], detail: '新用户下单立减17.0元'},
      {type: promotion_type[1], detail: '10人套餐D，下单立减70'},
      {type: promotion_type[1], detail: '老酸奶特价15元2盒'},
      {type: promotion_type[1], detail: '鱼香肉丝套餐只要19.9元，美味超值！'},
      {type: promotion_type[1], detail: '关东煮+可乐，仅售12元'},
      {type: promotion_type[3], detail: '咖喱牛肉饭“5”折，美味享不停~~~'},
      {type: promotion_type[1], detail: '57元双人套餐'}
    ]
  },
  {
    id:1,
    title: '庆丰包子铺（崇文门店）',
    img: 'http://localhost:9000/home/ad/qingfeng.jpeg',
    isNewSale: true,
    isBrand: true,
    ratingScore: 4.6,
    monthSaleCount: 1020,
    tags: [{id: 1, name: '保'}, {id:2, name:'票'}],
    labels: [],
    startPrice: 20,
    freightPrice: 5,
    averagePrice: 15,
    range: 978,
    time: 36,
    promotion: [
      {type: promotion_type[0], detail: '满30减15，满60减30'},
      {type: promotion_type[1], detail: '10人套餐A 原价245元，下单立减70元'},
      {type: promotion_type[1], detail: '关东煮+可乐，仅售12元'},
      {type: promotion_type[3], detail: '咖喱牛肉饭“5”折，美味享不停~~~'},
      {type: promotion_type[1], detail: '57元双人套餐'}
    ]
  },
  {
    id:2,
    title: '王老太小海鲜',
    img: 'http://localhost:9000/home/ad/wanglaotai.png',
    isNewSale: false,
    isBrand: true,
    ratingScore: 4.6,
    monthSaleCount: 1020,
    tags: [{id: 1, name: '保'}, {id:2, name:'票'}, {id: 3, name:'准'}],
    labels: [{id: 1, name: '准时达'}, {id:2, name:'蜂鸟专送'}],
    startPrice: 20,
    freightPrice: 5,
    averagePrice: 15,
    range: 1556,
    time: 36,
    promotion: [
      {type: promotion_type[1], detail: '老酸奶特价15元2盒'},
      {type: promotion_type[1], detail: '鱼香肉丝套餐只要19.9元，美味超值！'},
      {type: promotion_type[1], detail: '关东煮+可乐，仅售12元'},
      {type: promotion_type[3], detail: '咖喱牛肉饭“5”折，美味享不停~~~'},
      {type: promotion_type[1], detail: '57元双人套餐'}
    ]
  },
  {
    id:3,
    title: '李先生牛肉面',
    img: 'http://localhost:9000/home/ad/lixiansheng.jpeg',
    isNewSale: false,
    isBrand: false,
    ratingScore: 4.6,
    monthSaleCount: 1020,
    tags: [{id: 1, name: '保'}, {id:2, name:'票'}, {id: 3, name:'准'}],
    labels: [{id: 1, name: '准时达'}],
    startPrice: 20,
    freightPrice: 5,
    averagePrice: 15,
    range: 1556,
    time: 36,
    promotion: [
      {type: promotion_type[0], detail: '满30减15，满60减30'},
      {type: promotion_type[1], detail: '10人套餐A 原价245元，下单立减70元'},
    ]
  },
  {
    id:4,
    title: '光明超市',
    img: 'http://localhost:9000/home/ad/guangming.jpeg',
    isNewSale: false,
    isBrand: false,
    ratingScore: 4.6,
    monthSaleCount: 1020,
    tags: [{id: 1, name: '保'}, {id: 3, name:'准'}],
    labels: [],
    startPrice: 20,
    freightPrice: 5,
    averagePrice: 15,
    range: 1556,
    time: 36,
    promotion: [
      {type: promotion_type[1], detail: '57元双人套餐'}
    ]
  },
  {
    id:5,
    title: '眉州小吃',
    img: 'http://localhost:9000/home/ad/meizhou.jpeg',
    isNewSale: true,
    isBrand: true,
    ratingScore: 4.6,
    monthSaleCount: 1020,
    tags: [{id: 1, name: '保'}, {id:2, name:'票'}, {id: 3, name:'准'}],
    labels: [ {id:2, name:'蜂鸟专送'}],
    startPrice: 20,
    freightPrice: 5,
    averagePrice: 15,
    range: 1556,
    time: 36,
    promotion: [
      {type: promotion_type[0], detail: '满30减15，满60减30'},
      {type: promotion_type[1], detail: '10人套餐A 原价245元，下单立减70元'},
      {type: promotion_type[2], detail: '新用户下单立减17.0元'},
      {type: promotion_type[1], detail: '10人套餐D，下单立减70'},
      {type: promotion_type[1], detail: '老酸奶特价15元2盒'},
    ]
  }
]

module.exports = {
  data,
  hasMore: true
}