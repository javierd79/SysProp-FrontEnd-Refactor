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
    <Mantine>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthRouter path="/" component={Dasboard} isPrivate />
        </Switch>
      </Router>
    </Mantine>
  </React.StrictMode>,
)
