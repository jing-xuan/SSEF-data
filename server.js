var express = require('express');
var fs = require('fs');
var app = express();

function readContent(callback) {
  fs.readFile("/JX/CS/SSEF/data.txt", "utf8", function (err, content) {
    if (err) return callback(err)
    callback(null, content)
  })
}

function parseProject(jsonObj, awardlist){
  //60 - finals, 20 - file submitted, 10 - registered, 5 - saved
  var timeline = [];
  for(var i = 0; i< Object.keys(jsonObj).length; i++){
    var statusList = ["60", "20", "10", "5"];
    var status = ["final", "fileSubmitted", "registered", "saved"];
    var bi = ["AS", "BI", " BM", "BE", "CB", "CO", "EE", "MI", "PS", "TM", "EA"];
    var ph = ["ES", "EP", "MS", "PH", "EM"];
    var cm = ["CH", "EC"];
    var ma = ["MA"];
    var cs = ["RO", "SS"];
    var proj = {
      "ID" : "",
      "sbj" : "",
      "code" : "",
      "sch" : "",
      "status" : "",
      "subTime" : "",
      "award" : ""
    };
      if(statusList.indexOf(jsonObj[i]['status']) != -1 && jsonObj[i]['category1'] != 'JBO' && jsonObj[i]['category1'] != 'JCH' && jsonObj[i]['category1'] != 'JCO' && jsonObj[i]['category1'] != 'JMA' && jsonObj[i]['category1'] != 'JPH' ){
        proj["status"] = jsonObj[i]['status'];
        proj["sch"] = jsonObj[i]['school'];
        proj["ID"] = i;
        proj["code"] = jsonObj[i]['category1'];
        if(jsonObj[i]['projectCode'].length == 1){
          proj["code"] += "00";
        }else if(jsonObj[i]['projectCode'].length == 2){
          proj["code"] += "0";
        }
        proj["code"] += jsonObj[i]['projectCode'];
        if(awardlist[proj["code"]] == undefined){
          proj["award"] = 'none';
        }else{
          proj["award"] = awardlist[proj["code"]];
        }
        proj["subTime"] = jsonObj[i]['submissionDate'];
        if(bi.indexOf(jsonObj[i]['category1']) != -1){
          proj["sbj"] = "bi";
          timeline.push(proj);
        }else if(cm.indexOf(jsonObj[i]['category1']) != -1){
          proj["sbj"] = "cm";
          timeline.push(proj);
        }else if(ph.indexOf(jsonObj[i]['category1']) != -1){
          proj["sbj"] = "ph";
          timeline.push(proj);
        }else if(ma.indexOf(jsonObj[i]['category1']) != -1){
          proj["sbj"] = "ma";
          timeline.push(proj);
        }else if(cs.indexOf(jsonObj[i]['category1']) != -1){
          proj["sbj"] = "cs";
          timeline.push(proj);
        }
      }
    }
  return timeline;
}

app.get("/", function(req, res){
  readContent(function (err, content) {
      var jsonObj = JSON.parse(content);
      var list = parseProject(jsonObj['projects'], jsonObj['awards']);
      //console.log(list);
      res.render('index.ejs', {projects: list})
  })
})

app.listen('8080');
console.log('App listenining at port 8080');
