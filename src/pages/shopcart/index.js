import Taro, { Component } from '@tarojs/taro'

class Index extends Component {
  config = {
    navigationBarTitleText: '购物车'
  }

  render(){
    return <div>
      <span>购物车</span>
    </div>
  }
}

export default Index
