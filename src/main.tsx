import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MantineProvider as Mantine } from '@mantine/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthRouter from './components/auth/authRouter'
import Login from './pages/Login'
import Dasboard from './pages/Dashboard'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Mantine
      withGlobalStyles
      theme={{
        colors: {
          dark: [
            '#d5d7e0',
            '#acaebf',
            '#8c8fa3',
            '#666980',
            '#4d4f66',
            '#34354a',
            '#2b2c3d',
            '#1d1e30',
            '#0c0d21',
            '#01010a',
          ],
        },
      }}
    >
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthRouter path="/" component={Dasboard} isPrivate />
        </Switch>
      </Router>
    </Mantine>
  </React.StrictMode>,
)
