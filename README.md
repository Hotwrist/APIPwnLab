🚀 API Pwn Lab
A hands-on API security training platform for bug bounty hunters, pentesters, and developers.  Practice real-world API vulnerabilities in a safe, local environment.

---

## 🧠 What You’ll Learn

* Broken Object Level Authorization (IDOR)
* Mass Assignment
* JWT Attacks
* Rate Limit Bypass
* API Key Leakage
* Broken Authentication
* And more...

---

## ⚙️ Tech Stack

* NestJS (Backend)
* PostgreSQL (Database)
* Docker (Containerization)

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Hotwrist/APIPwnLab.git
cd APIPwnLab
```

---

### 2. Start the lab

```bash
make up
```

### 3. First time build

```bash
make build
```

### 4. Stop the Lab
```bash
make down
```

### 5. View logs (Useful for debugging)
```bash
make log
```

### 6. Reset the lab (Full reset)
This does:
   - Stops containers
   - Deletes database volume ❗
   - Rebuilds everything
   - Reseeds fresh data
```bash
make reset
```
---

### 7. Open in browser

http://localhost:3000

---

## 🧪 Available Labs

| Lab               | Description                               |
| ----------------- | ----------------------------------------- |
| IDOR              | Access other users' data by modifying IDs |
| Mass Assignment   | Modify hidden fields                      |

---

## 🎯 Example Lab

### IDOR (Broken Object Level Authorization)

```
GET /labs/idor/profile?id=<USER_ID>
```

Try accessing:

```
GET /labs/idor/profile?id=2
```

---

## ⚠️ Disclaimer

This project is intentionally vulnerable and is meant for **educational purposes only**.

Do NOT deploy in production.

---

## 🤝 Contributing

Pull requests are welcome! Feel free to add new labs or improve existing ones.

---

## ⭐ Support

If you find this project useful, give it a star ⭐

---

## 👨‍💻 Author

Built by **John Ebinyi Odey**, a computer programmer, backend developer (NestJS), cybersecurity enthusiast and penetration tester.
