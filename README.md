# NASA Space Apps Challenge 2026

Earth System Trend Detective is a lightweight web application built for the NASA Space Apps Challenge challenge: "Be an Earth System Trend Detective." It combines a Python FastAPI backend with a browser-based frontend to explore trends in climate, sea ice, vegetation, and atmospheric conditions.

## Features
- Interactive region selector
- Temperature anomaly trends
- Sea ice extent tracking
- CO2 concentration trend
- Vegetation and fire-risk indicators
- Investigation summary with readable insights
- Simple API for data exploration

## Tech Stack
- Backend: Python + FastAPI
- Frontend: Plain HTML/CSS/JavaScript
- Data: local JSON dataset modeled on realistic Earth-system indicators

## Run locally

1. Create a virtual environment
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

3. Start the application
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

4. Open the app in your browser
   ```text
   http://localhost:8000
   ```

## API endpoints
- `GET /` — frontend app
- `GET /api/health` — health check
- `GET /api/trends?region=Global` — Earth system trend data for the selected region

## Project structure
```text
.
├── data/
│   └── earth_system_data.json
├── static/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── .gitignore
├── main.py
├── requirements.txt
├── README.md
└── Dockerfile
```

## Notes
This app is intentionally designed as a hackathon-ready MVP. It uses a synthetic but realistic dataset so the project is easy to run and extend with real NASA Earth observation data in future iterations.
