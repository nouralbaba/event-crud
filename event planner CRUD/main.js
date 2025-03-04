// Elements from the DOM
let eventName = document.getElementById("event-name");
let eventDate = document.getElementById("event-date");
let eventLocation = document.getElementById("event-location");
let eventStartTime = document.getElementById("event-start-time");
let eventEndTime = document.getElementById("event-end-time");
let eventDescription = document.getElementById("event-description");
let submitButton = document.getElementById("submit");
let searchInput = document.getElementById("search");
let deleteAllButton = document.getElementById("delete-All");
let update=document.getElementById("updateBtn");

let eventContainer=[];
let mood='';



//local storage if condition to keep data after refreshing the page 
if(localStorage.getItem("event" )){
    eventContainer = JSON.parse(localStorage.getItem("event" ));
    displayEvent();
    
}



//add event function
function addEvent(){

    

    if(!validateEventInputs()){
        alert("All fields must be filled in!"); 
        return;
    }

const event = {
        name:eventName.value,
        date:eventDate.value,
        location: eventLocation.value,
        startTime:eventStartTime.value,
        endTime:eventEndTime.value,
        description:eventDescription.value,

    }
    eventContainer.push(event);
   
    console.log(eventContainer);
    localStorage.setItem("event",JSON.stringify(eventContainer));
    displayEvent();
    clearInputs();
  }  

submitButton.addEventListener("click", addEvent );
addEvent()

//display function
function displayEvent(){
    let newEvent =``;
    for (let i=0; i<eventContainer.length;i++){
        newEvent+=`
        <tr>
        <td>${eventContainer[i].name}</td>
        <td>${eventContainer[i].date}</td>
        <td>${eventContainer[i].location}</td>
        <td>${eventContainer[i].startTime}</td>
        <td>${eventContainer[i].endTime}</td>
        <td>${eventContainer[i].description}</td>
        <td><button  onclick="setForm(${i})" class="fa-solid fa-pen-to-square"></button></td>
        <td><button onclick="deleteEvent(${i})" class="fa-solid fa-trash"></button></td>

        </tr>

        `
    }
   document.getElementById("showData").innerHTML=newEvent;
}

// delele event 
function deleteEvent(eventIndex){
   
    eventContainer.splice(eventIndex,1);
    localStorage.setItem("event",JSON.stringify(eventContainer));
    displayEvent();

}

//delete all events function 
function deleteAll(eventIndex){
    eventContainer.splice(0,eventContainer.length);
    localStorage.setItem("event",JSON.stringify(eventContainer));
    displayEvent();

}

//clear event inputs after adding 
function clearInputs(){

    eventName.value='';
    eventDate.value='';
    eventLocation.value='';
    eventStartTime.value='';
    eventEndTime.value='';
    eventDescription.value='';
    


}

// search function
function searchEvent(mood){
   let newEvent ='';
    for (let i=0; i<eventContainer.length;i++){
    if(eventContainer[i].name.toLowerCase().includes(mood.toLowerCase())){
          newEvent+=`
    <tr>
    <td>${eventContainer[i].name}</td>
    <td>${eventContainer[i].date}</</td>
    <td>${eventContainer[i].location}</td>
    <td>${eventContainer[i].startTime}</td>
    <td>${eventContainer[i].endTime}</td>
    <td>${eventContainer[i].description}</td>
    <td><button onclick="setForm(${i})" class="fa-solid fa-pen-to-square"></button></td>
    <td><button onclick="deletetEvent(${i})" class="fa-solid fa-trash"></button></td>

    </tr>

    `;
    }
  
}
document.getElementById("showData").innerHTML=newEvent;
}


let searchButton = document.getElementById("searchtitle");

searchButton.addEventListener("click", () =>{
    searchEvent(searchInput.value);
})


let x=0;
// update event function
// step1;to set data again
 function setForm(eventIndex){
   
    x=eventIndex;

    eventName.value = eventContainer[eventIndex].name;
    eventDate.value = eventContainer[eventIndex].date;
    eventLocation.value = eventContainer[eventIndex].location;
    eventStartTime.value = eventContainer[eventIndex].startTime;
    eventEndTime.value = eventContainer[eventIndex].endTime;
    eventDescription.value = eventContainer[eventIndex].description;
    

    document.getElementById("updateBtn").style.display = "block";
    document.getElementById("submit").style.display = "none";
   

    
 }

// to update the event function
function updateEvent(eventIndex){
   console.log(x);
   eventContainer[x].name=eventName.value;
   eventContainer[x].date=eventDate.value;
   eventContainer[x].location=eventLocation.value;
   eventContainer[x].startTime=eventStartTime.value ;
   eventContainer[x].endTime=eventEndTime.value;
   eventContainer[x].description=eventDescription.value;

   document.getElementById("updateBtn").style.display = "none";
    document.getElementById("submit").style.display = "block";

    localStorage.setItem("event",JSON.stringify(eventContainer));

   displayEvent();
   clearInputs();
};
 
updateBtn.addEventListener("click",updateEvent);


// validation function to check if any required  field is empty

function validateEventInputs(){
    let eventName = document.getElementById("event-name").value;
    let eventDate = document.getElementById("event-date").value;
    let eventLocation = document.getElementById("event-location").value;
    
    
    if(eventName.trim() === "" || eventDate.trim() === "" || eventLocation.trim() === "" ){
        
        return false;
    }
    else{
        return true;
    }
}



