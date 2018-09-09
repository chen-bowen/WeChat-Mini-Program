const weatherMap = {
  'sunny': '晴',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

Page({
  data: {
    nowTemp: '',
    nowWeather: '',
    nowWeatherBackground: ''
  },
 onPullDownRefresh(){
   this.getNow(() => {
     wx.stopPullDownRefresh()
   })
 },

  onLoad() {
    this.getNow()
   },
  getNow(callback){
              var that = this;
              wx.request({
                url: 'https://test-miniprogram.com/api/weather/now/', 
                data: {
                  city: '深圳市'
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  let result = res.data.result
                  let temp = result.now.temp
                  let weather = result.now.weather
                  console.log(temp, weather)
                  that.setData({
                    nowTemp: temp,
                    nowWeather: weather,
                    nowWeatherBackground: '/images/' + weather + '-bg.png'
                  })
                  const weatherColorMap = {
                    'sunny': '#cbeefd',
                    'cloudy': '#deeef6',
                    'overcast': '#c6ced2',
                    'lightrain': '#bdd5e1',
                    'heavyrain': '#c5ccd0',
                    'snow': '#aae1fc'
                  }

                  wx.setNavigationBarColor({
                    frontColor: '#000000',
                    backgroundColor: weatherColorMap[weather],
                  })
                },
                complete: () => {
                  wx.stopPullDownRefresh()}
              })
              }
})
  