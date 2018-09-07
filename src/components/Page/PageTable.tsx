import * as React from 'react';
import _ from 'lodash';

import CommonProps from '../../constants/interfaces';
import { PageObject } from '../../constants/interfaces';


export default class PageTable extends React.Component<CommonProps> {
  constructor(props: CommonProps) {
    super(props);
  }

  handleUpdateClick = (page: PageObject) => {
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
            _.map(pageStore.state.pages, (page: PageObject, index: number) => (
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