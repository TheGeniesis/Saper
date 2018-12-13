import IFieldValueType from './IFieldValueType';

abstract class FieldValueType implements IFieldValueType {
  public clicked: boolean = false;
  public flag: boolean = false;
  // quick workaround
  public value: number = 0;
}

export default FieldValueType;
