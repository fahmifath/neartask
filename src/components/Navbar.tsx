const Navbar = () => {
  return (
    <nav style={{ 
      padding: "20px 0", 
      background: "#2c3e50", 
      color: "#fff",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      borderBottom: "1px solid #34495e"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", paddingLeft: "20px" }}>
        <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>📋 NearTask</h3>
      </div>
    </nav>
  );
};

export default Navbar;
