import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import FieldValueType from '../Storage/FieldValueType';

interface IComponentProps {
  fieldValueType: FieldValueType;
  column: number;
  row: number;

  onLeftClick(column: number, row: number): any;

  onRightClick(column: number, row: number): any;
}

class Square extends React.Component<IComponentProps> {
  constructor(props: IComponentProps) {
    super(props);
  }

  public render() {
    return (
      <td
        className="text-center"
        onClick={this.leftClick.bind('', this.props.onLeftClick, this.props.column, this.props.row)}
        onContextMenu={this.rightClick.bind('', this.props.onRightClick, this.props.column, this.props.row)}
      >
        <div className={this.getClass(this.props.fieldValueType)}>
          {this.getValue(this.props.fieldValueType)}
        </div>
      </td>
    );
  }

  private getClass(fieldValueType: FieldValueType) {
    return `btn btn-${this.getTypeClass(fieldValueType)} `;
  }

  private getValue(fieldValueType: FieldValueType) {
    if (fieldValueType.flag) {
      return <FontAwesomeIcon icon="flag"/>;
    }

    if ('undefined' === fieldValueType.type || !fieldValueType.clicked) {
      return <FontAwesomeIcon icon="circle-notch"/>;
    }

    if ('empty' === fieldValueType.type) {
      return <FontAwesomeIcon icon="search-minus"/>;
    }

    if ('bomb' === fieldValueType.type) {
      return <FontAwesomeIcon icon="bomb"/>;
    }

    return fieldValueType.value.toString();
  };

  private getTypeClass(fieldValueType: FieldValueType) {
    if (fieldValueType.flag) {
      return 'primary';
    }

    if (fieldValueType.clicked) {
      if ('empty' === fieldValueType.type) {
        return 'secondary';
      }

      if ('bomb' === fieldValueType.type) {
        return 'danger';
      }

      return 'success';
    }

    return 'light';
  }

  private leftClick(onLeftClick: any, column: number, row: number, e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    onLeftClick(column, row);
  }

  private rightClick(onRightClick: any, column: number, row: number, e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    onRightClick(column, row);
  }
}

export default Square;
