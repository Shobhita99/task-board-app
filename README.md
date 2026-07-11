# 📋 Smart Task Board Application

A full-stack task management application with a **Smart Priority Sorting System** built with Python Flask and vanilla JavaScript.

---

## ✨ Features

- ✅ Add tasks with priority levels (High/Medium/Low)
- 🔄 Smart auto-sorting by priority and completion status
- ✓ Toggle task completion with visual feedback
- ❌ Delete tasks with one click
- 📊 Real-time progress tracking with progress bar
- 🎯 Color-coded priority badges (Red/Yellow/Gray)
- 📱 Fully responsive design

### 🌟 Unique Feature
**Smart Priority Sorting System** - Tasks automatically sort by completion status first, then by priority (High → Medium → Low), helping users focus on what matters most.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, Flask, Flask-CORS |
| Frontend | HTML5, CSS3, Vanilla JS |
| Storage | JSON file |

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/task-board-app.git
cd task-board-app

# Setup backend
cd backend
pip install -r requirements.txt
python app.py

# Open frontend (in new terminal)
cd frontend
python -m http.server 8000
