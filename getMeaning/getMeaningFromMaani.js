const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const express = require('express');
const app = express();



app.get('/:word', async (req, res) => {

    const searchWord = req.params.word
    console.log('I got a message' + searchWord);

    word = encodeURI(searchWord);
    await request('https://www.almaany.com/ar/dict/ar-ar/' + word , (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const meanings= $('.meaning-results');
            
            res.send(meanings.html() ? meanings.html() : "لم يفلح البحث")
        }
        else{
            console.log(error)
            res.status(404)
        }
    })
});

app.listen(5001, () => {
    console.log('listenning on 5001')
})


