import express from 'express'
import mongodb from 'mongodb';
import bodyParser from 'body-parser'
// const express = require('express') es6的兼容
var app = new express()
app.use(bodyParser.json()); // 中间件方法
const dbURL = 'mongodb://localhost'
const validData = (data) => {
  let errors = {}
  if (data.title === '') errors.title = "The title can't be empty"
  if (data.cover === '') errors.cover = "The image can't be empty"
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid }

}
mongodb.MongoClient.connect(dbURL, { useNewUrlParser: true }, (err, client) => {
  if (err) { throw err }
  console.log('数据库创建成功!')
  const db = client.db('crud')

  app.get('/api/games', (req, res) => {
    // find --select功能
    db.collection('games').find({}).toArray((err, games) => {
      res.json({ games })
    })
  })
  app.post('/api/games', (req, res) => {
    const { errors, isValid } = validData(req.body)
    if (isValid) {
      const { title, cover } = req.body;
      db.collection('games').insert({ title, cover }, (err, result) => {
        if (err) {
          res.status(500).json({
            global: 'Still Working on it.Please try again later than when we implement it'
          })
        } else {
          res.json({ games: result.ops[0] })
        }
      })
      app.get('/api/game/:_id', (req, res) => {
        db.collection('games').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, game) => {
          res.json({ game })
        })
      })
    } else {
      res.status(400).json({ errors })
    }
  })
  // 匹配不到执行这里
  app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: 'Still Working on it.Please try again later than when we implement it'
      }
    })
  })

  app.listen(8080, () => {
    console.log('The server is listening on: 8080!');
  })
})
