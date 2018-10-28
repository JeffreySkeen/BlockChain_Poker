const _SHA256 = require('crypto-js/sha256');

class Block {
    constructor(TImeStamp, data) 
    {
        this.index = 0;
        this.TImeStamp = TImeStamp;
        this.data = data;
        this.prevHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return _SHA256(this.index
            + this.prevHash
            + this.TImeStamp
            + this.data
            + this.nonce).toString();
    }

    mineBlock() {

    }
}

class BlockChain {
    constructor() 
    {
        this.chain = [this.createGenesis()];
    }

    createGenesis() {
        return new Block(0, "28/10/18", "Genesis Block", "0");
    }

    latestBlock() {
        return this.chain[this.chain.length - 1];
    }


    addBlock(newBlock){
        newBlock.prevHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        newBlock.index = this.latestBlock().index +1;
        this.chain.push(newBlock);
    }// addBlock


    checkValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.prevHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }// check valid
}// blockchain


//#region populate and test blockchain
let mainChain = new BlockChain();

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

function addBlocks(numberBlocksToAdd){
    var j = 0;

    for(j;j<numberBlocksToAdd;j++){
        var date = new Date(Date.now());
        var rdmAmount = Math.floor(Math.random()+10) + 1;
        let blockToAdd = new Block(date.toUTCString(), {amount: rdmAmount});
        mainChain.addBlock(blockToAdd);

        console.log("block " + j + "\t hash is => \t\t" + blockToAdd.hash 
        + "\n\t previous hash is => \t" + blockToAdd.prevHash 
        + "\n\t at index =>\t\t" + mainChain.latestBlock().index);
        console.log("\n");

        wait(1000);
    }
}

addBlocks(5);
console.log("is chain valid  " + mainChain.checkValid());
//#endregion