# SOLO Backend API

## Deskripsi Singkat Proyek

SOLO (Sortir & Olah Limbah Online) adalah backend API untuk aplikasi edukasi klasifikasi sampah berbasis AI. Sistem ini memungkinkan pengguna melakukan registrasi dan login akun, mengunggah gambar sampah, mendapatkan hasil klasifikasi otomatis dari model AI, serta menyimpan riwayat klasifikasi pengguna.

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

# Standard API Response

## Success Response

```json
{
  "status": "success",
  "message": "Operation success",
  "data": {}
}
```

## Error Response

```json
{
  "status": "failed",
  "message": "Error message",
  "data": null
}
```

---

# Authentication

Endpoint tertentu memerlukan JWT Token.

Tambahkan token pada header request:

```http
Authorization: Bearer JWT_TOKEN
```

Protected Endpoints:

* POST /classification
* GET /classification/history

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

## Success Response

Status Code:

```http
201 Created
```

```json
{
  "status": "success",
  "message": "Register success",
  "data": {
    "id": "clxxxxxx",
    "email": "user@gmail.com",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

## Error Response

### Email Already Exists

```http
409 Conflict
```

```json
{
  "status": "failed",
  "message": "Email already exists",
  "data": null
}
```

### Invalid Email Format

```http
400 Bad Request
```

### Password Too Short

```http
400 Bad Request
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

## Success Response

Status Code:

```http
200 OK
```

```json
{
  "status": "success",
  "message": "Login success",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

## Error Response

### Invalid Email or Password

```http
401 Unauthorized
```

```json
{
  "status": "failed",
  "message": "Invalid email or password",
  "data": null
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
Authorization: Bearer JWT_TOKEN
```

## Request Body

Gunakan form-data.

| Key   | Type |
| ----- | ---- |
| image | File |

## Success Response

Status Code:

```http
201 Created
```

```json
{
  "status": "success",
  "message": "Classification success",
  "data": {
    "id": "clxxxxxx",
    "imageUrl": "https://res.cloudinary.com/...",
    "prediction": "ORGANIK",
    "confidence": 0.98,
    "description": "Sampah organik yang dapat terurai secara alami",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

## Error Response

### Missing Token

```http
401 Unauthorized
```

```json
{
  "message": "Unauthorized"
}
```

### Invalid Token

```http
401 Unauthorized
```

```json
{
  "message": "Invalid token"
}
```

### Missing Image File

```http
400 Bad Request
```

```json
{
  "status": "failed",
  "message": "Image is required",
  "data": null
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
Authorization: Bearer JWT_TOKEN
```

## Success Response

Status Code:

```http
200 OK
```

```json
{
  "status": "success",
  "message": "History fetched successfully",
  "data": []
}
```

## Error Response

### Missing Token

```http
401 Unauthorized
```

```json
{
  "message": "Unauthorized"
}
```

### Invalid Token

```http
401 Unauthorized
```

```json
{
  "message": "Invalid token"
}
```

---

# HTTP Status Codes

| Code | Description           |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 400  | Validation Error      |
| 401  | Unauthorized          |
| 409  | Conflict              |
| 500  | Internal Server Error |

---

# API Testing

## Success Test Cases

* Register User
* Login User
* Upload Classification
* Get Classification History

## Failure Test Cases

* Register With Existing Email
* Login Invalid Email
* Login Password Less Than 6 Characters
* Login Wrong Password
* Missing JWT Token
* Invalid JWT Token
* Upload Without Image

---

# AI Service

Kategori klasifikasi yang tersedia:

* ORGANIK
* ANORGANIK
* B3

AI Service URL:

```text
https://solo-ai-service-production.up.railway.app
```

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
   ↓
Access Protected Route
```

---

# Author

Backend SOLO CC26 PSU137
Muhammad Ajar Danu Wiratama

---

# License

This project is created for educational and capstone purposes.
