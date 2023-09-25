import { Component } from "react";
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
 
  render() {
    return (     
        <img
          className={css.itemImage}
          // this.props.dataPicture.largeImageURL2
          srcbig={this.props.dataPicture.largeImageURL}
          src={this.props.dataPicture.webformatURL}
          alt={this.props.dataPicture.tags}
        />      
    );
  }
}

export default ImageGalleryItem;