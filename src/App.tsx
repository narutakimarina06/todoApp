import './App.css'
import { Provider } from './components/ui/provider'
import TodoApp from './page/TopPage'

function App() {

  return (
    <Provider>
      <TodoApp/>
    </Provider>
  )
}

export default App
