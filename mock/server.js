const Koa = require('koa')
const Router = require('koa-router')
// const cors = require('koa-cors')
const cors = require('kcors')
const http = require('http')
const app = new Koa()
const router = new Router()

// 支持跨域
app.use(cors())

// 首页 -- 类别
const homeCateData = require('./home/category')
router.get('/api/homecate', function(ctx, next) {
  ctx.body = homeCateData
})

// 首页 --推荐商家
const homeAdData = require('./home/shoplist')
router.get('/api/shoplist/:cityname/:page', function(ctx, next) {
  const params = ctx.params
  console.log('首页 --推荐商家:', params.cityname, params.page);
  ctx.body = homeAdData
})

// 首页 -- 推荐列表（猜你喜欢）
const homeListData = require('./home/list')
router.get('/api/homelist/:city/:page', function(next) {
  const params = this.params
  const [paramsCity, paramsPage] = [params.city, params.page]
  console.log('当前城市：', paramsCity)
  console.log('当前页数：', paramsPage)
  this.body = homeListData
})

// 选择城市页 城市列表
const cityListName = require('./cityList/list')
router.get('/api/cityname', function(ctx, next) {
  console.log('选择城市页 城市列表')

  ctx.body = cityListName
})

// 选择地址页 地址列表
const addressList = require('./personal/addresslist')
router.get('/api/addresslist', function(ctx, next) {
  console.log('选择地址 已保存地址列表')
  ctx.body = addressList
})

// 发现页， 美食热推， 天天特价，限时好礼
const discoverList = require('./discover')
router.get('/api/discoverlist', function(ctx, next) {
  console.log('发现页')
  ctx.body = discoverList
})

// 商家详情页
const detailData = require('./detail/info')
router.get('/api/detail/:shopid', function(ctx, next) {
  console.log('商家详情页, shopid:', ctx.params.shopid)
  detailData.id = ctx.params.shopid
  ctx.body = detailData
})

// 搜索结果页 - 搜索结果 - 三个参数
// 在输入口中输入关键字进行搜索
const searchListData = require('./search/list')
router.get('/api/search/:page/:city/:category/:keyword', function(next) {
  console.log('搜索结果页 - 搜索结果')

  const params = this.params
  const [paramsPage, paramsCity, paramsCategory, paramsKeyword] =
        [params.page, params.city, params.category, params.keyword]

  console.log('当前页数：', paramsPage)
  console.log('当前城市：', paramsCity)
  console.log('当前类别：', paramsCategory)
  console.log('关键字：', paramsKeyword)

  this.body = searchListData
})

// 搜索结果页 - 搜索结果 - 两个参数
// 直接点类别进行搜索
router.get('/api/search/:page/:city/:category', function(next) {
  console.log('搜索结果页 - 搜索结果')

  const params = this.params
  const [paramsPage, paramsCity, paramsCategory] = 
        [params.page, params.city, params.category]

  console.log('当前页数：', paramsPage, ', 当前城市：', paramsCity, ', 当前类别：', paramsCategory)

  this.body= searchListData
})

// 详情页 - 商户信息
const detailInfo = require('./detail/info')
router.get('/api/detail/info/:id', function(next) {
  console.log('详情页 - 商户信息')

  const params = this.params
  const id = params.id

  console.log('商户id: ', id)

  this.body = detailInfo
})

// 订单页  订单列表
const orderList = require('./orderlist/orderList')
router.get('/api/orderlist/:page/:userid', function(ctx, next) {
  console.log('订单页  订单列表')

  const params = ctx.params
  const userid = params.userid
  const page = params.page

  console.log('用户id: ', userid, ', page:', page)

  ctx.body = orderList
})

// 商家详情页  评论列表
const shopCommentList = require('./shop/comment')
router.get('/api/shop/comment/:shopId/:commentSize/:commentNumber', function(ctx, next) {
  console.log('商家详情页  评论列表')

  const params = ctx.params

  console.log('商家id: ', params.shopId, params.commentSize, params.commentNumber)

  ctx.body = shopCommentList
})

// 筛选条件
const selectDropDown = require('./selectDropDown')
router.get('/api/selectDropDown', (ctx, next)=>{
  console.log('筛选条件')
  ctx.body = selectDropDown
})

router.get('/api/getUserIp', (ctx, next)=>{
  console.log('获取访客ip')
  ctx.body = '123.127.48.194'
})

// 随意删掉的其他mock Begin

// 轮询
router.get('/fetchMsg', (ctx, next)=> {
  // ctx.body = 'callback("做我的狗吧")
  console.log(666);
  ctx.body = '{a:"aa"}'
})

// 长轮询

router.get('/holdFetchMsg', async(ctx, next) => {
  /*
  let i = 0
  while(true) {
    if(++i > 2222222222) {
      ctx.body = '做我的狗吧'
      break
    }
  }
  */

  // 2
  /*
  let delay = 2000, i = 0
  while(true) {
    let startTime = new Date().getTime()
    console.log(i)
    if(++i > 3) {
      ctx.body = '做我的狗吧'
      break
    } else {
      // 休息会
      while(new Date().getTime() < startTime + delay);
    }
  }
  */
  // 第二种长轮询实现
    let i = 0
    const sleep = ms => {
      return new Promise(function timer(resolve) {
        setTimeout(async()=>{
          if(++i > 2) {
            resolve()
          } else {
            timer(resolve)
          }
        }, ms)
      })
    }
    await sleep(2000)
    console.log(123, ctx.request.ip);
    ctx.body = '做我的狗吧'
})

// 随意删掉的其他mock End

app.use(router.routes())
   .use(router.allowedMethods())
app.listen(3000)

console.log('Server running at port 3000...')
