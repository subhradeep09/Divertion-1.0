# Divertion-1.0 🎉

![GitHub repo size](https://img.shields.io/github/repo-size/subhradeep09/Divertion-1.0)
![GitHub stars](https://img.shields.io/github/stars/subhradeep09/Divertion-1.0?style=social)
![GitHub forks](https://img.shields.io/github/forks/subhradeep09/Divertion-1.0?style=social)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Project Overview

Divertion 1.0 is a comprehensive event management platform designed to streamline the process of **organizing, booking, and managing events**. Built with a robust backend and a user-friendly frontend, it caters to both organizers and attendees, ensuring a seamless experience from event creation to participation.

---

## ✨ Features

- **Event Creation & Management**: Organizers can create, update, and manage events with details such as title, date, location, and capacity.  
- **User Authentication**: Secure login and registration with role-based access control.  
- **Booking System**: Browse upcoming events and book tickets.  
- **QR Code Generation**: Each booking generates a unique QR code for event check-in.  
- **Booking Cancellation**: Users can cancel their upcoming bookings.  
- **Email Notifications**: Confirmation emails with booking details and QR codes.  

---

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-v18-green?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.18-green?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-v6.0-green?style=for-the-badge&logo=mongodb)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-auth-blue?style=for-the-badge)
![Nodemailer](https://img.shields.io/badge/Nodemailer-email-red?style=for-the-badge)

---

## 📂 Project Structure

Divertion-1.0/
├─ backend/ # Server-side code (routes, controllers, models)
├─ frontend/ # Client-side code (.jsx, HTML, CSS)
└─ README.md # Project documentation


---

## 📦 Installation

### Backend

```bash
# Clone the repository
git clone https://github.com/subhradeep09/Divertion-1.0.git
cd Divertion-1.0/backend

# Install dependencies
npm install

<details> <summary>Environment Variables</summary>
PORT=8000
MONGO_URI=
CORS_ORIGIN=
NODE_ENV=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

SMTP_USER=
SMTP_PASS=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

</details>
# Start the backend server
npm run dev

Frontend
cd ../frontend
# Open index.html in your browser

🧪 Testing

Ensure backend and frontend are running.

Use Postman or Insomnia to test API endpoints:
📸 Screenshots / GIFs

Replace the above URL with your GIF or screenshot path

📧 Email Configuration

The application uses Nodemailer to send emails. Make sure the SMTP credentials in .env are correct.

For Gmail, enable Less secure apps or use an App Password if 2-Step Verification is on.

📝 License

This project is licensed under the MIT License.