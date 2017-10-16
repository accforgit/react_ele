# react_ele

没事逛技术社区的时候，经常看到许多仿照饿了么官网的项目，不过可能是因为饿了么本身就是使用 `vue`构建，所以大部分仿照项目也都是使用 `vue`架构，因为我本身倾向于 `react`，奔着打磨技术的目的去，所以就准备着使用 `react`仿写饿了么。

本来是想着把饿了么整个网站，包括前后端全部仿写一遍的，想法是这个想法，然而实际等自己真做起来的时候才知道什么叫想得太美，仿写一个网站和只写一个页面之间的差别不要太大

前端日新月异，几天就能出来一个新框架、概念、思想，本人只算是个前端小菜鸟，要学习的东西太多，往往就是几天下来就感觉自己几天前的架构、代码等太烂，总想着要回头改一遍，再加上工作逐渐忙碌，工作之外的时间越来越少，而此项目纯粹就是下班之外的时间捣鼓一下，项目前前后后弄了两三个月，大体功能差不多都实现了，还有很多需要完善的地方，不过实在是没时间了，之前说好的后端也没时间做了。

限于入行时间太短，没做过多少项目，自己捣鼓一个项目没什么经验，随着自己水平的提升，做到最后自己很容易就能发现之前有的地方不太理想，前后代码的风格可能也会不一致，但也没时间改了，而且项目只是用来学习用的，在某些地方我可能想要尝试某种以前没有接触过的东西，所以可能还会故意弄得复杂，自然是比不上社区中众多大佬们贡献出来的代码，不过整个项目做下来，自己确实学到了很多，现在如果再让我重头写一个类似的项目，我肯定会做得更好，由此可见，亲自上手尝试确实是水平进步的最佳方法之一。

整个项目总体看起来不咋地，不过其中也有小部分思想、代码等本人觉得尚可，说不定将来还要从这里 `copy` 自己的一些代码呢。


---

## 运行

因为我刚开始是想把前端做完再做个后端的，所以接口都定义好了，并且暂时用了一个简单的后端服务模拟(基于koa2)，但是现在后端是没办法做了，想要运行项目的话，需要开三个命令行窗口，首先进入根目录，然后在一个命令行窗口中输入 `npm run mock`，开启 `koa2`简单服务，然后进入`/app/static/img`目录再开启一个 `9000`端口的服务，如果你全局安装了 [http-server](https://github.com/indexzero/http-server)这个模块，那么在此目录中输入 `hs -p 9000`，即开启图片服务，最后在根目录中再开一个命令行窗口，输入 `npm start`，即启动项目

确实有点丧心病狂，因为这只是一个半成品，好多东西没时间完善了...

---
## 大概效果

![showpicture](https://github.com/accforgit/react_ele/blob/master/img/1.png)![showpicture](https://github.com/accforgit/react_ele/blob/master/img/2.png)![showpicture](https://github.com/accforgit/react_ele/blob/master/img/3.png)

![showpicture](https://github.com/accforgit/react_ele/blob/master/img/4.png)![showpicture](https://github.com/accforgit/react_ele/blob/master/img/5.png)![showpicture](https://github.com/accforgit/react_ele/blob/master/img/6.png)

![showpicture](https://github.com/accforgit/react_ele/blob/master/img/react_ele.gif)

## 使用到的一些技术

- redux、react-router、koa2、es6

- 调用 `html5`地理位置接口 `geolocation`，以及根据 `ip`信息获取位置信息，并调用第三方接口，将经纬度信息转换成可读的位置数据

- 调用 `localstorage`存储数据信息

- 组件动态加载，列表无限加载，react动画，高阶函数(HOC)

- react-addons以及 svg的应用
- and so on



