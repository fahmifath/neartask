import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <div>
      <Navbar />

      {/* @yield('content') */}
      <main style={{ padding: "20px" }}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Main;
