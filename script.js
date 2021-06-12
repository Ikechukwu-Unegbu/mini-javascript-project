
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//getting/targeting the plus-sign element for adding note by the id name
const addNote = document.getElementById('plus');
//getting the paragraph where we want to display a message by class name. 
//Note that getElementsByClassName() returns an array
const h = document.getElementsByClassName('empty');
let i = 0, text;
//declaring the welcome message  we want to display
text = "Welcome to StickyNotes.com";

//This first function that will run first thing when someone firsts our application
//It's job is to call other functions we want to run. Now read the functions called inside
//the init function to understand what will happen when someone visits the app and the init function runs
function init(){
  //first thing the form for writing notes will disappear or be made hidden
  elementDisappear('notes-form'); 
  //this function will check if the local storage is empty and hide and display elements accordingly
  checkLocalStorage();
  //the passStorageResultToHTML function will get the content of local storage which is our notes
  //process them all and display them all by title
  passStorageResultToHTML();
  //Typing effect will display the welcome message in a kind of glide or slide manner
  typingEffect();
  
}
init();


/*Header typing effect*/
function typingEffect(){
  if(i<text.length){
    document.getElementById("text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typingEffect, 100);
  }
}

/*Utitlity function*/
//this function takes a variable of type string with quotation marks and remove the quatation
//marks, then return the variable. The technique doing this is called regular expression
function removeD_Quotes(qString){
  let str = qString.replace(/^"(.*)"$/, '$1');
  return str;
}

//When you pass a string to this function, it will cut out the first four words of the string
//and return them to you. We use it to get the first four words of 
function getTitle(source){
  //here we break up the string/sentence word by word and convert it to array, 
  //then save the array in a new variable myArray
  let myArrary = source.split(' ');
  //here we take the first four elements fo the array which is the first four words of the
  //sentence passed to the function
  myArrary = myArrary.slice(0, 4);
  //the first four words is still an array so at this point, we convert it back to 
  //incomplete sentence with first four words of the original sentence.
  myArrary = myArrary.toString().replace(/\,/g, " ") +'...';
  //we return it
  return myArrary;
}

function curDate(){
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
  return dateString;
}
//this function when called takes interger arguement and generates a random string 
//whose length is same as the integer arguement
function uniqueID(len){
  //first we declared an empty variable to hold the random integer to be generated
  let result = ' ';
  //we get the lengthe for the random alpha numeric character declared at the very beginning
  const charLength = chars.length;
  //we start from zero and keep adding random characters the string till its length is no
  //longer less than "len" which is the integer we passed to the function
  for(let i = 0; i<len; i++){
    //this random characters being generated are now being stored in the empty variable 
    //"result"
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  //we return the random character generated
  return result;
}

//When calling this function, you need to pass in the lass name of elements you want 
//to hide or to stop displaying. 
function elementDisappear(ElementClassName){
  //I have mentioned earlier that getting element by class name returns are array
  const RemoveElement = document.getElementsByClassName(ElementClassName);
  //so here we go through the array of elements with that class name and perform an action on
  //them all
  for(i = 0; i<RemoveElement.length; i++){
    //the action we are going to perform in this case is change their css display property
    //to "NONE" so they will all disappear
    RemoveElement[i].style.display = 'none';
  }
}

function elementRestore(ElementClassName){
  const RemoveElement = document.getElementsByClassName(ElementClassName);
  for(i = 0; i<RemoveElement.length; i++){
    //same as the disappear function, here we turn the display property to flex
    RemoveElement[i].style.display = 'flex';
  }
}
/*Function being called from html onclick property when you click the plus sign 
to make a note. it's job is to open the text making field for you
*/
function openTextFiled(){
  //it first calls the disappear function to stop displaying the div with class name 
  //empty which displays notes
  elementDisappear('empty');
  //It then restores notes input field with the class name notes-form
  elementRestore('notes-form');
  //it disappeaars all notes too
  elementDisappear('notes');
}

//This function when called will close the text field. The note submission buttion 
//will be calling this function using the onclick event listener.
function closeTextField(){
  //when called it will first disappear the note input field
  elementDisappear('notes-form');
  //check if local storage contains notes, it it does, display the title list of all notes, 
  //if it doesnt display the empty message
  checkLocalStorage?elementRestore('notes'):elementRestore('empty');
}

//this function will be called by the create note button and when called
function submitToLocalStorage(){
  /*check if the textarea is empty and prevent*/
  const note = document.getElementById('textarea');
  if(note.value.length === 0){
    document.getElementById('errMessage').style.visibility = 'visible';
    document.getElementById('errMessage').innerHTML = 'Please make a note first';
  }else{
    //var noteObject = {time:noteDate, note:note.value};
    window.localStorage.setItem(uniqueID(10), JSON.stringify(note.value));
    document.getElementById('textarea').value = '';
  }
}
/*This function checks if the local storage is empty
and if it is empty, the appropriate message will be displayed.
*/
function checkLocalStorage(){
  if(window.localStorage === null){
    elementDisappear('notes');
    elementRestore('empty');
    return false;
  }else{
    elementDisappear('empty');
   elementRestore('notes');
    return true;
  }
}

function getFromLocalStorage(){
  const allStorage = window.localStorage;
  return allStorage;
}

function passStorageResultToHTML(){
  const storageResult = getFromLocalStorage();
  const arrAllStorage = Object.values(storageResult);

  for(const [key, value] of Object.entries(arrAllStorage)){
    let noteString = `${value}`;
    noteString= removeD_Quotes(noteString);
    let myArrary = noteString.split(' ');
    console.log(myArrary);
    myArrary = myArrary.slice(0, 4);
    myArrary = myArrary.toString().replace(/\,/g, " ") +'....';
    

    htmlMarkup = `
      <div id="notes" class="notes">
        <div class="notes-header">
          <small>02-03-2020</small>
          <small>Edit</small>
          <small>Delete</small>
        </div>
        <div class="notes-body">
          <div class="">
            <h3><p onclick="fullNote(this.id)" id="${key}" class="title">${myArrary}</p></h3>
          </div>
        </div>
      </div>`;
    const refNode = document.querySelector('#empty');
    refNode.parentNode.insertAdjacentHTML('afterend', htmlMarkup);
  }
}

function deleteNote(id){
  const allStorage = getFromLocalStorage();
  storageResult = Object.keys(allStorage);
 

}
deleteNote();

function clearLocalStorage(){

}

function fullNote(clicked_id){
  const allStorage = getFromLocalStorage();
  storageResult = Object.keys(allStorage);
  const uniqueStorageKey = storageResult[clicked_id];
  const fullNote = allStorage[uniqueStorageKey];
  preparedNote = removeD_Quotes(fullNote);
  let title = getTitle(preparedNote);

  const htmlMarkup = `
      <div class="fullNote">
        <p>${preparedNote}</p>
      </div>
  `;
  elementDisappear('empty');
  elementDisappear('notes');
  elementDisappear('notes-form');
  const refNode = document.querySelector('#empty');
  refNode.parentNode.insertAdjacentHTML('afterend', htmlMarkup);
}