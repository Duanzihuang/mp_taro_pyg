import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

// 更改axios的适配器
import axios from 'axios'
axios.defaults.baseURL = 'https://www.zhengzhicheng.cn/api/public/v1/'

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    wx.showLoading({
      title: '数据加载中...', //提示的内容,
      mask: true //显示透明蒙层，防止触摸穿透,
    })
    // 拦截器的好处之一，可以在这里面统一做一些请求发送出去之前的事情
    if (wx.getStorageSync('token')) {
      config.headers.Authorization = wx.getStorageSync('token')
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    wx.hideLoading()
    return response
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 所有发送请求最终都会来到这里，然后再根据是配置决定
// 使用哪种方式发送请求，浏览器一般使用xhr
axios.defaults.adapter = function(config) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.url, // url
      data: config.data, // 参数
      method: config.method, // 方法
      header: config.headers, // 这个和小程序中的api不一致，所有要仔细
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

class App extends Component {
  config = {
    pages: [
      'pages/home/index',
      'pages/category/index',
      'pages/shopcart/index',
      'pages/mine/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ff2d4a',
      navigationBarTitleText: '品优购',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      selectedColor: '#ff2d4a',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: 'static/img/icon_home@3x.png',
          selectedIconPath: 'static/img/icon_home_active@3x.png'
        },
        {
          pagePath: 'pages/category/index',
          text: '分类',
          iconPath: 'static/img/icon_category@3x.png',
          selectedIconPath: 'static/img/icon_category_active@3x.png'
        },
        {
          pagePath: 'pages/shopcart/index',
          text: '购物车',
          iconPath: 'static/img/icon_cart@3x.png',
          selectedIconPath: 'static/img/icon_cart_active@3x.png'
        },
        {
          pagePath: 'pages/mine/index',
          text: '我的',
          iconPath: 'static/img/icon_me@3x.png',
          selectedIconPath: 'static/img/icon_me_active@3x.png'
        }
      ]
    }
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
