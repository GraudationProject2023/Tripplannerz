import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '@/store/reducer/index.ts'
import App from './App.tsx'

const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider> 
  ,
)
