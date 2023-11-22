import { Modal, Button } from 'react-bootstrap';
import type { TagModalProps } from '@/ui/start/modal/type/tagModal.types';
import { SelectPreference } from '@/ui/start/preference/selectPreference';

export const TagModal = ({show, onHide, onClick} : TagModalProps) => {
    return(
        <Modal className="TagModal" show={show} onHide={onHide}>
           <Modal.Header closeButton>
               <Modal.Title>태그</Modal.Title>
           </Modal.Header>
               <Modal.Body>
                 <SelectPreference />
               </Modal.Body>
           <Modal.Footer>
               <Button type="submit" onClick={onClick.closeTagModal}>확인</Button>
           </Modal.Footer>
        </Modal>
    )
}
