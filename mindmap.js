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
      { id: 'narrative', topic: 'Narrative' },
      { id: 'technology', topic: 'Technology' },
    ],
  },
};

// Mapping of draggable words to mind map nodes (using `id` of the nodes)
const wordTopicMapping = {
  "algorithm": "mechanics",
  "narrative": "narrative",
  "strategy": "design",
  "immersion": "design",
  "avatar": "mechanics",
  "level": "mechanics",
  "objective": "design",
  "challenge": "design",
  "feedback": "design",
  "interaction": "mechanics",
};

// Initialize your mindmap
const jm = new jsMind({
  container: 'mindmap_container',
  theme: 'primary',
  data: mindMapData,
});
jm.init();
jm.show(mindMapData)

// Drag and Drop handling
const draggableWords = document.querySelectorAll('.draggable-word');

draggableWords.forEach(word => {
  word.addEventListener('dragstart', (event) => {
    // Log the word being dragged
    console.log("Dragging word:", word.getAttribute('data-node-id'));
    event.dataTransfer.setData('text', word.getAttribute('data-node-id')); // store the word ID
  });
});

// Handle the drop event
const mindMapContainer = document.getElementById('mindmap_container');

mindMapContainer.addEventListener('dragover', (event) => {
  event.preventDefault(); // Allow drop
});

mindMapContainer.addEventListener('drop', (event) => {
  event.preventDefault(); // Prevent default drop action

  // Get the dragged word
  const draggedWord = event.dataTransfer.getData('text');
  const mappedTopic = wordTopicMapping[draggedWord]; // Map it to the correct target topic

  // Find the target node by ID
  const targetNode = document.querySelector(`[nodeid="${mappedTopic}"]`);

  if (targetNode) {
    // If a valid target is found, log and proceed with the drop
    console.log("Dropped word:", draggedWord);
    console.log("Target element:", targetNode);

    // Here you would proceed with your desired drop behavior, like updating the mind map or other actions.
  } else {
    // If no valid target is found, log an error
    console.log("Error: No valid target topic found.");
  }
});