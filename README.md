# Inventario de Productos

## Descripción

Este proyecto consiste en una aplicación web para gestionar un inventario de productos. La aplicación tiene un frontend desarrollado en React y un backend desarrollado en Node.js. Además, el proyecto está configurado para ser ejecutado en contenedores Docker, lo que facilita su despliegue y ejecución en cualquier entorno.

---
![image](https://github.com/user-attachments/assets/f74fdca8-fff8-442c-b893-62e5005d98ec)

---

![image](https://github.com/user-attachments/assets/f878770f-e990-44ae-ad7e-7a2bed16194a)


---

## Tecnologías Utilizadas

- **Frontend: React**
- **Backend: Node.js**
- **Contenedores: Docker** 
- **Pruebas Unitarias: Jest**
- **Base de Datos: En Memoria** 

---

## Propuesta para AWS
- **Frontend:** Utilizar Amazon S3 para el almacenamiento estático de los archivos de build de React, CloudFront para distribución global y Route 53 para gestionar el dominio.
- **Backend:** Usar Amazon ECS o Fargate para ejecutar los contenedores de Node.js, RDS para persistencia de datos con base de datos relacional, API Gateway para exponer la API y CloudWatch para monitoreo.
- Si se desea un enfoque sin servidor, AWS Lambda es una opción interesante para manejar tareas específicas del backend.

Estos servicios no solo proporcionan una infraestructura escalable y gestionada, sino que también mejoran la seguridad, la disponibilidad y el rendimiento de la aplicación.

## Pasos para la Instalación

### 1. Clonar el Repositorio

Primero, clona el repositorio del proyecto en tu máquina local:

```bash
git clone https://github.com/tu_usuario/inventory-management.git
cd inventory-management\

```

### 2. Construir y Levantar los Contenedores
Para construir las imagenes y levantar los contenedores, ejecuta:

```bash
docker-compose up --build
```

El servidor estará disponible en http://localhost:3001/.

## Uso de la API
### Documentación de la API (Swagger)
Accede a la documentación interactiva de la API usando Swagger en:

```bash
http://localhost:3001/api-docs/
```
