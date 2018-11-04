import express from 'express'
// const express = require('express')
var app=new express()
app.listen(8080,()=>{
  console.log('The server is listening on: 8080!');
})
