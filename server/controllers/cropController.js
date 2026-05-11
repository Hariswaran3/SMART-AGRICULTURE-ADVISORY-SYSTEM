// Rule-based crop recommendation engine
// Easily replaceable with ML model in production

const cropRules = {
  clay: {
    summer: { crop: 'Cotton', reason: 'Clay retains moisture well for cotton in summer heat', yield: 'High', water: 'Moderate' },
    winter: { crop: 'Wheat', reason: 'Wheat thrives in clay soil during cool winters', yield: 'High', water: 'Low' },
    monsoon: { crop: 'Rice', reason: 'Clay soil with monsoon rain is ideal for paddy cultivation', yield: 'Very High', water: 'High' },
    spring: { crop: 'Sugarcane', reason: 'Clay soil supports sugarcane root development in spring', yield: 'High', water: 'Moderate' },
  },
  sandy: {
    summer: { crop: 'Groundnut', reason: 'Sandy soil drains well, perfect for groundnut in summer', yield: 'Moderate', water: 'Low' },
    winter: { crop: 'Barley', reason: 'Barley adapts well to sandy soil in cooler months', yield: 'Moderate', water: 'Low' },
    monsoon: { crop: 'Millet', reason: 'Millet is drought-tolerant and suits sandy soil', yield: 'Moderate', water: 'Low' },
    spring: { crop: 'Watermelon', reason: 'Sandy soil with good drainage is ideal for watermelon', yield: 'High', water: 'Moderate' },
  },
  loamy: {
    summer: { crop: 'Maize', reason: 'Loamy soil provides balanced nutrients for maize growth', yield: 'Very High', water: 'Moderate' },
    winter: { crop: 'Mustard', reason: 'Mustard grows excellently in loamy soil during winter', yield: 'High', water: 'Low' },
    monsoon: { crop: 'Soybean', reason: 'Loamy soil with monsoon moisture is perfect for soybean', yield: 'High', water: 'Moderate' },
    spring: { crop: 'Tomato', reason: 'Loamy soil supports healthy tomato root systems', yield: 'Very High', water: 'Moderate' },
  },
  silt: {
    summer: { crop: 'Sunflower', reason: 'Silt soil retains nutrients well for sunflower cultivation', yield: 'High', water: 'Moderate' },
    winter: { crop: 'Peas', reason: 'Peas thrive in silt soil during cool winter months', yield: 'Moderate', water: 'Low' },
    monsoon: { crop: 'Jute', reason: 'Silt soil with high moisture is ideal for jute fiber', yield: 'High', water: 'High' },
    spring: { crop: 'Potato', reason: 'Silt soil provides loose structure for potato tuber growth', yield: 'Very High', water: 'Moderate' },
  },
  black: {
    summer: { crop: 'Cotton', reason: 'Black soil (regur) is famous for cotton cultivation', yield: 'Very High', water: 'Low' },
    winter: { crop: 'Chickpea', reason: 'Chickpea uses residual moisture in black soil effectively', yield: 'High', water: 'Very Low' },
    monsoon: { crop: 'Sorghum', reason: 'Sorghum handles waterlogging in black soil during monsoon', yield: 'High', water: 'Moderate' },
    spring: { crop: 'Lentil', reason: 'Lentils fix nitrogen and grow well in black soil', yield: 'Moderate', water: 'Low' },
  },
};

// POST /api/crop/recommend
const recommendCrop = (req, res) => {
  const { soilType, season } = req.body;

  if (!soilType || !season)
    return res.status(400).json({ message: 'soilType and season are required' });

  const soil = soilType.toLowerCase();
  const seas = season.toLowerCase();
  const rule = cropRules[soil]?.[seas];

  if (!rule)
    return res.status(404).json({ message: 'No recommendation found for this combination' });

  res.json({
    soilType: soil,
    season: seas,
    recommendedCrop: rule.crop,
    reason: rule.reason,
    expectedYield: rule.yield,
    waterRequirement: rule.water,
    tips: [
      `Prepare soil 2-3 weeks before planting ${rule.crop}`,
      `Monitor soil pH (ideal: 6.0-7.5) for optimal growth`,
      `Apply organic compost to improve soil structure`,
    ],
  });
};

module.exports = { recommendCrop };
