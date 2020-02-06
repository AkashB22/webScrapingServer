let express = require('express');
let router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');
let ArticleModel = require('./../models/articles');

/* GET users listing. */
router.get('/search/:name', function(req, res, next) {
  let name = req.params.name;
  console.log(name);
  ArticleModel.find({title: {$regex: name, $options: 'i'}})
    .then(articles=>{
      res.status(200).json(articles);
    })
    .catch(err=> next(err));
});

router.post('/save/:month', async (req, res, next)=>{
  let date = {
    '01': '31',
    '02': '28',
    '03': '31',
    '04': '30',
    '05': '31',
    '06': '30',
    '07': '31',
    '08': '31',
    '09': '30',
    '10': '31',
    '11': '30',
    '12': '31',
  };

  let givenMonth = req.params.month ? req.params.month : '01';
  let month = (givenMonth.toString().split('').length === 1) ? `0${givenMonth}` : givenMonth;
  let days = date[month];

  console.log(`Loading month - ${month} and day- ${days}`);

  for(let i=1; i<=days-8; i++){
    let day = (i.toString().split('').length === 1) ? `0${i}` : i;

    axios.get(`https://www.thehindu.com/archive/web/2010/${month}/${day}/`)
      .then((resp) => {
        let $ = cheerio.load(resp.data);
        let li = $('ul.archive-list').children('li').children('a');

        li.each(function (i, e) {
          let newArticle = new ArticleModel({
            title: $(this).text(),
            linkUrl: $(this).attr('href')
          })

          newArticle.save();
        });
      })
      .catch(err => res.status(429).json({'info': 'partial loading of data for the requested month has been completed due to limits on requests send to the hindu'}))

    await new Promise((response)=>setTimeout(response, 1000));
    console.log(day);
  }

  res.status(200).json({'info': 'data load completed'});
})

module.exports = router;
