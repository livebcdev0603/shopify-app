import * as React from 'react';
import { Container } from 'unstated';
import axios from 'axios';
import _ from 'lodash';

const ROOT_API = "https://shopify-server.herokuapp.com";

const TOKEN = "1c9e7b668636129c784b8d3da125fb05";
const PAGE_API = `${ROOT_API}/pages?X-Shopify-Access-Token=${TOKEN}`;

import { PageObject } from '../constants/interfaces';

interface PageState {
  contentRef: React.RefObject<HTMLDivElement>,
  pages: PageObject[],
  currentPage: {},
  action: number,
  pageModal: {
    isOpen: boolean,
    title: string
  }
}

class PageContainer extends Container<PageState> {
  state: PageState = {
    contentRef: React.createRef(),
    pages: [],
    currentPage: {},
    action: 0,
    pageModal: { isOpen: false, title: '' }
  }

  toggleOpenModal = (title?: string) => {
    let pageModal = {
      isOpen: !this.state.pageModal.isOpen,
      title: title ? title : ''
    };
    
    this.setState({ pageModal });
  }

  setCurrentPage = (page?: PageObject) => {
    let currentPage = _.isEmpty(page) ? { title: '', body_html: '', author: '' } : page;

    this.setState({ currentPage });
  }

  fetchPages = () => {
    axios
      .get(PAGE_API)
      .then(payload => {
        this.setState({ pages: payload.data.pages });
      })
      .catch(err => console.log(err));
  }

  createPage = (page: PageObject) => {
    axios
      .post(PAGE_API, { page })
      .then(payload => {
        let newPage = payload.data.page;
        let pages = this.state.pages;
        pages.push(newPage);

        this.setState({ pages });
      })
      .catch(err => console.log(err));
  }

  updatePage = (page: PageObject) => {
    const UPDATE_PAGE_API = `${ROOT_API}/pages/${page.id}?X-Shopify-Access-Token=${TOKEN}`;

    axios
      .put(UPDATE_PAGE_API, { page })
      .then(payload => {
        let updatedPage = payload.data.page;
        let pages: PageObject[] = _.map(this.state.pages, (page: PageObject) => {
          if (page.id === updatedPage.id) return updatedPage;
          return page;
        });
        
        this.setState({ currentPage: updatedPage });
        this.setState({ pages });
      })
      .catch(err => console.log(err));
  }

  removePage = (id: number | undefined) => {
    const DELETE_PAGE_API = `${ROOT_API}/pages/${id}?X-Shopify-Access-Token=${TOKEN}`;

    axios
      .delete(DELETE_PAGE_API)
      .then(payload => {
        const pages: PageObject[] = _.filter(this.state.pages, (page: PageObject) => page.id !== id);
        this.setState({ pages });
      })
      .catch(err => console.log(err));
  }
}

export default PageContainer;