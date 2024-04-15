import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'

export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
  return { html }
}
