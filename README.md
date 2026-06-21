# ✍️ CodeBlog

A modern blogging platform backend built with Java Spring Boot. The application provides secure authentication, blog post management, category organization, and comment functionality through a RESTful API architecture.

## 🚀 Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (USER, ADMIN)
* Password Encryption with BCrypt

### Blog Management

* Create Blog Posts
* Update Blog Posts
* Delete Blog Posts
* View All Posts
* View Single Post
* Author-Based Posts

### Categories

* Create Categories
* Update Categories
* Delete Categories
* Assign Categories to Posts

### Comments

* Add Comments to Posts
* Update Comments
* Delete Comments
* View Post Comments

### Additional Features

* Pagination & Sorting
* Search Functionality
* Global Exception Handling
* Request Validation
* RESTful API Design

---

## 🛠️ Tech Stack

### Backend

* Java 21
* Spring Boot 3
* Spring Security
* Spring Data JPA
* Hibernate

### Database

* PostgreSQL

### Authentication

* JWT (JSON Web Token)
* BCrypt Password Encoder

### Development Tools

* Gradle
* Lombok
* MapStruct (if used)

---

## 📂 Project Structure

```text
src/main/java
├── config
├── controller
├── dto
├── entity
├── exception
├── repository
├── security
├── service
└── util
```

---

## ⚙️ Getting Started

### Clone Repository

```bash
git clone https://github.com/IncridableAcuman/codeblog.git
cd codeblog
```

### Configure Database

Create PostgreSQL database:

```sql
CREATE DATABASE codeblog;
```

Configure `application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/codeblog
    username: postgres
    password: password

  jpa:
    hibernate:
      ddl-auto: update
```

### Configure JWT

```yaml
jwt:
  secret: your-secret-key
  expiration: 86400000
```

### Run Application

#### Gradle

```bash
./gradlew bootRun
```

#### Build JAR

```bash
./gradlew build
java -jar build/libs/codeblog.jar
```

---

## 🔐 Authentication API

### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
```

Response:

```json
{
  "accessToken": "jwt-token",
  "tokenType": "Bearer"
}
```

---

## 📝 Blog Post API

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| GET    | /api/posts      | Get all posts  |
| GET    | /api/posts/{id} | Get post by id |
| POST   | /api/posts      | Create post    |
| PUT    | /api/posts/{id} | Update post    |
| DELETE | /api/posts/{id} | Delete post    |

---

## 📂 Category API

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | /api/categories      |
| POST   | /api/categories      |
| PUT    | /api/categories/{id} |
| DELETE | /api/categories/{id} |

---

## 💬 Comment API

| Method | Endpoint                     |
| ------ | ---------------------------- |
| POST   | /api/posts/{postId}/comments |
| PUT    | /api/comments/{id}           |
| DELETE | /api/comments/{id}           |

---

## 🔒 Security Features

* Spring Security Integration
* JWT Authentication
* Password Encryption (BCrypt)
* Role-Based Authorization
* Protected Endpoints
* Input Validation

---

## 🧪 Testing

Run tests:

```bash
./gradlew test
```

---

## 🐳 Docker Support

Build Image:

```bash
docker build -t codeblog .
```

Run Container:

```bash
docker run -p 8080:8080 codeblog
```

---

## 📈 Future Improvements

* Swagger/OpenAPI Documentation
* Refresh Tokens
* Email Verification
* Password Reset
* Rich Text Editor Support
* Image Upload (Cloudinary/AWS S3)
* Likes & Reactions
* Real-Time Notifications

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Izzat Abdusharipov**

Java Backend Developer | Spring Boot | PostgreSQL | JWT Authentication

GitHub: https://github.com/IncridableAcuman
