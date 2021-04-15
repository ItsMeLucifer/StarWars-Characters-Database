import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Pages
import CharsTable from './components/pages/charactersTable/CharsTable';

//CSS
function App() {
  return (
    <div className="App">
      <Router>
        <Route
          path='/'
          render={() => {
            return (
              <CharsTable />
            )
          }}
        />
      </Router>
    </div>
  );
}

export default App;
