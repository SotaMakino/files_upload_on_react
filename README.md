## Negabook

![alt text](https://github.com/SotaMakino/negabook-client/blob/master/public/negabook-logo.png)
![alt text](https://github.com/SotaMakino/negabook-client/blob/master/public/screenShot2.png)

Here is the url of this site: [Negabook](https://sotamakino.github.io/negabook-client/).

You can also see the backend source code: [negabook-server](https://github.com/SotaMakino/negabook-server).

## Technologies
#### Frontend

- [TypeScript](https://github.com/Microsoft/TypeScript) - A superset of JavaScript that compiles to clean JavaScript output.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces featured Virtual DOM, Data flow, etc.
- [Create React App](https://github.com/facebook/create-react-app) - Officially supported way to create single-page React applications. It offers a modern build setup with no configuration.
- [React Toolbox](http://react-toolbox.io/#/) - A set of React components that implement Google's Material Design specification.
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js.

#### Backend

- Ruby 2.6
- Rails 5.2 - API Only
- [Rack CORS](https://github.com/cyu/rack-cors) - Rack Middleware for handling Cross-Origin Resource Sharing (CORS), which makes cross-origin AJAX possible.
- [PaperClip](https://github.com/thoughtbot/paperclip) - Easy file attachment management for ActiveRecord.
- Amazon S3 - AWS Cloud storage for saving photos.
- Mysql2 for saving Title and Description data.

## Features

- CRUD (create / read / update / delete) on posts.
- Upload photos to S3 and show them all.
- Styled by React Toolbox and can be used intuitively.
- Deployed Heroku and GitHub Pages.


## To-Do

- [x]  Save images to cloud storage AWS S3 from Heroku Dynos.
- [ ]  Migrate to TypeScript. (Doing)
