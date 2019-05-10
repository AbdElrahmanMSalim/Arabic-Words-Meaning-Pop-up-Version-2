const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');

app.get('/:word', async (req, res) => {

    const searchWord = req.params.word
    console.log('I got a message' + searchWord);

    word = encodeURI(searchWord);
    await request('https://www.almaany.com/ar/dict/ar-ar/' + word , function (error, response, html) {
        console.log(error, response.statusCode)
        const $ = cheerio.load(html);
        const meanings= $('.meaning-results');
        res.send(meanings.html() ? meanings.html() : "لم يفلح البحث");
        
    })
});

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`listenning on ${port}`)
})


