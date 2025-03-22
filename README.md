# Lumin.io
Luminio is a web application designed for photographers who want to showcase their portfolios professionally.  
It allows users to create and manage photo albums, add contact details, and include links to social media.

## 🚀 Technologies

### **Backend**
- Deno – Modern runtime for JS/TS
- Oak – Lightweight server framework
- PostgreSQL – Opensource relational database

### **Frontend**
- React – Library for building user interfaces
- Vite – A fast build tool replacing Webpack

## 🏗️ **Setup & Run**
### Without Docker
### ReactApp
Install dependencies:
`deno install`

Start App:
`deno task dev`

### Deno server

Start server:
`deno run --allow-net --allow-env --allow-read --allow-ffi --allow-write main.ts`

### With Docker
Build the Docker containers once:
`docker-compose build`

Start the containers:
`docker-compose up`

Note 1:
 **After the initial build, only use `docker-compose up`**. 
 Changes made in the following folders will automatically be reloaded:
- /server/src/
- /common/
- /migrations/
- /app/src/

**If you make changes in other files, rebuild the container.**

Note 2:
On the first run, the server may not work immediately as the database is still being prepared. If you encounter issues, stop the container and run it again. 