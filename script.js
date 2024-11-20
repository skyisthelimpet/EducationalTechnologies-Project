if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = "./notsupported.html";
  }

const menuButton = document.getElementById("nav_bar_icon");


window.onload = function () {
    menuButton.checked = false;

};



menuButton.addEventListener('change', () => {
    document.getElementById("side-menu").classList.toggle('w-0');
    document.getElementById("side-menu").classList.toggle('w-44'); 
});

document.getElementById("blog-btn").addEventListener('click', () => {
    window.location.href = 'https://awollrur.wordpress.com/';
})




async function fetchTodaysFact() {
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/today', {
            'Accept': 'text/plain'
        });

        if (!response.ok) {
            throw new Error(`eror: ${response.status}`);
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


// function displayFact(data) {

//     const factElement = document.getElementById('fact-text');
//     if (factElement) {
//         factElement.textContent = data.text;
//     }
// }

// window.addEventListener('load', fetchTodaysFact);




async function fetchWordData() {
    const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/fork';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
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
        backgroundColor: '#0f172a'
    });
});


document.addEventListener('DOMContentLoaded', () => {


    const initialWordData = {
        "explore": { "synonyms": ["investigate", "search", "examine"], "antonyms": ["ignore", "neglect", "overlook"] },
        "investigate": { "synonyms": ["explore", "search", "examine"], "antonyms": ["ignore", "neglect", "overlook"] },
        "search": { "synonyms": ["explore", "investigate", "examine"], "antonyms": ["ignore", "neglect", "overlook"] },
        "examine": { "synonyms": ["explore", "investigate", "search"], "antonyms": ["ignore", "neglect", "overlook"] },
        "ignore": { "synonyms": ["neglect", "overlook"], "antonyms": ["explore", "investigate", "search", "examine"] },
        "learn": { "synonyms": ["study", "understand", "grasp"], "antonyms": ["forget", "misunderstand", "overlook"] },
        "study": { "synonyms": ["learn", "understand", "grasp"], "antonyms": ["forget", "misunderstand", "overlook"] },
        "understand": { "synonyms": ["learn", "study", "grasp"], "antonyms": ["forget", "misunderstand", "overlook"] },
        "grasp": { "synonyms": ["learn", "study", "understand"], "antonyms": ["forget", "misunderstand", "overlook"] },
        "forget": { "synonyms": ["neglect"], "antonyms": ["learn", "study", "understand", "grasp"] },
        "adventure": { "synonyms": ["journey", "expedition", "quest"], "antonyms": ["routine", "boredom", "sameness"] },
        "journey": { "synonyms": ["adventure", "expedition", "quest"], "antonyms": ["routine", "boredom", "sameness"] },
        "expedition": { "synonyms": ["adventure", "journey", "quest"], "antonyms": ["routine", "boredom", "sameness"] },
        "quest": { "synonyms": ["adventure", "journey", "expedition"], "antonyms": ["routine", "boredom", "sameness"] },
        "routine": { "synonyms": ["habit"], "antonyms": ["adventure", "journey", "expedition", "quest"] },
        "discover": { "synonyms": ["uncover", "find", "reveal", "miss", "overlook"], "antonyms": ["lose", "hide"] },
        "uncover": { "synonyms": ["discover", "find", "reveal", "miss", "overlook"], "antonyms": ["lose", "hide"] },
        "find": { "synonyms": ["discover", "uncover", "reveal", "miss", "overlook"], "antonyms": ["lose", "hide"] },
        "reveal": { "synonyms": ["discover", "uncover", "find", "miss", "overlook"], "antonyms": ["lose", "hide"] },
        "lose": { "synonyms": ["miss"], "antonyms": ["discover", "uncover", "find", "reveal"] },
        "overlook": { "synonyms": ["miss", "ignore", "discover", "find"], "antonyms": ["focus"] },
        "miss": { "synonyms": ["overlook", "find", "uncover"], "antonyms": ["discover", "focus"] },
        "language": { "synonyms": ["speech", "tongue", "dialect"], "antonyms": ["silence", "incomprehension", "miscommunication"] },
        "speech": { "synonyms": ["language", "tongue", "dialect"], "antonyms": ["silence", "incomprehension", "miscommunication"] },
        "tongue": { "synonyms": ["language", "speech", "dialect"], "antonyms": ["silence", "incomprehension", "miscommunication"] },
        "dialect": { "synonyms": ["language", "speech", "tongue"], "antonyms": ["silence", "incomprehension", "miscommunication"] },
        "silence": { "synonyms": ["quiet", "mute"], "antonyms": ["language", "speech", "tongue", "dialect"] },
        "mute": { "synonyms": ["silence", "quiet"], "antonyms": ["speak", "talk", "converse", "communicate"] },
        "culture": { "synonyms": ["tradition", "customs", "heritage"], "antonyms": ["ignorance", "neglect", "isolation"] },
        "tradition": { "synonyms": ["culture", "customs", "heritage"], "antonyms": ["ignorance", "neglect", "isolation"] },
        "customs": { "synonyms": ["culture", "tradition", "heritage"], "antonyms": ["ignorance", "neglect", "isolation"] },
        "heritage": { "synonyms": ["culture", "tradition", "customs"], "antonyms": ["ignorance", "neglect", "isolation"] },
        "ignorance": { "synonyms": ["unawareness"], "antonyms": ["culture", "tradition", "customs", "heritage"] },
        "speak": { "synonyms": ["talk", "converse", "communicate"], "antonyms": ["listen", "mute"] },
        "talk": { "synonyms": ["speak", "converse", "communicate"], "antonyms": ["listen", "mute"] },
        "converse": { "synonyms": ["speak", "talk", "communicate"], "antonyms": ["listen", "mute"] },
        "communicate": { "synonyms": ["speak", "talk", "converse"], "antonyms": ["listen", "mute"] },
        "listen": { "synonyms": ["hear"], "antonyms": ["speak", "talk", "converse", "communicate"] },
        "create": { "synonyms": ["build", "construct", "design"], "antonyms": ["destroy", "demolish", "ruin"] },
        "build": { "synonyms": ["create", "construct", "design"], "antonyms": ["destroy", "demolish", "ruin"] },
        "construct": { "synonyms": ["create", "build", "design"], "antonyms": ["destroy", "demolish", "ruin"] },
        "design": { "synonyms": ["create", "build", "construct"], "antonyms": ["destroy", "demolish", "ruin"] },
        "destroy": { "synonyms": ["demolish", "ruin"], "antonyms": ["create", "build", "construct", "design"] },
        "happy": { "synonyms": ["joyful", "content", "pleased"], "antonyms": ["sad", "unhappy", "miserable"] },
        "joyful": { "synonyms": ["happy", "content", "pleased"], "antonyms": ["sad", "unhappy", "miserable"] },
        "content": { "synonyms": ["happy", "joyful", "pleased"], "antonyms": ["sad", "unhappy", "miserable"] },
        "pleased": { "synonyms": ["happy", "joyful", "content"], "antonyms": ["sad", "unhappy", "miserable"] },
        "sad": { "synonyms": ["unhappy", "miserable"], "antonyms": ["happy", "joyful", "content", "pleased"] },
        "unhappy": { "synonyms": ["sad", "miserable"], "antonyms": ["happy", "joyful", "content", "pleased"] },
        "miserable": { "synonyms": ["sad", "unhappy"], "antonyms": ["happy", "joyful", "content", "pleased"] },
        "friend": { "synonyms": ["companion", "buddy", "ally"], "antonyms": ["enemy", "foe", "rival"] },
        "companion": { "synonyms": ["friend", "buddy", "ally"], "antonyms": ["enemy", "foe", "rival"] },
        "buddy": { "synonyms": ["friend", "companion", "ally"], "antonyms": ["enemy", "foe", "rival"] },
        "ally": { "synonyms": ["friend", "companion", "buddy"], "antonyms": ["enemy", "foe", "rival"] },
        "enemy": { "synonyms": ["foe", "rival"], "antonyms": ["friend", "companion", "buddy", "ally"] },
        "foe": { "synonyms": ["enemy", "rival"], "antonyms": ["friend", "companion", "buddy", "ally"] },
        "rival": { "synonyms": ["enemy", "foe"], "antonyms": ["friend", "companion", "buddy", "ally"] }
    };
    
    
    function generateFullWordData(wordData) {
        const fullData = {};
    
        for (const word in wordData) {
            if (!fullData[word]) {
                fullData[word] = { synonyms: [], antonyms: [] };
            }
    
            const { synonyms, antonyms } = wordData[word];
    
           
            synonyms.forEach(synonym => {
                if (!fullData[word].synonyms.includes(synonym)) {
                    fullData[word].synonyms.push(synonym);
                }
    
              w
                if (!fullData[synonym]) {
                    fullData[synonym] = { synonyms: [], antonyms: [] };
                }
                if (!fullData[synonym].synonyms.includes(word)) {
                    fullData[synonym].synonyms.push(word);
                }
            });
    
            antonyms.forEach(antonym => {
                if (!fullData[word].antonyms.includes(antonym)) {
                    fullData[word].antonyms.push(antonym);
                }
    
              
                if (!fullData[antonym]) {
                    fullData[antonym] = { synonyms: [], antonyms: [] };
                }
                if (!fullData[antonym].antonyms.includes(word)) {
                    fullData[antonym].antonyms.push(word);
                }
            });
        }
    
        return fullData;
    }
    
    
    const wordData = generateFullWordData(initialWordData);
    
    function checkRelationship(word1, word2) {
       
        word1 = word1.toLowerCase();
        word2 = word2.toLowerCase();
    
     
        if (wordData[word1] && wordData[word2]) {
 
            if (wordData[word1].synonyms.includes(word2)) {
                return 'synonym';
            }
    
          
            if (wordData[word1].antonyms.includes(word2)) {
                return 'antonym';
            }
        }
    
        return 'neither';
    }
    



    document.getElementById('check-relationship').addEventListener('click', () => {
        const word1 = document.getElementById('word1-input').value.toLowerCase();
        const word2 = document.getElementById('word2-input').value.toLowerCase();
        const resultDiv = document.getElementById('relationship-result');

        if (word1 && word2) {
            const relationship = checkRelationship(word1, word2);

            if (relationship === 'synonym') {
                resultDiv.innerHTML = `<p> <span class="text-green-500"> Correct! </span> ${word1} and ${word2} are synonyms.</p>`;
            } else if (relationship === 'antonym') {
                resultDiv.innerHTML = `<p> <span class="text-green-500"> Correct! </span> ${word1} and ${word2} are antonyms.</p>`;
            } else {
                resultDiv.innerHTML = `<p> <span class="text-red-500"> False! </span> ${word1} and ${word2} are neither synonyms nor antonyms.</p>`;
            }
        } else {
            resultDiv.innerHTML = `<p>Please enter valid words from the word cloud.</p>`;
        }
    });

});
