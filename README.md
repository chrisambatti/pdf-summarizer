# PDF to Text Converter (ReactJS & Node.js)
Description:
This is a web application that allows users to upload PDF files and perform various operations on the text extracted from them. The app provides functionalities for PDF to Text Summarization, PDF to Text Extraction, and PDF to Text Translation. The project is structured to maintain clarity and follow the Single Responsibility Principle, ensuring that each component has a distinct role.

# Features:
PDF to Text Extraction: Upload a PDF file and extract its text content.
PDF to Text Summarization: Summarize the extracted text using advanced AI models.
PDF to Text Translation: Translate the extracted text to other languages.

# Advanced Concepts Utilized:
React Components for seamless UI rendering.
Custom Hooks to handle API calls and state management.
Multer for handling file uploads on the server side.
pdf-parse for parsing PDFs and extracting text content.
Cohere.ai for text summarization and translation through its AI-based models.
Express to manage the backend server and handle requests.
# Backend API:
The backend is built using Node.js with the following key packages:

Express for routing and managing requests.
Multer for handling file uploads.
pdf-parse for extracting text from PDFs.
Cohere AI API for performing text summarization and translation.
If there are any issues with the API, it may be due to limits on the number of API requests. Please notify me if any such issues arise.

# Tech Stack:
Frontend: ReactJS, HTML, CSS, JavaScript
Backend: Node.js, Express, pdf-parse, multer, cohere-ai
Other Libraries: body-parser, dotenv, classifier, nodemon
# Installation:
Clone this repository.
Navigate to the project directory.
Install dependencies by running npm install.
Start the development server using npm run dev (for frontend) and npm run start (for backend).
# Usage:
Upload a PDF using the provided interface.
Select the desired operation (Extract, Summarize, or Translate).
View the result on the screen.
Download the summarized or translated text if needed.
Support:
If you encounter any issues or have questions, feel free to reach out to me at [your-email@example.com].

# Future Work:
Enhanced Error Handling: Implement more robust error handling and validation for unsupported PDF types.
Additional Languages: Expand the translation feature to support more languages.
Full-Text Search: Add a search functionality to help users search within the extracted text.

