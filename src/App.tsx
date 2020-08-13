import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Calendar from './pages/Calendar';
import CalendarProvider from './components/CalendarProvider';

import CalendarBuilder from './components/CalendarBuilder';

const App: React.FC = (): JSX.Element => {
    return (
        <Calendar>
            <CalendarProvider>
                <HashRouter>
                    <Switch>
                        <Route path="/:year/:month" component={CalendarBuilder} />
                        <Route path="/" exact component={CalendarBuilder} />
                    </Switch>
                </HashRouter>
            </CalendarProvider>
        </Calendar>
    );
};

export default App;
