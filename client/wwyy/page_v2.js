"use strict";
// Define
var BookApp = BookApp || {};

// IE8兼容获取dpi的值
function js_getDPI() {
  var arrDPI = new Array();
  if (window.screen.deviceXDPI != undefined) {
      arrDPI[0] = window.screen.deviceXDPI;
      arrDPI[1] = window.screen.deviceYDPI;
  }
  else {
      var tmpNode = document.createElement("DIV");
      tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
      document.body.appendChild(tmpNode);
      arrDPI[0] = parseInt(tmpNode.offsetWidth);
      arrDPI[1] = parseInt(tmpNode.offsetHeight);
      tmpNode.parentNode.removeChild(tmpNode);
  }
  return arrDPI;
}

// Create sub obj
BookApp.namespace = function (ns_string) {
  var parts = ns_string.split('.'),
    parent = BookApp,
    len,
    i;

  //剥离最前面的冗余全局变量
  if (parts[0] === 'BookApp') {
    parts = parts.slice(1);
  }
  for (i = 0, len = parts.length; i < len; i += 1) {
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
};
BookApp.namespace('BookApp.util.page');
BookApp.namespace('BookApp.util.dom');
BookApp.namespace('BookApp.util.player');
// BookApp.namespace('BookApp.util.cacheManager');

BookApp.util.player = (function () {
  var banben = navigator.appVersion.split(";"),
    // Is ie8 ?
    IE8 = navigator.appName == "Microsoft Internet Explorer" &&
      banben[1].replace(/[ ]/g, "") == "MSIE8.0",
    playIndex = 0,
    // audio list
    playList = [],
    doc = window.document,
    audio_ele = doc.getElementById('audio_play'),
    // audio_wrapper = audio_ele.parentNode,
    wmplay = doc.WMPlay,
    // playing = false,
    // waiting = false,
    event = {
      ready: (function () {
        return function (fn) {
          var win = window,
            done = false,
            top = true,
            doc = win.document,
            root = doc.documentElement,
            add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
            rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
            pre = doc.addEventListener ? '' : 'on',
            init = function (e) {
              console.log('ready ', e);
              if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
              (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
              if (!done && (done = true)) fn.call(win, e.type || e);
            },
            poll = function () {
              console.log('poll');
              try {
                root.doScroll('left');
              } catch (e) {
                setTimeout(poll, 50);
                return;
              }
              init('poll');
            };
          if (doc.readyState == 'complete') fn.call(win, 'lazy');
          else {
            if (doc.createEventObject && root.doScroll) {
              try {
                top = !win.frameElement;
              } catch (e) { }
              if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
          }
        }
      })(),
      addHandler: function (element, type, handler) {
        if (element.addEventListener) {  // DOM2
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) { // ie
            element.attachEvent("on" + type, handler);
        } else {    // DOM0
            element["on" + type] = handler;
        }
      }
    },
    // Construct ?
    MusicPlay = function () {
      // Global paused ?
      this.is_paused = false;

      this.page_flip_timer = 0;

      this.timer = 0;

      this.timer_lock = false;

      this.timer_ed = 0;

      if (typeof MusicPlay.instance === "object") {
        return MusicPlay.instance;
      };
      // cache
      MusicPlay.instance = this;
    };

  MusicPlay.prototype = {
    play: function () {
      if (IE8) {
        console.log('play state : ', wmplay.PlayState);
        wmplay.Play(); //播放
      } else {
        audio_ele.autoplay = true;
        // console.log(audio_ele, audio_ele.autoplay);

        var promise = audio_ele.play();
        // console.log(promise);
        if (promise && promise !== undefined ) {
          promise.then(function(){
            // Auto-play
            // console.log(audio_ele.paused,
            //   'page-index', BookApp.util.page.options.current_page.index);
            if (audio_ele.paused) {
              MusicPlay.instance.is_paused = true;
              MusicPlay.instance.setIcon();
            }
          });
          // .catch(function(error) {
          //   console.log('play() => error');
          // })
        }
        else {
          if (audio_ele.paused) {
            MusicPlay.instance.is_paused = true;
            MusicPlay.instance.setIcon();
          }
        }
      }
    },
    pause: function () {
      if (IE8) {
        wmplay.Pause();
        //暂停
      } else {
        audio_ele.pause();
        // this.is_paused = true;
      }
    },
    canPlay: function() {
      if (!MusicPlay.instance.is_paused) {
        MusicPlay.instance.play();
        // safari
        if (audio_ele.paused === true) {
          MusicPlay.instance.is_paused = true;
        }
      }
    },
    playlistTraversal: function (voices, reset, timer) {
      // console.log('playlistTraversal',voices);
      // 计时器
      if (timer) this.timer = timer;
      if (reset) {
        // console.log('is reset .....');
        playIndex = 0;
        this.timer_lock = false;
        if (this.timer_ed) {
          clearTimeout(this.timer_ed);
        }
      }
      playList = voices;
      var this_play_obj = playList[playIndex];

      if (IE8) {
        wmplay.Filename = playList[playIndex];
        event.ready(function (e) {
          console.log('audio play =======', e);
          MusicPlay.instance.play();
        });
      } else {
        audio_ele.src = this_play_obj.mp3;
        audio_ele.load(); // reload ?
        if (audio_ele.autoplay === false ) {
          audio_ele.autoplay = true;
        }
        this.pause();
      }

      if (this_play_obj.bg !== null && playIndex === 0) {
        // console.log('if this_play_obj.bg != null');
        var timer_bg,
        timer_ed,
        step_start = function () {
          // console.log('currentTime', audio_ele.currentTime,
          // 'this_play_obj.bg', this_play_obj.bg / 1000,
          // 'playIndex', playIndex,
          // 'len', playList.length,
          // audio_ele.readyState < 3);

          if (timer_bg) {
            clearTimeout(timer_bg);
          }
          if (playIndex !== 0) {
            return;
          }
          if (audio_ele.readyState < 4) {
            timer_bg = setTimeout(step_start, 15);
          } else {
            audio_ele.currentTime = this_play_obj.bg / 1000;
            MusicPlay.instance.canPlay();

            if (this_play_obj.ed !== null && playIndex === playList.length - 1) {
              // console.log('if  end ...',
              //   this_play_obj.ed !== null && playIndex === playList.length - 1);
              // timer_ed = setTimeout(step_end, 100);
            }

          }
        };
        timer_bg = setTimeout(step_start, 15);

        var step_end = function() {
          console.log('if  step_end ... ', audio_ele.currentTime , this_play_obj.ed / 1000);

          if (timer_ed) {
            clearTimeout(timer_ed);
          }
          if (playIndex !== playList.length - 1) {
            return;
          }

          if (audio_ele.readyState < 3
            || audio_ele.currentTime < (this_play_obj.ed / 1000)) {
            timer_ed = setTimeout(step_end, 100);
          } else {
            audio_ele.currentTime = audio_ele.duration;
          }

        }


      }
      //
      else if (this_play_obj.ed !== null && playIndex === playList.length - 1) {
        // console.log('else if....playIndex === playList.length');
        // console.log('currentTime', audio_ele.currentTime,
        //   'this_play_obj.ed', this_play_obj.ed / 1000,
        //   'playIndex', playIndex,
        //   'len', playList.length,
        //   audio_ele.readyState < 3,
        //   audio_ele.currentTime < (this_play_obj.ed / 1000));

        var step_end = function () {
          if (this.timer_ed) {
            clearTimeout(this.timer_ed);
          }

          if (playIndex !== playList.length - 1) {
            return;
          }

          if (audio_ele.readyState < 3
            || audio_ele.currentTime < (this_play_obj.ed / 1000)) {
            this.timer_ed = setTimeout(step_end, 100);
          } else {
            audio_ele.currentTime = audio_ele.duration;
          }
        };
        this.timer_ed = setTimeout(step_end, 100);
        MusicPlay.instance.canPlay();
      }
      else {
        this.canPlay();
      }

      // console.log('currentTime', audio_ele.currentTime,
      // 'duration', audio_ele.duration,
      // 'playList: ', playList,
      // 'playList.length', playList.length,
      // 'this_play_obj： ', this_play_obj,
      // 'index', playIndex,
      // 'readState', audio_ele.readyState,
      //   'audio_ele', audio_ele.paused,
      //   this.is_paused
      // );

      this.setIcon();
    },

    playToggle: function () {
      // console.log('currentTime', audio_ele.currentTime,
      // 'duration', audio_ele.duration,
      // 'readState', audio_ele.readyState);

      // var is_play = true;
      if (IE8) {
        var state = wmplay.PlayState;
        if (state === 2) {
          this.pause();
          // is_play = false;
          // BIGDATA
          ah.Report('_CLICK_', 'AUDIO_PAUSE', 'Play/Pause button.[IE]', {
            bookid: getQueryString('bookid'),
            bookname: getQueryString('bookname')
          });
        } else {
          this.play();
          // BIGDATA
          ah.Report('_CLICK_', 'AUDIO_PLAY', 'Play/Pause button.[IE]', {
            bookid: getQueryString('bookid'),
            bookname: getQueryString('bookname')
          });
        }
      } else { // h5
        // console.log('audio_ele.paused', audio_ele.paused,
        //   'timer_lock', this.timer_lock,
        //   'is_paused', this.is_paused );

        // 停止状态
        if (audio_ele.paused && this.is_paused && !this.timer_lock) {
          MusicPlay.instance.play();
          this.is_paused = false;
          // BIGDATA
          ah.Report('_CLICK_', 'AUDIO_PLAY', 'Play/Pause button.[H5]', {
            bookid: getQueryString('bookid'),
            bookname: getQueryString('bookname')
          });
        }
        // 播放状态 && 计时锁 && 全局暂停
        else if (this.timer_lock && !this.is_paused) {
          // console.log('this. paused', this.page_flip_timer);
          // this.page_flip_timer();
          if (this.page_flip_timer) {
            clearTimeout(this.page_flip_timer);
          }
          this.is_paused = true;
          // BIGDATA
          ah.Report('_CLICK_', 'AUDIO_PAUSE', 'Play/Pause button.[H5]', {
            bookid: getQueryString('bookid'),
            bookname: getQueryString('bookname')
          });
        }
        // 暂停状态 && 计时锁 && 全局暂停
        else if (this.timer_lock && this.is_paused) {
          // console.log('this. play ', this.page_flip_timer);
          this.is_paused = false;
          this.timer_lock = false;
          $('#next_page').click();
        }
        else {
          // console.log('is playing ..');
          // MusicPlay.instance.pause();
          audio_ele.pause();
          // is_play = false;
          this.is_paused = true;
        }
      }
      this.setIcon();
    },
    setIcon: function () {
      if (this.is_paused) {
        $('#play_btn').attr('src', 'static/img/wawayaya-play.png');
      } else {
        $('#play_btn').attr('src', 'static/img/wawayaya-pause.png');
      }
    },
    nextPageTimer: function () {
      this.nextPageTimerClear();
      // console.log('timer_lock', this.timer_lock);
      this.timer_lock = true;
      this.page_flip_timer = setTimeout(function () {
        this.timer = 0;
        // this.timer_lock = false;
        $('#next_page').click();
      }, this.timer);
    },
    nextPageTimerClear: function() {
      if (this.page_flip_timer) {
        clearTimeout(this.page_flip_timer);
      }
    }
  };

  // 播放结束事件
  event.addHandler(audio_ele, 'ended', function() {
    playIndex++;
    var audioUri = playList[playIndex];
    // console.log('playList.length', playList.length,
    // 'playIndex', playIndex,
    // 'audioUri', audioUri);
    if (audioUri === undefined) {
      playIndex = 0;
      // 无计时器
      if (MusicPlay.instance.timer === 0) {
        $('#next_page').click();
      } else {
        MusicPlay.instance.nextPageTimer();
      }
    } else {
      // console.log('audio_ele.onended..........');
      MusicPlay.instance.playlistTraversal(playList, false);
    }
    // console.log('next:', document.WMPlay.Filename, audioUri);
  });

  // 添加空格事件 播放/暂停
  event.addHandler(doc, "keydown", function (event) {
    // console.log(event.type,event.keyCode,event);
    if (typeof event.keyCode === 'number'
      && (event.keyCode === 32 || event.keyCode === 0)) {
      MusicPlay.instance.playToggle();
    }
  });
  return MusicPlay;
}());

var player = new BookApp.util.player();

BookApp.util.dom = (function () {
  var options = {
    previewList: {},
    thumb_start: 0,
    thumb_end: 9,
    thumb_page_height: 0,
    thumb_timeout: 0,
    wrap_btn: null,
    wrap_back_btn: null,
    wrap_previous: null,
    wrap_next: null,
    page_number: null,
    // host_prefix: '/wawayaya'
    host_prefix: '.'
  },
    doc = document,
    // 获取页面的名字 page / content / cover...
    getPageName = function (url, type) {

      var regStr = "";
      switch (type) {
        case 1:
          regStr = "page[0-9]*";
          break;
        case 2:
          regStr = "content[0-9]*";
          break;
        case 3:
          regStr = "cover[0-9]*";
          break;
        case 4:
          regStr = "backcover[0-9]*";
          break;
        case 5:
          regStr = "supplement[0-9]*";
          break;
        default:
          break;
      }
      var reg = new RegExp(regStr);
      return reg.exec(url); //不存在返回null
    },
    //设置 tab
    setBreadCrumb = function (args) {

      var nav_str = '',
        token_str = '';

      var itC = args["classification"] ?
        args["classification"].split("|") : null;

      var lang = args['lang'] ? args['lang'].split("|") : null;
      var age = args["age"] ? args["age"].split("|") : null;
      var theme = args["theme"] ? args["theme"].split("|") : null;

      console.log('args: ', args);
      // console.log(args, itC2);
      if (args['token']) {
        token_str = '?token=' + args['token']
      }

      if (itC && itC[1]) {
        nav_str += '<a class="" href="' + options.host_prefix + '/'+token_str+'#/'
          + args['route']
          + '">'+ itC[0] +' &gt;  </a> ';
      }

      if (lang && lang[1]) {
        nav_str += '<a class="" href="' + options.host_prefix + '/'+token_str+'#/'
          + args['route'] + '/lang=' + lang[1] + '&langName=' + lang[0]
          + '">'
          + lang[0] +' &gt;  </a> ';
      }
      if (age && age[1]) {
        nav_str += '<a class="" href="' + options.host_prefix + '/'+token_str+'#/'
          + args['route'] + '/age=' + age[1] + '&ageName=' + age[0]
          + '">'
          + age[0] +' &gt;  </a> ';
      }
      if (theme && theme[1]) {
        nav_str += '<a class="" href="' + options.host_prefix + '/'+token_str+'#/'
          + args['route'] + '/theme=' + theme[1] + '&themeName=' + theme[0]
          + '">'
          + theme[0] +' &gt;  </a> ';
      }

      if (args["bookname"]) {
        nav_str += '<a href="#" class="title"> '+ args["bookname"] +'</a>'
      }

      $('#nav_link').append(nav_str);
    },
    backHome = function (args) {
      // var len = 2,
      // nav_str = '',
      // token = args.token ? '&token=' + args.token : '',
      var url_str = options.host_prefix;
      var lang = args['lang'] ? args['lang'].split("|") : null;
      var age = args["age"] ? args["age"].split("|") : null;
      var theme = args["theme"] ? args["theme"].split("|") : null;

      if (args['route'] === 'home') {
        url_str += '/?1=1'
      } else {
        url_str += '/#/' + args['route']
      }

      if (lang && lang[1]) {
        url_str += '/lang=' + lang[1]
        url_str += '&langName=' + lang[0]
      }
      if (age && age[1]) {
        url_str += '&age=' + age[1]
        url_str += '&ageName=' + age[0]
      }
      if (theme && theme[1]) {
        url_str += '&theme=' + theme[1]
        url_str += '&themeName=' + theme[0]
      }
      if (args['token']) {
        // console.log(url_str, args.route, args['route']);
        url_str += '&token=' + args['token'];
      }

      // console.log(args, url_str);
      window.open(url_str, '_self');
    },
    // 返回 location 参数
    getQueryStringArgs = function () {
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
        if (name.length) {
          args[name] = value;
        }
      }
      return args;
    },
    showPage = function () {
      $('#bg_content, #play_btn').show();
      $('#loading').hide();
    },
    showThumb = function () {
      $('#thumb').show();
      hideThumbInTime(); // hide 4s
    },
    hidePage = function () {
      $('#bg_content, #thumb, #playBtn').hide();
      $('#loading').show();
    },
    // 屏幕宽度, 是否点到 左/右翻页?
    isInDirectionZone = function (pos) {
      // console.log(pos);
      var sult = "";
      // var cw = document.documentElement.clientWidth || document.body.clientWidth;
      var cw = $(window).width();
      var defaultV = cw * 0.05; // 方向默认宽度为5%
      var leftX = defaultV;
      var rightX = cw - defaultV;
      if (pos.x <= leftX) {
        sult = "left";
      } else if (pos.x >= rightX) {
        sult = "right";
      }
      return {
        'dir': sult
      };
    },
    // bind event => 给preview区域绑定事件
    bindPreviewEvent = function () {
      $('#bg_content').click(function (e) {
        console.log('#bg_content click');
        // 需要计算一下位置，如果点击的区域的方向区域，那么执行点击
        var sult = isInDirectionZone({
          'x': e.clientX
        });

        if (sult && sult.dir != "") {
          if (sult.dir == "left") {
            $('#previous_page').click();
          } else if (sult.dir == "right") {
            $('#next_page').click();
          }
        } else {
          // console.log( $('#dictionary').is(':visible') );
          // var is = $('#thumb').is(':hidden');

          if ($('#thumb').is(':hidden') && $('#dictionary').is(':hidden')) {
            $('#thumb').show();
            resetThumb();
            hideThumbInTime();
          }
          else if ($('#dictionary').is(':visible')) {
            $('#dictionary .dict_wrap_cn ul').empty(); // 解释
            $('#dictionary .dict_spell p').empty(); // 音标
            $('#dictionary').hide();
          }
          else {
            $('#thumb').hide();
          }
        }
      });
    },
    // 间隔4秒后如果thumb还在show，则自动隐藏
    hideThumbInTime = function () {
      // console.log('hideThumbInTime');
      if (options.thumb_timeout)
        clearTimeout(options.thumb_timeout);

      options.thumb_timeout = setTimeout(function () {
        // console.log(player.is_paused);
        if ($('#thumb').is(':visible') && !player.is_paused) {
          $('#thumb').fadeOut();
        } else {
          hideThumbInTime();
        }
      }, 4000);
    },
    // private,
    searchName = function (uri) {
      if (uri != undefined) {
        var pageName = uri.substring(uri.lastIndexOf('/') + 1,
          uri.lastIndexOf('.'));
        return pageName;
      }
      return "";
    },
    // private
    getPreviewIndex = function (pageName, index, is_en) {
      var indexName = '';
      //返回缩略图下表名字
      if (pageName.indexOf("backcover") != -1) {
        if (is_en) {
          indexName = "backcover";
        } else {
          indexName = "封底";
        }
      } else if (pageName.indexOf("cover") != -1) {
        if (is_en) {
          indexName = "cover";
        } else {
          indexName = "封面";
        }
      } else {
        // console.log(startIndex);
        indexName = index;
      }
      return indexName;
    },
    getPreLeftEle = function () {
      if (!options.wrap_pre_left) {
        options.wrap_pre_left = doc.getElementById("pre_left");
      }
      return options.wrap_pre_left;
    },
    getPreRightEle = function () {
      if (!options.wrap_pre_right) {
        options.wrap_pre_right = doc.getElementById("pre_right");
      }
      return options.wrap_pre_right;
    },
    lessLenThumb = function (allPrevsIndex, index) {
      var newPrevs = [],
        len = allPrevsIndex.length,
        index,
        loop_7 = 0,
        real_idx = 0,
        pre_left_btn,
        pre_right_btn;

      var begin = index < 3 ? 3 - index : 0;
      real_idx = index < 3 ? real_idx : index - 3;

      do {
        if (loop_7 >= begin && allPrevsIndex[real_idx] !== undefined) {
          newPrevs.push(allPrevsIndex[real_idx]);
          real_idx++;
        }
        else {
          newPrevs.push(null);
        }
        loop_7++;
      } while (loop_7 < 7);

      // Set left/right button style ?
      pre_left_btn = getPreLeftEle();
      pre_right_btn = getPreRightEle();

      if (newPrevs[0] === null || newPrevs[0].index === 0) {
        pre_left_btn.style.display = 'none';
      } else {
        pre_left_btn.style.display = 'block';
      }
      if (newPrevs[6] === null || newPrevs[6].index === len - 1) {
        pre_right_btn.style.display = 'none';
      } else {
        pre_right_btn.style.display = 'block';
      }

      return newPrevs;
    },
    centerCurrentThumbNail = function (pIndex, previewList, host) {
      //先获取当前播放的元素index，该页对应缩略图居中  [index-4,index+5]
      // var preview_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      // var pIndex = +$('#wordPageContent').attr('data-index')
      // console.log('centerCurrentThumbNail', pIndex);
      var index = +pIndex,
        previewsIndex = []; // preview下标显示的索引值
      var newPrevs = [], // thumbnail缩略图排序
        beginPrevs,
        endPrevs,
        frontArr = [],
        endArr = [],
        endPos = 0; // 取尾部元素开始位置,暂时设置显示9个元素，然后当前元素居中

      var allPrevsIndex = BookApp.util.page.getPreviewDisplayIndex(), //所有的页的索引值
        len = allPrevsIndex.length,
        begin = 0, // 开始索引值
        end = 0, // 结束索引值
        one = [],
        another = [];

      // 如果缩略图总数小于等于7
      if (len < 7) {
        newPrevs = lessLenThumb(allPrevsIndex, index);
      }
      else if (index < 3) {
        begin = len - (3 - index);
        end = 4 + index;
        //下标索引值
        beginPrevs = allPrevsIndex.slice(begin);  // 从尾部截取的元素放在前边
        endPrevs = allPrevsIndex.slice(0, end + 1);
        newPrevs = beginPrevs.concat(endPrevs);

      } else {
        // 取的最后一个元素位置超过最后一个元素，那么从 preview_list 头部截取
        var endPos = index + 4;

        if (endPos <= len) {
          begin = index - 3;
          end = endPos;
          newPrevs = allPrevsIndex.slice(begin, end);
        } else { //超出len,取开头元素，补到尾部
          begin = index - 3;
          end = endPos - len;

          beginPrevs = allPrevsIndex.slice(begin); // 这个是src资源
          endArr = allPrevsIndex.slice(0, end);
          newPrevs = beginPrevs.concat(endArr);
        };
      }

      //保存缩略图的起始位置
      options.thumb_start = begin;
      options.thumb_end = end;

      // console.log(newPrevs,
      //   'thumb_start',  options.thumb_start,
      //   'thumb_end', options.thumb_end,
      //   'index', index,
      //   'newPrevs', newPrevs,
      //   'len', len);

      //存储尾部索引
      setPrevSrc(newPrevs);
      setActivePreviewBgColor('#6f6f6f', '#458aff', index);
    },
    setActivePreviewBgColor = function (bgColor, fontColor, index) {
      var index = index === undefined ? 3 : index;

      // console.log(index, $('#thumb_img #'+index) );

      // $('#thumb_img .previews .page').css({
      //   'background': '#5e64a0'
      // });

      $('#thumb_img .previews .page span').css({
        'color': bgColor
      });

      // $('#thumb_img #idx_' + index + ' .page').css({
      //   'background': bgColor
      // });
      $('#thumb_img #idx_' + index + ' .page span').css({
        'color': fontColor
      });
    },
    setPrevSrc = function (newPrevs) {
      var thumbnails = $('#thumb_img .previews'),
        els = $('#thumb_img .previews .page img'),
        prvsName = $('#thumb_img .previews .page span'),
        prvsPages = $('#thumb_img .previews .page');
      for (var i = 0, len = newPrevs.length; i < len; i++) {
        if (newPrevs[i] === null) {
          thumbnails[i].style.visibility = 'hidden';
          continue;
        }
        else {
          $(els[i]).attr('src', newPrevs[i].src);
          // thumbnails[i].css({'visibility':'visible'});
          if (thumbnails[i])
            thumbnails[i].style.visibility = 'visible';

          $(thumbnails[i]).attr('id', 'idx_' + newPrevs[i].index);
          $(prvsPages[i]).attr('data-index', newPrevs[i].index);
          $(prvsName[i]).text(newPrevs[i].prevIndex);
        }
      }
    },
    // 循环滚动缩略图
    animateThumbs = function (dir, previewList, host, index) {

      // reset timeout
      hideThumbInTime();
      var index = index === undefined ? 3 : index;

      var moveLen = 3,
        allPrevsIndex = BookApp.util.page.getPreviewDisplayIndex(),
        len = allPrevsIndex.length;

      var begin = options.thumb_start;
      var end = options.thumb_end,
        newPrevs = []; //存储缩略图资源

      var beginArr = [],
        endArr = [];
      if (dir === "right") {
        begin = (begin + moveLen) % len;
        end = (end + moveLen) % len;
        // console.log(begin + moveLen, (begin + moveLen) % len)
      } else if (dir === "left") {
        begin = ((begin - moveLen) + len) % len;
        end = ((end - moveLen) + len) % len;
      } else {
        return;
      }

      if (begin >= end) { // 说明是有补位, 需要从尾部截取补全到头部 如[22,6]
        beginArr = allPrevsIndex.slice(begin, len);
        endArr = allPrevsIndex.slice(0, end);
        newPrevs = beginArr.concat(endArr);
      } else {
        newPrevs = allPrevsIndex.slice(begin, end);
      }
      options.thumb_start = begin;
      options.thumb_end = end;

      if (len < 7) {
        var temp_index = dir === "right"
          ? len - 3 - 1 : 3;
        newPrevs = lessLenThumb(allPrevsIndex, temp_index);
      }

      // console.log('begin', begin,
      // 'end', end,
      // 'len', len,
      // 'thumb_start', options.thumb_start,
      // 'thumb-end', options.thumb_end,
      // newPrevs);

      setPrevSrc(newPrevs);
      setActivePreviewBgColor('#6f6f6f', '#458aff', index);
      // setActivePreviewBgColor('rgb(94, 100, 160)', '#fff', index);
    },
    // 返回最合适比例的图片
    // @_W: 当前图片高度 ？
    // @quality:图片质量; normal:60,
    // @ ''
    imgQuality = function (_w, quality, url) {
      var h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

      var dpi = window.devicePixelRatio,
          banben = navigator.appVersion.split(";"),
          IE8 = navigator.appName == "Microsoft Internet Explorer" && banben[1].replace(/[ ]/g, "") == "MSIE8.0" ||
          banben[1].replace(/[ ]/g, "") == "MSIE9.0" || banben[1].replace(/[ ]/g, "") == "MSIE10.0";

      if(IE8) {
        dpi = (js_getDPI()[0]/100).toFixed(1);
      }

      quality = dpi > 1.5 ? 60 : 75;

      return url + "!/quality/" + quality + "/fh/" + h * dpi;
    },
    addHandler = function (element, event_type, func) {
      if (element.addEventListener) { //DOM2
        element.addEventListener(event_type, func, false);
      } else if (element.attachEvent) { //ie
        element.attachEvent("on" + event_type, func);
      } else { //DOM0
        element["on" + event_type] = func;
      }
    },
    // 适配 thumb_img
    resetThumb = function () {
      var thumb = doc.getElementById('thumb_img'),
        thumb_imgs = thumb.getElementsByTagName('img'),
        this_height,
        page_img = thumb_imgs[3].parentNode;
      // No <img>
      if (!thumb_imgs[3] && !thumb) {
        console.log('No thumb_imgs <img> and #thumb');
        return;
      }
      // display:none => from cache
      if (page_img.clientHeight === 0) {
        this_height = (options.thumb_page_height + 10).toString() + 'px';
      }
      // Has height
      else {
        options.thumb_page_height = page_img.clientHeight;
        this_height = (page_img.clientHeight + 10).toString() + 'px';
      }
      // reset
      thumb.style.height = this_height;
      thumb.style.minHeight = this_height;
      // for ie
      if (thumb.currentStyle) {
        doc.getElementById('thumb').style.height = this_height;
      }
      // console.log('thumb style', thumb.style.cssText);
      return;
    },
    // 词
    resetDictionary = function(pageWrap, ww, wh) {
      // console.log(pageWrap);
      var height,
        width,
        top,
        left,
        dict_title_h,
        dict_box_h,
        dict_menu_h;

      // 弹窗尺寸边距
      height = pageWrap.height * 0.8;
      width = height * 0.7;
      left = (ww - pageWrap.width + pageWrap.width - width) / 2;
      top =  (pageWrap.height - height) / 2 + pageWrap.top;
      // console.log(width, height, top, left);
      $('#dictionary').css({
        "height": height,
        "width": width,
        "left": left,
        "top": top
      });

      dict_title_h = $('#dict_title').outerHeight();
      // console.log(dict_title_h);
      dict_box_h = height - dict_title_h
      $('#dict_box').css({
        // #dictionary - title - dictionary.border-radius(10px)
        'height': dict_box_h
      });

      dict_menu_h = $('#dict_box .dict_menu').outerHeight()
      // console.log(dict_title_h, dict_menu_h);
      $('#dict_box .dict_wrap').css({
        'height': dict_box_h - dict_menu_h
      });
    },
    // Hide #word_page_content
    setWordPageContent = function (index, value) {
      var wordPage = doc.getElementById('word_page_content_' + index);
      wordPage.style.zIndex = Number(index) + value;
    },
    setPageNumber = function (index, sum) {
      options.page_number = getPageNumber();
      // console.log(options.page_number.innerHTML);
      options.page_number.innerHTML = index + '/' + sum;
    },
    getPageNumber = function () {
      if (!options.page_number) {
        options.page_number = doc.getElementById("page_number");
      }
      return options.page_number;
    },
    getWrapPlayEle = function () {
      if (!options.wrap_btn) {
        options.wrap_btn = doc.getElementById("wrap_play_btn");
      }
      return options.wrap_btn;
    },
    // wrap_back_btn
    getWrapBackEle = function () {
      if (!options.wrap_back_btn) {
        options.wrap_back_btn = doc.getElementById("wrap-back-btn");
      }
      return options.wrap_back_btn;
    },
    playBtnReset = function (page_wrap, body_width) {
      // console.log(page_wrap, body_width);
      var margin = (body_width - page_wrap.width) / 2,
        // width = 0,
        nav_link = $('#nav_link'),
        padding_height = Number(nav_link.css('padding-top').slice(0, -2))
          + Number(nav_link.css('padding-bottom').slice(0, -2)),
        navHeight = nav_link.height();

      options.wrap_btn = getWrapPlayEle();
      options.wrap_back_btn = getWrapBackEle();
      options.wrap_next = getWrapNextEle();

      // console.log(isNaN(page_wrap.top), parseInt(page_wrap.top),
      //  navHeight, padding_height );
      page_wrap.top = isNaN(page_wrap.top) ? 0 :page_wrap.top;
      // navHeight +
      options.wrap_btn.style.top = (page_wrap.top + padding_height) + 'px';
      options.wrap_btn.style.right = margin + 'px';
      options.wrap_btn.style.width = options.wrap_next.clientWidth + 'px';
      // navHeight +
      options.wrap_back_btn.style.top = (page_wrap.top +  padding_height) + 'px';
      // options.wrap_back_btn.style.left = margin + 'px';

      if (!options.wrap_back_btn.style.width) {
        options.wrap_back_btn.style.width = (options.wrap_next.clientWidth * 1.8) + 'px';
      }

      return {
        top:  page_wrap.top + navHeight + padding_height,
        right: margin,
        width: options.wrap_btn.clientWidth,
        height: options.wrap_btn.clientHeight
      };
    },
    playBtnShow = function () {
      // console.log('playBtnShow');
      options.wrap_btn = getWrapPlayEle();
      options.wrap_btn.style.display = 'block';
      options.wrap_back_btn = getWrapBackEle();
      options.wrap_back_btn.style.display = 'block';
    },
    backBtnShow = function () {
      options.wrap_back_btn = getWrapBackEle();
      options.wrap_back_btn.style.display = 'block';
    },
    playBtnHide = function () {
      // console.log('playBtnHide');
      options.wrap_btn = getWrapPlayEle();
      options.wrap_btn.style.display = 'none';
      // options.wrap_back_btn = getWrapBackEle();
      // options.wrap_back_btn.style.display = 'none';
    },
    getWrapPreviousEle = function () {
      if (!options.wrap_previous) {
        options.wrap_previous = doc.getElementById("previous_page");
      }
      return options.wrap_previous;
    },
    getWrapNextEle = function () {
      if (!options.wrap_next) {
        options.wrap_next = doc.getElementById("next_page");
      }
      return options.wrap_next;
    },
    previousPageHide = function () {
      options.wrap_previous = getWrapPreviousEle();
      options.wrap_previous.style.display = 'none';
    },
    nextPageHide = function () {
      options.wrap_next = getWrapNextEle();
      options.wrap_next.style.display = 'none';
    },
    resetPreviousNextEle = function (height, top) {
      options.wrap_previous = getWrapPreviousEle();
      options.wrap_next = getWrapNextEle();
      var width = (options.wrap_next.clientWidth || options.wrap_previous.clientWidth) + 12;
      // width * 2 :播放按钮宽度
      options.wrap_previous.style.height = height - width * 2 + 'px';
      options.wrap_previous.style.top = top + width + 'px';
      options.wrap_next.style.height = height - width * 2  + 'px';
      options.wrap_next.style.top = top + width + 'px';
    },
    flipPageBtnShow = function () {
      backBtnShow();
      options.wrap_previous = getWrapPreviousEle();
      if (options.wrap_previous.style.display === 'none')
        options.wrap_previous.style.display = 'block';
      options.wrap_next = getWrapNextEle();
      if (options.wrap_next.style.display === 'none')
        options.wrap_next.style.display = 'block';
    };

  return {
    resetPreviousNextEle: resetPreviousNextEle,
    showThumb: showThumb,
    setPageNumber: setPageNumber,
    hideThumbInTime: hideThumbInTime,
    flipPageBtnShow: flipPageBtnShow,
    previousPageHide: previousPageHide,
    nextPageHide: nextPageHide,
    playBtnReset: playBtnReset,
    playBtnShow: playBtnShow,
    // backBtnShow: backBtnShow,
    playBtnHide: playBtnHide,
    getPageName: getPageName,
    setBreadCrumb: setBreadCrumb,
    backHome: backHome,
    getQueryStringArgs: getQueryStringArgs,
    getPreviewIndex: getPreviewIndex,
    showPage: showPage,
    hidePage: hidePage,
    isInDirectionZone: isInDirectionZone,
    bindPreviewEvent: bindPreviewEvent,
    animateThumbs: animateThumbs,
    imgQuality: imgQuality,
    addHandler: addHandler,
    resetThumb: resetThumb,
    resetDictionary : resetDictionary,
    searchName: searchName,
    centerCurrentThumbNail: centerCurrentThumbNail,
    setWordPageContent: setWordPageContent,
    options: options
  };
}());

BookApp.util.page = (function () {
  // 依赖
  var dom = BookApp.util.dom,
    doc = document,
    // Setting
    options = {
      // data_url: "https://provider-joyreader.wawayaya.com/lenovo/bookResource?userId=8394&bookId=",
      data_url: "https://provider-joyreader.wawayaya.com/lenovo/bookResource?&bookId=",
      origin_json: {},
      bookJson: {},
      ERR_OK: 1,  // 请求地址返回成功状态码
      current_page: {
        index: -1,
        play_index: 0, // 控制页播放的音频索引
        data: {}
      },
      local_pages: {},
      load_index: 0,
      bg_style: {}, // 背景页初始宽高, 用于计算字体缩放率
      clickTimer: null,
      is_en: false,
      previewsDisPlayIndex: [], // 存储缩略图显示下标值  "封面" 或者,
      wrap: document.getElementById('bg_content')
    },
    // 窗口监听
    setResize = function () {
      // var initRate = ww/wh;
      var initRate = 1.3,
        ww = $(window).width(),
        wh = $(window).height(),
        criticalVal = initRate * wh, // 宽度临界值
        nWidth = 0,
        nav_height = $('#navigation').height() + $('#home-header').height(),
        wrapper_main = $('#wrapper_main');

      if (ww < wh || ww < criticalVal) {
        nWidth = ww;
      } else {
        // 获取最初的比例进行缩放
        nWidth = initRate * wh;
      }
      // console.log($('#navigation').height(), $('#home-header').height(),
      //   nav_height,
      //   wh, wh -nav_height) ;

      $('body').width(ww).height(wh);
      wrapper_main.height(wh - nav_height);

      // Modified by HD.
      var page_wrap = fixImgRatio(options.bg_style.width, options.bg_style.height);
      // console.log(options.bg_style, page_wrap, wrapper_main.width());

      // #wrap_play_btn
      dom.playBtnReset(page_wrap, wrapper_main.width());

      // height, margin-top, nav_height
      dom.resetPreviousNextEle(wh - nav_height - page_wrap.top * 2,
        page_wrap.top);

      dom.resetThumb();
      // wrapper_main.width height
      // page_wrap.width, height
      dom.resetDictionary(page_wrap, wrapper_main.width(), wh - nav_height);
    },
    // Fix picture ratio.
    fixImgRatio = function (imgw, imgh) {
      var bannerHeight = $('#navigation').height() + $('#home-header').height();

      // console.log('[HD] fixImgRatio', imgw, imgh);
      // On resizing, change style to fit.
      var container = $('#word_page_content_' + options.current_page.index);
      // var container = $('#wrapper_main');
      var containerW = container.width();
      var containerH = container.height();
      // console.log('[HD]', containerW, containerH);
      var containerAspectRatio = containerW / containerH;
      var contentW = imgw; //$('#page_wrapper').width();
      var contentH = imgh; //$('#page_wrapper').height();
      var contentAspectRatio = contentW / contentH;
      // console.log('[HD]', containerW, containerH, contentW, contentH, bannerHeight);
      // console.log('[HD]', containerAspectRatio.toFixed(3), contentAspectRatio.toFixed(3));
      var delta = 0.033; // The miscalculating delta.
      var play_btn_size = {
        width: 0,
        height: 0,
        top: 0
      };

      if (containerAspectRatio + delta >= contentAspectRatio) {
        $('#page_wrapper_' + options.current_page.index).css({
          // 'width': nWidth + 'px',
          'width': containerH * contentAspectRatio + 'px',
          'height': containerH - bannerHeight + 'px',
          'margin': 'auto 0'
        }); // 确保图片缩放正确
        play_btn_size.width = containerH * contentAspectRatio;
        play_btn_size.height = containerH;
      } else {
        $('#page_wrapper_' + options.current_page.index).css({
          // 'width': nWidth + 'px',
          'width': containerW + 'px',
          'height': containerW / contentAspectRatio + 'px',
          'margin': 'auto 0'
        }); //确保图片缩放正确
        // 垂直居中
        var containerHeight = containerH;
        var contentHeight = containerW / imgw * imgh;
        var top = (containerHeight - contentHeight) / 2 - bannerHeight;
        top = top < 0 ? 0 : top;
        // var top = (containerHeight - contentHeight) / 2;
        // 15 is fixing delta. Cause of unknown reason.
        // console.log('[HD] container=', containerHeight, ' content=', contentHeight, 'top=', top);
        $('.page_wrapper').css({
          'width': '100%',
          'height': 'auto',
          'margin-top': top + 'px'
        });
        play_btn_size.width = containerW;
        play_btn_size.height = containerW / contentAspectRatio;
        // play_btn_size.top = (containerHeight - contentHeight) / 2 ;
        play_btn_size.top = top;
      }
      // console.log( $('#navigation').height() );
      // dom.resetThumb();
      return play_btn_size;
    },
    getBookJson = function (url) {
      $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        success: function (result) {
          options.bookJson = result;
          // console.log(options.bookJson);
          // console.log(options.bookJson.book_mark !== -1);
          // $.each(result, function (index, obj) {
          //   console.log(index, obj);
          // });
        }
      });
    },
    // 初始化请求，获取整本书每页 url
    getInitData = function (args) {
      $.ajax({
        async: true,
        url: options.data_url + args + '&userId=' + options.location_args.uid,
        type: "GET",
        dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
        data: {
          q: "javascript",
          count: 1
        },
        success: function (data) {
          if (data.retCode === options.ERR_OK) {
            options.origin_json = data
            // console.log('getInitData => options.origin_json', options.origin_json);

            // Create previewlist :
            if (options.origin_json.retInfo.previewList.length) {
              // 加载缩略图
              createPreview();
            }
            getBookJson(options.origin_json.retInfo.bookJson);
            _setCurrentPage(0);
          } else {
            try {
              throw 'getInitData => 获取数据响应不正确';
              throw 101;
              throw false;
            } catch (e) {
              console.log(e);
            }
          }
          // page.data_json = data;
          // _http_1 = data.retInfo.resourceHost;
          // resourceRootPath = _http_1;
          // return data;
          //_setCurrentPage(0);
        },
        error: function () {
          console.log("Ajax => getInitData error");
        }
      });
    },
    runningAjax = [],
    _stopAllAjaxRequests = function () {
      for (var i = 0; i < runningAjax.length; ++i) {
        runningAjax[i].abort();
      }
      runningAjax = [];
    },
    // 获取指定页面数据
    _requestPageData = function (index, successCallback) {
      _stopAllAjaxRequests();
      // url = url.replace('http:', 'https:');
      // console.log(url);
      var idx = Number(index);
      var getUrl = options.origin_json.retInfo.pageList[idx]
      var ajaxRequest = $.ajax({
        async: true,
        url: options.origin_json.retInfo.pageList[idx].replace('http:', 'https:'),
        type: "GET",
        dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
        data: {
          q: "javascript",
          count: 1
        },
        success: function (data) {

          var sentenceList = data.region
          ? data.region.sentence
          : null;
          if (data.type === 1) {
            for (var i = 0, len = sentenceList.length; i < len; i++) {
              // console.log(sentenceList[i].voice.mp3 );
            }
          }

          // var local_data = data;
          var page = {
            data: data,
            index: Number(idx)
          }
          var pageElement = _createPageElement(page);
          // console.log('[AJAX] Page ', idx, pageElement);
          var cache = {
            data: data,
            pageNode: pageElement
          };
          // console.log(cache, idx);
          successCallback(cache);
        },
        error: function () {
          console.log("Ajax => getSinglePageData 服务器响应错误");
        }
      });
      runningAjax.push(ajaxRequest);
      return ajaxRequest;
    },
    // bookOriginalId,
    _requestDictionaryData = function (region, callback) {
      var url = 'https://testprovider-joyreader.wawayaya.com/lenovo/dictionary?userId='
        + options.location_args.uid;

      console.log(
        // arguments,
        region
      );

      // url += '&bookId=699&bookOriginalId=89001&word=没有&phrase=["我","没有"]&phraseIdx=1&py=&callback=456789';
      url += '&bookId='+ options.location_args.bookid
        +'&bookOriginalId='+ options.current_page.data.original_id
        +'&word='+ region.wd.join('')
        +'&phrase='+ JSON.stringify(region.cut_text_arr)
        +'&phraseIdx='+ region.cut_text_index +'&py=&callback=456789';

      var ajaxRequest = $.ajax({
        async: true,
        url: url,
        type: "GET",
        dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
        data: {
          q: "javascript",
          count: 1
        },
        success: function (data) {
          // console.log(data,
          // JSON.parse(data.retInfo.data) );
          callback(JSON.parse(data.retInfo.data));
          // dictContent(JSON.parse(data.retInfo.data));
        },
        error: function () {
          console.log("Ajax => requestWordData 服务器响应错误");
        }
      });
    },
    // 文字图片节点 拼音节点
    // @words : 文字 拼音数据
    // @bg_img_obj : 当前页面背景图片对象
    // @host_path : 图片地址前缀
    createWordImages = function (words, bg_img_obj, page_name, host_path) {

      var imgs_frag = document.createDocumentFragment();

      // 汉语
      if (words.cn && words.cn.length) {
        for (var i = 0, len = words.cn.length; i < len; i++) {
          var imgObj = words.cn[i];
          var zoomStyle = zoomMultiple(bg_img_obj, {
            width: imgObj.w,
            left: imgObj.ltx,
            top: imgObj.lty
          });

          var img_word = new Image();
          img_word.className = 'page_img';
          img_word.src = host_path + imgObj.uri;
          img_word.style.width = zoomStyle.width + '%';
          img_word.style.height = 'auto';
          img_word.style.left = zoomStyle.left + '%';
          img_word.style.top = zoomStyle.top + '%';

          imgs_frag.appendChild(img_word);
        }
      }

      // 拼音处理
      if (words.py && words.py.length) {
        for (var j = 0, py_len = words.py.length; j < py_len; j++ ) {
          var img_py_obj = words.py[j],
            img_py_ele = new Image();

          var zoomStylePy = zoomMultiple(bg_img_obj, {
              width: img_py_obj.w,
              left: img_py_obj.ltx,
              top: img_py_obj.lty
            });
          // console.log(img_py_obj, img_py_ele);
          img_py_ele.className = 'page_img_py';
          img_py_ele.src = host_path + img_py_obj.uri;
          img_py_ele.style.width = zoomStylePy.width + '%';
          img_py_ele.style.height = 'auto';
          img_py_ele.style.left = zoomStylePy.left + '%';
          img_py_ele.style.top = zoomStylePy.top + '%';
          imgs_frag.appendChild(img_py_ele);
        }
      }

      // 英文处理
      if (words.en && words.en.length) {
        for (var k = 0, en_len = words.en.length; k < en_len; k++){
          // console.log(words.en[k]);
          var img_en_obj = words.en[k],
            img_en_ele = new Image();

          var zoomStyleEn = zoomMultiple(bg_img_obj, {
              width: img_en_obj.w,
              left: img_en_obj.ltx,
              top: img_en_obj.lty
            });
          // console.log(img_py_obj, img_en_ele);
          img_en_ele.className = 'page_img_en';
          img_en_ele.src = host_path + img_en_obj.uri;
          img_en_ele.style.width = zoomStyleEn.width + '%';
          img_en_ele.style.height = 'auto';
          img_en_ele.style.left = zoomStyleEn.left + '%';
          img_en_ele.style.top = zoomStyleEn.top + '%';
          imgs_frag.appendChild(img_en_ele);
        }
      }

      return imgs_frag;
    },
    // 图片热区元素
    createHotAreaEle = function (hotArea, bg_img_obj, host_path){
      var hotAreaFrag = document.createDocumentFragment();
      // console.log('createHotAreaEle => hot_area_adv....',
      //   'hotArea,', hotArea,
      //   'host_path', host_path);

      for (var i = 0, len = hotArea.length; i < len; i++) {

        if (!hotArea[i].local.source[0]) {
          continue;
        }
        // var margin_righ = hotArea[i].helper.rect.split(',')[2];
        // console.log(Number(margin_righ) /bg_img_obj.w * 100);

        var rect = hotArea[i].rect.split(',');
        var img_hot = new Image();
        img_hot.className = 'hot_img';
        img_hot.src = host_path + hotArea[i].local.source[0];
        var img_hot_p = doc.createElement('p');
        img_hot_p.className = 'img_hot_p';
        img_hot_p.appendChild(img_hot);

        var img_hot_wrap = doc.createElement('div');
        img_hot_wrap.className = "img_hot_wrap ";
        img_hot_wrap.style.left = rect[0] / bg_img_obj.w * 100 +'%';
        img_hot_wrap.style.top = rect[1] / bg_img_obj.h * 100 +'%';
        img_hot_wrap.style.width = (rect[2] - rect[0]) / bg_img_obj.w * 100 +'%';
        img_hot_wrap.style.height = (rect[3] - rect[1]) / bg_img_obj.h * 100 +'%';
        // console.log(rect[2],bg_img_obj.w, rect[2] / bg_img_obj.w * 100);

        var wrap_inner_con = doc.createElement('div');
        wrap_inner_con.className = "nano-content"
        wrap_inner_con.appendChild(img_hot_p);

        var wrap_inner = doc.createElement('div');
        wrap_inner.className = "img_hot_wrap_inner nano";
        wrap_inner.appendChild(wrap_inner_con);

        img_hot_wrap.appendChild(wrap_inner);
        hotAreaFrag.appendChild(img_hot_wrap);

      }
      $("#bg_content .img_hot_wrap_inner").nanoScroller();
      return hotAreaFrag;
    },
    // 获取音标
    getPhoneticize = function (text) {

      var text_arr = text,
        i,
        len,
        py_len,
        py_multiple,
        tone,
        tone_str,
        tone_str_rep,
        spell,
        spell_arr = [],
        tone_data = {
          a: ['a', 'ā', 'á', 'ǎ', 'à'],
          e: ['e', 'ē', 'é', 'ě', 'è'],
          v: ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
          u: ['u', 'ū', 'ú', 'ǔ', 'ù'],
          i: ['i', 'ī', 'í', 'ǐ', 'ì'],
          o: ['o', 'ō', 'ó', 'ǒ', 'ò']
        };
        // [āáǎàōóǒòēéěèīíǐìūúǔùüǖǘǚǜ]


      // Conver phoneticize
      for (i = 0, len = text_arr.length; i < len; i++) {
        // 多音字
        py_multiple = text_arr[i].split('/');
        // 获取未数声调
        tone = Number(py_multiple[py_multiple.length - 1].slice(-1));
        // 拼写字母
        spell = py_multiple[py_multiple.length - 1].slice(0, -1);

        if (/a|e|v/.test(spell)) {
          tone_str = spell.charAt(spell.search(/a|e|v/));
          if (tone_str === 'a') {
            tone_str_rep = tone_data.a[tone];
          }
          else if (tone_str === 'e') {
            tone_str_rep = tone_data.e[tone];
          }
          else if (tone_str === 'v') {
            tone_str_rep = tone_data.v[tone];
          }
        }
        else if (/u/.test(spell)) {
          tone_str = spell.charAt(spell.search(/u/));
          tone_str_rep = tone_data.u[tone];
        }
        else if (/o|i/.test(spell)){
          tone_str = spell.charAt(spell.search(/o|i/));
          if (tone_str === 'o') {
            tone_str_rep = tone_data.o[tone];
          }
          else if (tone_str === 'i') {
            tone_str_rep = tone_data.i[tone];
          }
        }
        else {
          console.log('韵母匹配错误！');
        }
        spell = spell.replace(tone_str, tone_str_rep);
        spell_arr.push(spell);
      }
      return spell_arr;
    },
    // 获取词典数据回调函数
    dictContent = function (data) {
      console.log(data);
      var jie_shi = [],
        dict_html_str = '',
        jie_shi_str = '';

      $('#dictionary .dict_title h2').empty().append(data.word);

      for (var i = 0, len = data.dicts.length; i < len; i++) {
        // console.log(data.dicts[i]);
        if ( data.dicts[i].type === 'cn' && data.dicts[i].items) {
          // console.log( data.dicts[i].items[0].jie_shi );
          jie_shi = data.dicts[i].items[0].jie_shi;
        }
        else if (data.dicts[i].type === 'cn' && data.dicts[i].ci_xing) {
          jie_shi = data.dicts[i].ci_xing[0].jie_shi;
          // console.log(data.dicts[i].ci_xing[0].jie_shi);
          $('#dictionary .dict_spell p').empty().append(data.dicts[i].yin_biao);
        }
      }

      for (var j = 0, len = jie_shi.length; j < len; j++) {
        // console.log(jie_shi[j]);
        if (jie_shi[j].str) {
          jie_shi_str = jie_shi[j].str
        }
        else {
          jie_shi_str = jie_shi[j].js
        }

        dict_html_str += '<li>'+ jie_shi_str +'</li>';
        if (j > 6){
          // console.log(j);
          break;
        }
      }
      // console.log(dict_html_str);
      $('#dictionary .dict_wrap_cn ul').empty().html(dict_html_str);
    },
    // @target : <img/> 标签
    // @offset_x : 偏移量
    // data :
    calculateRect = function(target, offset_x, data) {
      var data = data,
      // 方字文件图片编号 [0, 1, 2, 3...]
      img_index = +target.className.split(' ')[1].slice(4),
      sentence = data.region.sentence,
      imgs = data.img.fg.cn.length > 0 ? data.img.fg.cn : data.img.fg.en,
      region = {},
      // 当前缩放比例
      img_compress = imgs[img_index].w / target.clientWidth,
      img_offset = offset_x * img_compress;

      if (!imgs[img_index]) {
        return;
      }
      console.log(data);
      // sentence.length 对应 img.img_0 -> N
      for (var i = 0, j = 0, len = sentence.length; i < len; i++) {

        var line_index = 0,
          is_find = false;

        for (var k = 0, k_len = sentence[i].sub_rect.length;
            k < k_len; k++) {
          console.log(k);

          var lines = sentence[i].sub_rect[k].lines.split(',');

          if (sentence[i].sub_rect[k].lines === '') {
            lines[0] = '9999';
          }

          if (j === img_index ) {
            for (var l = 0, line_len = lines.length; l < line_len; l++) {
              if (Number(lines[l]) > img_offset){
                break;
              }
              line_index++;
            }
            region = {
              sentence_index: i,
              react_index: k,
              lines: lines,
              cut_text: sentence[i].cut_text,
              // voice: sentence[i].voice,
            };

            // 如果 lines 坐标没有值，取 sub_rect 索引
            if (sentence[i].sub_rect[k].lines === '') {
              region.line_index =  k
            } else {
              region.line_index = line_index
            }

            is_find = true;
            break;
          }
          else {
            line_index += (lines.length + 1);
          }

          j++;
        }

        if (is_find) {
          break;
        }
      }

      // 未找到对应偏移数组
      if (!region.lines) {
        return;
      }

      console.log(region);

      region.cut_text_arr = [];

      var text_idx,
      text_len,
      find_word,
      py,
      py_idx,
      py_len,
      word_index = 0;

      for (text_idx = 0, text_len = region.cut_text.length;
        text_idx < text_len; text_idx++) {
        find_word = false,
        py = region.cut_text[text_idx].py.split(' ');

        if (py.length === 0) {
          console.log(1);
        }
        else {

        }
        for (py_idx = 0, py_len = py.length; py_idx < py_len; py_idx++ ) {
          if (word_index === region.line_index) {
            // start: word_index - py_idx,
            // end : word_index + (py_len - py_idx - 1),
            region.cut_text_index = text_idx;
            region.wd = region.cut_text[text_idx].wd.split('');
            region.py = py;

            find_word = true;
            break;
          } else {
            word_index++;
          }
          // console.log(word_index);
        }

        if (find_word) {
          break;
        }
      }
      // Construction lines array for request Ajax
      for (var text_idx_2 = 0, text_len_2 = region.cut_text.length;
        text_idx_2 < text_len_2; text_idx_2++) {
        region.cut_text_arr.push(region.cut_text[text_idx_2].wd);
      }

      $('#dictionary').show();
      // var phoneticize = getPhoneticize(region.py);
      setResize();

      // 默认显示
      $("#dictionary .dict_wrap>div").eq(1).show().siblings().hide();
      //改变选中时候的选项框的样式，移除其他几个选项的样式
      $('#dict_box .dict_menu .cn').addClass("active").siblings().removeClass("active");

      // 汉语拼音
      if (data.img.fg.cn.length) {
        region.spell = getPhoneticize(region.py);
        $('#dictionary .dict_spell p').empty().append(region.spell.join(' '));
      }
      // else en =>  "ÅkQ%mÅ"
      $('#dictionary .dict_title h2').empty().append(region.wd);

      _requestDictionaryData(region, dictContent);

      console.log('=>data: ', data,
        ' \n=>offset-x', offset_x,
        // ' \n=>word_obj:', word_obj,
        ' \n=>imgs ', imgs[img_index],
        ' \n=>region', region,
        // 'imgs-compress', img_compress,
        ' \n=>sub_rect_index', img_index,
        ' \n=>calculate offset :', img_offset
        // '\n=>phoneticize', phoneticize
        );
    },
    // 添加文字词典(click)事件
    addWordImgEvent = function(page_wrapper_id, data) {
      var page_wrapper_id = 'page_wrapper_' + page_wrapper_id,
        page_wrapper_ele =  doc.getElementById(page_wrapper_id);

      if (page_wrapper_ele == null){
        return;
      }

      var page_wrapper_imgs = page_wrapper_ele.getElementsByTagName('img');

      for (var i = 0, sub_rect = 0, len = page_wrapper_imgs.length; i < len; i++) {
        if (page_wrapper_imgs[i].className === 'cover' ||
          page_wrapper_imgs[i].className === 'page_img_py') {
          continue;
        }

        page_wrapper_imgs[i].className += " img_" + sub_rect;

        dom.addHandler(page_wrapper_imgs[i], 'click', function(event) {
          // 阻止事件冒泡
          event.stopPropagation() || event.preventDefault(); // no use ?
          // console.log('img => click event', event);
          calculateRect(event.target, event.offsetX, data);
        })
        sub_rect++;
      }

    },
    // @page : 当前数据
    _createPageElement = function (page) {
      var data = page.data,
        words,
        page_name = dom.getPageName(page.data.img.bg[0].uri, data.type),
        img_html_str = '',
        div_wrap_str = '',
        host_path = options.origin_json.retInfo.resourceHost +
          options.origin_json.retInfo.resourcePath,
        // cache document
        doc = document,
        // Select the best size for background-image
        img_quality = dom.imgQuality(data.img.bg[0].w, 60, ''),
        // 背影图片 url
        img_bg_url = host_path + data.img.bg[0].uri + img_quality,
        // 计算添加子节点 前/后
        index_temp,
        page_list_len = options.origin_json.retInfo.pageList.length,
        wordsElement, // 文字/图片元素
        hotAreaElement;

      // page001 / page002
      page_name = page_name[0] === undefined ? page_name : page_name[0];

      // save background-image size
      options.bg_style = {
        'width': data.img.bg[0].w,
        'height': data.img.bg[0].h
      }
      var pageContent = doc.createElement('div');
      pageContent.id = 'word_page_content_' + page.index;
      pageContent.className = ' pageWrap word_page_content ' + page_name;
      pageContent.setAttribute('data-index', page.index);
      pageContent.setAttribute('data-page', page_name);

      var pageWrapper = doc.createElement('div');
      pageWrapper.id = 'page_wrapper_' + page.index;
      pageWrapper.className = 'page_wrapper';
      pageWrapper.style.width = 'auto';

      var img_bg = new Image();
      img_bg.className = 'cover';
      img_bg.style.width = "100%";
      img_bg.style.height = "auto";

      // 添加背景图片
      img_bg.src = img_bg_url;
      img_bg.style.position = 'relative';
      img_bg.style.height = '100%';
      // 添加背影图片
      pageWrapper.appendChild(img_bg);

      // Constructor object empty
      if (data.img.fg === undefined) {
        data.img.fg = {
          cn: [],
          en: [],
          py: []
        };
      }
      words = data.img.fg;
      // 有字幕图片
      if (words.cn && words.cn.length || words.en && words.en.length) {
        // 生成文字/拼音/英文图片元素
        wordsElement = createWordImages(words, data.img.bg[0],
          page_name, host_path);
        // 添加到父节点
        pageWrapper.appendChild(wordsElement);
      }


      // 无字幕背景图片
      // else {
        // 内容在背景图片中
        // img_bg.src = img_bg_url;
        // pageWrapper.appendChild(img_bg);
      // }

      // 热区图片
      if (data.region && data.region.hot_area_adv
        && data.region.hot_area_adv.length) {
        console.log('data.region.hot_area_adv', page.index);
        hotAreaElement = createHotAreaEle(data.region.hot_area_adv,
          data.img.bg[0], host_path);
        pageWrapper.appendChild(hotAreaElement);
      }

      pageContent.appendChild(pageWrapper);
      // console.log('[WARNING]', pageContent.firstChild);
      return pageContent;
    },
    // pageWrapSortById = function () {
    // },
    flipPageBtnHide = function (idx, totalPageCount) {
      dom.flipPageBtnShow();
      // 第一页隐藏上一页按钮
      if (idx === 0) {
        dom.previousPageHide();
      }
      // 最后1页隐藏下一页按钮
      if (idx === totalPageCount - 1) {
        dom.nextPageHide();
      }
    },
    // @index :
    _preloadCache = function (index) {
      // console.log('current_index........', index );
      _cleanUnusedCache(index);
      var idx = Number(index);
      var totalPageCount = options.origin_json.retInfo.pageList.length;
      var cacheIndexes = [idx + 1, idx - 1, idx, idx + 2, idx - 2];

      flipPageBtnHide(idx, totalPageCount);

      for (var i = 0; i < cacheIndexes.length; ++i) {
        var tgtIdx = Number(cacheIndexes[i]);
        if (tgtIdx < 0) {
          tgtIdx += totalPageCount;
        }
        if (tgtIdx >= totalPageCount) {
          tgtIdx -= totalPageCount;
        }
        if (options.local_pages[tgtIdx] === undefined) {
          // console.log('[HD] Going to load:', tgtIdx);
          _requestPageData(tgtIdx, function (cache) {
            options.local_pages[tgtIdx] = cache;
            // Means +1 and -1 to current page,
            // load to document, for animation consideration.
            if (i < 2) {
              // console.log('[HD] About to add', cacheIndexes[i]);
              _applyPageFromCache(cache, false, false);
            }
            _preloadCache(index);
          });
          break;
        } else if (i < 2) {
          _applyPageFromCache(options.local_pages[tgtIdx], false, false);
        }
      }

    },
    _cleanUnusedCache = function (index) {
      // console.log('[HD] _cleanUnusedCache, current is:', index);
      var a = Number(index) - 2;
      var totalPageCount = options.origin_json.retInfo.pageList.length;
      var bIncludeTail = false;
      if (a < 0) {
        bIncludeTail = true;
      }
      var bIncludeHead = false;
      var b = Number(index) + 2;
      if (b >= totalPageCount) {
        bIncludeHead = true;
      }
      var keysToClean = [];
      for (var k in options.local_pages) {
        var key = Number(k);
        if (bIncludeTail && key >= totalPageCount - 2) {
          key -= totalPageCount;
        }
        if (bIncludeHead && key < 2) {
          key += totalPageCount;
        }
        if (key < a || key > b) {
          keysToClean.push(key);
        }
      }
      for (var i = 0; i < keysToClean.length; ++i) {
        delete options.local_pages[keysToClean[i]];
        // console.log('[HD] Cleaned cache:', keysToClean[i]);
      }
    },
    pageFlipTimerClear = function() {
      if (options.page_flip_timer) {
        clearTimeout(options.page_flip_timer);
      }
    },
    pageFlipTimer = function (index) {
      pageFlipTimerClear();
      options.page_flip_timer = setTimeout(function () {
        if (options.current_page.index >= options.origin_json.retInfo.pageList.length - 1) {
          return;
        }
        _setCurrentPage(options.current_page.index + 1);
      }, 5000); // 5秒?
    },
    playDispatchEvent = function() {
      // console.log('playDispatc');
      var event;  //create event object
      // DOM Level 3 implementation
      if (document.implementation.hasFeature("KeyboardEvent", "3.0")) {
        console.log('KeyboardEvent');
        // U+0020 / Space / " " / Shift
        event = document.createEvent("KeyboardEvent");
        event.initKeyboardEvent("keydown",true,true,document.defaultView,"Space-key",0,"Space",0);
      }
      // doc.dispatchEvent(event); // Fire the event
    },
    // 播放音频 ？
    playPageAudio = function () {
      var voices = [], // 音频 url
        host_path = options.origin_json.retInfo.resourceHost +
          options.origin_json.retInfo.resourcePath,
        sentenceList = options.current_page.data.region
          ? options.current_page.data.region.sentence
          : null,
        timer = 0;
      // mp3 前缀
      // console.log(options.current_page.data, sentenceList );
      // 内容 1
      if (options.current_page.data.type === 1) {
        for (var i = 0, len = sentenceList.length; i < len; i++) {
          // 跳过没有声音
          if (sentenceList[i].voice.mp3 === '') {
            break;
          }
          if (sentenceList[i].voice.points.length >= 2){
            // console.log('is has points 2...', len);
            voices.push({
              bg: sentenceList[i].voice.points[0].bg,
              // ed: sentenceList[i].voice.points[1].ed,
              ed: sentenceList[i].voice
                .points[sentenceList[i].voice.points.length - 1].ed,
              mp3: host_path + sentenceList[i].voice.mp3
            });
          } else {
            voices.push({
              bg: null,
              ed: null,
              mp3: host_path + sentenceList[i].voice.mp3
            });
          }
        }
      }
      // 封底 4
      else if (options.current_page.data.type === 4) {
        if (options.current_page.data.title_mp3 === '') {
          player.pause(); // 暂停播放
          dom.playBtnHide();
          return;
        }
        // voices[0] = host_path + options.current_page.data.title_mp3;
        voices[0] = {
          bg: null,
          ed: null,
          mp3: host_path + options.current_page.data.title_mp3
        };
      }
      // 封面 type === 3
      else {
        if (options.current_page.data.title_mp3 === undefined ||
          options.current_page.data.title_mp3 === '') {
          player.pause(); // 暂停播放
          dom.playBtnHide();
          // 无音频书不自动翻页
          if (options.bookJson.book_mark !== -1)
            pageFlipTimer(); // auto page flip
          return;
        }
        if (options.bookJson.book_mark !== -1)
          timer = 2000; // 封面翻页延迟 2s
          // voices[0] = host_path + options.current_page.data.title_mp3;

          voices[0] = {
            bg: null,
            ed: null,
            mp3: host_path + options.current_page.data.title_mp3
          };
      }

      // console.log('playPageAudio => voices[]',
      // options.current_page.index,
      // sentenceList,
      // voices);
      options.current_page.play_index = 0
      if (voices.length > 0) {
        player.playlistTraversal(voices, true, timer);
        dom.playBtnShow();
        pageFlipTimerClear()
        // if (options.page_flip_timer)
        //   clearTimeout(options.page_flip_timer);
      } else {
        dom.playBtnHide();
        player.pause();
        player.is_paused = player.is_paused === true ? true : false;
        // 无音频书不自动翻页
        if (options.bookJson.book_mark !== -1)
          pageFlipTimer();
      }
      player.setIcon();

      // if (options.current_page.index === 0) {
      //   playDispatchEvent();
      // }
    },
    // 预览缩略图
    createPreview = function () {
      var previewList = options.origin_json.retInfo.previewList,
        host = options.origin_json.retInfo.resourceHost;

      createPreviewZone(previewList, host);
      //存储previews的显示索引值
      storePreviewDisplayIndex(previewList, host);
      // event=> 上页/下页; thumb show/hide
      dom.bindPreviewEvent();

      // 获取当前对应页的index，然后直接show页面
      // 为所有缩略图绑定点击函数
      $('#thumb').delegate('#thumb_img .previews .page',
        'click', function (e) {
          var $this = $(this);
          var index = $this.attr('data-index');
          console.log(' #thumb_img .previews .page => click', index);
          pageFlipTimerClear();
          player.nextPageTimerClear();
          // BIGDATA
          if(index !== options.current_page.index)
          {
            ah.Report('_CLICK_', 'JUMP_PAGE', 'Click page from nav bar', {
              bookid: getQueryString('bookid'),
              bookname: getQueryString('bookname'),
              page: options.current_page.index + ' to ' + Number(index)
            });
          }
          _setCurrentPage(index);
        });
      $('#thumb').delegate('#pre_left',
        'click', function (e) {
          dom.animateThumbs('left', previewList, host, options.current_page.index);
        });
      $('#thumb').delegate('#pre_right',
        'click', function (e) {
          dom.animateThumbs('right', previewList, host, options.current_page.index);
        });

      dom.showPage();
      setTimeout(function () {
        dom.showThumb();
        dom.resetThumb();
      }, 1000);

    },
    // create element ?
    createPreviewZone = function (preview_list, host) {
      var html_str = "",
        left = "",
        i = 0,
        j = 0,
        len = 7;

      // 页数不足7页 => 前3格用空div节点占位
      if (preview_list.length < 7) {
        do {
          left = j * 14.286 + "%";
          html_str += '<div class="previews" style="left:' + left
            + ';  visibility:hidden;">\
          <div class="page" data-index="temp_id" data-page="temp_name">\
              <img src="">\
              <span></span>\
            </div>\
          </div>\n';
          j++;
        } while (j < 3);
      }

      for (; j < len; i++ , j++) {
        // left = i * 11.2 + "%";
        left = j * 14.286 + "%";
        var preURI = preview_list[i]; // 缩略图 uri
        if (preURI === undefined) break;

        var pageName = preURI.substring(preURI.lastIndexOf('/') + 1,
          preURI.lastIndexOf('.')),
          indexName = '';

        // 封面名字 => 可以传入中英文标志，区分缩略图名字
        indexName = dom.getPreviewIndex(pageName, i, options.is_en);

        html_str += '<div class="previews" style="left:' + left + '">\
            <div class="page" data-index="' + (i) +
          '" data-page="' + pageName + '">\
                <img src=' + (host + preURI) + '>\
                <span>' + indexName + '</span>\
            </div>\
        </div>\n';
      }
      doc.getElementById('thumb_img').innerHTML = html_str;
    },
    // 存储所有的缩略图显示的下标索引值
    storePreviewDisplayIndex = function (previewList, host) {
      for (var i = 0, len = previewList.length; i < len; i++) {
        var name = dom.searchName(previewList[i]);
        var indexName = dom.getPreviewIndex(name, i, false);
        options.previewsDisPlayIndex.push({
          'src': host + previewList[i],
          'index': i, //用于标记当前src的位置
          'prevIndex': indexName // 缩略图底部显示的索引值
        });
      }
      // console.log('previewsDisPlayIndex', options.previewsDisPlayIndex);
    },
    getPreviewDisplayIndex = function () {
      return options.previewsDisPlayIndex;
    },
    // Select page
    _setCurrentPage = function (index) {
      // adjust sequence. to fix 'click current page from preview bar repeatedly' causes audio replay.
      if (Number(index) === Number(options.current_page.index)) {
        return;
      }

      dom.hideThumbInTime();

      // if ($('#dictionary').is(':visible')) {
      //   $('#dictionary .dict_wrap_cn ul').empty(); // 解释
      //   $('#dictionary .dict_spell p').empty(); // 音标
      //   $('#dictionary').hide();
      // }

      // 设置页码
      // dom.setPageNumber(index + 1,
      // options.origin_json.retInfo.previewList.length);

      _stopAllAjaxRequests();
      options.current_page.index = Number(index);
      var cache = options.local_pages[index];
      var ajaxRequest;

      // has cache
      if (cache != undefined) {
        _applyPageFromCache(cache, true, true);
        // 更新预览图
        BookApp.util.dom.centerCurrentThumbNail(index);
        options.current_page.data = cache.data;
        // 添加词典事件
        // if (options.current_page.data.region
        //   && options.current_page.data.region.sentence) {
        //   addWordImgEvent(index, options.current_page.data);
        // }
        playPageAudio();
        _preloadCache(index);
      }
      // no cache
      else {
        _requestPageData(index, function (newCache) {
          options.local_pages[index] = newCache; // Add to cache
          _applyPageFromCache(newCache, true, true); // Apply to html
          // 更新预览图
          BookApp.util.dom.centerCurrentThumbNail(index);
          options.current_page.data = newCache.data;
          // 添加词典事件
          // if (options.current_page.data.region
          //   && options.current_page.data.region.sentence) {
          //   addWordImgEvent(index, newCache.data);
          // }
          playPageAudio();
          _preloadCache(index); // Preload other caches
        });
      }

      // Change hash
      window.location.hash = 'page=' + index;
      console.log(window.location.hash);
      // console.log(current_page_data);
      // addWordImgEvent(index);

      $(" img",options.wrap).each(function () {
        var quality = $(this).attr("src").indexOf("!/quality") >= 0 ? "" : "!/quality/75";
        if(quality != ""){
          $(this).attr("src", $(this).attr("src") + quality);
        }
      });

      // console.log(options.current_page.index,
      //     options.current_page);
      // if (options.current_page.data.region
      //   && options.current_page.data.region.hot_area_adv
      //   && options.current_page.data.region.hot_area_adv.length){
      //   console.log('(.img_hot_wrap_inner").nanoScroller');
      //   $("#bg_content .img_hot_wrap_inner").nanoScroller();
      // }

      $("#bg_content .img_hot_wrap_inner").nanoScroller();

    },
    _applyPageFromCache = function (cache, cleanFirst, show) {

      if (cleanFirst === true) {
        // This is for IE compatibility
        // var container = document.getElementById('bg_content');
        // if(container)
        // {
        //   while(container.children.length > 0)
        //   {
        //     container.removeChild(container.children[0]);
        //   }
        // }
        while (options.wrap.firstChild) {
          options.wrap.removeChild(options.wrap.firstChild);
        }

        // This part is NOT suit for IE, but OK with CHROME, EDGE
        //options.wrap.innerHTML = '';
      }
      var node = cache.pageNode;

      // node.style.position = 'absolute';
      if (show === false) {
        node.style.display = 'none';
        node.style.zIndex = 1;
      } else {
        node.style.display = 'inline';
        node.style.zIndex = 2;
      }

      options.wrap.appendChild(node);

      // console.log('[HD] Added node', node);
      options.current_page.data = cache.data;

      setResize();
    },
    zoomMultiple = function (bg_img, obj) {
      // var dpi = window.devicePixelRatio ||
      //   window.screen.deviceXDPI / window.screen.logicalXDPI;

      // console.log(options.current_page.data.img.bg);
      // 依赖page_wrapper的宽高计算，
      // 因为这个实际上是依赖内部背景图片内容进行计算的
      var ww = bg_img.w || $(window).width(),
        // 获取背景图片的宽高cover
        ph = bg_img.h || $(window).height(),
        wh = $('#bg_content .pageWrap .page_wrapper').height();

      // 图片宽高需要先减小一倍，然后再计算
      var nw = ((obj.width) / ww) * 100,
        nl = ((obj.left) / ww) * 100,
        nt = ((obj.top / ph)) * 100;

      var newStyle = {
        "width": nw,
        "left": nl,
        "top": nt
      };
      return newStyle;
    },
    // 事件初始化
    initEvent = function () {
      // console.log('initEvent');
      $('#previous_page').click(function () {
        pageFlipTimerClear();
        player.nextPageTimerClear();
        if (options.current_page.index < 1) {
          return;
        }
        // BIGDATA
        ah.Report('_CLICK_', 'PREVIOUS_PAGE', 'Previous page button', {
          bookid: getQueryString('bookid'),
          bookname: getQueryString('bookname'),
          page: options.current_page.index + '->' + (Number(options.current_page.index) - 1)
        });
        //dom.setWordPageContent(options.current_page.index, 0);
        _setCurrentPage(options.current_page.index - 1);
      });

      $('#next_page').click(function () {
        pageFlipTimerClear();
        player.nextPageTimerClear();
        // console.log(options.current_page.index);
        if (options.current_page.index >= options.origin_json.retInfo.pageList.length - 1) {
          return;
        }
        //dom.setWordPageContent(options.current_page.index, 0);
        // BIGDATA
        ah.Report('_CLICK_', 'NEXT_PAGE', 'Next page button', {
          bookid: getQueryString('bookid'),
          bookname: getQueryString('bookname'),
          page: options.current_page.index + '->' + (Number(options.current_page.index) + 1)
        });
        _setCurrentPage(options.current_page.index + 1);
      });
      // 暂停 / 播放 ?
      $('#play_btn').click(function () {
        player.playToggle();
        dom.hideThumbInTime();
      });

      $('#back-btn').click(function() {
        // console.log(options.location_args);
        // var host_prefix = '/wawayaya';
        dom.backHome(options.location_args)
      });

      // 词典查询 => 选项卡切换
      $("#dict_box .dict_menu li").click(function() {
        // 通过 .index()方法获取元素下标，从0开始，赋值给某个变量
        var _index = $(this).index();
        //让内容框的第 _index 个显示出来，其他的被隐藏
        $(".dict_wrap>div").eq(_index).show().siblings().hide();
        //改变选中时候的选项框的样式，移除其他几个选项的样式
        $(this).addClass("active").siblings().removeClass("active");
      });

      $('#search-btn').click(function(e) {
        var value = $('#search-value').val();
        // console.log(value)
        window.location.href='./#/search/' + value;
      })

      $('#search-value').keydown(function(e){
        // console.log('keydown');
        if(e && e.keyCode === 13){
          $('#search-btn').click();
        }
      })
    },

    // checkLogin = function() {
    //   return false;
    // },

    // 公共初始化方法
    init = function () {
      // event.winResize();
      // 窗口大小改变, 转出？
      $(window).resize(function () {
        setResize();
      });
      // setResize();

      // 获取 location 参数
      options.location_args = dom.getQueryStringArgs();
      console.log(options.location_args,
        options.location_args.deviceid, options.location_args.uid);
      // deviceid

      // window.location.hash = 'page-number=1';
      // console.log(window.location.hash, window.location);

      if (options.location_args.classification ||
        options.location_args.lang) {
        // 面包屑导航字符
        dom.setBreadCrumb(options.location_args);
      }

      // ?deviceid=dca9cdde25c6ba23497e03c5a897e0d55e38fe5b&lenovoId=10113994010
      // if (options.location_args.deviceid &&
      //   options.location_args.deviceid === 'dca9cdde25c6ba23497e03c5a897e0d55e38fe5b') {

      //   var deviceIdEle = doc.getElementById('play-auto');
      //   deviceIdEle.style.display = 'block';

      //   $('#play-auto').click(function(e) {
      //     console.log(e, 'play auto', options.lenovoId, options.deviceId);

      //     player.pause();
      //     player.is_paused = true;
      //     player.setIcon();
      //     console.log(
      //       options.origin_json.retInfo.resourceHost +
      //         options.origin_json.retInfo.bookAudio
      //     );

      //     $.post(
      //       'http://114.67.130.237:8881/playToDevice',
      //       {
      //         lenovoId: options.lenovoId,
      //         deviceId: options.deviceId,
      //         mediaUrl:
      //           options.origin_json.retInfo.resourceHost +
      //           options.origin_json.retInfo.bookAudio
      //       },
      //       function(data) {
      //         console.log(data);
      //       }
      //     );
      //   });
      // }

      // 获取最初的全部 url 请求地址
      getInitData(options.location_args.bookid);

      // 添加事件监听
      initEvent();
      // console.log(options.location_args.bookid)

      // console.log('sessionStorage token :', sessionStorage.getItem('token'))
    };

  return {
    options: options,
    init: init,
    getPreviewDisplayIndex: getPreviewDisplayIndex
  }
}());

BookApp.util.page.init();

window.onload = function () {
  document.onselectstart = disableselect;
  var omitformtags = ["input", "textarea"];// 设置可以的元素名称
  omitformtags = "|" + omitformtags.join("|") + "|";
  // 判断是否是可选中的元素，不是的话就return false
  function disableselect() {
    if (event.srcElement.tagName === undefined) {
      return false;
    }
    if (omitformtags.indexOf("|" + event.srcElement.tagName.toLowerCase() + "|") == -1) {
      return false;
    }
  }
  document.body.ondragstart = function () { return false; }
  // BIGDATA
  var addStr = '';
  if(getQueryString('ch'))
  {
    addStr = ' CH=' + getQueryString('ch');
  }
  ah.Report('_VISIT_', 'VISIT_BOOK_PAGE' + addStr, 'Visit book page', {
    bookid: getQueryString('bookid'),
    bookname: decodeURIComponent(getQueryString('bookname'))
  });
}

// function audioPause() {
//   console.log('pase');
//   player.pause();
//   player.is_paused = true;
//   player.setIcon();
// }
// function audioPlay(){
//   console.log('play');
//   player.play();
//   player.is_paused = false;
//   player.setIcon();
// }
