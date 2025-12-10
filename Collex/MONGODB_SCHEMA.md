# MongoDB Schema Documentation - Collex Project

## Database: `collex_db`

## Collections Created:

### 1. **users** Collection
Stores all user accounts (Buyers, Sellers, and Admins)

**Schema:**
```json
{
  "_id": "ObjectId",
  "email": "string (unique, indexed)",
  "password": "string (hashed)",
  "fullName": "string",
  "role": "BUYER | SELLER | ADMIN",
  "collegeName": "string (only for SELLER)",
  "isActive": "boolean (default: true)",
  "createdAt": "LocalDateTime",
  "updatedAt": "LocalDateTime"
}
```

**Indexes:**
- `email` - Unique index

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "seller@example.com",
  "password": "$2a$10$hashedpassword...",
  "fullName": "John Doe",
  "role": "SELLER",
  "collegeName": "ABC University",
  "isActive": true,
  "createdAt": "2025-01-15T10:30:00",
  "updatedAt": "2025-01-15T10:30:00"
}
```

---

### 2. **products** Collection
Stores all product listings

**Schema:**
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "category": "BOOKS | ELECTRONICS | NOTES_STUDY_MATERIAL | ACCESSORIES | CALCULATORS | OTHERS",
  "condition": "NEW | LIKE_NEW | USED | OLD",
  "mrp": "double (Original MRP)",
  "price": "double (Selling price)",
  "ageInMonths": "integer",
  "images": ["string (array of image URLs/base64)"],
  "status": "PENDING | APPROVED | REJECTED",
  "rejectionReason": "string (only if REJECTED)",
  "sellerId": "string (reference to User ID)",
  "createdAt": "LocalDateTime",
  "updatedAt": "LocalDateTime",
  "approvedAt": "LocalDateTime (when approved)",
  "rejectedAt": "LocalDateTime (when rejected)"
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Introduction to Algorithms",
  "description": "Comprehensive textbook on algorithms...",
  "category": "BOOKS",
  "condition": "LIKE_NEW",
  "mrp": 50.0,
  "price": 45.0,
  "ageInMonths": 3,
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "status": "APPROVED",
  "rejectionReason": null,
  "sellerId": "507f1f77bcf86cd799439011",
  "createdAt": "2025-01-15T10:30:00",
  "updatedAt": "2025-01-15T10:30:00",
  "approvedAt": "2025-01-15T11:00:00",
  "rejectedAt": null
}
```

---

### 3. **orders** Collection
Stores purchase orders/transactions

**Schema:**
```json
{
  "_id": "ObjectId",
  "productId": "string (reference to Product ID)",
  "buyerId": "string (reference to User ID - BUYER)",
  "sellerId": "string (reference to User ID - SELLER)",
  "price": "double (transaction price)",
  "status": "PENDING | CONFIRMED | IN_PROGRESS | COMPLETED | CANCELLED",
  "paymentMethod": "string (CASH | ONLINE | UPI)",
  "paymentStatus": "PENDING | PAID | REFUNDED",
  "deliveryAddress": "string",
  "contactNumber": "string",
  "notes": "string",
  "createdAt": "LocalDateTime",
  "updatedAt": "LocalDateTime",
  "completedAt": "LocalDateTime"
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "productId": "507f1f77bcf86cd799439012",
  "buyerId": "507f1f77bcf86cd799439014",
  "sellerId": "507f1f77bcf86cd799439011",
  "price": 45.0,
  "status": "CONFIRMED",
  "paymentMethod": "UPI",
  "paymentStatus": "PAID",
  "deliveryAddress": "123 Main St, City",
  "contactNumber": "+1234567890",
  "notes": "Please deliver in the evening",
  "createdAt": "2025-01-16T10:00:00",
  "updatedAt": "2025-01-16T10:05:00",
  "completedAt": null
}
```

---

## Relationships:

1. **User → Products**: One-to-Many (One seller can have many products)
2. **Product → Order**: One-to-Many (One product can have multiple orders if available)
3. **User (Buyer) → Orders**: One-to-Many (One buyer can have many orders)
4. **User (Seller) → Orders**: One-to-Many (One seller can have many orders)

---

## Repository Methods Available:

### UserRepository:
- `findByEmail(String email)` - Find user by email
- `existsByEmail(String email)` - Check if email exists
- `findByEmailAndRole(String email, Role role)` - Find user by email and role

### ProductRepository:
- `findByStatus(Status status)` - Find products by status (for admin dashboard)
- `findBySellerId(String sellerId)` - Find all products by seller
- `findBySellerIdAndStatus(String sellerId, Status status)` - Find seller's products by status
- `findByCategory(Category category)` - Find products by category
- `findByCategoryAndStatus(Category category, Status status)` - Find approved products by category (for homepage)
- `findByIdAndSellerId(String id, String sellerId)` - Find product by ID and seller (for edit)

### OrderRepository:
- `findByBuyerId(String buyerId)` - Find all orders by buyer
- `findBySellerId(String sellerId)` - Find all orders by seller
- `findByProductId(String productId)` - Find orders for a product
- `findByBuyerIdAndStatus(String buyerId, OrderStatus status)` - Find buyer orders by status
- `findBySellerIdAndStatus(String sellerId, OrderStatus status)` - Find seller orders by status

---

## Notes:

1. **Password Security**: Passwords should be hashed using BCrypt before storing
2. **Image Storage**: Images can be stored as URLs (if using cloud storage) or base64 strings
3. **Status Flow**: 
   - Product: PENDING → APPROVED/REJECTED
   - Order: PENDING → CONFIRMED → IN_PROGRESS → COMPLETED
4. **Indexes**: Email is indexed for fast lookups
5. **Auto-index Creation**: Enabled in application.properties

