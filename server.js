var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


app.get('/', function(req, res){
  var data;
  url = 'http://www.ssef.com.sg/ssef/website/getProjectListForPublic'
  request(url, function(err, response, html){
    if(!err){
    }
    data = (html.substr(28)).slice(0, -16);
    var n = data.search('"projectId":"3822","projectCode":"13","title":"');
    data = data.slice(0, n + 48) + data.slice(n + 49);
    var jsonObj = JSON.parse(data);
    var all = [];
    var schList = ["NUS HIGH SCHOOL OF MATHEMATICS AND SCIENCE", "RAFFLES INSTITUTION", "HWA CHONG INSTITUTION", "NATIONAL JUNIOR COLLEGE"];
})

app.listen('8080');
console.log('App listenining at port 8080');

exports = module.exports = app;
