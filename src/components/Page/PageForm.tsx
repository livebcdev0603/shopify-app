import * as React from 'react';
import { Subscribe } from 'unstated';
import { Formik } from 'formik';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import PageContainer from '../../containers/PageContainer';
import { PageObject } from '../../constants/interfaces';


class PageForm extends React.Component {

  renderFormik = ({ values, errors, touched, handleChange, handleSubmit }: 
    { values: PageObject, 
      errors: any, 
      touched: any, 
      handleChange: any, 
      handleSubmit: any
    }) => {
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

  handleSubmit = (values: PageObject, pageStore: PageContainer) => {
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

  handleValidate = (values: PageObject) => {
    // same as above, but feel free to move this into a class method now.
    let errors: PageObject = { title: '', body_html: '', author: '' };
    
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
          (pageStore: PageContainer) => <Formik
                        initialValues={pageStore.state.currentPage}
                        validate={(values: any) => this.handleValidate(values)}
                        onSubmit={(values: any) => this.handleSubmit(values, pageStore)}
                        render={this.renderFormik}
                       />
        }
      </Subscribe>
    );
  }
}

export default PageForm;
