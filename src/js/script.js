/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
    ('use strict');
  
    const select = {
      templateOf: {
        books: '#template-book',
      },
      containerOf: {
        books: '.books-list',
      },
    };
  
    const templates = {
      books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
    };
  
    function render() {
      //console.log(document.querySelector(select.templateOf.books));
      for(let book of dataSource.books){
        const bookHTML = templates.books(book);
        console.log('bookHTML',bookHTML);
  
        const bookDOM = utils.createDOMFromHTML(bookHTML);
        console.log('bookDOM',bookDOM);
  
        const bookContainer = document.querySelector(select.containerOf.books);
        console.log('bookContainer',bookContainer);
        bookContainer.appendChild(bookDOM);
      }
    }
  
    render();
  }