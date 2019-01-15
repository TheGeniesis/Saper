import * as React from 'react';
import {Modal} from "react-bootstrap";

interface IComponentProps {
  message: string;
}

const SimpleMessageModal: React.FC<IComponentProps> = ({message}) => {
  return (
    <div>
      <Modal.Body>
        {message}
      </Modal.Body>
    </div>
  );
};

export default SimpleMessageModal;
