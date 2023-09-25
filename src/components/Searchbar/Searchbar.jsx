import { Component } from 'react';
import css from './Searchbar.module.css';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as Icon } from '../../icons/searchIcon.svg';

// приймає тільки один проп onSubmit
class Searchbar extends Component {
  state = {
    name: '',
  };

  handleNameChange = event => {
    this.setState({
      name: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.changeStateAppParam(this.state.name);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSearch}>
          <IconButton>
            <Icon width="40" height="40"/>
          </IconButton>

          <input
            className={css.input}
            type="text"
            name="name"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
            value={this.state.name}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
