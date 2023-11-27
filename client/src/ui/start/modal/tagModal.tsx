import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { TagModalProps } from '@/ui/start/modal/type/tagModal.types';
// import { SelectPreference } from '@/ui/start/preference/selectPreference';

export const TagModal = ({show, onHide, onClick}: TagModalProps) => {
    return(
        <Modal show={show} onHide={onHide}>
           <Modal.Header closeButton>
               <Modal.Title>태그</Modal.Title>
           </Modal.Header>
               <Modal.Body>
                 {/* <SelectPreference /> */}
               </Modal.Body>
           <Modal.Footer>
               <Button type="submit" onClick={onClick}>확인</Button>
           </Modal.Footer>
        </Modal>
    )
}
