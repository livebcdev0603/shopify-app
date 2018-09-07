import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Subscribe } from 'unstated';
import PageContainer from '../../containers/PageContainer';
import PageForm from './PageForm';

class PageFormModal extends React.Component {
  render() {
    return (
      <Subscribe to={[PageContainer]}>
        {
          (pageStore: PageContainer) => {
            let { toggleOpenModal } = pageStore;
            let { pageModal } = pageStore.state;

            return (
              <div>
                <Modal isOpen={pageModal.isOpen} toggle={() => toggleOpenModal()}>
                  <ModalHeader toggle={toggleOpenModal}>{pageModal.title}</ModalHeader>
                  <ModalBody>
                    <PageForm />
                  </ModalBody>
                </Modal>
              </div>
            )}
        }
      </Subscribe>
    );
  }
}

export default PageFormModal;