const http = require('http');
const fs = require('fs');

const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms)
  })
}

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const server = http.createServer(async (request, response) => {
  switch (request.url) {
    case '/home': {
      try {
        const data = await readFile('pages/about.html')
        response.write(data);
        response.end();
      } catch (err) {
        response.write(err.toString());
        response.end();
      }

      break;
    }
    case '/about': {
      await delay(3000);
      response.write('about course');
      response.end();
      break;
    }
    default: {
      response.write('404 not found')
      response.end()
    }
  }
})

server.listen(3003);