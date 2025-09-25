// Keyword matching utility for chatbot responses
const KeywordMatcher = {
  // Define keyword categories
  keywords: {
    greetings: [
      "hello",
      "hi",
      "hey",
      "greet",
      "good morning",
      "good afternoon",
      "good evening",
      "howdy",
      "what's up",
      "sup",
    ],

    projects: [
      "project",
      "work",
      "portfolio",
      "website",
      "site",
      "build",
      "created",
      "made",
      "development",
      "app",
      "application",
      "showcase",
      "examples",
      "coding",
      "programming",
      "development work",
    ],

    skills: [
      "skill",
      "technology",
      "tech",
      "programming",
      "code",
      "language",
      "framework",
      "tool",
      "html",
      "css",
      "javascript",
      "tailwind",
      "sql",
      "laravel",
      "react",
      "frontend",
      "backend",
      "fullstack",
      "abilities",
      "expertise",
      "knowledge",
      "technologies",
    ],

    contact: [
      "contact",
      "reach",
      "email",
      "hire",
      "collaborate",
      "get in touch",
      "message",
      "communication",
      "work together",
      "partnership",
    ],

    socials: [
      "social",
      "linkedin",
      "linked in",
      "github",
      "social media",
      "profiles",
      "social networks",
      "connect",
      "follow",
      "link",
      "social links",
    ],

    experience: [
      "experience",
      "background",
      "about",
      "who",
      "biography",
      "career",
      "history",
      "journey",
      "story",
      "qualification",
    ],

    goodbye: [
      "bye",
      "goodbye",
      "see you",
      "farewell",
      "see ya",
      "later",
      "talk to you later",
      "ttyl",
      "catch you later",
      "peace",
      "cya",
    ],

    thanks: [
      "thank",
      "thanks",
      "thank you",
      "thx",
      "appreciate",
      "grateful",
      "awesome",
      "great",
      "helpful",
      "amazing",
      "perfect",
    ],
    education: [
      "study",
      "school",
      "high school",
      "highschool",
      "education",
      "graduated",
      "high-school",
      "college",
      "university",
      "degree",
      "diploma",
      "middle school",
      "middle-school",
    ],
  },

  // Enhanced matching function with scoring
  findBestMatch: function (userMessage) {
    const message = userMessage.toLowerCase().trim();
    const scores = {};

    // Initialize scores
    Object.keys(this.keywords).forEach((category) => {
      scores[category] = 0;
    });

    // Calculate scores for each category
    Object.keys(this.keywords).forEach((category) => {
      this.keywords[category].forEach((keyword) => {
        if (message.includes(keyword)) {
          // Give higher score for exact matches
          if (message === keyword) {
            scores[category] += 10;
          }
          // Give medium score for word boundaries
          else if (new RegExp(`\\b${keyword}\\b`).test(message)) {
            scores[category] += 5;
          }
          // Give lower score for partial matches
          else {
            scores[category] += 2;
          }
        }
      });
    });

    // Find category with highest score
    let bestCategory = "default";
    let highestScore = 0;

    Object.keys(scores).forEach((category) => {
      if (scores[category] > highestScore) {
        highestScore = scores[category];
        bestCategory = category;
      }
    });

    // If no good match found, return default
    if (highestScore === 0) {
      bestCategory = "default";
    }

    console.log("Keyword matching scores:", scores);
    console.log("Best match:", bestCategory);

    return bestCategory;
  },

  // Add new keywords dynamically
  addKeywords: function (category, newKeywords) {
    if (!this.keywords[category]) {
      this.keywords[category] = [];
    }
    this.keywords[category] = [...this.keywords[category], ...newKeywords];
  },

  // Get all keywords for a category
  getKeywords: function (category) {
    return this.keywords[category] || [];
  },
};
