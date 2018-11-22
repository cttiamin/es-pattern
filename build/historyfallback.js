module.exports = {
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
  rewrites: [
    {
      // from: '/page/a',
      // to: '/page/a.html'

      from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
      to: function (context) {
        return '/' + context.match[1] + context.match[2] + '.html'
      }
    }
  ]
}
