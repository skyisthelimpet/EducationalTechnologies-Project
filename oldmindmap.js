
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
        { id: 'narrative', topic: 'Narrative', direction: "left" },
        { id: 'technology', topic: 'Technology', direction: "left" },
      ],
    },
  };
  
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
  
  const jm = new jsMind({
    container: 'mindmap_container',
    theme: 'primary',
    data: mindMapData,
    editable: true,
  
  });
  jm.init();
  jm.show(mindMapData);
  
  const draggableWords = document.querySelectorAll('.draggable-word');
  
  draggableWords.forEach(word => {
    word.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text', word.getAttribute('data-node-id'));
    });
  });
  
  const mindMapContainer = document.getElementById('mindmap_container');
  
  mindMapContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
  });
  
  mindMapContainer.addEventListener('drop', (event) => {
    event.preventDefault();
  
    const draggedWord = event.dataTransfer.getData('text');
    const mappedTopic = wordTopicMapping[draggedWord];
  
    const targetNode = event.target.closest('[nodeid]');
  
    if (targetNode) {
      const targetNodeId = targetNode.getAttribute('nodeid');
      const targetNodeObj = jm.get_node(targetNodeId);
  
      if (targetNodeObj) {
        const targetTopicNormalized = targetNodeObj.topic.replace("Game ", "").toLowerCase();
        const mappedTopicNormalized = mappedTopic.toLowerCase();
  
        if (targetTopicNormalized === mappedTopicNormalized) {
          const newChildNode = {
            id: `${draggedWord}_child`,
            topic: draggedWord,
          };
  
          jm.add_node(targetNodeObj, newChildNode.id, newChildNode.topic);
  
          document.getElementById('feedback').innerHTML = 'Correct!'
          document.getElementById('feedback').classList.add('text-green-500')
          document.getElementById('feedback').classList.remove('text-red-500')
  
  
          const wordElement = document.querySelector(`[data-node-id="${draggedWord}"]`);
          if (wordElement) {
            wordElement.classList.add('hidden')
          }
        }
        else {
          document.getElementById('feedback').innerHTML = 'Wrong! Try again.'
          document.getElementById('feedback').classList.add('text-red-500')
          document.getElementById('feedback').classList.remove('text-green-500')
        }
      }
    }
  });
  