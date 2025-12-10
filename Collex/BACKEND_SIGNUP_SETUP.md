# Backend Signup Flow - Complete Setup Guide

## ✅ All Files Created and Connected

### Backend Files Structure

```
Collex/src/main/java/com/example/Collex/
├── model/
│   └── User.java                    ✅ MongoDB entity
├── dto/
│   └── SignupRequest.java           ✅ Request DTO
├── repository/
│   └── UserRepository.java          ✅ MongoDB repository
├── service/
│   └── UserService.java             ✅ Business logic
├── controller/
│   └── AuthController.java          ✅ REST endpoint
└── config/
    ├── MongoConfig.java             ✅ MongoDB config
    └── SecurityConfig.java          ✅ Security & CORS config
```

---

## 📋 File Details

### 1. User.java (Model)
- **Location**: `src/main/java/com/example/Collex/model/User.java`
- **Annotations**: `@Document("users")`, `@Id`, Lombok `@Data`
- **Fields**: id, email, password, fullName, role, collegeName, isActive, timestamps
- **Role Enum**: BUYER, SELLER, ADMIN

### 2. SignupRequest.java (DTO)
- **Location**: `src/main/java/com/example/Collex/dto/SignupRequest.java`
- **Fields**: name, email, password, role, collegeName
- **Purpose**: Receives signup data from frontend

### 3. UserRepository.java
- **Location**: `src/main/java/com/example/Collex/repository/UserRepository.java`
- **Extends**: `MongoRepository<User, String>`
- **Methods**: `findByEmail()`, `existsByEmail()`, `findByEmailAndRole()`

### 4. UserService.java
- **Location**: `src/main/java/com/example/Collex/service/UserService.java`
- **Method**: `register(SignupRequest req)`
- **Logic**:
  - Checks if email exists
  - Hashes password with BCrypt
  - Creates User object
  - Saves to MongoDB
  - Returns saved user

### 5. AuthController.java
- **Location**: `src/main/java/com/example/Collex/controller/AuthController.java`
- **Endpoint**: `POST /auth/signup`
- **Features**:
  - `@CrossOrigin(origins = "*")` for CORS
  - Request validation
  - Error handling
  - Returns JSON response

### 6. SecurityConfig.java
- **Location**: `src/main/java/com/example/Collex/config/SecurityConfig.java`
- **Features**:
  - BCryptPasswordEncoder bean
  - CSRF disabled
  - `/auth/**` endpoints public
  - CORS enabled

---

## 🔌 API Endpoint

### POST `/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "BUYER",
  "collegeName": null
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "BUYER",
    "collegeName": null,
    "isActive": true,
    "createdAt": "2025-01-15T10:30:00"
  }
}
```

**Error Response (400/409):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

## 🎨 Frontend Integration

### BuyerSignup.jsx
- **API Call**: `POST http://localhost:8080/auth/signup`
- **Data Sent**: name, email, password, role: 'BUYER', collegeName: null
- **On Success**: Shows alert, redirects to `/login/buyer`

### SellerSignup.jsx
- **API Call**: `POST http://localhost:8080/auth/signup`
- **Data Sent**: name, email, password, role: 'SELLER', collegeName
- **On Success**: Shows alert, redirects to `/login/seller`

---

## 🗄️ MongoDB Configuration

### Option 1: Local MongoDB
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/campusmart
spring.data.mongodb.database=campusmart
```

### Option 2: MongoDB Atlas (Currently Active)
```properties
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/collex_db?retryWrites=true&w=majority
spring.data.mongodb.database=collex_db
```

**To switch**: Comment/uncomment the appropriate lines in `application.properties`

---

## 🚀 How to Test

### 1. Start Backend
```bash
cd Collex
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

### 2. Start Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

### 3. Test Buyer Signup
1. Navigate to `http://localhost:3000/signup/buyer`
2. Fill form: Name, Email, Password, Confirm Password
3. Click "Sign Up"
4. Check MongoDB for new user in `users` collection

### 4. Test Seller Signup
1. Navigate to `http://localhost:3000/signup/seller`
2. Fill form: Name, College Name, Email, Password, Confirm Password
3. Click "Sign Up"
4. Check MongoDB for new user with `collegeName` field

---

## ✅ Verification Checklist

- [x] User model created with all fields
- [x] SignupRequest DTO created
- [x] UserRepository extends MongoRepository
- [x] UserService.register() method implemented
- [x] AuthController with /auth/signup endpoint
- [x] CORS enabled (@CrossOrigin)
- [x] Password hashing with BCrypt
- [x] Email uniqueness check
- [x] Frontend integrated (BuyerSignup.jsx)
- [x] Frontend integrated (SellerSignup.jsx)
- [x] Error handling implemented
- [x] MongoDB connection configured

---

## 🔒 Security Features

- ✅ Passwords hashed with BCrypt
- ✅ Email uniqueness enforced
- ✅ Input validation
- ✅ College name required for SELLER
- ✅ CORS configured for React frontend
- ✅ CSRF disabled for API endpoints

---

## 📝 Data Flow

```
React Form (BuyerSignup/SellerSignup)
    ↓
POST /auth/signup
    ↓
AuthController.signup()
    ↓
UserService.register()
    ↓
UserRepository.save()
    ↓
MongoDB "users" collection
    ↓
Return User JSON (without password)
```

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution**: Verify `@CrossOrigin(origins = "*")` is on AuthController

### Issue: Email Already Exists
**Solution**: This is expected behavior. Try a different email.

### Issue: MongoDB Connection Failed
**Solution**: 
- Check MongoDB is running (if local)
- Verify connection string in `application.properties`
- Check network access (if Atlas)

### Issue: Password Not Hashing
**Solution**: Verify `PasswordEncoder` bean is created in SecurityConfig

---

## 📚 Next Steps

After signup is working:
1. Implement login endpoint (`POST /auth/login`)
2. Add JWT token generation
3. Implement authentication middleware
4. Add password reset functionality

---

**All files are created and ready to use!** 🎉

