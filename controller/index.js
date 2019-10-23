const axios = require('axios')
const cheerio = require('cheerio')
const db = require('../model')

module.exports = app => {
  app.get('/', (req, res) => {
    db.Article
      .find()
      .sort({ _id: -1 })
      .limit(20)
      .then(dbArticles => res.render('home', { articles: dbArticles }))
      .catch(error => res.status(500).json(error))
  })

  // DONE step 1: getting a request working from hackerank
  // DONE step 2: create an object for a single article
  // DONE step 3: get an array of scraped article data
  // step 4: save that array into the database
  app.get('/scrape', (req, res) => {
    const hackerRankUrl = 'https://hackernoon.com/tagged/javascript'
    axios
      .get(hackerRankUrl)
      .then(hackerRankResponse => {
        const $ = cheerio.load(hackerRankResponse.data)
        $('.title > a').each((i, element) => {
          db.Article.create({
            title: $(element).text(),
            url: 'https://hackernoon.com' + $(element).attr('href')
          }).catch(console.log)
        })

        res.send('done scraping')
      })
      .catch(error => {
        res.status(500).json(error)
      })
  })
}
