import * as React from 'react';
import { Subscribe } from 'unstated';
import BuilderContainer from '../../../containers/BuilderContainer';
import PageContainer from '../../../containers/PageContainer';

export default class Content extends React.Component {
  render() {
    return (
      <Subscribe to={[BuilderContainer, PageContainer]}>
      {(builderStore: BuilderContainer, pageStore: PageContainer) => {
          return (
            <div className={'h-100 col-8'} ref={pageStore.state.contentRef}>
              { 
                builderStore.state.elements.map((ele: any, index: number) => 
                  <div key={index} className='mb-3'>
                    <div 
                      id={index.toString()} 
                      onClick={(e: React.MouseEvent<HTMLDivElement>) => builderStore.setCurrentElement(e)} 
                      className={ele.className}>{ele.text}
                    </div> 
                  </div>
                )
              }
            </div>
          )
        }
      }
      </Subscribe>
    );
  }
}
