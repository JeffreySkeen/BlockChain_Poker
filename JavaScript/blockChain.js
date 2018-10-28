class Block{
    constructor(TImeStamp, data)
    {
        this.index = 0;
        this.TImeStamp = TImeStamp;
        this.data = data;
        this.prevHash = "0";
        this.hash = calculateHash();
        this.nonce = 0;
    }

    calculateHash(){

    }

    mineBlock(){
        
    }
}