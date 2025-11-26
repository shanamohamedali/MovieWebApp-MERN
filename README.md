# 🎬 MovieWebApp-MERN

A full-stack **Movie Search and Listing Web Application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
This app allows users to **sign up, log in, search movies, filter by genre, add them to a Watch Later list, and manage movies/genres via an Admin Dashboard**.  
Movie posters and images are stored securely using **Cloudinary**, and data is persisted in **MongoDB Atlas**.

🔗 **Live Demo:** [MovieWebApp-MERN](https://movie-web-app-mern-client.vercel.app/)

---

## 🚀 Features

- 🔍 **Movie Search & Listing** – Browse and search movies with a clean UI.  
- 🎭 **Genre Filtering** – Filter movies based on genre.  
- 👤 **User Authentication** – Sign up, log in, and manage sessions securely with **Access Tokens**.  
- 🔑 **Role-Based Access** –  
  - **User**: Search, filter, and save movies to Watch Later.  
  - **Admin**: Full CRUD operations on movies and genres.  
- 📌 **Watch Later List** – Save movies to watch later.  
- 🛠️ **Admin Dashboard** – Add, edit, and delete movies and genres.  
- 🖼️ **Image Uploads with Cloudinary** – Movie posters and images are uploaded and stored in Cloudinary.  
- 🔒 **Secure Passwords** – User passwords are encrypted using **bcrypt** before being stored in MongoDB Atlas.  
- 🎨 **Responsive UI** – Built with React and styled using CSS/Tailwind/Bootstrap.  
- ⚡ **RESTful API** – Backend powered by Node.js and Express.js.  
- 🌐 **Database** – MongoDB Atlas for storing users, movies, genres, and watchlists.  

---

## 🏗️ Tech Stack

| Layer        | Technology |
|--------------|------------|
| Frontend     | React.js, CSS/Tailwind |
| Backend      | Node.js, Express.js |
| Database     | MongoDB Atlas |
| Authentication | JWT (Access Tokens) |
| Role Management | User & Admin roles |
| Image Storage | Cloudinary |
| Password Security | bcrypt |
| Deployment   | Vercel |

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/shanamohamedali/MovieWebApp-MERN.git
cd MovieWebApp-MERN
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the backend folder with:
```
MONGO_Db_URL=your_mongodb_atlas_connection_string
ACCESS_TOKEN_SECRET=your_JWT_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```
Run the backend:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd frontend/searchMovieAppReact
npm install
npm start
```

## 📸 Screenshots (Optional)

_Add screenshots of your app here for better presentation._



Would you like me to also add **API endpoint documentation** (like `/api/movies`, `/api/genres`, `/api/auth`) so developers can quickly test your backend?
