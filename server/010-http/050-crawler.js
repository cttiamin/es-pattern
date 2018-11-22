// 爬虫测试
// https://www.imooc.com/learn/348
// npm install cheerio

var http = require('https')
var cheerio = require('cheerio')
var url = 'https://www.imooc.com/learn/348'


function filterChapters(html) {
  var $ = cheerio.load(html)
  const chapters = $('.chapter')
  const courseData = []
  chapters.each(function(){
    const chapter = $(this)
    const chapterTitle = chapter.find('h3').text()
    const videos = chapter.find('.video').children('li')
    const chapterData = {
      chapterTitle: chapterTitle,
      videos: []
    }
    videos.each(function(){
      const video = $(this).find('.J-media-item')
      const videoTitle = video.text()
      const id = video.attr('href').split('video/')[1]
      chapterData.videos.push({
        title: videoTitle,
        id: id
      })
    })
    courseData.push(chapterData)
  })
  return courseData
}

function printCourseInfo(courseData) {
  courseData.forEach(item => {
    const chapterTitle = item.chapterTitle
    console.log(chapterTitle + '\n')
    item.videos.forEach(video => {
      console.log(`${video.id}-${video.title}`);
    })
  })
}

http.get(url, function(res) {
  var html = ''

  res.on('data', function(data) {
    html += data
  })

  res.on('end', function() {
    // console.log(html)
    const courseData = filterChapters(html)
    printCourseInfo(courseData)
  })
}).on('error', function() {
  console.log('获取课程数据出错！')
})
