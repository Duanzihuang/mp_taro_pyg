import Taro, { Component } from '@tarojs/taro'

class Index extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  render(){
    return <div>
      <span>我的</span>
    </div>
  }
}

export default Index
