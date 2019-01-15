import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import MainModal from './Modal/MainModal';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBomb, faCircleNotch, faFlag, faSearchMinus} from '@fortawesome/free-solid-svg-icons';
import GameState from "./GameState";
import NewGameModalState from "./Modal/NewGameModalState";

library.add(faCircleNotch, faBomb, faFlag, faSearchMinus);

interface IField {
  width: number,
  height: number,
  bombLimit: number;
}

interface IState {
  hasDataToRender: boolean,
  showModal: boolean,
  field: IField;
}

class App extends React.Component {
  public state: IState = {
    hasDataToRender: false,
    showModal: true,
    field: {
      width: 0,
      height: 0,
      bombLimit: 0,
    },
  };

  constructor(props: {}) {
    super(props);
    this.acceptClick = this.acceptClick.bind(this);
  }

  public render() {
    return (
      <div>
        {this.state.hasDataToRender && <GameState
          width={this.state.field.width}
          height={this.state.field.height}
          bombLimit={this.state.field.bombLimit}
        />}
        {this.state.showModal &&
        <MainModal
          body={
            <NewGameModalState
              onAcceptClick={this.acceptClick}
              minNumber={2}
              maxNumber={50}
            />}
        />}
      </div>
    );
  }

  private acceptClick(width: number, height: number, bombLimit:number): void {
    this.setState({
      hasDataToRender: true,
      showModal: false,
      field: {
        'width': width,
        'height': height,
        'bombLimit': bombLimit
      }
    });
  }
}

export default App;
