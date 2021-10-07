import AuthState   from '../context/auth/authState'
import AppState from '../context/app/appState';
import React from 'react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    
    <AuthState>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </AuthState>
    
  )
}

export default MyApp;