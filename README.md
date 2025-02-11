# Bloggzz-GDSC
Created as a project for better understanding of backend mechanisms and all the nuances of using a backend and mongodb understanding every thing related to the databases and using the basic components of bootstrap for the frontend and this will mainly focus on robust usage of backend technologies.
# Blogging Website

A full-stack blogging platform that allows authors to create, edit, and manage blog posts while enabling viewers to read and comment on posts. The project includes authentication using JWT tokens for secure access control.

## Features

- **User Authentication**: Secure login and signup using JWT authentication.
- **Author Access**:
  - Create, edit, and delete blog posts.
  - Manage comments on posts.
- **Viewer Access**:
  - Read published blog posts.
  - Comment on blog posts.
- **Comment System**: Allows authenticated users to post comments.
- **MongoDB Integration**: Uses MongoDB as the database for storing user details, blog posts, and comments.
- **RESTful API**: The backend provides a clean and structured API for frontend integration.

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
- **Frontend**:
  - React.js / HTML, CSS, JavaScript (optional if applicable)
- **Others**:
  - bcrypt.js for password hashing
  - dotenv for environment variable management

---

## Installation Guide

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (Recommended LTS version)
- [MongoDB](https://www.mongodb.com/try/download/community) (Ensure MongoDB is running)
- [Git](https://git-scm.com/downloads) (optional but recommended)
 Make sure to use npm install to install all the packagrs required
### Steps to Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blogging-website.git
cd blogging-website
```

#### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the `backend/` directory and add the following:

```env
PORT=5000//check for empty ports on your device and use the port which is empty from your side by replacing the variable value in the code 
MONGO_URI=mongodb://localhost:27017/blogDB
JWT_SECRET=your_secret_key
```

#### 4. Start the Backend Server

```bash
npm start
```

The backend should now be running at `http://localhost:5000/`

#### 5. Install Frontend Dependencies (if applicable)

```bash
cd ../frontend
npm install
```

#### 6. Start the Frontend Server

```bash
npm start
```

The frontend should now be running at `http://localhost:3000/`

---



## Usage

- **Authors**:
  - Sign up or log in.
  - Create and manage their own blog posts.
  - View and moderate comments on their posts.
- **Viewers**:
  - View published blog posts.
  - Leave comments after authentication.

---

also please make sure to download all the dependicies from the package.json file before running the code for a smooth and hasslefree experience 

