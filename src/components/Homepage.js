import React from "react";

function Homepage() {
  const handleLogout = () => {
    console.log('Logged out');
}
return (
  <div>
    {/* Header */}
    <header className="header">
      <h1 className="title">Home Page</h1>
      <button className="logoutButton" onClick={handleLogout}>Logout</button>
    </header>
    
    {/* Nội dung của trang home page */}
    <div>Homepage Content</div>
  </div>
);
}

export default Homepage;

// CSS cho Header
const headerStyle = `
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
}

.title {
  font-size: 1.5em;
}

.logoutButton {
  padding: 8px 16px;
  font-size: 1em;
  background-color: #61dafb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logoutButton:hover {
  background-color: #21a1f1;
}
`;

// Thêm CSS vào trang web
const styleElement = document.createElement('style');
styleElement.innerHTML = headerStyle;
document.head.appendChild(styleElement);

