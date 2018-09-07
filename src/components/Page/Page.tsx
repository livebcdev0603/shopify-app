import * as React from 'react';
import PageTable from './PageTable';
import PageFormModal from './PageFormModal';
import { Subscribe } from 'unstated';
import { BrowserRouter as Link } from 'react-router-dom';

import PageContainer from '../../containers/PageContainer';
import CommonProps from '../../constants/interfaces';

class Page extends React.Component<CommonProps> {
  constructor(props: CommonProps) {
    super(props);
    this.state = {
      pageStore: {}
    }
  }

  handleAddPage = () => {
    const { pageStore } = this.props;

    pageStore.state.action = 0; // 0 = CREATE
    pageStore.setCurrentPage();
    pageStore.toggleOpenModal('Add new page');
  }

  render() {
    return (
      <Subscribe to={[PageContainer]}>
        {
          (pageStore: PageContainer) => {
            if (!pageStore.state.pages.length) {
              pageStore.fetchPages();

              return <h2>Loading pages.....</h2>
            }
            return (
              <div className="container">
                <a 
                  href="/create-page"
                  className="float-right btn btn-outline-success mb-3"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add page
                </a>

                <PageTable pageStore={pageStore}/>
                <PageFormModal />
              </div>
            )
          }
        }
      </Subscribe>
    )
  }
}

export default Page;
