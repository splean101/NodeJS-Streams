const fs = require('fs');
const stream = require('stream');

class Transform extends stream.Transform {
    constructor() {
        super({ objectMode: true });
    }
    _transform(chunk, encoding, callback) {
        let res = chunk.toLowerCase();
        let RegExp = /\s/g;
        res.replace(RegExp, '......');
        this.push(res);
        callback();
    }
};

let rs = fs.createReadStream('./input.txt', 'utf8');
let tf = new Transform();
let ws = fs.createWriteStream('./output.txt');

tf.on("data", (chunk) => {
    console.log(`Data: ${chunk}`);
});

rs.pipe(tf).pipe(ws);
