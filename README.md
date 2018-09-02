## Negabook

![alt text](https://github.com/SotaMakino/negabook-client/blob/master/public/nega_pic_v4.png)
![alt text](https://github.com/SotaMakino/negabook-client/blob/master/public/screenShot2.png)

Here is the url of this site: [Negabook](https://sotamakino.github.io/negabook-client/).

You can also see the backend source code: [negabook-server](https://github.com/SotaMakino/negabook-server).

## Technologies
#### Frontend

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces featured Virtual DOM, Data flow, etc.
- Create React App - Officially supported way to create single-page React applications. It offers a modern build setup with no configuration.
- React Toolbox - A set of React components that implement Google's Material Design specification.
- axios - Promise based HTTP client for the browser and node.js.

#### Backend

- Ruby 2.6
- Rails 5.2
- Rack CORS - Rack Middleware for handling Cross-Origin Resource Sharing (CORS), which makes cross-origin AJAX possible.
- PaperClip - Easy file attachment management for ActiveRecord.
- S3 - AWS Cloud storage for saving photos.
- Mysql2 for saving Title and Description data.

## Features

- CRUD (create / read / update / delete) on posts.
- Upload photos to S3 and show them all.


## To-Do

- [x]  Save images to cloud storage AWS S3 from Heroku Dynos
- [ ]  Migrating to TypeScript
