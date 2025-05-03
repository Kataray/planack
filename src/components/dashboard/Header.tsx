import Sidebar from 'src/components/Navbar/Sidebar.tsx';
import CardDemo from '@/components/ui/cards-demo-2.tsx'

function Header() {
    return (
        <div className="flex">
            <Sidebar />
            <section className="bg-[#000000] relative w-screen h-screen overflow-hidden">

                <h1 className="font-cal text-[4vh] flex justify-start ml-10 mt-7 text-[#FFFFFF]"> Hackathon Dashboard </h1>
                <h1 className="font-cal text-[2.5vh] flex justify-start ml-10 -mt-2 text-[#FFFFFF]"> Every hacks on track </h1>

                <CardDemo />
            </section>
        </div>
    );
}

export default Header;
