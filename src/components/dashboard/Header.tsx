import Sidebar from 'src/components/Navbar/Sidebar.tsx';

function Header() {
    return (
        <div className="flex">
            <Sidebar />
            <section className="bg-[#000000] relative w-screen h-screen overflow-hidden">

            </section>
        </div>
    );
}

export default Header;
