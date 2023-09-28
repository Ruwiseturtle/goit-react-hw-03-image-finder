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
      modalAlt: '',
    }));
  };

  handleClick = e => {
    this.setState({
      modalUrl: e.target.attributes.srcbig.value,
      modalAlt: e.target.attributes.alt,
      showModal: true,
    });
  };

  render() {
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
            alt={this.state.modalAlt}
          ></Modal>
        )}
      </div>
    );
  }
}

export default ImageGallery;
