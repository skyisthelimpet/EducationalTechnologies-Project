
import jsMind from "./libs/jsmind-master/src/jsmind.js";

const mindMapData = {
  meta: {
    name: 'gameMindMap',
    author: 'teacher',
    version: '1.0',
  },
  format: 'node_tree',
  data: {
    id: 'root',
    topic: 'Game Concepts',
    children: [
      { id: 'design', topic: 'Game Design' },
      { id: 'mechanics', topic: 'Game Mechanics' },
      { id: 'narrative', topic: 'Narrative', direction:"left"},
      { id: 'technology', topic: 'Technology', direction:"left"},
    ],
  },
};

// Mapping of draggable words to mind map nodes (using `id` of the nodes)
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

// Initialize the mind map
const jm = new jsMind({
  container: 'mindmap_container',
  theme: 'primary',
  data: mindMapData,
  editable: true,
  
});
jm.init();
jm.show(mindMapData);

// Drag and Drop handling
const draggableWords = document.querySelectorAll('.draggable-word');

draggableWords.forEach(word => {
  word.addEventListener('dragstart', (event) => {
    console.log("Dragging word:", word.getAttribute('data-node-id'));
    event.dataTransfer.setData('text', word.getAttribute('data-node-id')); // Store the word ID
  });
});

// Handle the drop event
const mindMapContainer = document.getElementById('mindmap_container');

mindMapContainer.addEventListener('dragover', (event) => {
  event.preventDefault(); // Allow drop
});

mindMapContainer.addEventListener('drop', (event) => {
  event.preventDefault(); // Prevent default drop action

  const draggedWord = event.dataTransfer.getData('text');
  const mappedTopic = wordTopicMapping[draggedWord]; // Map it to the correct target topic

  console.log("Dragged word ID:", draggedWord);
  console.log("Mapped topic for the word:", mappedTopic);

  // Find the target node by checking if the drop happens on a valid node
  const targetNode = event.target.closest('[nodeid]'); // Get the closest node from the target

  if (targetNode) {
    const targetNodeId = targetNode.getAttribute('nodeid'); // Get the ID of the node that was dropped on
    const targetNodeObj = jm.get_node(targetNodeId); // Get the target node from jsMind

    console.log("Target node ID:", targetNodeId);
    console.log("Target node topic:", targetNodeObj ? targetNodeObj.topic : "No topic found");

    if (targetNodeObj) {
      // Normalize topics by stripping "Game" prefix and converting to lowercase for case-insensitive comparison
      const targetTopicNormalized = targetNodeObj.topic.replace("Game ", "").toLowerCase();
      const mappedTopicNormalized = mappedTopic.toLowerCase();

      console.log("Normalized target topic:", targetTopicNormalized);
      console.log("Normalized mapped topic:", mappedTopicNormalized);

      if (targetTopicNormalized === mappedTopicNormalized) {
        console.log("Correct topic, adding the word to the node.");

        // Create a new child node for the dragged word
        const newChildNode = {
          id: `${draggedWord}_child`,  // Generate a unique ID for the new child node
          topic: draggedWord,          // Set the topic of the new child to the dragged word
        };

        // Add the new child node under the target node using jm.add_node()
        jm.add_node(targetNodeObj, newChildNode.id, newChildNode.topic);
        

        // Optionally, hide the word from the words container after it's dropped
        const wordElement = document.querySelector(`[data-node-id="${draggedWord}"]`);
        if (wordElement) {
          wordElement.classList.add('hidden') // Hide the word after it’s dropped
        }
      } else {
        console.log("Dropped word is on the wrong topic. Word topic:", mappedTopic, "Target topic:", targetNodeObj.topic);
      }
    } else {
      console.log("Error: No target node found.");
    }
  } else {
    console.log("Error: No valid target topic found.");
  }
});