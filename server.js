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
   
  // .catch(console.error)


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
      // .catch(error => console.error(error))
  
      
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
  //   quotesCollection.findOneAndUpdate(/* ... */)
  //     .then(result => {
  //        res.json('Success')
  //      })
  //     .catch(error => console.error(error))
  // })})
    // app.get('/', (req, res) => {
    //   res.sendFile(__dirname + '/index.html')

    //   db.collection('quotes').find().toArray()
    //     .then(results => {
    //       console.log(results)
    //     })
    //     .catch(error => console.error(error))
    //   // ...
    // }),

// MongoClient.connect(connectionString, (err, client) => {
//   if (err) return console.error(err)
//   console.log('Connected to Database')
//   const db = client.db('star-wars-quotes')

// })

// app.use(bodyParser.urlencoded({ extended: true }))
// app.get('/', (req, res) => {/*...*/})
// app.post('/quotes', (req, res) => {  console.log(req.body)
// })

// app.listen(3000, function() {
//     console.log('listening on 3200')
//   })

//   app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html')
//   })
//   app.post('/quotes', (req, res) => {
//     console.log('Hellooooooooooooooooo!')
//   })