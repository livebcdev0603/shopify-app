import { Container } from 'unstated';
import axios from 'axios';
import _ from 'lodash';

const ROOT_API = "https://c5bd51ac.ngrok.io";

const TOKEN = "874ff9c8c99f7f888ec0e6b205bb0e4e";
const PAGE_API = `${ROOT_API}/pages?X-Shopify-Access-Token=${TOKEN}`;

class PageContainer extends Container {
  state = {
    pages: [],
    currentPage: {},
    action: 0,
    pageModal: { isOpen: false, title: '' }
  }

  toggleOpenModal = title => {
    let pageModal = {
      isOpen: !this.state.pageModal.isOpen,
      title: title ? title : ''
    };
    
    this.setState({ pageModal });
  }

  setCurrentPage = page => {
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

  createPage = page => {
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

  updatePage = page => {
    const UPDATE_PAGE_API = `${ROOT_API}/pages/${page.id}?X-Shopify-Access-Token=${TOKEN}`;

    axios
      .put(UPDATE_PAGE_API, { page })
      .then(payload => {
        let updatedPage = payload.data.page;
        let pages = _.map(this.state.pages, page => {
          if (page.id === updatedPage.id) return updatedPage;
          return page;
        });
        
        this.setState({ currentPage: updatedPage });
        this.setState({ pages });
      })
      .catch(err => console.log(err));
  }

  removePage = id => {
    const DELETE_PAGE_API = `${ROOT_API}/pages/${id}?X-Shopify-Access-Token=${TOKEN}`;

    axios
      .delete(DELETE_PAGE_API)
      .then(payload => {
        const pages = _.filter(this.state.pages, page => page.id !== id);
        this.setState({ pages });
      })
      .catch(err => console.log(err));
  }
}

export default PageContainer;