import * as React from 'react';
import {Button, Modal} from "react-bootstrap";

interface IComponentProps {
  minNumber: number,
  maxNumber: number,
  width: string,
  height: string,
  bombLimit: string,
  minBombLimit: number,
  maxBombLimit: number,
  errorMessage: string,

  fieldValueChanged(name: string, value: string): any,

  bombLimitValueChanged(value: string): any,

  onAcceptClick(width: number, height: number, bombLimit: number): any
}

class NewGameModalForm extends React.Component<IComponentProps> {
  constructor(props: IComponentProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <form onSubmit={this.onAcceptClick.bind('', this.props.onAcceptClick)}>
          <Modal.Body>
            {'' !== this.props.errorMessage && <div className="alert alert-danger">{this.props.errorMessage}</div>}
            <div className="form-group">
              <label>Height</label>
              <input
                name="height"
                min={this.props.minNumber}
                max={this.props.maxNumber}
                step={1}
                className="form-control"
                defaultValue={this.props.height}
                onChange={this.heightValueChanged.bind('', this.props.fieldValueChanged)}
                type="number"
              />
              <small className="form-text text-muted">
                Numbers between {this.props.minNumber}-{this.props.maxNumber}
              </small>
            </div>
            <div className="form-group">
              <label>Width</label>
              <input
                name="width"
                min={this.props.minNumber}
                max={this.props.maxNumber}
                step={1}
                className="form-control"
                defaultValue={this.props.width}
                onChange={this.widthValueChanged.bind('', this.props.fieldValueChanged)}
                type="number"
              />
              <small className="form-text text-muted">
                Numbers between {this.props.minNumber}-{this.props.maxNumber}
              </small>
            </div>
            <div className="form-group">
              <label>Bombs' limit</label>
              <input
                name="bombLimit"
                min={this.props.minBombLimit}
                max={this.props.maxBombLimit}
                step={1}
                className="form-control"
                defaultValue={this.props.bombLimit}
                onChange={this.bombLimitValueChanged.bind('', this.props.bombLimitValueChanged)}
                type="number"
              />
              <small className="form-text text-muted">
                Numbers between 1-{this.props.maxBombLimit}
              </small>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" type="submit" disabled={'' !== this.props.errorMessage}>Ok</Button>
          </Modal.Footer>
        </form>
      </div>
    );
  }

  private widthValueChanged(callback: any, e: React.ChangeEvent<HTMLInputElement>): void {
    callback('width', e.currentTarget.value)
  }

  private heightValueChanged(callback: any, e: React.ChangeEvent<HTMLInputElement>): void {
    callback('height', e.currentTarget.value)
  }

  private onAcceptClick(callback: any, e: React.MouseEvent<HTMLFormElement>): void {
    e.preventDefault();
    callback(e.currentTarget.width.value, e.currentTarget.height.value, e.currentTarget.bombLimit.value);
  }

  private bombLimitValueChanged(callback: any, e: React.ChangeEvent<HTMLInputElement>): void {
    callback(e.currentTarget.value)
  }
}

export default NewGameModalForm;
