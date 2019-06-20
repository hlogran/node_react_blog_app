import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ArticleDashboard from '../../containers/dashboard';
import ArticleForm from '../articleForm';
import ArticleRead from '../articleRead';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={ArticleDashboard} />
            <Route
              exact
              path='/new'
              render={() => <ArticleForm isNew={true} />}
            />
            <Route
              exact
              path='/edit/:id'
              render={() => <ArticleForm isNew={false} />}
            />
            <Route exact path="/read/:id" component={ArticleRead} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
