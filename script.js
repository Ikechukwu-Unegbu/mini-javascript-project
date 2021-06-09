
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const addNote = document.getElementById('plus');
const h = document.getElementsByClassName('empty');
let i = 0, text;
text = "Welcome to StickyNotes.com";

function init(){
  elementDisappear('notes-form'); 
  checkLocalStorage();
  passStorageResultToHTML();
//  localStorage.clear();
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

function removeD_Quotes(qString){
  let str = qString.replace(/^"(.*)"$/, '$1');
  return str;
}

function getTitle(source){
  let myArrary = source.split(' ');
  myArrary = myArrary.slice(0, 4);
  myArrary = myArrary.toString().replace(/\,/g, " ") +'...';
  
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
function uniqueID(len){
  let result = ' ';
  const charLength = chars.length;
  for(let i = 0; i<len; i++){
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}


function elementDisappear(ElementClassName){
  const RemoveElement = document.getElementsByClassName(ElementClassName);
  for(i = 0; i<RemoveElement.length; i++){
    RemoveElement[i].style.display = 'none';
  }
  //RemoveElement.style.display = 'none';
}
function elementRestore(ElementClassName){
  // const restoreElement = document.getElementsByClassName(ElementClassName);
  // restoreElement.style.visibility = 'visible';
  // console.log(restoreElement);
  const RemoveElement = document.getElementsByClassName(ElementClassName);
  for(i = 0; i<RemoveElement.length; i++){
    RemoveElement[i].style.display = 'flex';
  }
}
/*Function being called from html onclick property*/
function openTextFiled(){
  elementDisappear('empty');
  elementRestore('notes-form');
  elementDisappear('notes');
}

function closeTextField(){
  elementDisappear('notes-form');
  checkLocalStorage?elementRestore('notes'):elementRestore('empty');
}

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
  //console.log(allStorage);
  return allStorage;
}

function passStorageResultToHTML(){
  const storageResult = getFromLocalStorage();
  const arrAllStorage = Object.values(storageResult);

  for(const [key, value] of Object.entries(arrAllStorage)){
    let noteString = `${value}`;
    noteString= removeD_Quotes(noteString);
    let myArrary = noteString.split(' ');
    myArrary = myArrary.slice(0, 4);
    myArrary = myArrary.toString().replace(/\,/g, " ") +'...';
    

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
  console.log(allStorage);
  console.log(storageResult);

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
  console.log(title);
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