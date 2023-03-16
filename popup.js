/* eslint-disable no-undef */

//ADD A ONCLICK EVENT TO HIDE THE DOG
//WHEN CLICK HIDEDOG BUTTON...
document.getElementById('hideDog').addEventListener('click', () => {
	//QUERY ALL THE TABS IN THE CURRENT WINDOW ONLY
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
		//TABS HAS LENGTH FUNCTION, USE TO CALCULATE RANDOM INDEX TO POPULATE IMAGE
		const randomTabIndex = Math.floor(Math.random() * tabs.length);
		//GRAB THE RANDOM TAB FROM TABS ARRAY
		const randomTab = tabs[randomTabIndex];
		//EXECUTE THE CODE IN CONTENTS.JS TO POPULATE THE TARGET ON THE RANDOM TAB
		chrome.scripting.executeScript({
			target: { tabId: randomTab.id },
			files: ['content.js']
		});
	});
});

//ADD A ONCLICK EVENT TO GET A HINT
//WHEN CLICK HINT BUTTON...
document.getElementById('getHint').addEventListener('click', () => {
	//QUERRY THE TABS IN CURRENT WINDOW SO WE CAN ITERATE THROUGH AND SEE WHICH ONE DOG IS IN
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
		let found = false;
		//CHECK FOR DOG IMAGE AT THE SPECIFIC INDEX, AND IF IT IS THERE, RETURN ALERT, OTHERWISE KEEP ITERATING UNTIL END
		const checkTab = (index) => {
			//BASE CASE: IF WE ITERATE AND INDEX ENDS UP GREATER (WE CHECKED ALL TABS), RETURN NONE
			if (index >= tabs.length) {
				if (!found) {
					alert('The dog image is not on any tab in the current window.');
				}
				return;
			}
			
			//GRAB THE TAB OBJECT FROM THE ARRAY AT OUR INDEX
			const tab = tabs[index];
			//SEND CONTENT.JS A MESSAGE ASKING TO PROVIDE TAB TITLE IF THE DOG IMAGE IS PRESENT ON THIS TAB
			chrome.tabs.sendMessage(tab.id, { message: 'requestTabTitle' }, (response) => {
				//IF THERE IS AN ERROR WHILE SENDING THE MESSAGE, IGNROE AND MOVE ON CHECK NEXT INDEX
				if (chrome.runtime.lastError) {
					checkTab(index + 1); //RECURSIVE CALL WITH NEXT INDEX
				} 
				//IF TABTITLE IS IN THE RESPONSE, WE FOUND THE DOG. ALERT WITH LOCATION
				else if (response && response.tabTitle) {
					// → FOUND FUNCTIONALITY CAN BE USEFUL LATER TO TOGGLE OFF AFTER REMOVING DOG SO WE CAN REPLAY THE GAME
					found = true;
					alert(`The dog image is on the tab with the title: ${response.tabTitle}`);
				} else {
					//RECURSIVE CALL TO CHECK THE NEXT TAB
					checkTab(index + 1);
				}
			});
		};
		// START CHECKING FROM FIRST TAB
		checkTab(0);
	});
});
  