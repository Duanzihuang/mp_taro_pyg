import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";

import Index from "./pages/index";

import configStore from "./store";

import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  config = {
    pages: [
      "pages/home/index",
      "pages/category/index",
      "pages/shopcart/index",
      "pages/mine/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#ff2d4a",
      navigationBarTitleText: "品优购",
      navigationBarTextStyle: "white"
    },
    tabBar: {
      selectedColor: "#ff2d4a",
      list: [
        {
          pagePath: "pages/home/index",
          text: "首页",
          iconPath: "static/img/icon_home@3x.png",
          selectedIconPath: "static/img/icon_home_active@3x.png"
        },
        {
          pagePath: "pages/category/index",
          text: "分类",
          iconPath: "static/img/icon_category@3x.png",
          selectedIconPath: "static/img/icon_category_active@3x.png"
        },
        {
          pagePath: "pages/shopcart/index",
          text: "购物车",
          iconPath: "static/img/icon_cart@3x.png",
          selectedIconPath: "static/img/icon_cart_active@3x.png"
        },
        {
          pagePath: "pages/mine/index",
          text: "我的",
          iconPath: "static/img/icon_me@3x.png",
          selectedIconPath: "static/img/icon_me_active@3x.png"
        }
      ]
    }
  };

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
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
