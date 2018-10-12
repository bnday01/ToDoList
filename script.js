var cache = {

	input:document.getElementById("userInput"),
	taskButton:document.getElementById("addTaskButton"),
	container:document.getElementById("taskContainer"),
	completedContainer:document.getElementById("completedContainer"),
	deleteButton:document.getElementsByClassName("deleteButton"),
	inProgressButton:document.getElementsByClassName("inProgressButton"),
	completeButton:document.getElementsByClassName("completeButton"),
	inProgressContainer:document.getElementById("inProgressContainer")
}

function inputCheck(input){
	return input.length > 0;
}
function deleteButtonCheck(){
	return cache.deleteButton == true;
}

//Create New Element
function newElement(element,classes,text){
	let new_Element = document.createElement(element);
	new_Element.classList.add(classes);
	new_Element.appendChild(document.createTextNode(text));
	if (element != "button"){
	new_Element.appendChild(document.createElement("br"));
	}
	return new_Element;
}

//Mark in Progress on click
function eventInProgress(element,parent){
	element.addEventListener("click", function(){
	let main = this.parentElement.parentElement;
	if (this.innerHTML != "Undo"){
		parent.appendChild(main);
		this.style.backgroundColor = "skyblue";
		this.innerHTML = "Undo";
 	}
 	else {
 		cache.container.appendChild(main);
 		this.style.backgroundColor = "orange";
		this.innerHTML = "In Progress " + "<i class='fa fa-circle-o'></i>";
 	}
	});
}


//Delete on click
function eventDelete(element){
	element.addEventListener("click", function(){
		let main = this.parentElement.parentElement.parentElement;
		main.removeChild(this.parentElement.parentElement);

	});
}

//Mark Completed on click
function eventComplete(element, parent){
	element.addEventListener("click", function(){
		let main = this.parentElement.parentElement;
		parent.appendChild(main);
		element.style.backgroundColor = "lightgreen";
		element.disabled = true;
		element.innerHTML = "Completed"
		this.parentElement.removeChild(main.getElementsByClassName("inProgressButton")[0]);
		main.style.backgroundColor = "rgba(250,250,250, .7)";
		main.style.backgroundImage = "url('')";

	});
}

function setElement(){

	// Define New Elements
	let newDiv = newElement("div","taskSub", cache.input.value);
	let newButtonsContainer = newElement("div","finishButtons", "");
	let newComplete = newElement("button","completeButton", "Complete ");
	let newDelete = newElement("button", "deleteButton", "Delete ");
	let newInProgress = newElement("button", "inProgressButton", "In Progress ");

	//Add Event Listeners For Created Buttons
	eventDelete(newDelete);
	eventComplete(newComplete,cache.completedContainer);
	eventInProgress(newInProgress,cache.inProgressContainer);

	// Append Children to Parents
	cache.container.appendChild(newDiv);
	newDiv.appendChild(newButtonsContainer);
	newButtonsContainer.appendChild(newInProgress);
	newButtonsContainer.appendChild(newComplete);
	newButtonsContainer.appendChild(newDelete);
	
	//Add Icons
	newInProgress.innerHTML += "<i class='fa fa-circle-o'></i>";
	newComplete.innerHTML += "<i class='fa fa-check'></i>";
	newDelete.innerHTML +="<i class='fa fa-trash'></i>";
	
	// Reset text
	cache.input.value = "";
}

//Add task on click
cache.taskButton.addEventListener("click", function(){
	if (inputCheck(cache.input.value)){
		setElement();
	}
});

//Add task on enter
cache.input.addEventListener("keypress", function(event){
	if (inputCheck(cache.input.value) && event.keyCode === 13){
		setElement();
	}
});

