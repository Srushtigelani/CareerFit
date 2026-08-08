# CareerFit

## AI-Powered Resume & Job Matching Platform

CareerFit is a full-stack application that analyzes a candidate's resume against a job description and provides an overall job-match score, matching skills, potential skill gaps, and personalized suggestions.

## Features

- Resume upload and text extraction
- Job description analysis
- Resume-to-job matching
- Job-match score
- Matching skills identification
- Skill-gap analysis
- Personalized career suggestions
- Responsive user interface
- Python-based resume analysis
- Flask backend API
- Firebase integration

## Tech Stack

### Frontend
- React.js
- JavaScript
- HTML
- CSS

### Backend
- Python
- Flask

### Database / Services
- Firebase

### Resume Processing & Analysis
- Python
- PDF and DOCX text extraction
- NLP-based text/skill analysis

## Project Structure

```text
CareerFit/
│
├── backend/
│   ├── services/
│   │   ├── matcher.py
│   │   └── resume_parser.py
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   └── public/
│
├── .gitignore
└── README.md