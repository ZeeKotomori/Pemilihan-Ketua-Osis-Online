import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Register } from './register'
import { Dashboard } from './Dashboard'
import { AddData } from './AddData'
import { EditData } from './EditData'
import { PublicRoute } from './utils/PublicRoute'
import { PrivateRoute } from './utils/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/add' element={<PrivateRoute><AddData /></PrivateRoute>} />
        <Route path='/edit' element={<PrivateRoute><EditData /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
