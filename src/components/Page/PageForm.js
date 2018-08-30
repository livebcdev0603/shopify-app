import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Formik } from 'formik';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import PageContainer from '../../containers/PageContainer';

class PageForm extends Component {

  renderFormik = ({ values, errors, touched, handleChange, handleSubmit }) => {
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            onChange={handleChange}
            value={values.title}
          />
          <FormText>{touched.title && errors.title && <div>{errors.title}</div>}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="body_html">HTML</Label>
          <Input
            type="text"
            name="body_html"
            onChange={handleChange}
            value={values.body_html}
          />
          <FormText>{touched.body_html && errors.body_html && errors.body_html}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="author">Author</Label>
          <Input
            type="text"
            name="author"
            onChange={handleChange}
            value={values.author}
          />
          <FormText>{touched.body_html && errors.body_html && errors.body_html}</FormText>
        </FormGroup>
        <Button type="submit">
          Submit
        </Button>
      </Form>
    );
  }

  handleSubmit = (values, pageStore) => {
    const CREATE_PAGE = 0;    
    const UPDATE_PAGE = 1;    
    let { action } = pageStore.state;

    if (action === CREATE_PAGE) {
      pageStore.createPage(values);
    } 
    else if (action === UPDATE_PAGE) {
      pageStore.updatePage(values);
    }

    pageStore.toggleOpenModal()
  }

  handleValidate = values => {
    // same as above, but feel free to move this into a class method now.
    let errors = {};
    if (!values.title) {
      errors.title = 'Required';
    }
    if (!values.body_html) {
      errors.body_html = 'Required';
    } 
    if (!values.author) {
      errors.author = 'Required';
    } 

    return errors;
  }

  render() {
    return (
      <Subscribe to={[PageContainer]}>
        {
          pageStore => <Formik
                        initialValues={pageStore.state.currentPage}
                        validate={this.handleValidate}
                        onSubmit={values => this.handleSubmit(values, pageStore)}
                        render={this.renderFormik}
                       />
        }
      </Subscribe>
    );
  }
}

export default PageForm;
