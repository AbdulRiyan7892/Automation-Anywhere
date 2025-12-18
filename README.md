# Automation-Anywhere
# Automation Anywhere – UI & API Automation Framework (Playwright)

This repository contains an end-to-end **UI and API automation framework** built using **Playwright** for **Automation Anywhere Community Cloud**.

It covers multiple real-world automation use cases including:
- Task Bots
- Message Box actions
- Form creation with file upload
- Learning Instance creation (API & UI)
- API validations with authentication

---

## Tech Stack

- **Automation Tool:** Playwright
- **Language:** JavaScript
- **Test Runner:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **API Automation:** Playwright APIRequestContext
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

Automation-Anywhere/
│
├── pages/ # Page Object classes
│ ├── LoginPage.js
│ ├── AutomationPage.js
│ ├── TaskBotPage.js
│ ├── FormPage.js
│ ├── FormActionsPanelPage.js
│ ├── FormElementConfigPage.js
│
├── tests/
│ ├── messageBox.spec.js # Use Case 1 – Message Box UI
│ ├── formUpload.spec.js # Use Case 2 – Form + File Upload
│ ├── learningInstanceAPI.spec.js # Use Case 3 – Learning Instance UI
│ └── api/
│ └── api.spec.js # API automation tests
│
├── playwright.config.js
├── package.json
├── README.md
└── tests/fixtures/ # Sample files for upload

yaml
Copy code

---

## ✅ Automated Use Cases

### 🔹 Use Case 1: Message Box Task (UI Automation)
- Login to Automation Anywhere
- Create a Task Bot
- Add **Message Box** action to canvas
- Configure message content
- Save and validate successful creation

---

### 🔹 Use Case 2: Form with Upload Flow (UI Automation)
- Create a new **Form**
- Drag & drop:
  - Text Box
  - Select File element
- Configure properties in right panel
- Save the form
- Preview the form
- Upload a file and validate upload success

---

### 🔹 Use Case 3: Learning Instance (API Automation)
- Perform authenticated API calls using `x-authorization` token
- Create Learning Instance using **POST API**
- Validate:
  - HTTP Status Code (200 / 201)
  - Response Time
  - Response Body (id, name, status)
  - Functional correctness

---

## 🔐 Authentication Handling

- UI tests use standard login flow
- API tests use `x-authorization` token captured from browser **Network tab**
- Token is passed via request headers

---

## ▶️ How to Run Tests

### 1️⃣ Install Dependencies
  npm install
2️⃣ Run All Tests
    npx playwright test
3️⃣ Run Tests in Headed Mode

npx playwright test --headed
4️⃣ Run Specific Test

npx playwright test tests/formUpload.spec.js
