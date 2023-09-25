import { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

class ImageGallery extends Component {
  state = {
    showModal: false,
    modalUrl: '',
  };

  //показуємо та скриваємо модальне вікно
  onClose = () => {
    this.setState(({ showModal }) => ({
      showModal: false,
      modalUrl: '',
    }));
  };

  handleClick = e => {
    this.setState({
      modalUrl: e.target.attributes.srcbig.value,
      showModal: true,
    });
  };

  render() {
    const status = this.props.status;

    if (status === 'idle') {
      return <div className={css.title}>Enter request parameter </div>;
    }
    if (status === 'pending') {
      return <div className={css.title}>Loading...</div>;
    }
    if (status === 'rejected') {
      return (
        <div className={css.title}>No connection. Check the connection...</div>
      );
    }
    if (status === 'resolved') {
      return (
        <div>
          <ul className={css.gallery} onClick={this.handleClick}>
            {this.props.gallery.map(picture => (
              <li key={picture.id} className={css.item}>
                <ImageGalleryItem dataPicture={picture}></ImageGalleryItem>
              </li>
            ))}
          </ul>
          {this.state.showModal && (
            <Modal
              onClose={this.onClose}
              src={this.state.modalUrl}
            ></Modal>
          )}
        </div>
      );
    }
  }
}

export default ImageGallery;
