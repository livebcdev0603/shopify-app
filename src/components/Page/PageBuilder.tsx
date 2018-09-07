import * as React from 'react';

import { Subscribe } from 'unstated';

import PageContainer from '../../containers/PageContainer';

import Content from './PageBuilder/Content';
import Elements from './PageBuilder/Elements';
import Style from './PageBuilder/Style';

export default class PageBuilder extends React.Component {
  handleGetContent = (pageStore: PageContainer) => {
    let body_html = pageStore.state.contentRef.current!.outerHTML;
    let newPage = { title: "new", body_html, author: "Tuan Anh" };

    pageStore.createPage(newPage);
  }

  render() {
    return (
      <Subscribe to={[PageContainer]}>
        {
          (pageStore: PageContainer) => (
            <div>
              <button 
                onClick={() => this.handleGetContent(pageStore)}
                className="btn btn-outline-success float-right mr-2"
              >
                Save
              </button>
              <br/>
              <hr/>
              <div className="d-flex px-3">
                <Elements />
                <Content />
                <Style />
              </div>
            </div>
          )
        }
      </Subscribe>
    )
  }
}