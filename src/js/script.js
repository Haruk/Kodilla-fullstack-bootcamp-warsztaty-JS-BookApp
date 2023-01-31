/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
    ('use strict');
  
    const select = {
      templateOf: {
        books: '#template-book',
      },
      containerOf: {
        books: '.books-list',
        images: '.books-list .book__image',
      },
    };
  
    const templates = {
      books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
    };
  
    const favoriteBooks = [];
  
    function render() {
      
      for(let book of dataSource.books){
        const bookHTML = templates.books(book);
        const bookDOM = utils.createDOMFromHTML(bookHTML);
        const bookContainer = document.querySelector(select.containerOf.books);
        
        bookContainer.appendChild(bookDOM);
      }
    }
  
    function initActions() {
  
      const images = document.querySelectorAll(select.containerOf.images);
      for (let image of images) {
        image.addEventListener('dblclick', function (event) {
          event.preventDefault();
          image.classList.toggle('favorite');

          let imageID = image.getAttribute('data-id');

          if(!favoriteBooks.includes(imageID)){
            favoriteBooks.push(imageID);
          }else if(favoriteBooks.includes(imageID)){
            favoriteBooks.splice(favoriteBooks.indexOf(imageID, 1));
          } 
        });
      }
    }
  
    render();
    initActions();
  }