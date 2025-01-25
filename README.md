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

   - Home page:
     ![image](https://github.com/user-attachments/assets/9eacfdbd-1453-4b68-a520-17942a485db0)


   - Admin Dashboard:
     ![image](https://github.com/user-attachments/assets/2ce6d398-2d9c-451b-98fb-2b5732e54cc4)

   - Pharmacist Dashboard:
     ![image](https://github.com/user-attachments/assets/f0029726-b289-4003-bccc-a7b5f22e2e83)


   - Customer Dashboard:
     ![image](https://github.com/user-attachments/assets/05595e5f-bd99-4c20-9d85-4eadced8efb6)

---

## **Contributing**

Contributions are welcome! Please follow these steps:

- Fork the repository.

- Create a new branch: git checkout -b feature-branch-name.

- Commit your changes: git commit -m 'Add some feature'.

- Push to the branch: git push origin feature-branch-name.

- Submit a pull request.

