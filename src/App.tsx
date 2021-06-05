import './assets/App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Page404 from './components/errors/Page404';
import Home from './components/home/Home';
import Backups from './components/backups/Backups';

const App = () => (
  <Switch >
    <Route exact path='/' component={Home} />
    <Route exact path='/backups' component={Backups} />
    <Route path='*' component={Page404} />
  </Switch>
);

export default withRouter(App);