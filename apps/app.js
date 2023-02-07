
// WORKS TO DO 

// 1- AT FIRST I NEED TO SELECT ALL TAG ELEMENTS;
// 2- CREATE A FUNCTION;
// 3- PREVENT FORM REFRESH; 
// 4- COLLECT THE VALUE FROM THOSE;INPUTS 
// 5- DISPLAY INPUT VALUE;
// 6- CREATE A DELETE BUTTON; 
// 7- CREATE EDIT BUTTON;
// 8- POPUP DELETE MESSAGE;
// 9- POPUP EDIT MESSAGE;
// 10- STORE THEM IN LOCALSTORAGE;
// 11- UPDATE THE LOCALSTORAGE 

// SELECT ELEMENTS 

let forms = document.querySelector('form');
let containers = document.querySelector('.container');
let title = document.querySelector('#title');
let author = document.querySelector('#author');
let ids = document.querySelector('#id');
let errorMsg = document.createElement('p');
let theTables = document.querySelector('.table')



// MAIN UI CLASS 

class Ui {

     constructor(title,author,ids) {
      this.title = title,
      this.author = author,
      this.ids = ids
     };



//      DISPLAY FUNCTION 
      static displayBooks () {
            let books = stores.getBook()

            books.forEach(item => Ui.onContentLoaded(item));
           
      }

      // CONTENT LOAD FUNCTION 
     static onContentLoaded (list) {
      
      const rows = document.createElement('tr')

      rows.innerHTML = ` 
     
      <th>${list.title}</th>
      <th>${list.author}</th>
      <th>${list.ids}</th>
      <th><i class="bi bi-trash3-fill delete"></i></th>
      <th><i class="bi bi-pencil-square edit"></i></th>
    
      `

      theTables.appendChild(rows)


     }


//      DELETE LIST FUNCTION 
    static deleteButtons (e) {

            if(e.target.classList.contains('delete')) {
                  
                  const deleteList = e.target.parentElement.parentElement;
                  deleteList.remove();
                  Ui.showMessage('Remove list', 'alert-danger')
                 
            }
           
            let removeList = e.target.parentElement.previousElementSibling.innerHTML;
            stores.removeBook(removeList);

     }

//      EDIT LIST FUNCTION 

    static createButton(e) {

            if(e.target.classList.contains('edit')) {
                  let editTask = e.target.parentElement.parentElement;
                  title.value = editTask.children[0].innerHTML
                  author.value = editTask.children[1].innerHTML
                  ids.value = editTask.children[2].innerHTML

                  editTask.remove();
                  Ui.showMessage('Edit list', 'alert-info')
            }
            
            stores.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML)
            
     }

//      SHOW MESSAGE FUNCTION 
     
    static showMessage (text,className) {
      let createDiv = document.createElement('div');
      createDiv.innerHTML = `${text}`
      createDiv.className = ` alert ${className}`;
      containers.insertBefore(createDiv, forms)

      setTimeout(() => {
            createDiv.innerHTML = ''
            createDiv.className = ''
      }, 2000);
                 
     }


//      CLEAR INPUT FUNCTION 
     static clearInputForms () {
      document.querySelector('#title').value = ''
      document.querySelector('#author').value = ''
      document.querySelector('#id').value = ''
     }

}


// STORAGE CLASS 
class stores {

      // GET BOOKS STORAGE 

    static getBook() {

      let store;
      if(localStorage.getItem('books') === null) {
            store = []
      } else {
            store = JSON.parse(localStorage.getItem('books'));
      }

      return store;

      }



      // GET ADD BOOKS 

    static addBook(list) {
            
      let store = stores.getBook();
      store.push(list)
      localStorage.setItem('books', JSON.stringify(store));
    
     }

    

//      GET REMOVE BOOKS 

      static removeBook(id) {
      let store = stores.getBook();

      store.forEach((item,index) => {
            if (item.ids === id) {
                  store.splice(index, 1);
            } 
      })

      localStorage.setItem('books', JSON.stringify(store));
}

   

     
}


// FORM VALIDATIONS FUNCTION 

const formValidations = (e) => {
      e.preventDefault();

      let titleValue = title.value;
      let authorValue = author.value;
      let idValue = ids.value;


      if(titleValue == '' || authorValue == '' || idValue == '') {
            errorMsg.innerHTML = 'Please fill up the input';
            errorMsg.classList.add('error');
            containers.insertBefore(errorMsg, forms)
      } else {
            errorMsg.innerHTML = ''
            errorMsg.classList.remove('error')
            const list = new Ui(titleValue, authorValue, idValue)
            Ui.onContentLoaded(list);
            Ui.clearInputForms();
            Ui.showMessage('Successfully Added', 'alert-success' )
            stores.addBook(list)


      }
           
}


document.querySelector('.btn').addEventListener('click', formValidations)

window.addEventListener('DOMContentLoaded', Ui.displayBooks)
                                                                                   
document.querySelector('.table').addEventListener('click', (e) => {

      Ui.deleteButtons(e)
      Ui.createButton(e)
     
})

