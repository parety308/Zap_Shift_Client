# 🚚 Zap Shift

**Zap Shift** is a full-stack, door-to-door parcel delivery management system designed to streamline booking, tracking, and nationwide logistics operations across Bangladesh.

---

## 📌 Overview

Zap Shift provides a modern logistics solution with:
- Home & office pickup
- Real-time parcel tracking
- Secure OTP-based delivery confirmation
- Role-based dashboards for **User**, **Admin**, and **Rider**

The system focuses on **efficiency, transparency, and scalability**.

---

## 👥 User Roles

### 🧑 User
- Create parcel delivery requests
- Dynamic cost calculation & payment
- Real-time tracking with tracking number
- View parcel & payment history
- Review service after delivery

### 🛠️ Admin
- Manage users and riders (approve / reject)
- Assign pickup & delivery riders
- Control inter-district routing
- Monitor parcels, payments, and earnings

### 🚴 Rider
- Pick up and deliver parcels
- Update parcel status using tracking number
- Confirm delivery via OTP
- Earn commission per successful delivery

---

## 📊 System Overview

| Role  | Responsibilities | Benefits |
|------|------------------|----------|
| User | Book, pay, track parcels | Real-time tracking |
| Admin | Manage logistics & users | Full system control |
| Rider | Pickup & delivery | Earnings per delivery |

---

## 💰 Pricing Structure

| Parcel Type | Weight | Within City | Outside City |
|------------|--------|-------------|--------------|
| Document | Any | ৳60 | ৳80 |
| Non-Document | ≤ 3kg | ৳110 | ৳150 |
| Non-Document | > 3kg | +৳40/kg | +৳40/kg + ৳40 |

---

## 🚚 Delivery Workflow

## mermaid
flowchart TD
A[User Adds Parcel] --> B[Payment Completed]
B --> C[Admin Assigns Rider]
C --> D[Rider Picks Parcel]
D --> E{Within City?}
E -- Yes --> F[Out for Delivery]
F --> G[Delivered]
E -- No --> H[Service Center]
H --> I[Shipped]
I --> J[Delivered]

# 🧰 Technology Stack

### Frontend
- **React 19** – Component-based UI
- **Vite** – Fast development & build tool
- **Tailwind CSS** – Utility-first styling
- **DaisyUI** – Prebuilt Tailwind components
- **React Router v7** – Client-side routing
- **TanStack React Query** – Server state management
- **Recharts** – Data visualization & analytics
- **Leaflet & React-Leaflet** – Map & location services

### Authentication & Services
- **Firebase Authentication** – Secure login & role-based access
- **Axios** – API communication

###Development Tools
- **ESLint** – Code quality & linting
- **NPM** – Package management

## 🚚 Delivery Workflow

## mermaid
flowchart TD
    A[User Adds Parcel] --> B[Payment Completed]
    B --> C[Admin Assigns Rider]
    C --> D[Rider Picks Parcel]
    D --> E{Within City?}

    E -- Yes --> F[Out for Delivery]
    F --> G[Delivered]

    E -- No --> H[Service Center]
    H --> I[Shipped]
    I --> J[Delivered]

