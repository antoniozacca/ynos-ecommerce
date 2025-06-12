import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import routes from './routes/routes'

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {routes.map(({ path, element }, i) => (
            <Route key={i} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </div>
  )
}

export default App
