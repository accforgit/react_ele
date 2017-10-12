const promotion_type = [{
  id: 0,
  name: '减'
}, {
  id: 1,
  name: '特'
}, {
  id: 2,
  name: '新'
}, {
  id: 3,
  name: '折'
}]
const shopImgs = [
  {
    name: '门面',
    imgs: ['https://dummyimage.com/200x200/9966FF.png']
  },
  {
    name: '大堂',
    imgs: ['https://dummyimage.com/200x300/ff3ff3.png', 'https://dummyimage.com/200x150/00FF33.png', 'https://dummyimage.com/200x200/66CC33.png']
  },
  {
    name: '后面',
    imgs: ['https://dummyimage.com/150x150/00FF33.png', 'https://dummyimage.com/200x300/66CC33.png']
  }
]
const shopInfo = {
  desc: '欢迎光临',
  phone: 40009982,
  address: '北京市东城区北京站西街1号',
  shopHours: '07:00-21:30',
  licence: 'url'
}
const categorySummary = [
  {name: '热销', description: '大家喜欢吃，才叫真好吃'},
  {name: '优惠', description: '美味又实惠，大家快来抢'},
  {name: '优惠套餐', description: ''},
  {name: '精选套餐', description: ''},
  {name: '单点主餐', description: ''},
  {name: '配餐小食', description: ''},
  {name: '串点', description: ''},
  {name: '汤饮', description: ''},
  {name: '多人优惠餐', description: ''}
]
const p = {
  categoryName: '热销',
  categoryDescription: '热销，大家喜欢吃，才叫真好吃。',
  list: [{
      foodId: 0,
      foodTitle: '吉味双拼饭',
      img: '//localhost:9000/detail/1.png',
      fooddescription: '鸡肉+牛肉+洋葱+蔬菜（西兰花、胡萝卜、菜花）',
      foodactivity: [],
      foodsale: 519,
      foodrating: 95,
      foodprice: 32.5
    },
    {
      foodId: 1,
      foodTitle: '黑椒鸡排优惠套餐',
      img: '//localhost:9000/detail/1.png',
      fooddescription: '本州黑椒鸡排饭（大）+（八珍豆腐+海带鸡肉包+魔芋丝）x2+可乐',
      foodactivity: ['5折，限50份'],
      foodsale: 296,
      foodrating: 100,
      foodprice: 23.5
    },
    {
      foodId: 2,
      foodTitle: '招牌牛肉饭(大碗)',
      img: '//localhost:9000/detail/1.png',
      fooddescription: '牛肉+洋葱',
      foodactivity: [],
      foodsale: 262,
      foodrating: 96,
      foodprice: 26.5
    },
    {
      foodId: 3,
      foodTitle: '金枪鱼土豆泥',
      img: '//localhost:9000/detail/1.png',
      fooddescription: '',
      foodactivity: [],
      foodsale: 127,
      foodrating: 100,
      foodprice: 5
    },
    {
      foodId: 4,
      foodTitle: '合茶碗蒸',
      img: '//localhost:9000/detail/1.png',
      fooddescription: '',
      foodactivity: [],
      foodsale: 127,
      foodrating: 100,
      foodprice: 5
    },
    {
      foodId: 5,
      foodTitle: '蔬菜牛肉黑椒鸡双人超值餐',
      img: '//localhost:9000/detail/1.png',
      fooddescription: '蔬菜牛肉饭+大碗黑椒鸡排饭+（魔芋丝+千页豆腐+香菇）x2+中可乐x2',
      foodactivity: ['限50份'],
      foodsale: 92,
      foodrating: 95,
      foodprice: 77.5
    },
    {
      foodId: 6,
      foodTitle: '咖喱鸡肉+照烧鸡肉双人餐4',
      img: '//localhost:9000/detail/1.png',
      fooddescription: '咖喱鸡+小鸡饭+海带+魔芋+什锦鸡串+脆骨+碳烤芝士+海鲜丸+海带鸡肉包+中可2',
      foodactivity: ['限50份'],
      foodsale: 42,
      foodrating: 100,
      foodprice: 73
    },
    {
      foodId: 7,
      foodTitle: '咖喱鸡肉+照烧鸡肉双人餐3',
      img: '//localhost:9000/detail/1.png',
      fooddescription: '咖喱鸡+小鸡饭+海带+魔芋+什锦鸡串+脆骨+碳烤芝士+海鲜丸+海带鸡肉包+中可2',
      foodactivity: ['限50份'],
      foodsale: 42,
      foodrating: 100,
      foodprice: 73
    },
    {
      foodId: 8,
      foodTitle: '咖喱鸡肉+照烧鸡肉双人餐2',
      img: '//localhost:9000/detail/1.png',
      fooddescription: '咖喱鸡+小鸡饭+海带+魔芋+什锦鸡串+脆骨+碳烤芝士+海鲜丸+海带鸡肉包+中可2',
      foodactivity: ['限50份'],
      foodsale: 42,
      foodrating: 100,
      foodprice: 73
    },
    {
      foodId: 9,
      foodTitle: '咖喱鸡肉+照烧鸡肉双人餐1',
      img: '//localhost:9000/detail/1.png',
      fooddescription: '咖喱鸡+小鸡饭+海带+魔芋+什锦鸡串+脆骨+碳烤芝士+海鲜丸+海带鸡肉包+中可2',
      foodactivity: ['限50份'],
      foodsale: 42,
      foodrating: 100,
      foodprice: 73
    },
  ]
}
// let product = Object.assign({}, Array(9).fill(p))
let product = []
for(let i=0; i<9; i++) {
  product.push(Object.assign({}, p))
}
for(let i in categorySummary) {
  product[i].categoryName = categorySummary[i].name
  product[i].categoryDescription = categorySummary[i].description
}
module.exports = {
  id: 1,
  img: 'http://localhost:9000/detail/jiyejia.png',
  bgImg: 'http://localhost:9000/detail/jiyejia_bg.png',
  title: '吉野家',
  delivery: ['商家配送', '48', '7'],
  notice: '本店只提供电子发票，请您按照收银条指引自行开票，谢谢。',
  averageScore: 4.5,
  serviceScore: 4.8,
  foodScore: 4.2,
  contrast: 65.5,
  foodTime: 30,
  shopImgs,
  shopInfo,
  promotion: [
    {
      type: promotion_type[0],
      detail: '满30减15，满60减30'
    },
    {
      type: promotion_type[1],
      detail: '10人套餐A 原价245元，下单立减70元'
    },
    {
      type: promotion_type[2],
      detail: '新用户下单立减17.0元'
    },
    {
      type: promotion_type[1],
      detail: '10人套餐D，下单立减70'
    },
    {
      type: promotion_type[1],
      detail: '老酸奶特价15元2盒'
    },
    {
      type: promotion_type[1],
      detail: '鱼香肉丝套餐只要19.9元，美味超值！'
    },
    {
      type: promotion_type[1],
      detail: '关东煮+可乐，仅售12元'
    },
    {
      type: promotion_type[3],
      detail: '咖喱牛肉饭“5”折，美味享不停~~~'
    },
    {
      type: promotion_type[1],
      detail: '57元双人套餐'
    }
  ],
  product: product
}