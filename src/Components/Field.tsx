import * as React from 'react';
import FieldValueType from '../Storage/FieldValueType';
import Square from './Square';

interface IComponentProps {
  fieldData: FieldValueType[][];

  onLeftClick(column: number, row: number): any;

  onRightClick(column: number, row: number): any;
}

const Field: React.FC<IComponentProps> = ({fieldData, onLeftClick, onRightClick}) => {
  return (
    <div>
      <table className="table table-bordered table-sm">
        <tbody>
        {fieldData.map((row, y) => (
          <tr key={y}>
            {row.map((value, x) => (
              <Square
                key={x}
                column={y}
                row={x}
                fieldValueType={value}
                onLeftClick={onLeftClick}
                onRightClick={onRightClick}
              />
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Field;