import * as React from 'react';
import NewGameModalForm from "./NewGameModalForm";

interface IState {
  width: string,
  height: string,
  bombLimit: string,
  minBombLimit: number,
  maxBombLimit: number,
  errorMessage: string
}

interface IComponentProps {
  onAcceptClick: any;
  minNumber: number;
  maxNumber: number;
}

class NewGameModalState extends React.Component<IComponentProps> {
  public state: IState = {
    width: '10',
    height: '10',
    bombLimit: '10',
    minBombLimit: 1,
    maxBombLimit: 98,
    errorMessage: ''
  };

  constructor(props: IComponentProps) {
    super(props);
    this.bombLimitValueChanged = this.bombLimitValueChanged.bind(this);
    this.fieldValueChanged = this.fieldValueChanged.bind(this);
  }

  public render() {
    return (
        <NewGameModalForm
          onAcceptClick={this.props.onAcceptClick}
          bombLimitValueChanged={this.bombLimitValueChanged}
          fieldValueChanged={this.fieldValueChanged}
          minNumber={this.props.minNumber}
          maxNumber={this.props.maxNumber}
          width={this.state.width}
          height={this.state.height}
          bombLimit={this.state.bombLimit}
          minBombLimit={this.state.minBombLimit}
          maxBombLimit={this.state.maxBombLimit}
          errorMessage={this.state.errorMessage}
        />
    );
  }

  private fieldValueChanged(name: 'width' | 'height', newValue: string) {
    const mainValue = parseInt(newValue, 10);
    const secondValue = parseInt(this.state['width' === name ? 'height' : 'width'], 10);

    if (!this.hasValidInput(mainValue, secondValue)) {
      this.setState({
        name: newValue,
        'errorMessage': 'Invalid input'
      });
      return;
    }

    const maxBombLimit = mainValue * secondValue - 2;
    if (!this.hasValidBombLimit(this.state.bombLimit, maxBombLimit)) {
      this.setState({errorMessage: 'Invalid input'});

      return;
    }

    this.setState({
      name: newValue,
      'maxBombLimit': mainValue * secondValue - 2,
      'errorMessage': ''
    });
  }

  private bombLimitValueChanged(value: string): void {
    if (!this.hasValidBombInput(parseInt(value, 10))) {
      this.setState({
        'errorMessage': 'Invalid input',
        'bombLimit': value,
      });

      return;
    }

    this.setState({
      'bombLimit': value,
      'errorMessage': ''
    });
  }

  private hasValidInput(firstValue: number, secondValue: number): boolean {
    return (
      Number.isInteger(firstValue) && Number.isInteger(secondValue) &&
      firstValue >= this.props.minNumber && secondValue >= this.props.minNumber &&
      firstValue <= this.props.maxNumber && secondValue <= this.props.maxNumber
    );
  }

  private hasValidBombLimit(bombLimit: string, maxBombLimit: number): boolean {
    return parseInt(bombLimit, 10) <= maxBombLimit;
  }

  private hasValidBombInput(bombLimit: number): boolean {
    return (
      this.hasValidInput(parseInt(this.state.height, 10), parseInt(this.state.width, 10)) &&
      Number.isInteger(bombLimit) &&
      bombLimit >= this.state.minBombLimit &&
      bombLimit <= this.state.maxBombLimit
    );
  }
}

export default NewGameModalState;
