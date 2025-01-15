// Get all the draggable words and drop zones
const draggableWords = document.querySelectorAll('.draggable-word');
const dropZones = document.querySelectorAll('.drop-zone');
const feedback = document.getElementById('feedback');
const correctMessage = document.querySelector('.text-green-500');
const incorrectMessage = document.querySelector('.text-red-500');

// Dictionary for word to topic mapping
const wordTopicMapping = {
    "jump": "mechanics",
    "level-up": "mechanics",
    "power-up": "mechanics",
    "quest": "mechanics",
    "enemy": "design",
    "strategy": "design",
    "mission": "design",
    "boss-fight": "design",
    "story": "narrative",
    "character": "narrative",
    "plot twist": "narrative",
    "hero": "narrative",
    "villain": "narrative",
    "adventure": "narrative",
    "dialogue": "narrative",
    "choice": "narrative",
    "map": "design",
    "interface": "design",
    "avatar": "design",
    "user experience": "design",
    "controls": "design",
    "visuals": "design",
    "soundtrack": "design",
    "difficulty": "design",
    "code": "technology",
    "graphics": "technology",
    "engine": "technology",
    "update": "technology",
    "mod": "technology",
    "server": "technology",
    "database": "technology",
    "cloud": "technology",
};

// Allow draggable words to be dragged
draggableWords.forEach(word => {
    word.addEventListener('dragstart', (e) => {
        // Set the innerHTML for the dragged element
        e.dataTransfer.setData('text', e.target.innerHTML.trim().toLowerCase());
    });
});

// Allow drop zones to accept dragged elements
dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Allow drop
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        
        // Get the innerHTML of the dragged word
        const draggedWordText = e.dataTransfer.getData('text');
        const draggedWord = Array.from(draggableWords).find(word => word.innerHTML.trim().toLowerCase() === draggedWordText);
        
        // Get the expected topic for the dragged word
        const expectedTopic = wordTopicMapping[draggedWordText];

        // Check if the word's topic matches the drop zone's ID
        if (zone.id === expectedTopic) {
            zone.classList.add('bg-green-300');
            zone.classList.remove('bg-gray-200');
            
            // Hide incorrect message and show correct message
            incorrectMessage.classList.add('hidden');
            correctMessage.classList.remove('hidden');
            
            // Disable the word after correct drop and hide it
            draggedWord.setAttribute('draggable', 'false');
            draggedWord.classList.add('hi');
            draggedWord.classList.remove('cursor-pointer');
            draggedWord.style.display = 'none'; // Hide the word itself
        } else {
            // If the drop is incorrect, show feedback
            zone.classList.add('bg-red-300');
            zone.classList.remove('bg-gray-200');
            
            // Show incorrect message
            correctMessage.classList.add('hidden');
            incorrectMessage.classList.remove('hidden');
        }
    });
});
