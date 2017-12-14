Chatty app
=====================

A realtime chatroom exercise intended to further knowledge of React.

### Usage

1. Clone to your local machine and `cd` to project directory
2. Install dependencies with `npm install`
3. Start the server with `npm start`
4. In a new terminal tab/window, `cd` to `chatty_server` and run `npm start`
5. Browse to http://localhost:3000, or http://0.0.0.0:3000 if running from a Lighthouse Labs Vagrant machine

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
