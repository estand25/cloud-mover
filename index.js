import React from 'react'
import ReactDom from 'react-dom'
import { App } from './src/app'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from './src/config/firebaseConfig'

ReactDom.render(
    <FirebaseAppProvider firebaseConfig={ firebaseConfig }>
        <App />
     </FirebaseAppProvider>
    ,
    document.getElementById('app')
)