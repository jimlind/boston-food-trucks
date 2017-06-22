import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import ReduxThunk from 'redux-thunk';

var Scraper = require('../lib/Scraper');
var Data = require('../lib/Data')

import App from '../common/components/App'
import reducers from '../common/reducers'

const express = Express();

var dataFilename = '/app/.data/trucks.json';
var data = new Data(dataFilename);

express.use(Express.static('public'));
express.get('/', (request, response) => {  
  data.getState((state) => {
    const store = Redux.createStore(reducers, state);
    const html = ReactDOMServer.renderToString(
      <ReactRedux.Provider store={store}>
        <App />
      </ReactRedux.Provider>
    )
    
    const finalState = store.getState()
    response.send(renderFullPage(html, finalState))
  });
});

const renderFullPage = (html, preloadedState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Boston Food Truck Tracker</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
}

express.get('/api/food/neighborhood/:neighborhoodId/day/:day/time/:time', data.getTrucksByNeighborhoodAndDay.bind(data));
express.get('/api/neighborhoods', data.getAllNeighborhoods.bind(data));
express.get('/api/days', data.getAllDays.bind(data));
express.get('/api/times', data.getAllTimes.bind(data));

express.get('/scrape', function (request, response) {
  var url = 'https://www.boston.gov/departments/small-business-development/city-boston-food-trucks-schedule';
  var scraper = new Scraper(url, dataFilename);
  scraper.scrape();
  response.send({scraped: true});
});


const listener = express.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});