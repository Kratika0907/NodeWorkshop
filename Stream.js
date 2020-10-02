var Stream = require('stream');
var fs = require('fs');

//process.stdin.pipe(process.stdout);

// const writeable = new Stream.Writable({
//     write: function(chunk, encoding, next) {
//         console.log(chunk.toString(), "from writeable stream")
//         next()
// }})
    
// const transform = new Stream.Transform({
//     transform : function (chunk,encoding,done) 
// {   
//     this.push(chunk.toString().toUpperCase())
//     done()
// }
// })

// process.stdin.pipe(transform).pipe(writeable)

// var readableStream = new Stream.Readable()
// readableStream.push('hello');
// readableStream.push('kratika');
// readableStream.push(null);

// readableStream.pipe(process.stdout)
 //#region Push on read stream only when data needs to be consumed
var rs = new Stream.Readable();
var c = 97;
rs._read = function onRead () {
    rs.push(String.fromCharCode(c++))
    if (c > 'z'.charCodeAt(0)) {
        rs.push(null)
    }
 }
 rs.pipe(process.stdout);
 //#endregion

// var rs = new Stream.Readable();
// var c = 97;
// var runCount = 0;

// rs._read = function onReadData(size = 5) {
//     if (c > 'z'.charCodeAt(0)) return rs.push(null);
//     //if (runCount === 5) return rs.push(null);
//     setTimeout(function pushData() {
//         rs.push(String.fromCharCode(c++));
//         runCount++;
//     },100)
// };

// rs.pipe(process.stdout);

// process.on('exit', function () {
//     console.error('\n_read() called ' + runCount + ' times');
// });
// process.stdout.on('error', process.exit);

//#region consuming readable Stream
process.stdin.on('readable', function readData() {
    var buf = process.stdin.read();
    if (buf != null) {
        console.log(buf.toString());
    }
    else {
        console.error('empty buffer')
    }
})
//#endregion

// var ws = fs.createWriteStream('sample.txt');
//  ws.write('hello people');
//  setTimeout(function writeEndMessage() {
//      ws.end('Happy Weekend')
//  },1000)
