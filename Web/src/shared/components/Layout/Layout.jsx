import NavBar from "./NavBar";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <NavBar />
      <main className="py-2.5 flex justify-center">
            {children}
      </main>
      
    </div>
  );
}

export default Layout;
