import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Main.css";

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <div className="main-layout">
      <Navbar />

      <main className="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Main;
