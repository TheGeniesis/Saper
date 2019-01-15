type fieldType = 'undefined' | 'bomb' | 'empty' | 'value';

class FieldValueType {
  public clicked: boolean = false;
  public flag: boolean = false;
  public value: number = 0;
  public type: fieldType = 'undefined';
}

export default FieldValueType;