# SOLO Backend API

## Deskripsi Singkat Proyek

SOLO (Smart Organic & Lifestyle Organizer) adalah backend API untuk aplikasi edukasi klasifikasi sampah berbasis AI. Sistem ini memungkinkan pengguna melakukan registrasi dan login akun, mengunggah gambar sampah, mendapatkan hasil klasifikasi otomatis dari model AI, serta menyimpan riwayat klasifikasi pengguna.

Project ini dibangun sebagai backend modern berbasis cloud dengan integrasi:

* AI Classification Service
* Cloudinary Image Storage
* NeonDB PostgreSQL Database
* Railway Deployment
* JWT Authentication

---

# Fitur Utama

* User Authentication (Register & Login)
* JWT Authorization
* Upload Image Classification
* AI Waste Prediction
* Cloudinary Image Upload
* Classification History
* REST API Architecture
* Cloud Deployment Ready

---

# Tech Stack

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL (NeonDB)
* JWT Authentication
* Multer
* Cloudinary
* Axios

## Deployment & Cloud

* Railway
* NeonDB
* Cloudinary

## AI Service

* External AI Classification Service

---

# Arsitektur Sistem

```text
Frontend
   ↓
Backend API (Railway)
   ↓
NeonDB PostgreSQL
   ↓
Cloudinary Storage
   ↓
AI Classification Service
```

---

# Live API

```text
https://backend-solo-cc26-psu137-production.up.railway.app
```

---

# Petunjuk Setup Environment

## 1. Clone Repository

```bash
git clone https://github.com/USERNAME/REPOSITORY_NAME.git
```

```bash
cd backend-capstone
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Setup Environment Variables

Buat file `.env` pada root project.

Contoh:

```env
DATABASE_URL=
JWT_SECRET=
AI_SERVICE_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 4. Prisma Migration

```bash
npx prisma migrate deploy
```

Jika database masih kosong:

```bash
npx prisma db push
```

---

## 5. Generate Prisma Client

```bash
npx prisma generate
```

---

# Cara Menjalankan Aplikasi

## Development Mode

```bash
npm run start:dev
```

---

## Production Mode

```bash
npm start
```

---

# Dokumentasi API

## Base URL

```text
https://backend-solo-cc26-psu137-production.up.railway.app/api
```

---

# 1. Register User

## Endpoint

```http
POST /auth/register
```

## Request Body

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

## Response

```json
{
  "status": "success",
  "message": "Register success"
}
```

---

# 2. Login User

## Endpoint

```http
POST /auth/login
```

## Request Body

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

## Response

```json
{
  "status": "success",
  "message": "Login success",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

---

# 3. Upload Image Classification

## Endpoint

```http
POST /classification
```

## Headers

```http
Authorization: Bearer TOKEN
```

## Body

Gunakan `form-data`

| Key  | Type |
| ---- | ---- |
| file | File |

## Response

```json
{
  "status": "success",
  "message": "Classification success",
  "data": {
    "imageUrl": "https://cloudinary-url",
    "prediction": "B3",
    "confidence": 1,
    "description": "Sampah beracun yang memerlukan penanganan khusus"
  }
}
```

---

# 4. Get Classification History

## Endpoint

```http
GET /classification/history
```

## Headers

```http
Authorization: Bearer TOKEN
```

## Response

```json
{
  "status": "success",
  "message": "History fetched successfully",
  "data": []
}
```

---

# Taudan Model ML (Jika Ada)

Model Machine Learning yang digunakan berada pada layanan AI terpisah.

AI Service digunakan untuk melakukan klasifikasi gambar sampah ke dalam kategori:

* ORGANIK
* ANORGANIK
* B3

Link AI Service:

```text
https://solo-ai-service-production.up.railway.app
```

---

# Struktur Folder

```text
src/
 ├── config/
 ├── controllers/
 ├── middlewares/
 ├── routes/
 ├── services/
 ├── utils/
 └── validations/
```

---

# Deployment

## Backend Deployment

* Railway

## Database

* NeonDB PostgreSQL

## Image Storage

* Cloudinary

---

# Authentication Flow

```text
Login
   ↓
Generate JWT Token
   ↓
Frontend Save Token
   ↓
Token Sent via Authorization Header
   ↓
Backend Verify Token
```

---

# Author

Backend SOLO CC26 PSU137 : Muhammad Ajar Danu Wiratama

---

# License

This project is created for educational and capstone purposes.
