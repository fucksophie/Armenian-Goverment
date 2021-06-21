import express from 'express';
import ejs from 'ejs';
import chalk from 'chalk';
import path from 'path';
import busboy from "connect-busboy";

import { addPost, getPosts, Post } from './util/posts';
import { writeFileSync } from 'fs';

const app = express();

app.use(express.static(path.resolve('public')));
app.use("/submit", busboy());

app.set('view engine', 'html');

app.set('views', path.resolve('website'));

app.engine('.html', ejs.renderFile);


app.get('/', (req, res) => {
  res.render('index', {
    posts: getPosts(),
  });
});


app.post('/submit', function (req, res) {
  let title = "";
  let image: Buffer | null = null;

  if (req.busboy === undefined) {
    res.send({
      "error": true,
      "message": "Invalid form data"
    })
    return;
  }

  req.busboy.on('field', (fieldName: string, value) => {
    if(fieldName == "title") {
      title = value;
    }
  });

  req.busboy.on('file', (fieldName: string, file, _) => {
    if (fieldName === 'image') {
      file.on('data', (data: Buffer) => {
          if (image === null) {
              image = data
          } else {
              image = Buffer.concat([image, data])
          }
      })
  }
  });

  req.busboy.on('finish', () => {
    if(!(title.length >= 2 && title.length <= 50)) {
      res.send({
        "error": true,
        "message": "Title has to be bigger than 2, but smaller than 50."
      })
  
      return;
    }
  
    if(!image) {
      res.send({
        "error": true,
        "message": "Missing image."
      })
      return;
    }
  
    res.send({
      "error": false,
      "message": "Post submitted!"
    })
    
    const path = `image/${Math.floor(Math.random()*99999999999999999)}.png`
    
    writeFileSync("public/" + path, image);

    addPost(new Post(path, title))
  })

  req.pipe(req.busboy);
})

app.listen(20002);

console.log(chalk.blue.bold.italic('Started Express'));
