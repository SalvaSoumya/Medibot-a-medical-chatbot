const express = require("express");
const router = express.Router();

// POST /api/symptoms/check - Check symptoms
router.post("/check", async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body;
    
    if (!symptoms || !age || !gender) {
      return res.status(400).json({ 
        message: "Symptoms, age, and gender are required" 
      });
    }
    
    // Generate mock response based on symptoms
    const mockResponse = generateMockResponse(symptoms, age, gender);
    
    res.json(mockResponse);
  } catch (error) {
    console.error("Symptom check error:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
});

// Generate mock response based on symptoms
function generateMockResponse(symptoms, age, gender) {
  // Convert symptoms to lowercase for easier matching
  const symptomsLower = symptoms.map(s => s.toLowerCase());
  
  let conditions = [];
  let triageLevel = "regular";
  
  // Logic to generate conditions based on symptoms
  if (symptomsLower.includes("fever") && symptomsLower.includes("cough")) {
    conditions = [
      { id: "c_123", name: "Common Cold", common_name: "Common Cold", probability: 0.45 },
      { id: "c_456", name: "Influenza", common_name: "Flu", probability: 0.35 },
      { id: "c_789", name: "COVID-19", common_name: "COVID-19", probability: 0.20 }
    ];
    triageLevel = "acute";
  } else if (symptomsLower.includes("chest pain") || symptomsLower.includes("shortness of breath")) {
    conditions = [
      { id: "c_101", name: "Angina", common_name: "Angina", probability: 0.40 },
      { id: "c_102", name: "Anxiety", common_name: "Anxiety", probability: 0.35 },
      { id: "c_103", name: "Costochondritis", common_name: "Chest wall pain", probability: 0.25 }
    ];
    triageLevel = symptomsLower.includes("severe chest pain") ? "emergency" : "acute";
  } else if (symptomsLower.includes("headache")) {
    conditions = [
      { id: "c_201", name: "Tension Headache", common_name: "Tension Headache", probability: 0.60 },
      { id: "c_202", name: "Migraine", common_name: "Migraine", probability: 0.30 },
      { id: "c_203", name: "Sinusitis", common_name: "Sinus infection", probability: 0.10 }
    ];
    triageLevel = "regular";
  } else if (symptomsLower.includes("abdominal pain")) {
    conditions = [
      { id: "极狐", name: "Gastroenteritis", common_name: "Stomach flu", probability: 0.50 },
      { id: "c_302", name: "Irritable Bowel Syndrome", common_name: "IBS", probability: 0.30 },
      { id: "c_303", name: "Appendicitis", common_name: "Appendicitis", probability: 0.20 }
    ];
    triageLevel = symptomsLower.includes("severe abdominal pain") ? "emergency" : "acute";
  } else {
    // Default response for other symptoms
    conditions = [
      { id: "c_999", name: "Generalized Condition", common_name: "General symptoms", probability: 0.70 },
      { id: "c_998", name: "Viral Infection", common_name: "Viral infection", probability: 0.20 },
      { id: "c_997", name: "Stress-Related Condition", common_name: "Stress-related", probability: 0.10 }
    ];
    triageLevel = "regular";
  }
  
  return {
    conditions: conditions,
    triage_level: triageLevel
  };
}

module.exports = router;