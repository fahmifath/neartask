import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f5f5f5" }}>
      <Navbar />

      <main style={{ 
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        flex: "1"
      }}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Main;
