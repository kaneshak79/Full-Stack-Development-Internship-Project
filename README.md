# User Authentication & Profile Management System


A full-stack user authentication and profile management application developed as part of the **Full Stack Development Internship** task.

The application implements the required flow:

**Register → Login → Profile → Update Profile**

It uses **HTML, CSS, JavaScript, jQuery AJAX, Bootstrap, PHP, MySQL, MongoDB, and Redis** as required by the problem statement.

---

## 🚀 Live Application

**Deployed Application:**
https://full-stack-development-internship-project-production.up.railway.app/

---

## 📌 Problem Statement

Create a signup page where a user can register and a login page to log in using the registered details.

After successful login, the user is redirected to a profile page containing additional information such as:

* Age
* Date of Birth
* Contact
* Gender
* Address

The user should be able to update their profile details.

### Required Flow

```text
Register → Login → Profile
```

---

## ✨ Features

### Registration

* New user registration
* Input validation
* Duplicate email checking
* Password storage using password hashing
* jQuery AJAX request to PHP backend
* User details stored in MySQL

### Login

* Login using registered email and password
* Password verification
* Authentication handled through PHP
* Login information stored in browser `localStorage`
* Redis used for backend session information
* Automatic redirection to profile after successful login

### Profile

* Displays registered user information
* Displays additional profile information
* Profile details stored in MongoDB
* Update profile information using AJAX
* Profile data remains available after refreshing the page

### Security / Backend

* MySQL Prepared Statements
* Password hashing using PHP password hashing functions
* No PHP Sessions
* Redis-based backend session storage
* Authentication using a browser-generated localStorage session identifier
* Separate frontend and backend files

---

## 🛠️ Tech Stack

| Technology | Usage                                     |
| ---------- | ----------------------------------------- |
| HTML5      | Page structure                            |
| CSS3       | Custom styling                            |
| Bootstrap  | Responsive form design                    |
| JavaScript | Frontend functionality                    |
| jQuery     | AJAX communication                        |
| PHP        | Backend/API logic                         |
| MySQL      | User registration and authentication data |
| MongoDB    | Additional user profile information       |
| Redis      | Backend session information               |
| Git        | Version control                           |
| GitHub     | Source code repository                    |
| Railway    | Deployment                                |

---

## 📂 Project Structure

```text
Full-Stack-Development-Internship-Project/
│
├── index.html
├── register.html
├── login.html
├── profile.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── register.js
│   ├── login.js
│   └── profile.js
│
└── php/
    ├── register.php
    ├── login.php
    └── profile.php
```

The project keeps **HTML, CSS, JavaScript, and PHP code in separate files** as required by the internship problem statement.

---

## 🔄 Application Flow

### 1. Register

The user enters their registration details.

```text
register.html
      ↓
register.js
      ↓
jQuery AJAX
      ↓
register.php
      ↓
MySQL
```

The PHP backend validates the request and stores the registered user in MySQL using a prepared statement.

---

### 2. Login

The user enters their registered email and password.

```text
login.html
      ↓
login.js
      ↓
jQuery AJAX
      ↓
login.php
      ↓
MySQL
      ↓
Redis
      ↓
localStorage
```

After successful authentication:

* A login identifier is stored in browser `localStorage`.
* Backend session information is stored in Redis.
* The user is redirected to `profile.html`.

No PHP `$_SESSION` is used.

---

### 3. Profile

The profile page retrieves the authenticated user's information.

```text
profile.html
      ↓
profile.js
      ↓
jQuery AJAX
      ↓
profile.php
      ↓
Redis
      ↓
MySQL + MongoDB
```

MySQL provides the registered user information, while MongoDB stores the additional profile information.

---

### 4. Update Profile

The user can update additional profile information such as:

* Age
* Date of Birth
* Contact
* Gender
* Address

The update is performed using jQuery AJAX without submitting the HTML form.

```text
profile.html
      ↓
profile.js
      ↓
jQuery AJAX
      ↓
profile.php
      ↓
MongoDB
```

---

## 🗄️ Database Design

### MySQL

MySQL stores the registered user information.

Example table:

```text
users
├── id
├── name
├── email
└── password
```

MySQL is accessed from PHP using **Prepared Statements**.

No direct/simple SQL query execution is used for user input.

---

### MongoDB

MongoDB stores additional profile information.

Database:

```text
guvi_project
```

Collection:

```text
profiles
```

Example profile document:

```json
{
  "userId": 1,
  "age": 25,
  "dob": "2001-01-01",
  "contact": "XXXXXXXXXX",
  "gender": "Female",
  "address": "India"
}
```

The `userId` connects the MongoDB profile information with the corresponding MySQL user.

---

### Redis

Redis is used for backend session information.

The application uses Redis to store authentication/session-related information after login.

The application does **not** use PHP Sessions.

---

## 🔐 Authentication Flow

The authentication process works as follows:

```text
User Login
    ↓
PHP validates email/password
    ↓
Password verified against MySQL
    ↓
Session identifier generated
    ↓
Session information stored in Redis
    ↓
Session identifier stored in browser localStorage
    ↓
User redirected to Profile
```

When the profile page requests data:

```text
localStorage
    ↓
AJAX request
    ↓
PHP
    ↓
Redis validates session
    ↓
MySQL / MongoDB
    ↓
Profile response
```

---

## 📡 AJAX Communication

All frontend-to-backend communication is performed using **jQuery AJAX**.

Example flow:

```javascript
$.ajax({
    url: "php/login.php",
    type: "POST",
    data: {
        email: email,
        password: password
    },
    success: function(response) {
        // Handle response
    }
});
```

The application does not use traditional HTML form submission for backend communication.

---

## 📱 Responsive Design

Bootstrap is used for the forms and responsive page layout.

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

Custom CSS is maintained separately in:

```text
css/style.css
```

---

## ⚙️ Local Setup

### Prerequisites

Install the following:

* XAMPP
* PHP
* MySQL
* MongoDB
* Redis
* Web browser

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Place the project in XAMPP

Copy the project into:

```text
C:\xampp\htdocs\
```

For example:

```text
C:\xampp\htdocs\Full-Stack-Development-Internship-Project
```

### 3. Start XAMPP

Start:

```text
Apache
MySQL
```

MongoDB and Redis should also be running locally.

### 4. Create MySQL Database

Create:

```text
guvi_project
```

Import the required MySQL database/table structure.

The application uses the `users` table for registered user information.

### 5. Configure MongoDB

The application uses:

```text
guvi_project
```

with the:

```text
profiles
```

collection.

### 6. Run the application

Open:

```text
http://localhost/Full-Stack-Development-Internship-Project/
```

---

## ☁️ Deployment

The application was deployed using **Railway**.

The deployed environment contains separate services for:

```text
PHP Web Application
        │
        ├── MySQL
        ├── Redis
        └── MongoDB
```

### Railway Services

* PHP application
* MySQL database
* Redis
* MongoDB

The application uses Railway environment variables to connect the PHP backend to the deployed database services.

---

## 🔧 PHP Runtime Configuration

The Railway deployment uses PHP with the required extensions:

```text
php
php-mysql
php-redis
php-mongodb
```

Build command used during deployment:

```bash
apt-get update && apt-get install -y php php-mysql php-redis php-mongodb
```

Start command:

```bash
php -S 0.0.0.0:$PORT
```

These extensions allow PHP to communicate with:

* MySQL
* Redis
* MongoDB

---

## 🌐 Deployment Architecture

```text
                    Railway
                       │
              PHP Web Application
                       │
        ┌──────────────┼──────────────┐
        │              │              │
       MySQL         Redis         MongoDB
        │              │              │
   User/Auth       Session       Profile
      Data          Data           Data
```

---

## 🧪 Tested Application Flow

The deployed application was tested end-to-end:

```text
Register
   ↓
Login
   ↓
Profile
   ↓
View Profile
   ↓
Update Profile
   ↓
Refresh
   ↓
Verify Updated Data
   ↓
Logout / Login Again
```

All required application flows were tested successfully on the deployed application.

---

## 📋 Internship Requirements Checklist

| Requirement                            | Implementation |
| -------------------------------------- | -------------- |
| Signup page                            | ✅              |
| Login page                             | ✅              |
| Profile page                           | ✅              |
| Register → Login → Profile flow        | ✅              |
| HTML separate from PHP                 | ✅              |
| CSS separate                           | ✅              |
| JavaScript separate                    | ✅              |
| jQuery AJAX                            | ✅              |
| No traditional form submission         | ✅              |
| Bootstrap responsive forms             | ✅              |
| MySQL                                  | ✅              |
| MySQL Prepared Statements              | ✅              |
| Browser localStorage for login session | ✅              |
| Redis backend session storage          | ✅              |
| MongoDB                                | ✅              |
| PHP backend                            | ✅              |
| Deployed application                   | ✅              |

---

## 🎯 Project Objective

The objective of this project is to demonstrate a complete full-stack authentication and profile-management workflow using the technologies specified in the internship requirements.

The project demonstrates:

* Frontend development
* Responsive UI design
* AJAX-based communication
* PHP backend development
* MySQL database operations
* MongoDB profile storage
* Redis session management
* Authentication
* CRUD-style profile updates
* Cloud deployment

---

## 👩‍💻 Author

**Kanesha K**

Full Stack Development Internship Project
