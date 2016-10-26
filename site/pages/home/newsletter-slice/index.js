/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import NewsletterAfterSignUp from './after-sign-up';
import NewsletterBeforeSignUp from './before-sign-up';

class NewsLetter extends Component {
  constructor() {
    super();
    this.state = {
      newsletterSubmitted: false,
      email_address: '',
      errorMessage: '',
    };
    this.submitForm = this.submitForm.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      newsletterSubmitted: !this.state.newsletterSubmitted,
    });
  }

  submitForm(data) {
    const object = Object.assign({}, data);
    if (!data.email_address) {
      object.email_address = this.state.email_address;
    }
    const formDataJSON = JSON.stringify(object);
    fetch('https://v8pxyg84jj.execute-api.eu-west-1.amazonaws.com/dev/sign-up',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: formDataJSON,
      })
      .then(response => {
        return response.json();
      })
      .then(res => {
        return this.setState(res);
      })
      .catch(() => {
        return this.setState({
          newsletterSubmitted: false,
        });
      });
  }

  render() {
    return (
      <div>
        {
          this.state.newsletterSubmitted
          ? <NewsletterAfterSignUp onSubmit={this.submitForm} />
          : <NewsletterBeforeSignUp
            onSubmit={this.submitForm}
            errorMessage={this.state.errorMessage}
          />
        }
      </div>
    );
  }
}

export default NewsLetter;
