import './assets/App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Page404 from './components/Errors/Page404';
import Home from './components/Home';

const App = () => (
  <Switch >
    <Route exact path='/' component={Home} />
    <Route path='*' component={Page404} />
  </Switch>
);

export default withRouter(App);