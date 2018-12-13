import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import Field from './Field';

class App extends React.Component {

  public render() {
    return (
      <div className="container">
        <Field width={4} height={6} />
      </div>
    );
  }
}

export default App;
