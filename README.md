# **PharmaTrack: Comprehensive Pharmacy Management**

## **Introduction**

PharmaTrack is a scalable, user-friendly web application designed to streamline pharmacy operations. It provides tools for managing inventory, prescriptions, sales, expenses, and supplier information. With role-based access for Admins, Pharmacists, and Customers, the system ensures efficient workflows and secure data handling. Additionally, the platform features an online store for customers to browse and purchase medicines conveniently.

---

## **Features**

### **1. Online Medicine Store**
Browse available medicines directly from the homepage.
Add items to a cart and proceed to checkout for purchasing.
Automated sales tracking and invoice generation for online orders.

### **2. User Management**
- Role-based access control for Admins, Pharmacists, and Customers.
- Secure login and authentication.
  
### **3. Inventory Management**
- Real-time tracking of stock levels, expiration dates, and batch details.
- Alerts for low-stock and expired items.

### **4. Prescription Management**
- Easy handling of new prescriptions and refills.
- Automatic inventory updates after processing.

### **5. Sales and Billing**
- Itemized sales tracking and invoicing.
- Downloadable PDF invoices.

### **6. Supplier Management**
- Maintain supplier details and product catalogs.
- Automated reordering of stock based on thresholds.

### **7. Expense Tracking**
- Log operational expenses (e.g., rent, salaries, utilities).
- Generate detailed expense reports.

### **8. Reports and Analytics**
- Comprehensive sales, inventory, and expense reports.
- Visualizations for data-driven decision-making.

---

## **Tech Stack**

### **Frontend**
- React.js
- Tailwind CSS

### **Backend**
- PHP (RESTful API development)

### **Database**
- MySQL

---

## **Setup Instructions**

### **Prerequisites**
1. Node.js and npm installed.
2. PHP installed with a compatible web server (Apache or Nginx).
3. MySQL database server.

### **Steps**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/pharmatrack.git
   cd pharmatrack
   ```

2. **Frontend Setup**
   - Navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

3. **Backend Setup**
   - Install a local server (e.g., XAMPP or WAMP).

   - Place the backend files in the server's root directory (e.g., htdocs for XAMPP).

   - Import the pharmatrack.sql file into your MySQL database.

   - Update the database connection details in the config.php file.

5. **Run the Application**
   - Access the application at `http://localhost:5178` for the frontend.
   - Ensure the backend APIs are accessible at the configured endpoint.

---

## **Screenshots**

   - Home Page:
     <img width="1350" height="671" alt="home" src="https://github.com/user-attachments/assets/0ea59d45-e56d-4ba9-b09d-b90993743176" />

   - Cart Page:
     <img width="1365" height="679" alt="cart" src="https://github.com/user-attachments/assets/94a984cb-73a3-4517-bbc2-920a065f81e9" />

   - Invoice:
     ![image](https://github.com/user-attachments/assets/4d9215dc-17af-4f92-a49c-7d200ff8b4ae)

   - Admin Dashboard:
     <img width="1365" height="678" alt="admin" src="https://github.com/user-attachments/assets/e48407de-e8bd-40c8-b48e-24ba54ba3a5f" />

   - Pharmacist Dashboard:
     <img width="1365" height="675" alt="Pharmacist" src="https://github.com/user-attachments/assets/2b646020-ec9c-4d10-8375-42b5a3f386f2" />

   - Customer Dashboard:
     <img width="1365" height="679" alt="customer" src="https://github.com/user-attachments/assets/143163c3-fd1d-454b-b07f-c9a611a1fc51" />

   - Report:
     ![image](https://github.com/user-attachments/assets/3377a1b9-2414-4978-b1cf-54df305597f9)

---

## **Contributing**

Contributions are welcome! Please follow these steps:

- Fork the repository.

- Create a new branch: git checkout -b feature-branch-name.

- Commit your changes: git commit -m 'Add some feature'.

- Push to the branch: git push origin feature-branch-name.

- Submit a pull request.

