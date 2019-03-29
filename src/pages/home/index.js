import Taro, { Component } from '@tarojs/taro'
import axios from 'axios'

//导入样式
import './home.scss'

class Index extends Component {
  constructor() {
    super()

    this.state = {
      swiperdata: [], // 轮播图数据
      catitems: [], // 分类数据
      floordatas: [], // 楼层数据
      isShowGoToTop: false // 回到顶部
    }
  }

  config = {
    navigationBarTitleText: '品优购'
  }

  componentWillMount() {
    // 获取轮播图数据
    this.getSwiperData()
    // 获取分类菜单数据
    // this.getCatitems()
  }

  getSwiperData = async () => {
    const res = await axios.get('home/swiperdata')

    this.setState({
      swiperdata: res.data.message
    })
  }

  getCatitems = async () => {
    const res = await axios.get('home/catitems')

    this.setState({
      catitems: res.data.message
    })
  }

  render() {
    return (
      <view>
        {/* 1.0 轮播图 */}
        <swiper
          indicator-dots
          autoplay
          circular
          interval={3000}
          duration={1000}
          indicator-active-color="#ffffff"
        >
          {this.state.swiperdata.map(item => {
            return (
              <navigator key={item.id} url={item.navigator_url}>
                <swiper-item>
                  <image src={item.image_src} />
                </swiper-item>
              </navigator>
            )
          })}
        </swiper>

        {/* 2.0 菜单项目 */}
        <view className="categories">
          {this.data.catitems.map((item, index) => {
            return (
              <view key={index} className="category-item">
                <image src={item.image_src} />
              </view>
            )
          })}
        </view>
      </view>
    )
  }
}

export default Index
