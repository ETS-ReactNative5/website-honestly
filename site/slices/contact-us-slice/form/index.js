/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import classnames from 'classnames/bind';
import styles from './style.css';
import Button from '../../../components/button';

const cx = classnames.bind(styles);

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Your problem in a nutshell',
      contact: 'sam@company.com',
    };
  }

  handleInputChange = event => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const { message, contact } = this.state;
    const { errors, fatalError } = this.props;
    return (
      <section className={styles.formContainer} id="contactUs">
        <h2 className={styles.heading}>
          Project in mind?
          <br />
          Tell us more.
        </h2>

        <form className={styles.contactUsForm}>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="contactUsMessage">
              Message:&nbsp;
              <span className={styles.errorMessage}>{errors.message}</span>
            </label>
            <textarea
              rows="5"
              className={cx({
                inputBox: true,
                hasErrors: errors.message,
              })}
              name="message"
              id="contactUsMessage"
              defaultValue={message}
              onChange={this.handleInputChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="contactEmail">
              Your email:&nbsp;
              <span className={styles.errorMessage}>{errors.contact}</span>
            </label>
            <input
              className={cx({
                inputBox: true,
                hasErrors: errors.contact,
              })}
              id="contactEmail"
              name="contact"
              type="text"
              value={contact}
              onChange={this.handleInputChange}
            />
          </div>

          {
            fatalError &&
            <div>
              <p className={styles.fatalError}>
                Oops! Looks like something went wrong.
              </p>
              <Button
                label="Try Again"
                className={'fatalErrorButton'}
                onClick={this.handleSubmit}
                background="yellow"
              />
              <p className={styles.fatalError}>
                or to get in touch email us on<br />
                <a href="mailto:hello@red-badger.com" className={styles.fatalErrorLink}>
                  hello@red-badger.com
                </a>
              </p>
            </div>
          }

          {
            !fatalError &&
            <Button
              label="Submit"
              onClick={this.handleSubmit}
              background="yellow"
            />
          }

          <noscript>
            <p className={styles.fatalError}>
              It seems like your JavaScript is disabled.<br />
            </p>
            <p className={styles.fatalError}>
              To get in touch email us on <br />
              <a href="mailto:hello@red-badger.com" className={styles.fatalErrorLink}>
                hello@red-badger.com
              </a>
            </p>
          </noscript>
        </form>
      </section>
    );
  }
}

const { shape, func, string, bool } = React.PropTypes;
Form.propTypes = {
  errors: shape({
    message: string,
    contact: string,
  }).isRequired,
  fatalError: bool.isRequired,
  onSubmit: func.isRequired,
};

export default Form;
