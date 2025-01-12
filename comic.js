const comicData = {
    panels: [
        {
            panelNumber: 1,
            correctAnswer: 1,
            nextPanel: 1,
            imageSrc: './images/comics/panel1.png',
            options: {
                0: "Tiger",
                1: "Monster",
                2: "Storm",
                3: "Bandit"
            }
        },
        {
            panelNumber: 2,
            correctAnswer: 1,
            nextPanel: 2,
            imageSrc: './images/comics/panel2.png',
            options: {
                0: "Village",
                1: "Castle",
                2: "Market",
                3: "Forest"
            }
        },
        {
            panelNumber: 3,
            correctAnswer: 0,
            nextPanel: 3,
            imageSrc: './images/comics/panel3.png',
            options: {
                0: "Kingdom",
                1: "Animals",
                2: "Army",
                3: "People"
            }
        },
        {
            panelNumber: 4,
            correctAnswer: 2,
            nextPanel: 4,
            imageSrc: './images/comics/panel4.png',
            options: {
                0: "Power",
                1: "Wealth",
                2: "Terror",
                3: "Darkness"
            }
        },
        {
            panelNumber: 5,
            correctAnswer: 2,
            nextPanel: null,
            imageSrc: './images/comics/panel5.png',
            options: {
                0: "Crown",
                1: "Sword",
                2: "Treasure",
                3: "Kingdom"
            }
        }
    ],
    currentPanel: 0
};


function displayPanel() {
    const panel = comicData.panels[comicData.currentPanel];

    // Update the comic panel image
    const imageElement = document.getElementById("image_comic");
    if (imageElement) {
        imageElement.src = panel.imageSrc;
    }

    // Update the answer options text
    for (let i = 0; i < 4; i++) {
        const optionElement = document.getElementById(`option${i}`);
        if (optionElement) {
            optionElement.textContent = panel.options[i];
        }
    }
}

// Function to check the answer and automatically load the next panel
function checkAnswer(selectedOption) {
    const panel = comicData.panels[comicData.currentPanel];

    if (selectedOption === panel.correctAnswer) {
        alert("Correct! Loading next panel...");
        comicData.currentPanel = panel.nextPanel; // Move to the next panel

        // If there is a next panel, display it
        if (comicData.currentPanel !== null) {
            displayPanel();
        } else {
            alert("Congratulations! You've finished the comic!");
        }
    } else {
        alert("Incorrect! Please try again.");
    }
}

// Initialize the first panel when the page loads
window.onload = function() {
    displayPanel(); // Display the first panel
};