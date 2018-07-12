// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("C:/Users/Tyler/cmps115/squadup/frontend/.cache/layouts/index.js"))
}

exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\.cache\\dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\src\\pages\\404.js")),
  "component---src-pages-app-js": preferDefault(require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\src\\pages\\App.js")),
  "component---src-pages-event-page-js": preferDefault(require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\src\\pages\\event_page.js")),
  "component---src-pages-index-js": preferDefault(require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\src\\pages\\index.js")),
  "component---src-pages-page-2-js": preferDefault(require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\src\\pages\\page-2.js"))
}

exports.json = {
  "layout-index.json": require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\.cache\\json\\layout-index.json"),
  "dev-404-page.json": require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\.cache\\json\\dev-404-page.json"),
  "404.json": require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\.cache\\json\\404.json"),
  "app.json": require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\.cache\\json\\app.json"),
  "event-page.json": require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\.cache\\json\\event-page.json"),
  "index.json": require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\.cache\\json\\index.json"),
  "page-2.json": require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\.cache\\json\\page-2.json"),
  "404-html.json": require("C:\\Users\\Tyler\\cmps115\\squadup\\frontend\\.cache\\json\\404-html.json")
}