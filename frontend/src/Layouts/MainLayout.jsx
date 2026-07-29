import Navbar from "../components/Navbar/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {children}
      </main>
    </>
  );
}

export default MainLayout;