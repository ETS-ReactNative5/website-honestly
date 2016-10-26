/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import styles from './style.css';

class BeforeSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_address: '',
      method: 'POST',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <section className={styles.newsletter}>
        <h1 className={styles.title}>
          Sign up to BadgerNews to hear more from us
        </h1>
        <p className={styles.subTitle}>
          (every 6 weeks or so)
        </p>

        <form className={styles.form}>
          <label htmlFor="email_address" className={styles.formLabel}>Email</label>
          <div>{this.props.errorMessage}</div>
          <input
            onChange={this.handleInputChange}
            id="email_address"
            name="email_address"
            type="text"
            placeholder="example@email.com"
            className={styles.formInput}
          />
          <button
            className={styles.submitButton}
            onClick={e => {
              e.preventDefault();
              this.props.onSubmit(this.state);
            }}
          >
            Sign Up
          </button>
        </form>

        <noscript>
          <p className={styles.jsDisabled}>
            It seems like your javascript is disabled.
            Please use the link here to sign up for our newsletter.
          </p>
          <a href="http://eepurl.com/bibY5P" className={styles.link}>
            Sign up through MailChimp
          </a>
        </noscript>
      </section>
    );
  }
}

const { func, string } = React.PropTypes;
BeforeSignUp.propTypes = {
  onSubmit: func.isRequired,
  errorMessage: string.isRequired,
};

export default BeforeSignUp;
