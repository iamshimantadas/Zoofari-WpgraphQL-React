# Zoofari – WPGraphQL Powered React CMS  
A modern GraphQL-powered React.js CMS using WordPress + WPGraphQL as the backend. Dynamic a HTML theme to react theme and for dynamic it's pages we used wpgraphql plugin which uses graphql as quqery language and wordpress cms underthehood. 

---

## 📽️ Demo Video  
A demo video is included in the repository for previewing the project functionality.  
<br>

### ▶️ YouTube Preview (Click to Play)
[![Zoofari Demo](https://img.youtube.com/vi/hmf40VguOqE/maxresdefault.jpg)](https://www.youtube.com/watch?v=hmf40VguOqE)



---

## 🧠 Project Scope

Zoofari converts a static HTML theme into a **dynamic React.js theme**, powered by:

- **WordPress** as a headless CMS  
- **WPGraphQL** as the API layer  
- **React.js** as the frontend rendering engine  

All dynamic pages, content, and media are fetched using **GraphQL queries** instead of traditional REST APIs.

---

## ❓ Why WPGraphQL?

WPGraphQL is one of the most flexible approaches for building **React-powered CMS websites** in 2026 and beyond.

With GraphQL:

- You query **only the exact fields you need**  
- The client controls the data  
- No over-fetching or under-fetching  
- Better performance and predictable API responses  

Learn more → https://www.wpgraphql.com/docs/introduction

---

## 🛠️ Tech Stack

| Category | Technology |
|---------|------------|
| **Backend CMS** | WordPress |
| **API Layer** | WPGraphQL Plugin |
| **Frontend** | React.js |
| **Languages Used** | PHP, JavaScript |
| **Authentication** | WordPress default auth + optional JWT |

WPGraphQL Plugin:  
https://wordpress.org/plugins/wp-graphql/

---

## 🔥 Features

- Fully headless WordPress CMS  
- GraphQL-powered API  
- React.js-based frontend  
- Supports pages, posts, and custom post types  
- Fast and efficient data fetching  
- Supports WordPress login + JWT authentication  
- Completely free & open source  

---

## ❓ FAQs

### 1. **Is this project free?**  
Yes! It’s completely free and open source.

---

### 2. **Why WPGraphQL instead of WP REST API?**  
Because WPGraphQL allows you to query exactly what you want.  
If you request only **5 fields**, you get **only 5 fields** — nothing extra.

---

### 3. **Does it support authentication?**  
Yes.  
It supports:

- Standard WordPress username/password authentication  
- JWT-based authentication (optional)  

---

## ⚙️ How to Set Up the Project

### **Step 1 — Prepare WordPress Backend**
Install WordPress locally or on a web server.

### **Step 2 — Import the Included .wppress File**
1. Install plugin:  
   **All-in-One WP Migration and Backup – By ServMask**  
2. Import the `.wppress` file included in this repo.  
3. Update permalinks after import. [Note: USERNAME: admin, PASSWORD: admin]

### **Step 3 — Re-save the GraphQL Settings**
Go to:  
**WP Admin → Settings → Permalinks → Save**  
**WP Admin → GraphQL → Settings → Save**

### **Step 4 — React Frontend Setup**
```bash
npm install
npm run dev