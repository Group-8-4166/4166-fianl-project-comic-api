# ComicBook REST API

A fully functional **REST API** for browsing, managing, and rating comic books.  
Built with **Node.js, Express, Prisma (PostgreSQL)**, and deployed via **Render**.

Includes:
- User authentication & JWT authorization  
- Role-based access control (Admin/User)  
- CRUD operations for Comics, Genres, Ratings, and Reading List  
- Swagger UI for live documentation (`/api/docs`)  
- Postman collection for testing  

---

## Tech Stack

- **Backend Framework:** Node.js + Express  
- **Database ORM:** Prisma (PostgreSQL)  
- **Authentication:** JWT + bcrypt  
- **API Documentation:** Swagger / OpenAPI + Redocly CLI  
- **Deployment:** Render  
- **Testing Tool:** Postman  

---

## Prerequisites

Before running the API locally, ensure you have:

- [Node.js](https://nodejs.org/) (v18+ recommended)  
- [PostgreSQL](https://www.postgresql.org/download/) installed and running  
- [Git](https://git-scm.com/downloads) for version control  
- [Render account](https://render.com/) for deployment  

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Group-8-4166/4166-project.git
cd <your path/4166-project>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/comicbookdb?schema=public"
JWT_SECRET="supersecretkey" 
  Note: to generate secure random string use this command: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

JWT_EXPIRES_IN="15m"
NODE_ENV=development
PORT=8080
```

> Replace `<username>` and `<password>` with your PostgreSQL credentials.

---

## Database Setup (Prisma)

### 1. Apply Migrations
```bash
npx prisma migrate dev --name init
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Seed the Database
```bash
npm run seed
```

### Reset and Reseed (Optional)
```bash
npx prisma migrate reset
```

---

## Running the API Locally

```bash
npm run dev
```

---

## Authentication

| Endpoint           | Method | Description                |
| ------------------ | ------ | -------------------------- |
| `/api/auth/signup` | POST   | Register a new user        |
| `/api/auth/login`  | POST   | Log in and get a JWT token |

- After login, you’ll receive an `accessToken`.
- Include it in request headers for protected routes:

```
Authorization: Bearer <token>
```

### Roles
- **USER:** Can view comics, post ratings, and manage their own reading list.  
- **ADMIN:** Can additionally create, update, and delete comics and genres.

---

## API Endpoints Overview

| Resource                  | Methods | Access | Description                    |
| ------------------------- | ------- | ------ | ------------------------------ |
| **/api/comics**           | GET     | Public | List all comics                |
|                           | POST    | Admin  | Create new comic               |
| **/api/comics/:id**       | GET     | Public | Get comic by ID                |
|                           | PUT     | Admin  | Update comic                   |
|                           | DELETE  | Admin  | Delete comic                   |
| **/api/genres**           | GET     | Public | List genres with comics        |
|                           | POST    | Admin  | Create new genre               |
| **/api/genres/:id**       | PUT     | Admin  | Update genre                   |
|                           | DELETE  | Admin  | Delete genre                   |
| **/api/ratings**          | GET     | Public | List all ratings               |
|                           | POST    | Auth   | Create a rating                |
| **/api/ratings/:id**      | PUT     | Auth   | Update your rating             |
|                           | DELETE  | Auth   | Delete your rating             |
| **/api/reading-list**     | GET     | Auth   | Get your reading list          |
|                           | POST    | Auth   | Add comic to reading list      |
| **/api/reading-list/:id** | DELETE  | Auth   | Remove comic from reading list |

---

## Modular OpenAPI Documentation (Redocly CLI)

You can split and bundle your OpenAPI files for modular API documentation.

### Commands Used

```bash
npx @redocly/cli split src/docs/openapi.yaml --outDir src/docs/
npx @redocly/cli bundle src/docs/openapi.yaml -o public/bundled.yaml
```

---

## Postman Collection

You can import the ready-made Postman collection to test all endpoints easily.

### Steps:
1. Open Postman  
2. Click **Import**  
3. Paste your Postman collection JSON or use your team’s workspace link.  
4. Test all endpoints:
   - Signup/Login
   - Comics (Admin CRUD)
   - Genres (Admin CRUD)
   - Ratings (User)
   - Reading List (User)

> “Login (admin)” will automatically save `adminToken`.  
> “Login (user)” will save `userToken` for subsequent requests.

---

## Swagger API Docs

After running the server, open your browser:

- Local: [http://localhost:8080/api/docs] or [http://localhost:3000/api/docs]  
- Or Render Deployment: `https://<your-render-app>.onrender.com/api/docs`

---

## Deployment on Render

### 1. Push Code to GitHub

```bash
git add .
git commit -m "Final ready-to-deploy ComicBook API". If you are making changes to a file, change the commit message appropriatly.
git push origin main
```

### 2. Deploy on Render

- Go to [Render Dashboard](https://render.com/)  
- Click **New Web Service**  
- Connect your GitHub repository  
- Set Build Command:
  ```bash
  npm install && npx prisma migrate deploy && npx prisma generate && node scripts/seeds.js
  ```
- Set Start Command:
  ```bash
  npm start
  ```
- Add your environment variables from `.env`

### 3. Verify Deployment

Render will show your deployed URL, e.g.:  
`https://comicbook-api.onrender.com`

Then visit:
- API: [https://comicbook-api.onrender.com/api/comics](https://comicbook-api.onrender.com/api/comics)  
- Docs: [https://comicbook-api.onrender.com/api/docs](https://comicbook-api.onrender.com/api/docs)

---

## Common Development Commands

| Command                    | Description               |
| ------------------------   | ------------------------- |
| `npm run dev`              | Start server with nodemon |
| `npm run seed`             | Seed the database         |
| `npx prisma studio`        | Open Prisma database GUI  |
| `npx prisma migrate dev`   | Run database migrations   |
| `npm start`                | Run production server     |
| `npx prisma migrate reset` | Reset and reseed DB       |

---

## Example Test Users

**Admin User**
- email: admin@example.com  
- password: adminpass  

**Regular User**
- email: test@example.com  
- password: password123