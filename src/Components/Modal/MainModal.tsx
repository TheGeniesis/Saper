import * as React from 'react';
import {Modal} from 'react-bootstrap';

interface IComponentProps {
  body: any,
}

const MainModal: React.FC<IComponentProps> = ({body}) => {
  return (
    <Modal.Dialog>
      {body}
    </Modal.Dialog>
  );
};

export default MainModal;
