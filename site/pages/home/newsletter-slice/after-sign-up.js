import React from 'react';
import classnames from 'classnames/bind';
import styles from './style.css';

const cx = classnames.bind(styles);

const { func } = React.PropTypes;

export default class AfterSignup extends React.Component {
  static propTypes = {
    onSubmit: func.isRequired,
  };

  componentDidMount() {
    this.triggerReflow();
  }

  // fixes bug in safari where the component height wouldn't update
  triggerReflow() {
    this.element.style.display = 'none';
    this.element.offsetHeight; // eslint-disable-line no-unused-expressions
    this.element.style.display = '';
  }

  render() {
    return (
      <section className={cx('newsletter', 'submitted')} ref={c => { this.element = c; }}>
        <h1 className={styles.title}>
          Thanks for signing up!
        </h1>
        <h2 className={styles.subTitle}>
          Help us make sure your BadgerNews is relevant by telling us a bit more about yourself
        </h2>
        <form className={styles.form}>
          <div>
            <label htmlFor="name" className={styles.formLabel}>Full name</label>
            <input id="name" type="text" placeholder="John Smith" className={styles.formInput} />
          </div>
          <div>
            <label htmlFor="name" className={styles.formLabel}>Company</label>
            <input id="name" type="text" placeholder="Peter Pan Ltd." className={styles.formInput} />
          </div>
          <div>
            <label htmlFor="name" className={styles.formLabel}>Job role</label>
            <input id="name" type="text" placeholder="Engineer" className={styles.formInput} />
          </div>
          <button className={styles.submitButton} onClick={this.props.onSubmit}>
            Update info
          </button>
        </form>
      </section>
    );
  }
}
