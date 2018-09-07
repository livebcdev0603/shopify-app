import * as React from 'react';
import { Container } from 'unstated';

interface BuilderState {
  elements: {
    type: string,
    className: string,
    text: string,
    // prevent index signature
    [key: string]: string
  }[],
  currentEleIndex: number
}

export default class BuilderContainer extends Container<BuilderState> {
  state: BuilderState = {
    elements: [],
    currentEleIndex: -1
  }

  setCurrentElement = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({currentEleIndex: parseInt(event.currentTarget.id)});
  }

  getElement = (event: React.MouseEvent<HTMLButtonElement>) => {
    let type = event.currentTarget.tagName.toLowerCase();
    let className = event.currentTarget.className;
    let text = event.currentTarget.textContent || "";

    this.setState({ elements : [...this.state.elements, { type, className, text }] });
  }

  updateStyle = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = event.currentTarget;

    let updatedEle = this.state.elements[this.state.currentEleIndex];
    updatedEle[name] = value;

    let newElements = this.state.elements;
    newElements[this.state.currentEleIndex] = updatedEle;

    this.setState({elements: newElements});
  }
}
