
const menuButton = document.getElementById("nav_bar_icon");


window.onload = function () {
    menuButton.checked = false; //TO BE SURE THAT ICON IS RESET AFTER REFRESH
};

menuButton.addEventListener('change', () => {
    document.getElementById("side-menu").classList.toggle('w-0');
    document.getElementById("side-menu").classList.toggle('w-44'); // we are just toggling width classes of our side menu 
});

document.getElementById("blog-btn").addEventListener('click', () => {
    alert('Coming soon')
})




async function fetchTodaysFact() {
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/today', {
            'Accept': 'text/plain'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();


        console.log(data);
        displayFact(data);
    } catch (error) {
        console.error('Error fetching today\'s facts:', error);
        const factElement = document.getElementById('fact-text');
        if (factElement) {
            factElement.textContent = 'The word "set" has more definitions than any other word in the English language.';
        }
    }
}


function displayFact(data) {

    const factElement = document.getElementById('fact-text');
    if (factElement) {
        factElement.textContent = data.text;
    }
}

window.addEventListener('load', fetchTodaysFact);




async function fetchWordData() {
    const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/fork';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        displayWordData(data[0]);
    } catch (error) {
        console.error('Error fetching word data:', error);
    }
}

function displayWordData(wordData) {
    const wordElement = document.getElementById('word');
    const phoneticsElement = document.getElementById('phonetics');
    const definitionElement = document.getElementById('definition');
    
    if (wordElement) {
        wordElement.textContent = wordData.word;
    }
    
    if (phoneticsElement && wordData.phonetics.length > 0) {
        phoneticsElement.textContent = wordData.phonetics[0].text || 'No phonetics available';
    }
    
    if (definitionElement && wordData.meanings.length > 0 && wordData.meanings[0].definitions.length > 0) {
        definitionElement.textContent = wordData.meanings[0].definitions[0].definition || 'No definition available';
    }
}

window.addEventListener('load', fetchWordData);



