import React from 'react';
import './App.css';
import $ from 'jquery';
import _ from 'lodash';
import Async from "react-async"

const TIMEOUT = 5000;
const urlSlackWidgetProxy = 'https://wg2ljjg5da.execute-api.us-east-1.amazonaws.com/dev/profile/view';

// ----------------------------------------------------------------------------
// loadProfile - bring in a profile from the AKDevAlliance slack channel
//
// Returns Promise which resolves with the data obtained from the URL or rejected
// with an Error object.
//
// Utilizes lodash's memoize function to cache the result so that only one fetch
// is made to the same URL.
// ----------------------------------------------------------------------------
const loadProfile = _.memoize(profileId => {
  return new Promise((resolve, reject) => {
    // Set a timeout so that we can provide a graceful way to report network issues
    const hTimeout = setTimeout(() => {
      reject(new Error('Timeout loading profile data'))
    }, TIMEOUT)

    const isErrorCritical = jqXHR => !(jqXHR.readyState === 0 && jqXHR.status === 0)
    const processData = (data) => {
      // perform any necessary data mangling here
      clearTimeout(hTimeout)
      resolve(data)
    }

    // Use jQuery to get the desired data and then upon receipt run the processData function to massage into usable data
    $.get({
      url: urlSlackWidgetProxy,
      dataType: 'json'
    }).done(processData)
      .fail((jqXHR, textStatus) => {
        if (isErrorCritical(jqXHR)) {
          reject(new Error(`Could not load profile data. Status: ${textStatus}`))
        }
      })
  })
})

function App() {
  return (
    <Async promiseFn={loadProfile}>
      {({ data, error, isLoading }) => {
        if (isLoading) return "Loading..."
        if (error) return `Something went wrong: ${error.message}`
        if (data)
          return (
            <div>
              <strong>Loaded some data:</strong>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )
        return null
      }}
    </Async>
  );
}
export default App;