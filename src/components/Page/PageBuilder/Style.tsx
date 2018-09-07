import * as React from 'react';
import { Subscribe } from 'unstated';
import BuilderContainer from '../../../containers/BuilderContainer';

interface StyleState {
  text: string;
}

export default class Style extends React.Component<{}, StyleState> {
  state: StyleState = {
    text: ''
  }

  render() {
    return (
      <Subscribe to={[BuilderContainer]}>
        {
          (builderStore: BuilderContainer) => {
          let ele = builderStore.state.elements[builderStore.state.currentEleIndex];
          let text = ele ? ele.text : "";
          let className = ele ? ele.className : "";

          return (
            <div className={'h-100 col-2'}>
              <form>
                <label>Text</label>
                <br/>
                <input type='text' value={text} name='text' onChange={builderStore.updateStyle}/>
                <label>Class name:</label>
                <input type='text' value={className} name='className' onChange={builderStore.updateStyle}/>
              </form>
            </div>
          )}
        }
      </Subscribe>
    );
  }
}
