import React, { Component } from 'react';
import _ from 'lodash';

export default class PageTable extends Component {

  handleUpdateClick = (page) => {
    const { pageStore } = this.props;
    
    pageStore.state.action = 1; // 1 = UPDATE
    pageStore.setCurrentPage(page);
    pageStore.toggleOpenModal('Update page');
  }

  render() {
    const { pageStore } = this.props;
  
    return (
      <div>
        <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>HTML</th>
            <th>Author</th> 
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            _.map(pageStore.state.pages, (page, index) => (
              <tr key={ page.id }>
                <td>{ index + 1 }</td>
                <td>{ page.title }</td>
                <td dangerouslySetInnerHTML={{ __html: page.body_html }}></td>
                <td>{ page.author }</td>
                <td>
                  <i 
                    className="fas fa-pencil-alt mx-1 pointer" 
                    onClick={() => this.handleUpdateClick(page)}
                  >
                  </i>
                  <i className="fas fa-trash text-danger mx-1 pointer" onClick={() => pageStore.removePage(page.id)}></i>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
    )
  }
  
}