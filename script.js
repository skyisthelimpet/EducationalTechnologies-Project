
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











document.addEventListener('DOMContentLoaded', () => {
    const words = [
        ['explore', 20], ['investigate', 15], ['search', 18], ['examine', 14],
        ['ignore', 10], ['neglect', 8], ['overlook', 8], ['learn', 20],
        ['study', 18], ['understand', 15], ['grasp', 14], ['forget', 10],
        ['misunderstand', 8], ['adventure', 20], ['journey', 15], ['expedition', 18],
        ['quest', 14], ['routine', 10], ['boredom', 8], ['sameness', 8],
        ['discover', 20], ['uncover', 15], ['find', 18], ['reveal', 14],
        ['lose', 10], ['miss', 8], ['hide', 8], ['language', 20], ['speech', 15],
        ['tongue', 14], ['dialect', 12], ['silence', 10], ['incomprehension', 8],
        ['miscommunication', 8], ['culture', 20], ['tradition', 15], ['customs', 14],
        ['heritage', 12], ['ignorance', 10], ['isolation', 8], ['speak', 20],
        ['talk', 18], ['converse', 15], ['communicate', 14], ['listen', 10],
        ['mute', 8], ['create', 20], ['build', 15], ['construct', 14],
        ['design', 12], ['destroy', 10], ['demolish', 8], ['ruin', 8], ['happy', 20],
        ['joyful', 18], ['content', 15], ['pleased', 14], ['sad', 10], ['unhappy', 8],
        ['miserable', 8], ['friend', 20], ['companion', 18], ['buddy', 15], ['ally', 14],
        ['enemy', 10], ['foe', 8], ['rival', 8]
    ];

    const uniqueWords = Array.from(new Set(words.map(word => word[0])))
        .map(word => words.find(entry => entry[0] === word));

    WordCloud(document.getElementById('word-cloud'), {
        list: uniqueWords,
        gridSize: 12,
        weightFactor: 5,
        color: 'random-dark',
        rotateRatio: 0.5,
        backgroundColor: '#f8f8f8'
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const words = [
        ['explore', 20], ['investigate', 15], ['search', 18], ['examine', 14],
        ['ignore', 10], ['neglect', 8], ['overlook', 8], ['learn', 20],
        ['study', 18], ['understand', 15], ['grasp', 14], ['forget', 10],
        ['misunderstand', 8], ['adventure', 20], ['journey', 15], ['expedition', 18],
        ['quest', 14], ['routine', 10], ['boredom', 8], ['sameness', 8],
        ['discover', 20], ['uncover', 15], ['find', 18], ['reveal', 14],
        ['lose', 10], ['miss', 8], ['hide', 8], ['language', 20], ['speech', 15],
        ['tongue', 14], ['dialect', 12], ['silence', 10], ['incomprehension', 8],
        ['miscommunication', 8], ['culture', 20], ['tradition', 15], ['customs', 14],
        ['heritage', 12], ['ignorance', 10], ['isolation', 8], ['speak', 20],
        ['talk', 18], ['converse', 15], ['communicate', 14], ['listen', 10],
        ['mute', 8], ['create', 20], ['build', 15], ['construct', 14],
        ['design', 12], ['destroy', 10], ['demolish', 8], ['ruin', 8], ['happy', 20],
        ['joyful', 18], ['content', 15], ['pleased', 14], ['sad', 10], ['unhappy', 8],
        ['miserable', 8], ['friend', 20], ['companion', 18], ['buddy', 15], ['ally', 14],
        ['enemy', 10], ['foe', 8], ['rival', 8]
    ];

    const wordData = {
        "explore": {
            "synonyms": ["investigate", "search", "examine"],
            "antonyms": ["ignore", "neglect", "overlook"]
        },
        "learn": {
            "synonyms": ["study", "understand", "grasp"],
            "antonyms": ["forget", "misunderstand", "overlook"]
        },
        "adventure": {
            "synonyms": ["journey", "expedition", "quest"],
            "antonyms": ["routine", "boredom", "sameness"]
        },
        "discover": {
            "synonyms": ["uncover", "find", "reveal"],
            "antonyms": ["lose", "miss", "hide"]
        },
        "language": {
            "synonyms": ["speech", "tongue", "dialect"],
            "antonyms": ["silence", "incomprehension", "miscommunication"]
        },
        "culture": {
            "synonyms": ["tradition", "customs", "heritage"],
            "antonyms": ["ignorance", "neglect", "isolation"]
        },
        "speak": {
            "synonyms": ["talk", "converse", "communicate"],
            "antonyms": ["listen", "mute"]
        },
        "create": {
            "synonyms": ["build", "construct", "design"],
            "antonyms": ["destroy", "demolish", "ruin"]
        },
        "happy": {
            "synonyms": ["joyful", "content", "pleased"],
            "antonyms": ["sad", "unhappy", "miserable"]
        },
        "friend": {
            "synonyms": ["companion", "buddy", "ally"],
            "antonyms": ["enemy", "foe", "rival"]
        }
    };


    function checkRelationship(word1, word2) {
        for (const key in wordData) {
            const { synonyms, antonyms } = wordData[key];

            // Check if the words are synonyms
            if (
                (key === word1 && synonyms.includes(word2)) ||
                (key === word2 && synonyms.includes(word1)) ||
                (synonyms.includes(word1) && synonyms.includes(word2))
            ) {
                return 'synonym';
            }

            // Check if the words are antonyms
            if (
                (key === word1 && antonyms.includes(word2)) ||
                (key === word2 && antonyms.includes(word1)) ||
                (synonyms.includes(word1) && antonyms.includes(word2)) ||
                (synonyms.includes(word2) && antonyms.includes(word1))
            ) {
                return 'antonym';
            }
        }

        return 'neither';
    }

    // Event listener for checking relationship
    document.getElementById('check-relationship').addEventListener('click', () => {
        const word1 = document.getElementById('word1-input').value.toLowerCase();
        const word2 = document.getElementById('word2-input').value.toLowerCase();
        const resultDiv = document.getElementById('relationship-result');

        if (word1 && word2) {
            const relationship = checkRelationship(word1, word2);

            if (relationship === 'synonym') {
                resultDiv.innerHTML = `<p>${word1} and ${word2} are synonyms.</p>`;
            } else if (relationship === 'antonym') {
                resultDiv.innerHTML = `<p>${word1} and ${word2} are antonyms.</p>`;
            } else {
                resultDiv.innerHTML = `<p>${word1} and ${word2} are neither synonyms nor antonyms.</p>`;
            }
        } else {
            resultDiv.innerHTML = `<p>Please enter valid words from the word cloud.</p>`;
        }
    });

});
