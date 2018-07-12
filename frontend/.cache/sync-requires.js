// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/.cache/layouts/index.js"))
}

exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/src/pages/404.js")),
  "component---src-pages-app-js": preferDefault(require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/src/pages/App.js")),
  "component---src-pages-event-page-js": preferDefault(require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/src/pages/event_page.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/src/pages/index.js")),
  "component---src-pages-page-2-js": preferDefault(require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/src/pages/page-2.js"))
}

exports.json = {
  "layout-index.json": require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/.cache/json/layout-index.json"),
  "dev-404-page.json": require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/.cache/json/dev-404-page.json"),
  "404.json": require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/.cache/json/404.json"),
  "app.json": require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/.cache/json/app.json"),
  "event-page.json": require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/.cache/json/event-page.json"),
  "index.json": require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/.cache/json/index.json"),
  "page-2.json": require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/.cache/json/page-2.json"),
  "404-html.json": require("/Users/Collin/Documents/UCSC/CMPS115/SquadUp/frontend/.cache/json/404-html.json")
}