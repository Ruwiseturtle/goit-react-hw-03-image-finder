import { Component } from "react";
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
 
  render() {
    // href={this.props.dataPicture.largeImageURL}
    return (
      <a>
        <img
          className={css.itemImage}
          // this.props.dataPicture.largeImageURL2
          srcbig={this.props.dataPicture.largeImageURL}
          src={this.props.dataPicture.webformatURL}
          alt={this.props.dataPicture.tags}
        />
      </a>
    );
  }
}

export default ImageGalleryItem;