import 'babel-polyfill';
import express from 'express';
import bluebird from 'bluebird';
const server = express();

function loadFile() {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve('foo')
    }, 1000);
  });
}


server.get('/', async (req, res) => {
  let content;
  try {
    content = await loadFile();
  } catch (e) {
    console.log(e);
  }

  res.send('hello world 3');
});

server.listen(8080, (err) => {
  if(!err) {
    console.log('server is start at port 8080');
  }
});
