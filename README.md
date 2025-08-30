# CLIPFUSION- A SMART YOUTUBE NOTE TAKING 

PROJECT OVERVIEW

ClipFusion is a web application that allows users to take timestamped notes while watching YouTube videos. Users can easily capture the exact video time, add notes,download as pdf, edit/delete them and click timestamps to directly jump to that point in the video. 

FEATURES

1.Auto-capture video timestamps while taking notes.
2.Add, edit and delete notes seamlessly.
3.Clickable timestamps that seek the video in-app.
4.Export notes as downloadable PDFs.
5.User authentication (Login, Register, Forgot Password).
6.Video thumbnail and YouTube link included in saved PDFs.

TECH STACK

* Frontend: React.js, Tailwind CSS, ReactPlayer
* Backend: Node.js, Express.js
* Database: MongoDB
* Other Tools: jsPDF (for PDF export), JWT (for authentication)

PROJECT STRUCTURE
```
ClipFusion/
│── backend/              # Express.js backend
│   ├── routes/           # API routes
│   ├── models/           # MongoDB models
│   ├── controllers/      # Business logic
│   └── server.js         # Entry point
│
│── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Login, Register, Home, Welcome
│   │   ├── App.js        # Main app routing
│   │   └── index.js      # React entry point
│   └── package.json
│
│── README.md             # Project documentation
│── package.json          # Root package file
```

USAGE

1. Login or Register as a user.
2. Paste a YouTube link and start watching.
3. Take notes – timestamps will be auto-captured.
4. Click on a timestamp to jump to that moment in the video.
5. Export notes  as PDFs.

FUTURE ENHANCEMENT

* Mobile responsive version.
* Cloud storage for PDFs.
* Multi-language AI summaries.
* Voice notes support.

 
