 ## 🍽️ Canteen Management System

A full-stack canteen management system built using **MERN Stack** to streamline the food ordering and admin management process. This project includes user interfaces for both customers and administrators.

---

### 📸 Project UI Screenshots

Below are screenshots of the frontend UI located at:
`Client/Canteen-Frontend/src/assets`

<img src="https://raw.githubusercontent.com/VanshK-MERN71/Canteen_Mangament_System/main/Client/Canteen-Frontend/src/assets/ui1.png" width="100%" />
<img src="https://raw.githubusercontent.com/VanshK-MERN71/Canteen_Mangament_System/main/Client/Canteen-Frontend/src/assets/ui2.png" width="100%" />
<img src="https://raw.githubusercontent.com/VanshK-MERN71/Canteen_Mangament_System/main/Client/Canteen-Frontend/src/assets/ui3.png" width="100%" />
<img src="https://raw.githubusercontent.com/VanshK-MERN71/Canteen_Mangament_System/main/Client/Canteen-Frontend/src/assets/ui4.png" width="100%" />
<img src="https://raw.githubusercontent.com/VanshK-MERN71/Canteen_Mangament_System/main/Client/Canteen-Frontend/src/assets/ui5.png" width="100%" />
<img src="https://raw.githubusercontent.com/VanshK-MERN71/Canteen_Mangament_System/main/Client/Canteen-Frontend/src/assets/ui6.png" width="100%" />
<img src="https://raw.githubusercontent.com/VanshK-MERN71/Canteen_Mangament_System/main/Client/Canteen-Frontend/src/assets/ui7.png" width="100%" />
<img src="https://raw.githubusercontent.com/VanshK-MERN71/Canteen_Mangament_System/main/Client/Canteen-Frontend/src/assets/ui8.png" width="100%" />

---

### 🛠️ Tech Stack

#### 🔷 Frontend

- **Vite.js** (React)
- **Bootstrap**
- **Fetch API**
- **nodemailer**
- **Context API** (for state management)

#### 🔶 Backend

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose)
- **jsonwebtoken**
- **multer** (for add product image)
- **passport-google-oauth20**
- **razorpay**

---

### 🔧 How to Clone and Setup Locally

#### 📁 Step 1: Clone the Repository

```bash
git clone https://github.com/VanshK-MERN71/Canteen_Mangament_System.git
cd Canteen_Mangament_System
```

#### 🚀 Step 2: Setup Backend

```bash
cd server
npm install
```

👉 Create a `.env` file inside `server/` folder with the following content:

```
RAZORPAY_KEY_ID= (paste here your razorpay-key-id)
RAZORPAY_SECRET= (paste here razorpay-secret-key)
EMAIL_USER= (paste here gmail api key for user sending email)
EMAIL_PASS= (paste here email gmail key password)
MONGO_URI= (paste here mongodb compass or Altlas url)
```

```bash
npm run dev
```

#### 🌐 Step 3: Setup Frontend

```bash
cd ../Client/Canteen-Frontend
npm install
npm run dev
```

---

### 🤝 Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

### 📬 Contact

**Author:** Vansh Khanna
**GitHub:** [@VanshK-MERN71](https://github.com/VanshK-MERN71)

---

### 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Thanks for checking out the project! 🙌
