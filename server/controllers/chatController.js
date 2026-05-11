// Rule-based chatbot — LLM-ready (swap processMessage with OpenAI/Bedrock call)

const responses = {
  irrigation: [
    'For most crops, irrigate when top 2-3 inches of soil feel dry.',
    'Drip irrigation saves 30-50% water compared to flood irrigation.',
    'Water crops early morning (6-8 AM) to reduce evaporation losses.',
    'Avoid overwatering — it causes root rot and nutrient leaching.',
  ],
  fertilizer: [
    'Apply NPK fertilizer based on soil test results for best results.',
    'Organic compost improves soil structure and provides slow-release nutrients.',
    'Nitrogen is crucial during vegetative growth; reduce it before flowering.',
    'Potassium strengthens plant immunity and improves fruit quality.',
  ],
  pest: [
    'Neem oil spray is effective against aphids, whiteflies, and mites.',
    'Introduce beneficial insects like ladybugs to control pest populations.',
    'Crop rotation every season helps break pest and disease cycles.',
    'Monitor crops weekly — early detection prevents major infestations.',
  ],
  weather: [
    'During heat waves, mulch soil to retain moisture and cool roots.',
    'Before heavy rain, ensure field drainage channels are clear.',
    'Frost protection: cover sensitive crops with cloth or plastic sheets.',
    'Strong winds can damage crops — use windbreaks or support stakes.',
  ],
  soil: [
    'Test soil pH annually — most crops prefer pH 6.0-7.0.',
    'Add lime to raise pH in acidic soils; sulfur to lower pH in alkaline soils.',
    'Deep plowing (30cm) improves aeration and root penetration.',
    'Cover crops like clover fix nitrogen and prevent soil erosion.',
  ],
  crop: [
    'Rotate crops each season to maintain soil health and reduce pests.',
    'Intercropping legumes with cereals improves overall yield.',
    'Choose disease-resistant varieties for your local climate.',
    'Proper plant spacing ensures adequate sunlight and air circulation.',
  ],
  harvest: [
    'Harvest in the morning when temperatures are cooler for better quality.',
    'Use sharp, clean tools to minimize crop damage during harvest.',
    'Post-harvest storage: keep produce in cool, dry, ventilated spaces.',
    'Grading and sorting produce increases market value significantly.',
  ],
};

const keywords = {
  irrigation: ['water', 'irrigat', 'drip', 'flood', 'moisture', 'dry'],
  fertilizer: ['fertiliz', 'npk', 'nitrogen', 'compost', 'nutrient', 'manure'],
  pest: ['pest', 'insect', 'disease', 'fungus', 'aphid', 'worm', 'spray'],
  weather: ['weather', 'rain', 'heat', 'frost', 'wind', 'temperature', 'climate'],
  soil: ['soil', 'ph', 'clay', 'sandy', 'loam', 'acidic', 'alkaline'],
  crop: ['crop', 'plant', 'seed', 'grow', 'harvest', 'yield', 'farm'],
  harvest: ['harvest', 'pick', 'collect', 'store', 'market', 'sell'],
};

const processMessage = (message) => {
  const lower = message.toLowerCase();

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some((w) => lower.includes(w))) {
      const arr = responses[category];
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }

  return "I'm your farming assistant! Ask me about irrigation, fertilizers, pest control, weather tips, soil health, crop selection, or harvesting techniques.";
};

// POST /api/chat
const chat = (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Message is required' });

  // Simulate slight processing delay for realism
  const response = processMessage(message);
  res.json({ response, timestamp: new Date().toISOString() });
};

module.exports = { chat };
