var express = require('express');
var solc = require('solc')
var cors = require('cors')
var fs = require('fs')
var path = require('path')

var app = express();
app.use(cors());

app.listen(3000);

app.get('/', function(req,res){
  const contractPath= path.resolve(__dirname, 'contracts', 'SupplyChainApp.sol')
  var contractSource = fs.readFileSync(contractPath).toString()
  var compiledContract = solc.compile(contractSource, 1);
  res.status(200);
  res.send(compiledContract);
});



