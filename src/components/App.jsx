import Notiflix from 'notiflix';
import { RotatingLines } from 'react-loader-spinner';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import getImagesAPI from './services/GalleryAPI';
import css from './App.module.css';


class App extends Component {
  state = {
    gallery: [],
    requestName: '',
    page: 1,
    showBtnLoadMore: false,
    per_page: 12,
    status: 'idle',
    isLoading: false,
        
  };

  
  //отримуємо параметр запиту з компонента search
  getFirstRequestParameters = param => {
    this.setState({
      requestName: param.toLowerCase().trim(),
    });
  };

  //ф-ція до сторінки прибавляє 1 (викликається при натиску на кнопку load more)
  changePage = e => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  //показати кнопку load more
  showButton = () => {
    if (this.showButton !== true) {
      this.setState({
        showBtnLoadMore: true,
      });
    }
  };

  //сховати кнопку load more
  hideButton = () => {
    if (this.showButton !== false) {
      this.setState({
        showBtnLoadMore: false,
      });
    }
  };

  /********************************************** */
  getApiData() {
    const { requestName, page, per_page } = this.state;
    this.setState({
      isLoading: true,
      showBtnLoadMore: false,
    });
    getImagesAPI(requestName, page, per_page)
      .then(result => {
        return result;
      })
      .then(this.renderData)
      .catch(this.errorApi);
  }

  /***************************************** */
  //при успішному запиті до бекенду
  renderData = async data => {
    const { page, per_page } = this.state;

    console.log(data.data);
    //якщо набрали строку, по якому на бекенді немає картинок
    if (data.data.total === 0) {
      this.setState({
        isLoading: false,
      });
      Notiflix.Notify.info('There are no images for this request');
    }

    //якщо вже усі картинки підгрузились, ховаємо кнопку
    await this.setState(prevstate => ({
      //  gallery: [...data.data.hits],
      gallery: [...prevstate.gallery, ...data.data.hits],
      status: 'resolved',
    }));

    if (Math.ceil(per_page * page) >= data.data.totalHits) {
      this.hideButton();
      return;
    }

    this.showButton();

    this.setState({
      isLoading: false,
    });
  };

  //помилка, яка виникаэ коли картинки немає по запиту, який ввів користувач
  errorApi = error => {
    this.hideButton();
    Notiflix.Notify.info(
      'Чьто-то пошло не так :( Проверьте соединение с сетью'
    );

    this.setState({
      status: 'rejected',
    });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.UrlimgForModal);
    if (this.state.requestName === '') {
      Notiflix.Notify.info('Please fill out the search bar');
      return;
    }
    if (this.state.requestName !== prevState.requestName) {
      this.setState({
        gallery: [],
        page: 1,
      });
      this.getApiData();
    } else if (this.state.page !== prevState.page) {
      this.getApiData();
    }
  }

  render() {
    return (
      <div>
        <Searchbar
          changeStateAppParam={this.getFirstRequestParameters}
        ></Searchbar>
        <ImageGallery
          gallery={this.state.gallery}
          status={this.state.status}        
          // changeItems={this.changeItems}
        ></ImageGallery>
        {this.state.isLoading && (
          <div className={css.loader}>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="2.20"
              width="96"
              visible={true}
            />
          </div>
        )}
        {this.state.showBtnLoadMore && (
          <Button text="Load more" handleClick={this.changePage}></Button>
        )}
       
      </div>
    );
  }
}

//налаштування для Notflix
Notiflix.Notify.init({
  width: '480px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
  fontSize: '20px',
  clickToClose: true,
  timeout: 3000,
  // ...
});



export default App;
