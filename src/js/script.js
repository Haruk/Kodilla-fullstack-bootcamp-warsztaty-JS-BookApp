/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
    ('use strict');
  
    const select = {
      templateOf: {
        books: '#template-book',
      },
      containerOf: {
        books: '.books-list',
        filters: '.filters',
      },
      book: {
        image: '.book__image',
        rating: '.book__rating__fill',
      },
    };
  
    const templates = {
      bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
    };
  
    class BooksList {
        constructor() {  
            const thisBookList = this;

            thisBookList.initData();
            thisBookList.getElements();
            thisBookList.render();
            thisBookList.initActions();
            thisBookList.filterBooks();
            thisBookList.determineRatingBgc();
        }
  
        initData() {
            const thisBook = this;
            thisBook.data = dataSource.books;
        }
    
        getElements() {
            const thisBookList = this;
            thisBookList.filters =[];
            thisBookList.favoriteBooks = [];

            thisBookList.bookContainer = document.querySelector(select.containerOf.books);
            thisBookList.filterContainer = document.querySelector(select.containerOf.filters);
        }
    
        render() {
            const thisBookList = this;

            for (let book of thisBookList.data) {
                const ratingWidthTemp = 10 * book.rating;
                const ratingBgcTemp = this.determineRatingBgc(book.rating);
                const bookHTML = templates.bookTemplate({
                    id: book.id,
                    price: book.price,
                    name: book.name,
                    image: book.image,
                    rating: book.rating,
                    ratingWidth: ratingWidthTemp,
                    ratingBgc: ratingBgcTemp,
                });

                
                const bookDOM = utils.createDOMFromHTML(bookHTML);
            
                thisBookList.bookContainer.appendChild(bookDOM);
            }
        }

        determineRatingBgc(rating) {
            let background = '';
      
            if (rating < 6) {
              background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
            }
            if (rating > 6 && rating <= 8) {
              background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
            }
            if (rating > 8 && rating <= 9) {
              background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
            }
            if (rating > 9) {
              background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
            }
            return background;
          }
    
        initActions() {
            const thisBookList = this;
            const favoriteBooks = thisBookList.favoriteBooks;
            // const filters = thisBookList.filters;

            thisBookList.bookContainer.addEventListener("dblclick", function (event) {
                event.preventDefault();
    
            const clickedElement = event.target.offsetParent;
    
                if (clickedElement.classList.contains(select.book.image.substring(1))) {
                clickedElement.classList.toggle("favorite");
                let imageID = clickedElement.getAttribute("data-id");
    
                if (!favoriteBooks.includes(imageID)) {
                    favoriteBooks.push(imageID);
                } else if (favoriteBooks.includes(imageID)){
                    favoriteBooks.splice(favoriteBooks.indexOf(imageID, 1));
                }
                    
                }
            });

            thisBookList.filterContainer.addEventListener('click', function (event) {
                const clickedElement = event.target;
                if (
                  clickedElement.tagName === 'INPUT' &&
                  clickedElement.name === 'filter' &&
                  clickedElement.type === 'checkbox'
                ) {
                  if (clickedElement.checked)
                    thisBookList.filters.push(clickedElement.value);
                  if (!clickedElement.checked)
                    thisBookList.filters.splice(
                      thisBookList.filters.indexOf(clickedElement.value, 1)
                    );
                }
                thisBookList.filterBooks(); 
              });
            }

            
            filterBooks() {
                const thisBookList = this;

                for (let book of thisBookList.data){
                    let isHidden = false;
                    for (let filter of thisBookList.filters){
                        if (!book.details[filter]){
                            isHidden = true;
                            break;
                        }
                    }
                
                    const bookDataId = document.querySelector(select.book.image + '[data-id="' + book.id + '"]');
                    
                    if(isHidden){
                        bookDataId.classList.add('hidden');
                    }else {
                        bookDataId.classList.remove('hidden');
                    }
                }
            }
        


    }
  
    const app = {
      init: function () {
        new BooksList();
      },
    };
  
    app.init();
  }