import express from 'express'
import mongodb from 'mongodb';
// const express = require('express')
var app = new express()
const dbURL = 'mongodb://localhost'
mongodb.MongoClient.connect(dbURL, (err, client) => {
  if (err) {
    throw err
  }
  console.log('数据库创建!');
  const db = client.db('crud')
  app.get('/api/games', (req, res) => {
    // find --select
    db.collection('games').find({}).toArray((err, games) => {
      res.json({ games })
    })
  })
  app.listen(8080, () => {
    console.log('The server is listening on: 8080!');
  })
})
