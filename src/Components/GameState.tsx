import * as React from 'react';
import FieldValueType from '../Storage/FieldValueType';
import MainModal from "./Modal/MainModal";
import SimpleMessageModal from "./Modal/SimpleMessageModal";
import Field from "./Field";

interface IComponentProps {
  height: number;
  width: number;
  bombLimit: number;
}

interface IPosition {
  column: number;
  row: number
}

const WonGameModal = () => (
  <MainModal body={<SimpleMessageModal message="Congratulations, you win!"/>}/>
);

const LostGameModal = () => (
  <MainModal body={<SimpleMessageModal message="Sorry, you lost!"/>}/>
);

class GameState extends React.Component<IComponentProps> {
  public state: {
    fieldData: [] | FieldValueType[][],
    lostGame: boolean,
    counter: number
  };

  constructor(props: IComponentProps) {
    super(props);
    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
    this.state = {
      fieldData: [],
      lostGame: false,
      counter: 1
    };
  }

  public render() {
    return (
      <div>
        <Field
          fieldData={this.state.fieldData}
          onLeftClick={this.onLeftClick}
          onRightClick={this.onRightClick}
        />
        {this.state.lostGame && <LostGameModal/>}
        {0 === this.state.counter && <WonGameModal/>}
      </div>
    );
  }

  public componentWillMount() {
    this.prepareFields();
    this.renderBombs(this.state.fieldData, this.props.height, this.props.width);
    this.calculateFields(this.state.fieldData);
    this.resetBombQuantity();
  }

  private prepareFields(): void {
    for (let i = 0; i < this.props.height; i++) {
      this.state.fieldData[i] = [];
      for (let j = 0; j < this.props.width; j++) {
        this.state.fieldData[i][j] = new FieldValueType();
      }
    }
  }

  private revealFieldElement(column: number, row: number): FieldValueType {
    const clickedValue: FieldValueType = Object.assign({}, this.state.fieldData[column][row]);
    if (clickedValue.flag || clickedValue.clicked) {
      return clickedValue;
    }
    clickedValue.clicked = true;

    return clickedValue;
  }

  private getQuantityOfNearestBombs(clickedValue: FieldValueType): FieldValueType {
    if ('undefined' === clickedValue.type) {
      clickedValue.type = 'value';
      clickedValue.value = 1;
    } else {
      clickedValue.value++;
    }

    return clickedValue;
  }

  private onLeftClick(column: number, row: number): void {
    let newFieldData = this.state.fieldData.slice(0);
    if (newFieldData[column][row].flag) {
      return;
    }

    if ('bomb' === newFieldData[column][row].type) {
      newFieldData = this.revealAllBombFields(newFieldData);
      this.setState({lostGame: true, fieldData: newFieldData});

      return;
    }

    const clickedValue = this.revealFieldElement(column, row);

    newFieldData[column][row] = clickedValue;
    if ('empty' === clickedValue.type) {
      this.revealNearEmptyElements(newFieldData, column, row, [], 0)
    }

    this.setState({fieldData: newFieldData});
  };

  private onRightClick(column: number, row: number): void {
    const newFieldData = this.state.fieldData.slice(0);
    if (newFieldData[column][row].clicked) {
      return;
    }

    newFieldData[column][row].flag = !newFieldData[column][row].flag;
    this.setState({'fieldData': newFieldData});

    return;
  }

  private revealNearEmptyElements(fieldData: FieldValueType[][], column: number, row: number, excluded: boolean[][] | [], iterator: number) {
    if (iterator === 10000) {
      console.log('wszelo');
      return;
    }
    iterator++;
    for (const neighboringElement of this.getNeighboringElements(column, row)) {
      if (!this.fieldDataElemExists(neighboringElement.column, neighboringElement.row)) {
        continue;
      }

      if (undefined === excluded[neighboringElement.column]) {
        excluded[neighboringElement.column] = [];
      }

      if (undefined !== excluded[neighboringElement.column][neighboringElement.row]) {
        continue;
      }
      excluded[neighboringElement.column][neighboringElement.row] = true;

      let newValue: FieldValueType;
      if ('empty' === this.state.fieldData[neighboringElement.column][neighboringElement.row].type) {
        newValue = Object.assign({}, this.state.fieldData[column][row]);
        fieldData[column][row] = newValue;
        this.revealNearEmptyElements(fieldData, neighboringElement.column, neighboringElement.row, excluded, iterator);
      } else if ('empty' === this.state.fieldData[column][row].type){
        newValue = Object.assign({}, this.state.fieldData[neighboringElement.column][neighboringElement.row]);
        fieldData[neighboringElement.column][neighboringElement.row] = newValue;
      } else {
        continue;
      }
      this.state.counter--;
      newValue.clicked = true;
      newValue.flag = false;
    }
  }

  private calculateFields(fieldData: FieldValueType[][]) {
    this.state.fieldData = fieldData.map((row, x) =>
      row.map((field, y) => {
        let currentElement: FieldValueType = Object.assign({}, this.state.fieldData[x][y]);
        for (const neighboringElement of this.getNeighboringElements(x, y)) {
          if (!this.fieldDataElemExists(neighboringElement.column, neighboringElement.row)) {
            continue;
          }

          if ('bomb' === this.state.fieldData[neighboringElement.column][neighboringElement.row].type) {
            currentElement = this.getQuantityOfNearestBombs(currentElement);
          }
        }

        if ('undefined' === currentElement.type) {
          currentElement.type = 'empty';
        }

        return currentElement;
      })
    );
  }


  private revealAllBombFields(fieldData: FieldValueType[][]): FieldValueType[][] {
    return fieldData.map(row =>
      row.map(field => {
        if (field.type === 'bomb') {
          field.clicked = true;
        }
        return field;
      })
    );
  }

  private renderBombs(fieldData: FieldValueType[][], height: number, width: number): FieldValueType[][] {
    let quantityBombsToAdd = this.props.bombLimit;
    const excluded: boolean[][] | [] = [];
    let randomHeight: number = height;
    let randomWidth: number = width;
    excluded[randomHeight] = [];

    do {
      excluded[randomHeight][randomWidth] = true;

      randomHeight = Math.floor(Math.random() * this.props.height);
      randomWidth = Math.floor(Math.random() * this.props.width);

      if (undefined === excluded[randomHeight]) {
        excluded[randomHeight] = [];
      }

      if (undefined === excluded[randomHeight][randomWidth]) {
        fieldData[randomHeight][randomWidth].type = 'bomb';
        quantityBombsToAdd--;
      }

    } while (quantityBombsToAdd > 0);

    return fieldData;
  }

  private fieldDataElemExists(column: number, row: number): boolean {
    return (undefined !== this.state.fieldData[column] && undefined !== this.state.fieldData[column][row])
  }

  private getNeighboringElements(column: number, row: number): IPosition[] {
    return [
      {'column': column - 1, 'row': row - 1},
      {'column': column, 'row': row - 1},
      {'column': column + 1, 'row': row - 1},
      {'column': column - 1, 'row': row},
      {'column': column + 1, 'row': row},
      {'column': column - 1, 'row': row + 1},
      {'column': column, 'row': row + 1},
      {'column': column + 1, 'row': row + 1},
    ];
  }

  private resetBombQuantity(): void {
    this.state.counter = this.props.width * this.props.height - this.props.bombLimit;
  }
}

export default GameState;
