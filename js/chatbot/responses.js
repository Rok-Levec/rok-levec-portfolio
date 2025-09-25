// Chatbot responses database
const chatbotResponses = {
  greetings: [
    "Hello! I'm here to help you learn about Rok's work and skills. Feel free to ask me anything!",
    "Hi there! What would you like to know about Rok? I can tell you about his projects, skills, or experience.",
    "Hey! Welcome to Rok's portfolio. I'm here to help you explore his work and answer any questions you might have.",
  ],

  projects: [
    "Rok has worked on various web development projects using HTML, CSS, JavaScript, and Tailwind CSS. You can check out his latest work in the <a href='projects.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>Projects section</a>! His portfolio showcases responsive websites and interactive applications.",
    "His project portfolio includes modern, responsive websites built with clean code and user-friendly designs. Visit the <a href='projects.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>Projects page</a> to see detailed case studies and live demos!",
    "Rok's recent projects demonstrate expertise in frontend development, responsive design, and modern web technologies. Check out the <a href='projects.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>project showcase</a>!",
  ],

  skills: [
    "Rok specializes in frontend development with HTML, CSS, JavaScript, and Tailwind CSS. He also has experience with SQL for database management, and some knowledge of Laravel and React for full-stack development. Want to learn more? Visit the <a href='about.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>About page</a>!",
    "His main technical skills include modern web development technologies. He's proficient in HTML5, CSS3, JavaScript ES6+, and Tailwind CSS for styling. He's also exploring AI integration in web development! Check out his full skill set on the <a href='about.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>About page</a>.",
    "Rok's tech stack includes HTML, CSS, JavaScript, Tailwind CSS, SQL, with some experience in Laravel and React. He's passionate about clean code, responsive design, and staying updated with the latest web technologies.",
  ],

  contact: [
    "You can get in touch with Rok through the <a href='contact.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>Contact page</a> on this website. He's always open to discussing new projects and opportunities!",
    "Feel free to reach out to Rok via the <a href='contact.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>Contact form</a> or through his social media profiles. He loves connecting with fellow developers and potential collaborators!",
    "Ready to work together? Visit the <a href='contact.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>Contact section</a> to send him a message directly!",
  ],

  socials: [
    "You can connect with Rok on his professional social media profiles:<br><br>🔗 <a href='https://www.linkedin.com/in/rok-levec-0ab70b245/' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>LinkedIn</a><br>💻 <a href='https://github.com/rok-levec' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>GitHub</a><br><br>Follow him to stay updated with his latest projects and professional journey!",
    "Here are Rok's social links where you can connect and follow his work:<br><br>📧 Professional: <a href='https://www.linkedin.com/in/rok-levec-0ab70b245/' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>LinkedIn Profile</a><br>⚡ Code: <a href='https://github.com/rok-levec' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>GitHub Profile</a>",
    "Connect with Rok on:<br><br>• <a href='https://www.linkedin.com/in/rok-levec-0ab70b245/' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>LinkedIn</a> - for professional networking<br>• <a href='https://github.com/rok-levec' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>GitHub</a> - to see his code and projects",
  ],

  experience: [
    "Rok enjoys bringing ideas to life through clean, functional websites. He's constantly experimenting with new technologies and exploring how AI can enhance web development. Learn more about his journey on the <a href='about.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>About page</a>!",
    "He has hands-on experience building responsive, user-friendly websites and is always learning new tools to improve his development workflow. His focus is on creating digital experiences that are both beautiful and functional.",
    "Rok combines technical skills with creative problem-solving to deliver web solutions that meet user needs. He's particularly interested in modern web technologies and innovative approaches to web development. Check out his <a href='about.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>full background</a>!",
  ],

  goodbye: [
    "Goodbye! Thanks for visiting Rok's portfolio. Feel free to explore his <a href='projects.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>projects</a> and don't hesitate to <a href='contact.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>get in touch</a>! 👋",
    "See you later! If you have any more questions about Rok's work, just come back anytime. Have a great day! 😊",
    "Farewell! Don't forget to check out Rok's <a href='https://github.com/rok-levec' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>GitHub</a> and <a href='https://www.linkedin.com/in/rok-levec-0ab70b245/' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>LinkedIn</a> for updates. Take care! 🚀",
  ],

  thanks: [
    "You're very welcome! I'm glad I could help you learn more about Rok's work. If you're interested in his projects, check out the <a href='projects.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>Projects page</a>! 😊",
    "My pleasure! That's what I'm here for. Feel free to ask me anything else about Rok's skills, projects, or experience anytime!",
    "Happy to help! If you'd like to get in touch with Rok for collaboration or work opportunities, visit the <a href='contact.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>Contact page</a>. Thanks for your interest! 🙌",
  ],
  education: [
    "Rok is currently pursuing an Informatics Engineer degree at School Center Kranj, which he started in June 2023 and is expected to complete in September 2025. Prior to this, he completed a 3+2 program in Electro Technician at Šiška Technical High School from June 2018 to September 2023. You can learn more about his background on the <a href='about.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>About page</a>!",
  ],

  default: [
    "That's an interesting question! You might find more detailed information by exploring different sections of  portfolio. Try the <a href='projects.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>Projects</a> or <a href='about.html' target='_blank' style='color: #05324d; font-weight: bold; text-decoration: underline;'>About</a> pages!",
    "I'm here to help with questions about Rok's work and background. Feel free to ask about his projects, technical skills, experience, or how to get in touch with him!",
    "For specific details about Rok's work, I'd recommend checking out his portfolio sections. You can also ask me about his projects, skills, professional experience, or social media profiles!",
  ],
};
