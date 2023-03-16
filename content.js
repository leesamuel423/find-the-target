// Create a new image element
const dogImg = document.createElement('img');
//set image source to file inside the extension
dogImg.src = chrome.runtime.getURL('dog.png');

//POSITION ABSOLUTE SO ANYWHERE IN THE PAGE. ZINDEX MAX AND OPACITY LOWER
// → SOMETIMES, OTHER ITEMS IN PAGE HAVE PRIORITY BECAUSE CONTAINERIZED...MAYBE CONTAINERIZE THIS IN THE FUTURE TOO?
dogImg.style.position = 'absolute';
dogImg.style.zIndex = '2147483647';
dogImg.style.opacity = '70%';

//DOG MAX DIMENSIONS
dogImg.style.maxWidth = '100px';
dogImg.style.maxHeight = '100px';

//BORDER RADIUS ROUNDER TO MAKE IMAGE CUTER
dogImg.style.borderRadius = `50px`

//RANDOM X AND Y COORDINATES WITHIN DOCUMENT BOUNDS (+/- 100 TO ACCOUNT FOR IMAGE SIZE)
const y = Math.floor(Math.random() * (document.documentElement.scrollHeight - 100));
const x = Math.floor(Math.random() * (document.documentElement.scrollWidth - 100));

//SET DOG'S IMAGE TOP AND LEFT TO RANDOMIZED POSITIONS
dogImg.style.top = `${y}px`;
dogImg.style.left = `${x}px`;

//APPEND DOG IMAGE TO DOCUMENT BODY
document.body.appendChild(dogImg);

//FUNCTIONALITY TO SEND CURRENT TAB LOCATION TO HINT
//LISTENER FOR MESSAGES FROM POPUP SCRIPT
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	//IF MESSAGE RECEIVED, WILL SEND THE CURRENT TAB'S TITLE
	if (request.message === 'requestTabTitle') {
		sendResponse({ tabTitle: document.title });
	}
});