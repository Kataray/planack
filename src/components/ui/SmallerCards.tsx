import { FaRegCreditCard, FaImages, FaClipboardList } from 'react-icons/fa';

export default function Card() {
    return (
        <div className="flex justify-end gap-6 ml-10 mr-10 mt-8 absolute bottom-2 right-0">
            {/* Resource Card */}
            <div className="w-53 h-36 bg-[#19191c] rounded-xl shadow-xl flex flex-col items-center justify-center transition-transform transform hover:scale-105">
                <FaRegCreditCard className="text-white text-4xl mb-3" />
                <p className="text-white text-lg">Resources</p>
            </div>

            {/* Photos Card */}
            <div className="w-53 h-36 bg-[#19191c] rounded-xl shadow-xl flex flex-col items-center justify-center transition-transform transform hover:scale-105">
                <FaImages className="text-white text-4xl mb-3" />
                <p className="text-white text-lg">Photos</p>
            </div>

            {/* Finance Card */}
            <div className="w-53 h-36 bg-[#19191c] rounded-xl shadow-xl flex flex-col items-center justify-center transition-transform transform hover:scale-105">
                <FaClipboardList className="text-white text-4xl mb-3" />
                <p className="text-white text-lg">Finance</p>
            </div>
        </div>
    );
}
