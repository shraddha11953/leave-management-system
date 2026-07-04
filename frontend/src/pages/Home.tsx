import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ShieldCheck,
  Users,
  Bell,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="homepage">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">

          <div className="logo-icon">
            <CalendarDays size={22} />
          </div>

          <h2>Leave Management</h2>

        </div>

        <ul className="nav-links">

          <li className="active">Home</li>

          <li>Features</li>

          <li>About</li>

          <li>Contact</li>

        </ul>

        <button
          className="get-started-btn"
          onClick={() => navigate("/employee-login")}
        >
          Get Started
        </button>

      </nav>

      {/* ================= HERO ================= */}

      <section className="hero">

        {/* Left */}

        <div className="hero-left">

          <span className="badge">

            <BadgeCheck size={15} />

            Smart • Efficient • Secure

          </span>

          <h1>

            Smart Leave

            <br />

            <span>Management</span>

            <br />

            System

          </h1>

          <p>

            Manage employee leave requests seamlessly.

            Apply, track status and get real-time updates

            with an easy and efficient leave management solution.

          </p>

          {/* Buttons */}

          <div className="hero-buttons">

            <button
              className="employee-btn"
              onClick={() => navigate("/employee-login")}
            >
              Login as Employee

              <ArrowRight size={18} />

            </button>

            <button
              className="admin-btn"
              onClick={() => navigate("/admin-login")}
            >
              Login as Admin

              <ArrowRight size={18} />

            </button>

          </div>

          {/* Stats */}

          <div className="stats">

            <div className="stat">

              <Users size={22} />

              <div>

                <h3>100+</h3>

                <p>Employees</p>

              </div>

            </div>

            <div className="stat">

              <CalendarDays size={22} />

              <div>

                <h3>500+</h3>

                <p>Leave Requests</p>

              </div>

            </div>

            <div className="stat">

              <ShieldCheck size={22} />

              <div>

                <h3>99%</h3>

                <p>Satisfaction</p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= HERO RIGHT ================= */}

        <div className="hero-right">

          {/* Floating Card */}

          <div className="floating-card top-card">

            <div className="avatar"></div>

            <div>

              <div className="line"></div>

              <div className="line small"></div>

            </div>

            <div className="green-dot"></div>

          </div>

          {/* Notification */}

          <div className="floating-card notify-card">

            <Bell size={20} />

            <div>

              <div className="line"></div>

              <div className="line small"></div>

            </div>

            <span className="badge-count">
              3
            </span>

          </div>

          {/* Calendar */}

          <img
            src="/leave-calendar.png"
            alt="Leave Management"
            className="hero-image"
          />

        </div>

      </section>
            {/* ================= FEATURES ================= */}

      <section className="features-section">

        <span className="section-tag">
          FEATURES
        </span>

        <h2>
          Everything You Need
        </h2>

        <div className="feature-grid">

          {/* Card 1 */}

          <div className="feature-card blue">

            <div className="icon-box blue-bg">

              <CalendarDays size={28} />

            </div>

            <h3>
              Leave Requests
            </h3>

            <p>
              Apply for leave in just a few clicks.
              Simple, fast and convenient.
            </p>

          </div>

          {/* Card 2 */}

          <div className="feature-card green">

            <div className="icon-box green-bg">

              <ShieldCheck size={28} />

            </div>

            <h3>
              Admin Approval
            </h3>

            <p>
              Admins can review, approve or
              reject requests with feedback.
            </p>

          </div>

          {/* Card 3 */}

          <div className="feature-card purple">

            <div className="icon-box purple-bg">

              <Users size={28} />

            </div>

            <h3>
              Employee Dashboard
            </h3>

            <p>
              Track your leave history,
              remaining balance and request
              status.
            </p>

          </div>

          {/* Card 4 */}

          <div className="feature-card orange">

            <div className="icon-box orange-bg">

              <Bell size={28} />

            </div>

            <h3>
              Notifications
            </h3>

            <p>
              Get instant notifications and
              stay updated about your leave
              status.
            </p>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <p>

          © 2026 Leave Management System.
          All rights reserved.

          <span className="heart">
            ❤️
          </span>

          Built with React + FastAPI

        </p>

      </footer>

    </div>
  );
}