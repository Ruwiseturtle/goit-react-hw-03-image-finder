import { Component } from 'react';
import css from './Button.module.css';

class Button extends Component {
  onClick = e => {
    e.preventDefault();
    this.props.handleClick();
  };
  render() {
    return (
      <div>
        {
          <button
            button
            className={css.button}
            type="button"
            onClick={this.onClick}
          >
            <span>{this.props.text}</span>
          </button>
        }
      </div>
    );
  }
}

export default Button;
