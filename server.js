const express = require('express');
const bodyParser= require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient
connectionString='mongodb+srv://yoda:linkin123@cluster0.smca1.mongodb.net/star-wars?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    app.listen(3000, function() {
      console.log('listening on 3000')
    })
    var http = require("https");

    var options = {
      "method": "GET",
      "hostname": "bet365-sports-odds.p.rapidapi.com",
      "port": null,
      "path": "/v1/bet365/result?event_id=%3Crequired%3E",
      "headers": {
        "x-rapidapi-host": "bet365-sports-odds.p.rapidapi.com",
        "x-rapidapi-key": "8b214088fcmsh1fe438adc083776p1dd1ebjsn2ad13c4ccf3d",
        "useQueryString": true
      }
    };
    
    var req = http.request(options, function (res) {
      var chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
    
    req.end();
    
    app.use(express.static('views/public'))

    app.use(bodyParser.urlencoded({ extended: true }))
    const db1= client.db('star-wars')
    const quotesCollectiona = db1.collection('quotes')

    console.log("conexión establecida")
    const db = client.db('star-wars')
    const quotesCollection = db.collection('quotes')
    app.set('view engine', 'ejs')

    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results })
        })
        .catch(/* ... */)
    })
    app.post('/quotes', (req, res) => {
      console.log(req.body);

      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
   


  app.use(bodyParser.json())
  app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate({ name: 'miguel' },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    {
      upsert: true
    }
  )
  .then(result => {      console.log(result)
  })
  .catch(error => console.error(error))
  
      
})
app.delete('/quotes', (req, res) => {
 quotesCollection.deleteOne(
    { name: req.body.name }
  )
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json(`Deleted Darth Vadar's quote`)
    })
    .catch(error => console.error(error))
   })
   })
  