module.exports = {
  // '/LenovoService.asmx': {
  //   target: 'http://61reading.lenovo.com.cn',
  //   changeOrigin: true,
  //   logLevel: 'debug',
  //   pathRewrite: {
  //     '^/comments': '/api/comments'
  //     // comments/...
  //   },
  //   // 设置请求头
  //   headers: {
  //     Cookies:
  //       'LA_F_T_10000001=1526888185458; LA_C_Id=_ck18052123; LA_V_T_N_S_10000001=1526888185458; LA_V_T_N_10000001=1526888185458; LA_M_W_10000001=_ck18052115362514676559538833230%7C10000001%7C%7C%7C; leid=1.eAKqPeyw9zE; account=%7B%22username%22%3A%22lenovo1%22%2C%22dlserver%22%3A%22%2F%22%7D; avt_v=vid%3D%3E163b4318eba5e05%7C%7C%7Cfsts%3D%3E1527736536758%7C%7C%7Cdsfs%3D%3E1139%7C%7C%7Cnps%3D%3E6; avt_s=lsts%3D%3E1527834978167%7C%7C%7Csid%3D%3E8693528338%7C%7C%7Cvs%3D%3E12%7C%7C%7Csource%3D%3Edirect%7C%7C%7Cpref%3D%3Ehttp%3A//61reading.lenovo.com.cn/lenovo/single-all.html%7C%7C%7Cref%3D%3Ehttp%3A//61reading.lenovo.com.cn/lenovo/single-all.html'
  //   }
  // },

  // https://provider-joyreader.wawayaya.com/lenovo/bookResource/2417/page006/797950
  // /joyreader/lenovo/bookResource/2417/page006/797950
  '/lenovo': {
    target: 'https://provider-joyreader.wawayaya.com',
    changeOrigin: true,
    // logLevel: 'debug',
    pathRewrite: {
      '^/comments': '/api/comments'
    },
    // 设置请求头
    headers: {
      Cookies:
        'LA_F_T_10000001=1526888185458; LA_C_Id=_ck18052123; LA_V_T_N_S_10000001=1526888185458; LA_V_T_N_10000001=1526888185458; LA_M_W_10000001=_ck18052115362514676559538833230%7C10000001%7C%7C%7C; leid=1.eAKqPeyw9zE; account=%7B%22username%22%3A%22lenovo1%22%2C%22dlserver%22%3A%22%2F%22%7D; avt_v=vid%3D%3E163b4318eba5e05%7C%7C%7Cfsts%3D%3E1527736536758%7C%7C%7Cdsfs%3D%3E1139%7C%7C%7Cnps%3D%3E6; avt_s=lsts%3D%3E1527834978167%7C%7C%7Csid%3D%3E8693528338%7C%7C%7Cvs%3D%3E12%7C%7C%7Csource%3D%3Edirect%7C%7C%7Cpref%3D%3Ehttp%3A//61reading.lenovo.com.cn/lenovo/single-all.html%7C%7C%7Cref%3D%3Ehttp%3A//61reading.lenovo.com.cn/lenovo/single-all.html'
    }
  },
  '/api/*': {
    target: 'http://localhost:8880',
    pathRewrite: {
      '^/api': ''
    },
  }
}
