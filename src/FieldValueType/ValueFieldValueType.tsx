import FieldValueType from './FieldValueType';
import IValueFieldValueType from './IValueFieldValueType';

class ValueFieldValueType extends FieldValueType implements IValueFieldValueType {
  public value: number = 0;
}

export default ValueFieldValueType;
