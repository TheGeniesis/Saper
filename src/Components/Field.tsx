import * as React from 'react';
import PositionDTO from '../DTO/PositionDTO';
import BombFieldValueType from '../FieldValueType/BombFieldValueType';
import EmptyFieldValueType from '../FieldValueType/EmptyFieldValueType';
import IFieldValueType from '../FieldValueType/IFieldValueType';
import UndefinedFieldValueType from '../FieldValueType/UndefinedFieldValueType';
import ValueFieldValueType from '../FieldValueType/ValueFieldValueType';
import Square from './Square';

interface IComponentProps {
  width: number;
  height: number;
}

class Field extends React.Component<IComponentProps> {
  private fieldDimension: PositionDTO;
  private fieldData: IFieldValueType[][] | [];
  constructor(props: IComponentProps) {
    super(props);
    this.fieldDimension = new PositionDTO(this.props.width, this.props.height);
    this.fieldData = [];
  }

  public render() {
    this.calculate(1, 1);
    return (
      <div className="col-md-offset-1 col-md-10">
        {this.renderSquares()}
      </div>
    );
  }

  private renderSquares() {
    const returnHtml = [];
    for (let i = 0; i < this.fieldDimension.height; i++) {
      returnHtml.push(this.getRow(i));
    }

    return returnHtml;
  }

  private getWidthSquares(height: number) {
    const returnHtml = [];
    for (let j = 0; j < this.fieldDimension.width; j++) {
      returnHtml.push(<Square state={this.getNewState(j, this.fieldDimension.height)} />);
    }

    return returnHtml;
  }

  private getNewState(width: number, height: number): UndefinedFieldValueType {
    const field = new UndefinedFieldValueType();
    if (undefined === this.fieldData[width]) {
      this.fieldData[width] = [];
    }
    this.fieldData[width][height] = field;

    return field;
  }

  private getRow(height: number) {
    return React.createElement('div', { 'className': 'row' }, this.getWidthSquares(height));
  }

  private calculate(width: number, height: number): void {
    return;
    let clickedValue: IFieldValueType = this.fieldData[width][height];
    if (clickedValue.flag || clickedValue.clicked) {
      return;
    }

    if (clickedValue instanceof BombFieldValueType && clickedValue.flag) {
      alert('end game, you lost');
    }

    const tableToCheck: PositionDTO[] = [
      new PositionDTO(width - 1, height - 1),
      new PositionDTO(width - 1, height),
      new PositionDTO(width - 1, height + 1),
      new PositionDTO(width, height - 1),
      new PositionDTO(width, height),
      new PositionDTO(width, height + 1),
      new PositionDTO(width + 1, height - 1),
      new PositionDTO(width + 1, height),
      new PositionDTO(width + 1, height + 1),
    ];

    for (const neighboringElement of tableToCheck) {
      if (undefined === this.fieldData[neighboringElement.width][neighboringElement.height]) {
        continue;
      }

      const fieldInstance = this.fieldData[neighboringElement.width][neighboringElement.height];
      if (fieldInstance instanceof EmptyFieldValueType) {
        this.calculateNext(fieldInstance);
      }
      if (fieldInstance instanceof BombFieldValueType) {
        if (clickedValue instanceof UndefinedFieldValueType) {
          clickedValue = new ValueFieldValueType();
          clickedValue.value = 1;
        } else {
          clickedValue.value++;
        }
      }
    }
  }

  private calculateNext(fieldInstance: EmptyFieldValueType) {
    return;
  }
}


export default Field;
