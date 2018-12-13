import * as React from 'react';
import BombFieldValueType from '../FieldValueType/BombFieldValueType';
import EmptyFieldValueType from '../FieldValueType/EmptyFieldValueType';
import IFieldValueType from '../FieldValueType/IFieldValueType';
import UndefinedFieldValueType from '../FieldValueType/UndefinedFieldValueType';

interface IComponentProps {
  state: IFieldValueType;
  // handleClick: any;
}

class Square extends React.Component<IComponentProps> {
  constructor(props: IComponentProps) {
    super(props);
  }

  public render() {
    return (
      <button className={this.getClass()} disabled={this.checkDisabled()}>
        {/* <button className="square btn btn-{this.getTypeClass()}" disabled={this.checkDisabled()} onClick={this.props.handleClick()}> */}
        {this.getValue()}
      </button>
    );
  }
  // private handleClick(e: React.MouseEvent<HTMLElement>): void {
  //   e.preventDefault();
  // };

  private getValue(): string {
    if (this.props.state.flag) {
      return 'flag';
    }

    if (
      this.props.state instanceof EmptyFieldValueType ||
      this.props.state instanceof UndefinedFieldValueType
    ) {
      return ' ';
    }

    if (this.props.state instanceof BombFieldValueType) {
      return 'x';
    }

    return this.props.state.value.toString();
  }
  private getClass(): string {
    return `square btn btn-${this.getTypeClass()}`;
  }

  private getTypeClass(): string {
    if (this.props.state.flag) {
      return 'secondary';
    }
    if (this.props.state instanceof BombFieldValueType) {
      return 'danger';
    }

    return 'light';
  }

  private checkDisabled(): boolean {
    return this.props.state.clicked;
  }
}

export default Square;
