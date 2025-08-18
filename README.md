# Divertion-1.0
Event management Web App




A brief description of what this project does and who it's for

Divertion 1.0 🎉

Divertion 1.0 is a comprehensive event management platform designed to streamline the process of organizing, booking, and managing events. Built with a robust backend and a user-friendly frontend, it caters to both organizers and attendees, ensuring a seamless experience from event creation to participation.

🚀 Features

Event Creation & Management: Organizers can create, update, and manage events with details such as title, date, location, and capacity.

User Authentication: Secure login and registration for users, with role-based access control.

Booking System: Attendees can browse upcoming events and book tickets.

QR Code Generation: Each booking generates a unique QR code for event check-in.

Booking Cancellation: Users can cancel their bookings for upcoming events.

Email Notifications: Confirmation emails with booking details and QR codes are sent to users.

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

QR Code Generation: qrcode npm package

Email Service: Nodemailer
GitHub
+9
GitHub
+9
SJRWMDs
+9

📂 Project Structure

The project is organized into two main directories:

Backend: Contains the server-side code, including routes, controllers, and models.

Frontend: Contains the client-side code .jsx files

📦 Installation
Backend

Clone the repository:
Science
+2
Yahoo
+2

git clone https://github.com/subhradeep09/Divertion-1.0.git
cd Divertion-1.0/Backend


Install dependencies:
GitHub
+2
HR Green, Inc.
+2

npm install


Set up environment variables:

Create a .env file and add the following:

PORT=8000

MONGO_URI=
CORS_ORIGIN = 
NODE_ENV=


ACCESS_TOKEN_SECRET = 
ACCESS_TOKEN_EXPIRY = 
REFRESH_TOKEN_SECRET = 
REFRESH_TOKEN_EXPIRY = 

SMTP_USER = 
SMTP_PASS = 

CLOUDINARY_CLOUD_NAME =
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 


Start the server:
GitHub

npm run dev


Frontend

Navigate to the frontend directory:

cd ../frontend


Open the index.html file in your browser to view the application.

🧪 Testing

Ensure that both the backend and frontend are running. Use tools like Postman to test the API endpoints:

POST /api/v1/auth/register: Register a new user.

POST /api/v1/auth/login: Login to obtain a JWT token.


Associated Construction Publications

📧 Email Configuration

The application uses Nodemailer to send emails. Ensure that the SMTP credentials provided in the .env file are correct. For Gmail, you might need to enable "Less secure apps" or set up an App Password if 2-Step Verification is enabled.

📸 Screenshots



📝 License

This project is licensed under the MIT License.