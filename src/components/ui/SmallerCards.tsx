import { FaRegCreditCard, FaImages, FaClipboardList } from 'react-icons/fa';

interface ResourceIconCardProps {
    type: 'resources' | 'photos' | 'finance';
    onClick?: () => void;
}

export default function ResourceIconCard({ type, onClick }: ResourceIconCardProps) {
    const cardData = {
        resources: {
            icon: <FaRegCreditCard className="text-white text-4xl mb-3" />,
            label: "Resources"
        },
        photos: {
            icon: <FaImages className="text-white text-4xl mb-3" />,
            label: "Photos"
        },
        finance: {
            icon: <FaClipboardList className="text-white text-4xl mb-3" />,
            label: "Finance"
        }
    };

    const { icon, label } = cardData[type];

    return (
        <div
            className="w-53 h-36 bg-[#19191c] rounded-xl shadow-xl flex flex-col items-center justify-center transition-transform transform hover:scale-105 cursor-pointer"
            onClick={onClick}
        >
            {icon}
            <p className="text-white text-lg">{label}</p>
        </div>
    );
}