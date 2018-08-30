import React, { Component } from 'react';
import PageTable from './PageTable';
import PageFormModal from './PageFormModal';

class Page extends Component {
  componentDidMount() {
    this.props.pageStore.fetchPages();
  }

  handleAddPage = () => {
    const { pageStore } = this.props;

    pageStore.state.action = 0; // 0 = CREATE
    pageStore.setCurrentPage({});
    pageStore.toggleOpenModal('Add new page');
  }

  render() {
    const { pageStore } = this.props;

    if (!pageStore.state.pages.length) return <h2>Loading pages.....</h2>

    return (
      <div>
        <button 
          className="float-right btn btn-outline-success mb-3"
          onClick={this.handleAddPage}
        >
          <i className="fas fa-plus mr-2"></i>
          Add page
        </button>

        <PageTable pageStore={pageStore}/>
        <PageFormModal isOpen={pageStore.state.pageModal.isOpen}/>
      </div>
    )
  }
}

export default Page;
