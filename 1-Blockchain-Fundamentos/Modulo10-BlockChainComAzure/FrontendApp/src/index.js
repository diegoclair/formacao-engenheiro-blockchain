// App Frontend - Cliente

// Imports
const Web3 = require("web3");  
const CryptoJS = require("crypto-js");


// Variaveis

//web3 = new Web3(Web3.givenProvider);   //variavel professor

web3 = new Web3(web3.currentProvider);  //variavel internet


var SupplyChainABI, SupplyChainContract, account


window.App = {
    start: function () {

        // Autentica na Blockchain
        web3.eth.getAccounts(function (err, accounts) {
            console.log("accounts: " + accounts)
            console.log("err: " + err)
            account = accounts[0];
            web3.eth.defaultAccount = account;

            var version = web3.version.api;
            console.log("versão web3: " + version);
        });


        // Obtém o contrato compilado
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:3000';
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var output = JSON.parse(this.response)

                SupplyChainCode = output.contracts[":SupplyChainApp"].bytecode
                var metadata = JSON.parse(output.contracts[":SupplyChainApp"].metadata)
                SupplyChainABI = SupplyChainABI = metadata.output.abi;

                // Usa o contrato compilado para envio e gravação na Blockchain
                SupplyChainContract = new web3.eth.contract(SupplyChainABI)

            }
        }
    },

    // Cria o contrato
    createContract: function () {
        //console.log("Deploying the contract: " + SupplyChainContract);
        SupplyChainContract.deploy ({
                data: SupplyChainCode
            }).send({
                from: account,
                data: SupplyChainCode,
                gas: 3000000
            })
            .on('confirmation', function (confirmationNumber, receipt) {})
            .then(function (newContractInstance) {
                deployedContract = newContractInstance
                document.getElementById("contractAddress").value = deployedContract.options.address;
            });
    },

    // Adiciona nova localidade
    addNewLocation: function () {
        console.log(contractAddress);
        
        var contractAddress = document.getElementById("contractAddress").value;
        var locationId = document.getElementById("locationId").value;
        var locationName = document.getElementById("locationName").value;
        var locationSecret = document.getElementById("secret").value;
        var passPhrase = document.getElementById("passPhrase").value;
        var encryptedSecret = CryptoJS.AES.encrypt(locationSecret, passPhrase).toString();
        var deployedSupplyChain = new web3.eth.contract(SupplyChainABI, contractAddress, {
            from: account,
            gas: 3000000
        });
        deployedSupplyChain.methods.AddNewLocation(locationId, locationName, encryptedSecret).send({
            from: account
        })
    },

    // Obtém localidade atual
    getCurrentLocation: function () {
        var contractAddress = document.getElementById("contractAddress").value;
        var deployedSupplyChain = new web3.eth.contract(SupplyChainABI, contractAddress, {
            from: account,
            gas: 3000000
        });
        var passPhrase = document.getElementById("passPhrase").value;
        deployedSupplyChain.methods.GetTrailCount().call().then(function (trailCount) {
            deployedSupplyChain.methods.GetLocation(trailCount - 1).call().then(function (returnValues) {
                document.getElementById("locationId").value = returnValues[1];
                document.getElementById("locationName").value = returnValues[0];
                var encryptedSecret = returnValues[4];
                var decryptedSecret = CryptoJS.AES.decrypt(encryptedSecret, passPhrase).toString(CryptoJS.enc.Utf8);
                document.getElementById("secret").value = decryptedSecret;
            })
        })


    }
}

window.addEventListener('load', function () {
    App.start();
})