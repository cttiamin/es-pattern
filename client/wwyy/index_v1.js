var banben = navigator.appVersion.split(';'),
  IE8 =
    navigator.appName == 'Microsoft Internet Explorer' &&
    banben[1].replace(/[ ]/g, '') == 'MSIE8.0',   
  IE10 = navigator.appName == 'Microsoft Internet Explorer' &&
    banben[1].replace(/[ ]/g, '') == 'MSIE10.0' || banben[1].replace(/[ ]/g, '') == 'MSIE9.0',  
  old_data,
  old_itemCode,
  old_itemSubCode,
  old_length,
  old_sh_val,
  sh_flag,
  old_sh_data,
  lenovoId,
  a_token = true,
  chinese_num_img = 1,
  english_num_img = 9,
  // userId = 8394,
  userInfo= {
    userId: 8394,
    token: null,
    lenovoId: null,
    deviceId: null
  },
  old_groupId,
  old_groupType,
  itemCodeText,
  xhr,
  // host_prefix = '/wawayaya',
  host_prefix = '',
  _span_ie8 = IE8
    ? "<span class='span1'></span><span class='span2'></span>"
    : ''


// 返回 location 参数 value
function getQueryStringRegExp(query) {
  //get query string without the initial ?
  var qs = (location.search.length > 0 ?
    location.search.substring(1) : ""),
    args = {}, //object to hold data
    //get individual items
    items = qs.length ? qs.split("&") : [],
    item = null,
    name = null,
    value = null,
    i = 0, //used in for loop
    len = items.length;

  //assign each item onto the args object
  for (i = 0; i < len; i++) {
    item = items[i].split("=");
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    // name.replace(/</g, "%lt;").replace(/>/g, "&gt;")
    if (/(style|script|link|iframe|frame)/.test(value)) {
      // console.log('has script');
      continue;
    }
    if (name.length) {
      args[name] = value;
    }
  }
  // console.log(args);
  if (args && args[query]) {
    // console.log('find query,', args[query]);
    return args[query];
  }
  else {
    return null;
  }
}


$(function() {
  var 
    // lenovo_id = getQueryStringRegExp('userid'),
    _itemCode = getQueryStringRegExp('itemCode'),
    _itemSubCode = getQueryStringRegExp('itemSubCode')

  itemCodeText = getQueryStringRegExp('itemCodeText')
  old_groupId = getQueryStringRegExp('groupId')
  old_groupType = getQueryStringRegExp('groupType')
  old_itemCode = _itemCode
  old_itemSubCode = _itemSubCode;

  if (old_groupId !== null || itemCodeText !== null) {
    $('#m_list, .header2').hide()
  }
})

function randomNum(n) {
  var rnd = ''
  for (var i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 10)
  }
  return rnd
}

function getUser(url) {
  var dtd = $.Deferred()
  var wait = function (dtd) {
    $.ajax({
      type: 'GET',
      url: url,
      success: function(res) {
        dtd.resolve(res)
      },
      error: function(res) { 
        dtd.reject(res)
      }
    }); 
    return dtd.promise()
  }
  return wait(dtd)
}

function getUserId () {
  var url = "/joyreader-api/lenovo/login?lenovoUserId=" + userInfo.lenovoId + 
      '&deviceId='+ userInfo.deviceId;
  var user = getUser(url);
  user.then(function(res){
    userInfo.userId = res.retInfo.userId
    // console.log('ok 1', res)
    CookieUtil.set('lenovoId', userInfo.lenovoId)
    CookieUtil.set('deviceId', userInfo.deviceId)
    CookieUtil.set('userId', res.retInfo.userId)
    initData();
  }, function(err) {
    console.log('err 1', err)
  })
}

function getUserInfo() {
  // getQueryStringRegExp('token')
  // CookieUtil.set('token', token);
  // CookieUtil.get('token') === null

  userInfo.token = getQueryStringRegExp('token')
  userInfo.lenovoId = CookieUtil.get('lenovoId')
  userInfo.userId = CookieUtil.get('userId')
  // if (userInfo.userId !== 8394) {
  //   initData();
  //   return;
  // }
  // console.log(userInfo)

  if (userInfo.lenovoId && userInfo.lenovoId !== 'null') {
    if (userInfo.deviceId == null) {
      userInfo.deviceId = 'lxweb' + userInfo.lenovoId
    }
    // console.log('has user lenovoId')
    getUserId()
  } 
  // else if (userInfo.token) {
  //   console.log('userinfo token')
  // } 
  else {
    // console.log('用户未登陆！ lenovoId=>', this.randomNum(11))
    userInfo.lenovoId = '' + this.randomNum(11)
    userInfo.deviceId = 'lxweb' + userInfo.lenovoId
    getUserId()
  }
}

getUserInfo();
// initData();

function bodyWH() {
  var w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth

  var h =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight

  return { w: w, h: h }
}

function adjustmentHeightAndWidth(flag) {
  var wh = bodyWH(),
    w = wh.w,
    h = wh.h

  var box = document.getElementsByTagName('body')[0]

  box.style.width = w + 'px'
  box.style.height = h + 'px'

  var _font_size = parseFloat(w / 1550 * 17).toFixed(1),
    _font_size3 = parseFloat(w / 1550 * 18.5).toFixed(1),
    _width = parseInt(w / 1550 * 204) + 'px',
    _height = parseInt(w / 1550 * 272) + 'px',
    _width2 = parseInt(w / 1550 * 119) + 'px',
    _height2 = parseInt(w / 1550 * 74) + 'px',
    _height3 = parseInt(w / 1550 * 112) + 'px',
    _m_b = parseInt(w / 1550 * 68) + 'px',
    _top = parseInt(w / 1550 * 279) + 'px',
    _top2 = parseInt(w / 1550 * -50),
    _left2 = parseInt(w / 1550 * 43) + 'px',
    _m_l_t = parseInt(w / 1550 * 20) + 'px',
    _r = parseInt(w / 1550 * 25) + 'px',
    _height4 = parseInt(w / 1550 * 50) + 'px',
    _top3 = parseInt(w / 1550 * 10)

  if (!flag) {
    $('.book_beader label').css('border-radius', _r)
    $('.header2 label').css('height', _height3)
    $('.book_box').css({
      height: h - parseInt(_height3) - _top3 + 'px',
      'margin-top': _top3 + 'px'
    })
    $('._height_top').css('height', _height4)
    $('.book p').css({ top: _top })
    $('.top').css({
      left: _left2,
      top: _top2 + 'px',
      width: _width2,
      height: _height2
    })
    $('.book').css({
      width: _width,
      height: _height,
      'margin-left': _m_l_t,
      'margin-top': _m_l_t,
      'margin-bottom': _m_b
    })

    //console.log(w + "     " + h);

    if ($('body').is(':hidden')) {
      $('body').show()
    }

    if (IE8) {
      var _m_t = parseInt($('.book_beader').css('height'))
      $('.book_beader,.header button,#back').each(function() {
        $(this).css('font-size', _font_size3)
      })
      $('.book p').css({ 'font-size': _font_size })
      $('.header input')
        .css({ 'font-size': _font_size3, 'line-height': _m_t + 'px' })
        .val('aas')
        .val('')
    }
  } else {
    if (flag == 1) {
      $('.book p').css({ top: _top })
      $('.book').css({
        width: _width,
        height: _height,
        'margin-left': _m_l_t,
        'margin-top': _m_l_t,
        'margin-bottom': _m_b
      })
      $('._height_top').css('height', _height4)
      $('.top').css({
        left: _left2,
        top: _top2 + 'px',
        width: _width2,
        height: _height2
      })
      $('#m_list').css({
        height: h - parseInt($('.header2').css('height')) - _top3 + 'px',
        'margin-top': _top3 + 'px'
      })
      var _noaoh =
        parseInt($('#m_list').css('height')) -
        parseInt($('#m_list .book_beader').css('height')) -
        parseInt($('#m_list .book_beader').css('margin-bottom'))
      $('#m_list .nano').css({ height: _noaoh + 'px' })
    } else {
      ;(_width = parseInt(w / 1550 * 243) + 'px'),
        (_height = parseInt(w / 1550 * 323) + 'px'),
        (_top = parseInt(w / 1550 * 335) + 'px'),
        (_m_b = parseInt(w / 1550 * 67) + 'px'),
        (_m_l_t = parseInt(w / 1550 * 21) + 'px')

      $('.book_box').css(
        'height',
        h - (23 + parseInt($('#back').css('height'))) - _top3 + 'px'
      )
      $('#search_list .book p').css({ top: _top })
      $('#search_list .book').css({
        width: _width,
        height: _height,
        'margin-left': _m_l_t,
        'margin-top': _m_l_t,
        'margin-bottom': _m_b
      })
    }
  }
}

//判断是移动端，还是PC端
function pcorph() {
  var flag

  var sUserAgent = navigator.userAgent.toLowerCase()
  ;(bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'),
    (bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'),
    (bIsMidp = sUserAgent.match(/midp/i) == 'midp'),
    (bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'),
    (bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'),
    (bIsAndroid = sUserAgent.match(/android/i) == 'android'),
    (bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'),
    (bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile')

  if (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    flag = true
  } else {
    flag = false
  }

  return flag
}

//IE8兼容获取 dpi 的值
function js_getDPI() {
  var arrDPI = new Array()
  if (window.screen.deviceXDPI != undefined) {
    arrDPI[0] = window.screen.deviceXDPI
    arrDPI[1] = window.screen.deviceYDPI
  } else {
    var tmpNode = document.createElement('DIV')
    tmpNode.style.cssText =
      'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
    document.body.appendChild(tmpNode)
    arrDPI[0] = parseInt(tmpNode.offsetWidth)
    arrDPI[1] = parseInt(tmpNode.offsetHeight)
    tmpNode.parentNode.removeChild(tmpNode)
  }
  return arrDPI
}



function initData() {
  if (pcorph()) {
    $('body').addClass('body_ph')
    $('.header').hide()
  } else {
    $('body').addClass('body_pc')
  }

  var scroll_flag = true,
    scroll_flag2 = true

  $('.nano').bind('scrollend', function(e) {
    // console.log('nano:', $('#search_list').is(':hidden'));

    if ($('#search_list').is(':hidden')) {
      if (scroll_flag) {
        // BIGDATA

        scroll_flag = false
        if (
          (old_data.retInfo.list.length < 24 &&
            old_data.retInfo.listType == 'bookList') ||
          (old_data.retInfo.list.length == 24 &&
            old_data.retInfo.totalPageCount == old_data.retInfo.pageIndex) ||
          (old_data.retInfo.totalPageCount == old_data.retInfo.pageIndex &&
            old_length == old_data.retInfo.list.length)
        ) {
          var _h =
            parseInt($('#m_list .content_huo p').css('height')) * 4 + 'px';

          $('#m_list .content_huo').append(
            "<div class='bottom_div' style='height:" +
              _h +
              '; line-height:' +
              _h +
              // "'>没有更多了"+getQueryStringRegExp('token')+"</div>"
              "'>没有更多了</div>"
          )
          setNano()
        } else {
          if (old_data.retInfo.listType == 'bookList') {
            pageIndex = old_data.retInfo.pageIndex + 1
            // console.log(old_itemCode, old_itemSubCode, pageIndex, old_data.retInfo.list.length, old_data.retInfo.totalPageCount)
            list_z(old_itemCode, old_itemSubCode, pageIndex)
          } else {
            groupListDataFor()
          }
        }
        ah.Report(
          '_VISIT_',
          'MAINPAGE_LOAD_MORE_CONTENT',
          'Loaded more content in main page.'
        )
      }
    }
  })

  $('.nano2').bind('scrollend', function(e) {
    if (scroll_flag2) {
      // BIGDATA

      scroll_flag2 = false
      var sh_list =
        sh_flag == 2 ? old_sh_data.retInfo.bookList : old_sh_data.retInfo.list
      if (sh_list.length < 20) {
        var _h =
          parseInt($('#search_list .content_huo p').css('height')) * 4 + 'px'
        $('#search_list .content_huo').append(
          "<div class='bottom_div' style='height:" +
            _h +
            '; line-height:' +
            _h +
            "'>没有更多了</div>"
        )
        setNano()
      } else {
        var pageIndex = old_sh_data.retInfo.pageIndex + 1
        searchAndMore(pageIndex)
        ah.Report(
          '_SEARCH_',
          'SEARCH_LOAD_MORE_CONTENT',
          'Search results loading more content',
          { keyword: _search_text }
        )
      }
    }
  })

  if (IE8) {
    $('.header2 label:eq(0)').addClass('_width')
    $('.header2 label:eq(0) img').addClass('_height')
    $('.book_beader label:eq(0)').addClass('_label_b')
  }

  var _fenlei

  $.ajax({
    async: true,
    url:
      'https://provider-joyreader.wawayaya.com/lenovo/homeList?userId=' +
      userInfo.userId,
    type: 'GET',
    dataType: 'jsonp', // 返回的数据类型，设置为JSONP方式
    jsonp: 'callback', // 指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
    jsonpCallback: 'hahah', // 设置回调函数名
    data: {
      q: 'javascript',
      count: 1
    },
    success: function(data) {
      var _english,
        _chinese,
        _promotion,
        _popular,
        dpi = window.devicePixelRatio,
        qualityAll = dpi > 1.5 ? 60 : 75,
        wh = bodyWH(),
        _w = wh.w > wh.h ? wh.w : wh.h,
        _ht = parseInt(_w / 1550 * 112)
      //_ht = _ht > 112 ? _ht : 112;
      if (IE8 || IE10) {
        dpi = (js_getDPI()[0] / 100).toFixed(1);
        qualityAll = dpi > 1.5 ? 60 : 75;
      }
      _ht = _ht * dpi

      for (var i = 0; i < data.retInfo.dataList.length; i++) {
        var listdata = data.retInfo.dataList[i]

        if (listdata.itemCode == 'english') {
          _english = listdata
          $('#english_l + label img').attr(
            'src',
            listdata.img + '!/quality/' + qualityAll + '/fh/' + _ht
          )
        } else if (listdata.itemCode == 'chinese') {
          _chinese = listdata
          $('#chinese + label img').attr(
            'src',
            listdata.img + '!/quality/' + qualityAll + '/fh/' + _ht
          )
        } else if (listdata.itemCode == 'popular') {
          _popular = listdata
          $('#popular + label img').attr(
            'src',
            listdata.img + '!/quality/' + qualityAll + '/fh/' + _ht
          )
        } else if (listdata.itemCode == 'promotion') {
          _promotion = listdata
          // var imageP = pcorph() ? listdata.imgMobile || listdata.img  + '!/quality/' + qualityAll + '/fh/' + _ht :
          var imageP = listdata.imgMobile || listdata.img  + '!/quality/' + qualityAll + '/fh/' + _ht;
          // var imageP = '/img/180522-single/prize.jpg';
          $('#promotion + label img').attr(
            'src',
            imageP
          )
        }
      }

      _fenlei = {
        english_l: _english,
        chinese: _chinese,
        popular: _popular,
        promotion: _promotion
      }

      if (old_itemCode === null && old_groupId === null) {
        list_f('popular')
        var token = getQueryStringRegExp('token')
        // console.log(token)
        if (token) {
          list_z('popular', 'recommend')
          // sessionStorage.setItem('token', token)
          CookieUtil.set('token', token);
        } else {
          list_z('popular', 'free')
        }
      } else {
        if (old_groupId) {
          $('.book_beader div:eq(0)').html('')
          old_groupId = decodeURIComponent(old_groupId)
          var data_text = old_groupId.split('|')
          ;(_name = data_text[3]), (_tab = data_text[1]), (_tab2 = data_text[4])
          old_sh_val =
            'https://provider-joyreader.wawayaya.com/lenovo/groupMoreBooks?userId=8394&groupId=' +
            data_text[0] +
            '&groupType=' +
            old_groupType +
            '&pageIndex='
          old_groupId = data_text[0]
          old_itemCode = data_text[2]
          if (_tab2) {
            old_itemSubCode = data_text[5]
            list_f(old_itemCode, old_itemSubCode)
            _tab2 =
              "<span> > </span><button name = '" +
              data_text[5] +
              "'> " +
              _tab2 +
              '</button>'
            document.getElementById(data_text[5]).checked = true
          }

          document.getElementById(data_text[2]).checked = true
          $('#back').html(
            "<button id = 'top_tab'>" +
              _tab +
              '</button>' +
              _tab2 +
              '<span>' +
              _name +
              '</span>'
          )
          searchAndMore(1, 1)
        } else {
          itemCodeText = decodeURIComponent(itemCodeText)
          if (itemCodeText !== null && itemCodeText.indexOf('搜索结果') >= 0) {
            itemCodeText = itemCodeText.replace('搜索结果', '')

            $('.header input').val(itemCodeText)
            setTimeout(function() {
              $('.header button').click()
              $('#back button:eq(0)').attr('name', 1)
            })
          } else {
            var itCode = old_itemCode == 'english_l' ? 'english' : old_itemCode
            list_f(old_itemCode, old_itemSubCode)
            list_z(itCode, old_itemSubCode)
          }
        }
      }
    },
    error: function() {
      //$("#m_list .content_huo").html("<h1>网络异常</h1>");
    }
  })

  function list_f(id, flag) {
    var token = getQueryStringRegExp('token')
    var _data = _fenlei[id]

    var _book_beader = '<span>' + _data.itemName + '：</span>'
    var _book_beaderF = ''
    if (_data.sub) {
      for (var i = 0; i < _data.sub.length; i++) {
        if (!token && _data.sub[i].name == '免费图书') {
          _book_beaderF =
            "<input id='" +
            _data.sub[i].code +
            "' type='radio' name='classification2' /><label for='" +
            _data.sub[i].code +
            "' >" +
            _data.sub[i].name +
            '</label>' +
            _book_beaderF
        } else {
          _book_beaderF =
            _book_beaderF +
            "<input id='" +
            _data.sub[i].code +
            "' type='radio' name='classification2' /><label for='" +
            _data.sub[i].code +
            "' >" +
            _data.sub[i].name +
            '</label>'
        }
      }
    }

    $('.book_beader div:eq(0)').html(_book_beader + _book_beaderF)

    document.getElementById(id).checked = true
    if (IE8) {
      $('._width').removeClass('_width')
      $('._height').removeClass('_height')
      $('#' + id + ' + label').addClass('_width')
      $('#' + id + ' + label img').addClass('_height')
    }
    if (_data.sub) {
      var token = getQueryStringRegExp('token')
      // var _sub = token
      //   ? _data.sub[0].code
      //   : _data.sub[_data.sub.length - 1].code
      if(token) {
        sessionStorage.setItem('token', token)
      }
      var _sub = token
        ? _data.sub[0].code
        : _data.sub[_data.sub.length - 1].code == 'free'
          ? _data.sub[_data.sub.length - 1].code
          : _data.sub[0].code
      var tb_id = flag ? flag : _sub
      document.getElementById(tb_id).checked = true
      if (IE8) {
        $('._label_b').removeClass('_label_b')
        $("[for='" + tb_id + "']").addClass('_label_b')
      }
    }
  }

  function list_s(_this_id) {
    var itemCode =
        $('.header2 input:checked').attr('id') == 'english_l'
          ? 'english'
          : $('.header2 input:checked').attr('id'),
      itemSubCode = _this_id

    if (!itemSubCode) {
      itemSubCode = ''
    }

    list_z(itemCode, itemSubCode)
  }

  function list_z(itemCode, itemSubCode, pageIndex) {
    if (xhr) {
      xhr.abort()
    }

    var _bookList

    if (!pageIndex) {
      pageIndex = 1
      $('#m_list .content_huo').html('')
      scroll_flag = false
    }

    if (itemSubCode === null) {
      itemSubCode = $('.book_beader input:eq(0)').attr('id')
    }

    // console.log('list-z', itemCode, itemSubCode, pageIndex);
    xhr = $.ajax({
      type: 'GET',

      cache: false,

      url:
        'https://provider-joyreader.wawayaya.com/lenovo/bookList?userId=8394&itemCode=' +
        itemCode +
        '&itemSubCode=' +
        itemSubCode +
        '&pageIndex=' +
        pageIndex,
      // url: "http://testprovider-joyreader.wawayaya.com/lenovo/bookList?userId=8394&itemCode=" + itemCode + "&itemSubCode=" + itemSubCode + "&pageIndex=" + pageIndex,
      dataType: 'jsonp', // 返回的数据类型，设置为 JSONP 方式
      jsonp: 'callback', // 指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
      jsonpCallback: 'hahah', // 设置回调函数名
      data: {
        q: 'javascript',
        count: 1
      },
      success: function(data) {
        //var josn = JSON.stringify(data);
        // console.dir(data);
        old_data = data
        old_itemCode = itemCode
        old_itemSubCode = itemSubCode
        old_length = 0

        var i = 0,
          _listType = data.retInfo.listType

        _bookList = data.retInfo.list

        var _quality = imgQuality(272, 75, '')

        if (itemCode == 'popular' && pageIndex == 1) {
          $('#m_list .content_huo').append("<div class='_height_top'></div>")
        }

        function dataFor() {
          var img =
            i < 3
              ? "<img class='top' src='/img/edu-wy-crown" + (i + 1) + ".png'/>"
              : ''
          // console.log(_bookList[i]);
          // var img_tag = _bookList[i].lang === 'en' ? '<img class="vip" src="img/vip.png"/>': '';

          var img_tag
          if (_bookList[i].lang === 'en' && _bookList[i].isFree === 0) {
            img_tag = '<img class="vip" src="/img/tag-vip.png"/>'
          } else if (_bookList[i].isFree === 1) {
            img_tag = '<img class="vip" src="/img/tag-free.png"/>'
          } else {
            img_tag = '<img class="vip" src="/img/tag-member.png"/>'
          }

          if (pageIndex > 1 || itemCode != 'popular') {
            img = ''
          }
          var _img = _bookList[i].bookCover + _quality

          // console.log(_bookList);
          if (_bookList[i]) {
            $('#m_list .content_huo').append(
              "<div id='j" +
                _bookList[i].bookId +
                "' data-free='" +
                _bookList[i].isFree +
                "' class='book'><img class='bg_img' src='" +
                _img +
                "' />" +
                img +
                img_tag +
                '<p>' +
                _bookList[i].bookName +
                "</p><div class='book_shadow'>" +
                _span_ie8 +
                '</div></div>'
            )
          }
          i = i + 1
          // console.info(i, _bookList.length);
          if (i < _bookList.length) {
            dataFor()
          } else {
            adjustmentHeightAndWidth(1)
            setNano()
            scroll_flag = true
            if (a_token) {
              a_token = false

              var token = getQueryStringRegExp('token'),
                  deviceid = getQueryStringRegExp('deviceid'),
                  lenovoid = getQueryStringRegExp('lid');

              if(token) {
                sessionStorage.setItem('token', token)
              }

              if(deviceid){
                sessionStorage.setItem('deviceid', deviceid)
              }

              // console.log(token,'sessionStorage:', sessionStorage.getItem('token'))
              
              if (token) {
                $.ajax({
                  async: true,
                  url: '/process_set?token=' + token,
                  type: 'post',
                  dataType: 'json', // 返回的数据类型，设置为 JSON
                  success: function(data) {
                    // alert(JSON.stringify(data));
                    if (data && data.IdentityInfo.AccountID) {
                      $.ajax({
                        type: 'GET',
                        cache: false,
                        url: "https://provider-joyreader.wawayaya.com/lenovo/login?lenovoUserId=" + data.IdentityInfo.AccountID,
                  
                        dataType: 'jsonp', // 返回的数据类型，设置为 JSONP 方式
                        jsonp: 'callback', // 指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
                        jsonpCallback: 'hahah', // 设置回调函数名
                  
                        success: function(res) {
                          console.log(res);
                          userId = res.retInfo.userId;
                          sessionStorage.setItem('userId', res.retInfo.userId);
                        },
                        error: function(res) {}
                      });   
                    }

                    sessionStorage.setItem('lenovoId', data.IdentityInfo.AccountID);
                    
                    sessionStorage.setItem('curtName', data.IdentityInfo.CurtName);                    

                  },
                  error: function() {

                  }
                })
              } else if (lenovoid) {
                // 优先
                // if(getQueryStringRegExp('lid'))
                // {
                sessionStorage.setItem('lenovoId', lenovoid);
                $.ajax({
                  type: 'GET',
                  cache: false,
                  url: "https://provider-joyreader.wawayaya.com/lenovo/login?lenovoUserId=" + lenovoid,
            
                  dataType: 'jsonp', // 返回的数据类型，设置为 JSONP 方式
                  jsonp: 'callback', // 指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
                  jsonpCallback: 'hahah', // 设置回调函数名
            
                  success: function(res) {
                    console.log(res);
                    userInfo.userId = res.retInfo.userId;
                    sessionStorage.setItem('userId', res.retInfo.userId);
                  },
                  error: function(res) {}
                });   
                // }
              } else {
                // window.open('https://passport.lenovo.com/oauth2/authorize?client_id=100429326&response_type=code&redirect_uri=http://114.67.130.237:8082/&state=1&scope=','_blank');

              }
            }
          }
        }

        if (_bookList.length) {
          if (_listType == 'bookList') {
            dataFor()
          } else {
            groupListDataFor(data)
          }
        } else {
          if (pageIndex == 1) {
            $('#m_list .content_huo').html('<h1>抱歉爱读在这一项没有数据</h1>')
          }
        }
      },

      error: function() {
        //$("#m_list .content_huo").html("<h1>网络异常</h1>");
      }
    })
  }

  function groupListDataFor(data) {
    var _length_list = old_length + 5,
      _quality = imgQuality(272, 75, ''),
      _quality2 = imgQuality(318, 75, '')

    if (!data) {
      data = old_data
    }

    if (_length_list > data.retInfo.list.length) {
      _length_list = data.retInfo.list.length - old_length
    }

    function groupDataFor() {
      if (data.retInfo.list.length > old_length) {
        var _g = data.retInfo.list[old_length].groupId,
          _n = data.retInfo.list[old_length].groupName,
          _num = old_itemCode == 'chinese' ? chinese_num_img : english_num_img,
          img2 =
            'url(http://wawa-qin.b0.upaiyun.com/test/lenove/catimg/' +
            _num +
            '.png' +
            _quality2 +
            ')',
          buffdiv =
            "<div class='book'><span class='bookmore_bg'></span><span style='background-image:" +
            img2 +
            ";' groupId='" +
            _g +
            "' groupName='" +
            _n +
            "' class='bookmore'><span groupId='" +
            _g +
            "' groupName='" +
            _n +
            "'>" +
            _n +
            "</span><a groupName='" +
            _n +
            "' groupId='" +
            _g +
            "'>更多></a></span></div>",
          _bookList = data.retInfo.list[old_length].bookList,
          _bookList_length = _bookList.length > 5 ? 5 : _bookList.length
        // console.log(_bookList);

        for (var k = 0; k < _bookList_length; k++) {
          var _img = _bookList[k].bookCover + _quality
          // var img_tag = _bookList[k].lang === 'en' ? '<img class="vip" src="img/vip.png"/>': '';
          var img_tag
          if (_bookList[k].lang === 'en' && _bookList[k].isFree === 0) {
            img_tag = '<img class="vip" src="/img/tag-vip.png"/>'
          } else if (_bookList[k].isFree === 1) {
            img_tag = '<img class="vip" src="/img/tag-free.png"/>'
          } else {
            img_tag = '<img class="vip" src="/img/tag-member.png"/>'
          }

          buffdiv +=
            "<div id='j" +
            _bookList[k].bookId +
            "' data-free='" +
            _bookList[k].isFree +
            "' class='book'> " +
            img_tag +
            " <img class='bg_img' src='" +
            _img +
            "' /><p>" +
            _bookList[k].bookName +
            "</p><div class='book_shadow'>" +
            _span_ie8 +
            '</span></div></div>'
        }

        $('#m_list .content_huo').append(
          "<div class='groupDIV'>" + buffdiv + '</div>'
        )

        old_length += 1
        chinese_num_img += 1
        english_num_img += 1
        chinese_num_img = chinese_num_img > 8 ? 1 : chinese_num_img
        english_num_img = english_num_img > 16 ? 9 : english_num_img
        if (_length_list > old_length) {
          groupDataFor()
        } else {
          adjustmentHeightAndWidth(1)
          setNano()
          scroll_flag = true
        }
      } else {
        list_z(old_itemCode, old_itemSubCode, old_data.retInfo.pageIndex + 1)
      }
    }

    groupDataFor()
  }

  $('.header2 input').each(function() {
    $(this).click(function() {
      // && !pcorph()
      // if(this.id == "promotion" ){
      //   window.open('http://61reading.lenovo.com.cn/lenovo/prize-list.html?lenovoId='+
      //   sessionStorage.getItem('lenovoId') 
      //   + '&deviceid=' + sessionStorage.getItem('deviceid') 
      //   + '&token=' + sessionStorage.getItem('token'), '_self');
      // } else {
        list_f(this.id)
        var itemCode = this.id == 'english_l' ? 'english' : this.id,
          itemSubCode = $('.book_beader input:eq(0)').attr('id')
        if (!itemSubCode) {
          itemSubCode = ''
        }
        list_z(itemCode, itemSubCode)
      // }
    })
  })

  $('.header2 input + label').each(function() {
    $(this).click(function() {
      if (IE8) {
        $('._width').removeClass('_width')
        $('._height').removeClass('_height')
        $(this).addClass('_width')
        $('img', this).addClass('_height')

        $(this)
          .prev('input')
          .click()
        $('.book_beader label:eq(0)').addClass('_label_b')
      }
    })
  })

  $('.book_beader').click(function(e) {
    var target = e.target || e.srcElement
    if (target.nodeName.toLowerCase() == 'label') {
      if (IE8) {
        $('._label_b').removeClass('_label_b')
        $(target).addClass('_label_b')
        document.getElementById($(target).attr('for')).checked = true
      }
      list_s($(target).attr('for'))
    }
  })

  //搜索
  $('.header button').click(function() {
    var _search_text = $('.header input').val(),
      book_name = encodeURIComponent(_search_text)

    old_sh_val =
      'https://provider-joyreader.wawayaya.com/lenovo/search?userId=8394&word=' +
      book_name +
      '&pageIndex='
    $('#back').html('<button> < 返回</button>')

    searchAndMore(1, 2)
  })
  $("input[type='search']").keyup(function() {
    if (event.keyCode == 13) {
      $('.header button').click()
    }
  })

  function searchAndMore(_pageIndex, flag) {
    if (xhr) {
      xhr.abort()
    }

    if (flag) {
      sh_flag = flag
      $('#search_list .content_huo').html('')
      scroll_flag2 = false
    }

    xhr = $.ajax({
      type: 'GET',

      cache: false,

      url: old_sh_val + _pageIndex,

      dataType: 'jsonp', // 返回的数据类型，设置为JSONP方式
      jsonp: 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
      jsonpCallback: 'hahah', //设置回调函数名

      success: function(data) {
        old_sh_data = data

        //console.dir(data);

        var search_bookList =
            sh_flag == 2 ? data.retInfo.bookList : data.retInfo.list,
          _quality = imgQuality(323, 75, '')
        console.log(search_bookList)

        for (var i = 0; i < search_bookList.length; i++) {
          var img_tag
          if (
            search_bookList[i].lang === 'en' &&
            search_bookList[i].isFree === 0
          ) {
            img_tag = '<img class="vip" src="/img/tag-vip.png"/>'
          } else if (search_bookList[i].isFree === 1) {
            img_tag = '<img class="vip" src="/img/tag-free.png"/>'
          } else {
            img_tag = '<img class="vip" src="/img/tag-member.png"/>'
          }
          $('#search_list .content_huo').append(
            "<div id='j" +
              search_bookList[i].bookId +
              "' class='book'>" +
              img_tag +
              "<img class='bg_img' src='" +
              search_bookList[i].bookCover +
              _quality +
              "'/><p>" +
              search_bookList[i].bookName +
              "</p><div class='book_shadow'>" +
              _span_ie8 +
              '</div></div>'
          )
        }

        if ($('#search_list').is(':hidden')) {
          $('#m_list, .header2').hide()
          $('#search_list, #search_list .content_huo, #back').show()
        }

        adjustmentHeightAndWidth(2)

        if ($('#search_list .content_huo').html() == '') {
          $('#search_list .content_huo').html('<h1>抱歉没有搜索到相关书籍</h1>')
        }

        $('.nano2').nanoScroller()
        if (flag) {
          setTimeout(function() {
            $('.nano2').nanoScroller({ scroll: 'top' })
          }, 100)
        }
        scroll_flag2 = true
      },

      error: function(data) {}
    })
  }

  $('#back').click(function(e) {
    var target = e.target || e.srcElement
    if (target.nodeName.toLowerCase() == 'button') {
      $('#search_list, #search_list .content_huo, #back').hide()
      $('#m_list, .header2').show()
      $('.header input').val('')
      old_sh_data = null

      if (target.id == 'top_tab') {
        $("input[name='classification']:checked").click()
      } else if (target.name) {
        var itCode = old_itemCode == 'english_l' ? 'english' : old_itemCode
        list_f(old_itemCode, old_itemSubCode)
        list_z(itCode, old_itemSubCode)
      }

      setNano()
      $('.nano').nanoScroller({ scroll: 'top' })
    } else if (target.nodeName.toLowerCase() == 'span') {
      //alert(window.location);
    }
  })

  $('.content_huo').click(function(e) {
    var target = e.target || e.srcElement,
      checked_tab = $("input[name='classification2']:checked"),
      checked_tab_big_id = $("input[name='classification']:checked").attr('id'),
      checked_tab_text = checked_tab.nextAll('label').get(0)
        ? checked_tab.nextAll('label').get(0).innerText
        : '',
      classification_arr = {
        popular: '本周热门',
        english_l: '英文分级读物',
        chinese: '中文绘本故事',
        promotion: '推广专题'
      }

    // console.log(target.nodeName);

    if (target.nodeName.toLowerCase() == 'img') {
      var classification,
        classification2,
        bookname,
        _id = $(target)
          .parent()
          .attr('id'),
        isFree = Number(
          $(target)
            .parent()
            .attr('data-free')
        ),
        classification_text = classification_arr[checked_tab_big_id],
        classification2_text =
          encodeURIComponent(checked_tab_text) + '|' + checked_tab.attr('id')

      if ($('#search_list').is(':visible')) {
        if ($('#back button:eq(0)').text() == ' < 返回') {
          classification_text = $('.header input').val() + '搜索结果'
          classification2_text = ''
        } else {
          var _span_text
          $('#back span').each(function() {
            _span_text = $(this).text()
          })
          _span_text = _span_text.replace('&', '-a-n-d-')
          classification2_text +=
            '&classification3=' +
            _span_text +
            '|' +
            old_groupId +
            '|' +
            old_groupType
        }
      }

      classification =
        encodeURIComponent(classification_text) + '|' + checked_tab_big_id
      classification2 = classification2_text
      bookname = encodeURIComponent($('#' + _id + ' p:eq(0)').text())

      var book_info = {
        id: _id.replace('j', ''),
        name: bookname,
        class1: classification,
        class2: classification2,
        uid: userInfo.userId
      }
      // console.log(isFree);
      if (Number(isFree) === 0 && !isLogin()) {
        // shogMinLogin(book_info);
        // return;
      }
      window.open(
        host_prefix +
          '/innerPage?bookid=' +
          book_info.id +
          '&classification=' +
          classification +
          '&classification2=' +
          classification2 +
          '&bookname=' +
          bookname +
          '&wawayayauserId=' +
          userInfo.userId,
        '_self'
      )
    } else if (
      target.nodeName.toLowerCase() == 'a' ||
      target.nodeName.toLowerCase() == 'span'
    ) {
      console.log('target.nodeName = p / a/span')
      var _id = $(target).attr('groupId'),
        _name = $(target).attr('groupName'),
        _tab = classification_arr[checked_tab_big_id]

      old_sh_val =
        'https://provider-joyreader.wawayaya.com/lenovo/groupMoreBooks?userId=8394&groupId=' +
        _id +
        '&groupType=' +
        old_data.retInfo.groupType +
        '&pageIndex='
      ;(old_groupId = _id), (old_groupType = old_data.retInfo.groupType)

      if (checked_tab_text) {
        checked_tab_text =
          '<span> > </span><button> ' + checked_tab_text + '</button>'
      }

      $('#back').html(
        "<button id = 'top_tab'>" +
          _tab +
          '</button>' +
          checked_tab_text +
          '<span> > ' +
          _name +
          '</span>'
      )
      searchAndMore(1, 1)
      ah.Report('Click', 'BookGroup_' + _id, 'Click book group')
    }
  })
}

function imgQuality(_w, quality, url) {
  var wh = bodyWH(),
    w = wh.w,
    h = wh.h,
    _w_h = w > h ? w : h,
    dpi = window.devicePixelRatio,
    qualityAll = dpi > 1.5 ? 60 : 75

  if (IE8 || IE10) {
    dpi = (js_getDPI()[0] / 100).toFixed(1);
    qualityAll = dpi > 1.5 ? 60 : 75;
  }

  _w_h = _w_h * dpi

  var _width = parseInt(_w_h / 1550 * _w)

  //_width = _width > _w ? _width : _w;

  return url + '!/quality/' + qualityAll + '/fh/' + _width
}

function setNano() {
  $('.nano > .nano-content').css('overflow-x', 'hidden')
  $('.nano').nanoScroller()
  $('.nano2').nanoScroller()
  $('.nano-pane').css('z-index', '103')
  $('.nano-pane').css('padding-right', '4px')
}

$().ready(function() {
  setNano()
})

$(window).on('resize', function(event) {
  setNano()
})

window.onload = function() {
  document.onselectstart = disableselect
  var omitformtags = ['input', 'textarea'] // 设置可以的元素名称
  omitformtags = '|' + omitformtags.join('|') + '|'
  function disableselect() {
    if (event.srcElement.tagName === undefined) {
      return false;
    }
    // 判断是否是可选中的元素，不是的话就 return false
    if (
      omitformtags.indexOf(
        '|' + event.srcElement.tagName.toLowerCase() + '|'
      ) == -1
    ) {
      return false
    }
  }
  document.body.ondragstart = function() {
    return false
  }
}

adjustmentHeightAndWidth()

// 监听浏览器窗口变化
window.onresize = function() {
  setNano()
  adjustmentHeightAndWidth()
}

if (!IE8) {
  // 横屏竖屏变换触发函数
  window.addEventListener('orientationchange', function() {}, false)
}

/*
$(window).on('message', function (e) {
	var data = e.originalEvent.data;
	alert(data);
	if ((typeof data === 'string') && data.constructor === String) {
		if (data.startWith('refresh-')) { // token更新
			var token = data.slice('refresh-'.length, data.length)
			sessionStorage.setItem('token', token)
			getChoiceness();
			alert(token);
		}
	}
});

String.prototype.startWith = function (prefix) {
    return this.slice(0, prefix.length) === prefix
} 
*/
var STARTTIME = new Date().getTime()

// var scriptTag = document.createElement('script');
// scriptTag.type = 'text/javascript';
// scriptTag.async = true;
// scriptTag.src = "avatar.js";
// var head= document.getElementsByTagName('head')[0] || document.documentElement;
// head.insertBefore(scriptTag, head.firstChild);

// BIGDATA

function parser_Category(evt, target) {
  var msg = ah.buildMsg('_CLICK_', 'CLICK_ON_CATEGORY', 'Category clicked.', {
    categoryid: target.id
  })
  console.log(msg)
  return msg
}
Avatar.push([
  'register',
  document.getElementsByClassName('header2'),
  {
    selector: '_input',
    parser: parser_Category
  }
])

function parser_TopList(evt, target) {
  var msg = ah.buildMsg('_CLICK_', 'CLICK_ON_TOPLIST', 'Top list clicked.', {
    toplistid: target.id
  })
  return msg
}
Avatar.push([
  'register',
  document.getElementsByClassName('book_beader'),
  {
    selector: '_input',
    parser: parser_TopList
  }
])

function parser_Book(evt, target) {
  var msg = ah.buildMsg('_CLICK_', 'CLICK_ON_BOOK', 'Book clicked.', {
    bookid: target.id
  })
  console.log(msg)
  return msg
}
Avatar.push([
  'register',
  document.getElementsByClassName('book'),
  parser_Category
])

function parser_Search(evt, target) {
  var _search_text = $('.header input').val(),
    book_name = encodeURIComponent(_search_text)
  var msg = ah.buildMsg('_SEARCH_', 'SEARCH', 'Search.', {
    keyword: _search_text
  })
  console.log(msg)
  return msg
}
Avatar.push([
  'register',
  document.getElementsByClassName('header'),
  {
    selector: '_button',
    parser: parser_Search
  }
])

function parser_SearchResultBack(evt, target) {
  var _search_text = $('.header input').val(),
    book_name = encodeURIComponent(_search_text)
  var msg = ah.buildMsg(
    '_SEARCH_',
    'SEARCH_RESULTS_RETURN',
    'Search result returned.',
    { keyword: _search_text }
  )
  return msg
}
Avatar.push([
  'register',
  document.getElementById('back'),
  parser_SearchResultBack
])


/////////////////////////////////////////////
// Login dialog
function isLogin() {
  return false
}

// document.getElementById("btn_showlogin").onclick = shogMinLogin;
document.getElementById('close_minilogin').onclick = closeLogin
document.getElementById('firstLine').onmousedown = moveLogin

/* 显示登录窗口 */
function shogMinLogin(book_info) {
  console.log('shogMinLogin')
  var mini_login = document.getElementsByClassName('mini_login')[0]
  var cover = document.getElementsByClassName('cover')[0]
  mini_login.style.display = 'block'
  cover.style.display = 'block'
  // console.log('the top', document.body.scrollHeight,
  // 	mini_login.scrollHeight,
  // 	Number(document.body.style.height),
  // 	document.body.clientHeight
  // );
  mini_login.style.left =
    (document.body.scrollWidth - mini_login.scrollWidth) / 2 + 'px'
  mini_login.style.top =
    (document.body.clientHeight - mini_login.scrollHeight) / 2 + 'px'
  // 用户提交表单
  $('#mini_login .btn_login').click(function(e) {
    console.log(book_info)
    console.log(e)
    mini_login.style.display = 'none'
    cover.style.display = 'none'
    window.open(
      host_prefix +
        '/innerPage?bookid=' +
        book_info.id +
        '&classification=' +
        book_info.class1 +
        '&classification2=' +
        book_info.class2 +
        '&bookname=' +
        book_info.name +
        '&wawayayauserId=' +
        book_info.uid,
      '_self'
    )
  })
}

/* 关闭登录窗口 */
function closeLogin() {
  var mini_login = document.getElementsByClassName('mini_login')[0]
  var cover = document.getElementsByClassName('cover')[0]
  mini_login.style.display = 'none'
  cover.style.display = 'none'
}

/* 移动登录窗口 */
function moveLogin(event) {
  var moveable = true

  //获取事件源
  event = event ? event : window.event
  var clientX = event.clientX
  var clientY = event.clientY

  var mini_login = document.getElementById('mini_login')
  // console.log(mini_login);
  var top = parseInt(mini_login.style.top)
  var left = parseInt(mini_login.style.left) //鼠标拖动
  document.onmousemove = function(event) {
    if (moveable) {
      event = event ? event : window.event
      var y = top + event.clientY - clientY
      var x = left + event.clientX - clientX
      if (x > 0 && y > 0) {
        mini_login.style.top = y + 'px'
        // mini_login.style.top = "px";
        mini_login.style.left = x + 'px'
      }
    }
  }
  //鼠标弹起
  document.onmouseup = function() {
    moveable = false
  }
}
// End Login
/////////////////////////////////////////////


// BIGDATA
if (getQueryStringRegExp('ch')) {
  ah.Report('_VISIT_', 'VISIT_MAIN_PAGE CH=' + getQueryStringRegExp('ch'), 'Visit Wawayaya main page')
}
else {
  ah.Report('_VISIT_', 'VISIT_MAIN_PAGE', 'Visit Wawayaya main page')
}