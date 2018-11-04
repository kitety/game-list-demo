import express from 'express'
import mongodb from 'mongodb';
// const express = require('express')
var app = new express()
const dbURL = 'mongodb://localhost'
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
