import PageContainer from '../containers/PageContainer';

export default interface CommonProps {
  pageStore: PageContainer
}

export interface PageObject {
  id?: number,
  title: string,
  body_html: string,
  author: string
}