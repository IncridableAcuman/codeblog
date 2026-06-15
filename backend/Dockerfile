# 1-Bosqich: Loyihani build qilish (Gradle)
FROM gradle:8.8-jdk17 AS builder
WORKDIR /app

# Gradle keshidan unumli foydalanish uchun dependency fayllarini nusxalaymiz
COPY build.gradle settings.gradle ./
# Agar wrapper ishlatsangiz, quyidagi qatorlarni ham ochishingiz mumkin:
# COPY gradlew ./
# COPY gradle ./gradle

# Bog'liqliklarni yuklab olish (keshlash uchun)
RUN gradle dependencies --no-daemon || true

# Loyiha kodlarini nusxalash va JAR faylga yig'ish
COPY src ./src
RUN gradle bootJar --no-daemon -x test

# 2-Bosqich: Kichik va xavfsiz Runtime imij yaratish
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Xavfsizlik uchun root bo'lmagan foydalanuvchi yaratamiz
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Builder bosqichidan faqat tayyor .jar faylni nusxalab olamiz
COPY --from=builder /app/build/libs/*.jar app.jar

# Spring Boot odatda 8080 portda ishlaydi
EXPOSE 8080

# Ilovani ishga tushirish mantiqi
ENTRYPOINT ["java", "-jar", "app.jar"]