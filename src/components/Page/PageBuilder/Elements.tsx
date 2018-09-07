import * as React from 'react';
import BuilderContainer from '../../../containers/BuilderContainer';
import { Subscribe } from 'unstated';

export default class Elements extends React.Component {
  render() {
    return (
      <Subscribe to={[BuilderContainer]}>
        {(builderStore: BuilderContainer) => (
          <div className={'h-100 col-2'}>
            <button 
              className="btn btn-primary" 
              onClick={(e) => builderStore.getElement(e)}
            >
              Button
            </button>
          </div>
        )}
      </Subscribe>
    );
  }
}
