import React from 'react';
import './AboutSection.css';
import { Heart, Shield, Home as HomeIcon, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-header">
          <h2>About Us</h2>
          <p>We are dedicated to connecting loving families with pets in need of a forever home.</p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <div className="icon-wrapper">
              <Heart size={32} />
            </div>
            <h3>Our Mission</h3>
            <p>To provide a safe and caring environment for every animal while finding them suitable, loving homes where they can thrive.</p>
          </div>

          <div className="about-card">
            <div className="icon-wrapper">
              <Shield size={32} />
            </div>
            <h3>Safe Adoption</h3>
            <p>We ensure every adoption is safe and secure, with thorough checks to match the right pet with the right family.</p>
          </div>

          <div className="about-card">
            <div className="icon-wrapper">
              <HomeIcon size={32} />
            </div>
            <h3>Forever Homes</h3>
            <p>We believe every pet deserves a warm bed and a loving family. We work tirelessly to make these matches happen.</p>
          </div>

          <div className="about-card">
            <div className="icon-wrapper">
              <Users size={32} />
            </div>
            <h3>Community</h3>
            <p>Building a community of pet lovers who support one another and share in the joy of pet ownership.</p>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-item">
            <h3>200+</h3>
            <p>Pets Adopted</p>
          </div>
          <div className="stat-item">
            <h3>300+</h3>
            <p>Happy Families</p>
          </div>
          <div className="stat-item">
            <h3>20+</h3>
            <p>Volunteers</p>
          </div>
        </div>

        <div className="contact-info">
            <p> Contact Us</p>
            <p>📧 Email: petmatvh@gmail.com</p>
            <p>📞 Phone: 70975376</p>
        </div>
      </div>
    </section>
  );
}
