import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Register } from './register'
import { Dashboard } from './Dashboard'
import { AddDataSiswa } from './AddDataSiswa'
import { EditData } from './EditData'
import { PublicRoute } from './utils/PublicRoute'
import { PrivateRoute } from './utils/PrivateRoute'
import { AddDataCalon } from './AddDataCalon'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/add-calon' element={<PrivateRoute><AddDataCalon /></PrivateRoute>} />
        <Route path='/add-siswa' element={<PrivateRoute><AddDataSiswa /></PrivateRoute>} />
        <Route path='/edit/:teamNameInit' element={<PrivateRoute><EditData /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
