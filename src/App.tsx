import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Calendar from './pages/Calendar';
import CalendarBuilder from './components/CalendarBuilder';

function App(): JSX.Element {
    return (
        <Calendar>
            <HashRouter>
                <Switch>
                    <Route path="/:year/:month" component={CalendarBuilder} />
                    <Route path="/" exact component={CalendarBuilder} />
                </Switch>
            </HashRouter>
        </Calendar>
    );
}

export default App;
