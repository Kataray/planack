import { useState, useEffect } from 'react';
import Sidebar from '@/components/Navbar/Sidebar.tsx'

type Resource = {
    id: string;
    name: string;
    type: string;
    link: string;
    file?: File | null;
    fileName?:string;
    fileUrl?:string;
};

export default function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>(() => {
        const saved = localStorage.getItem('resourcesData');
        return saved ? JSON.parse(saved) : [
            { id: '1', name: 'Hackthon Acceptances', type: 'PDF', link: 'https://en.wikipedia.org/wiki/Hackathon', fileName: '', fileUrl:'' },
            { id: '2', name: 'Waiver', type: 'ZIP', link: 'https://en.wikipedia.org/wiki/Waiver', fileName: '' , fileUrl:'' },
            { id: '3', name: 'Food Allergy Slip', type: 'DOCX', link: 'https://www.nhs.uk/conditions/food-allergy/', fileName: '', fileUrl:'' }
        ];
    });

    const [newResource, setNewResource] = useState<Omit<Resource, 'id'>>({
        name: '',
        type: '',
        link: '',
        file: null,
        fileName: ''
    });

    // Save to localStorage when resources change
    useEffect(() => {
        localStorage.setItem('resourcesData', JSON.stringify(resources));
    }, [resources]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewResource(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const fileUrl = URL.createObjectURL(file);
            setNewResource(prev => ({
                ...prev,
                file: e.target.files![0],
                fileName: e.target.files![0].name,
                fileUrl
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newResource.name || !newResource.type) return;

        const fileUrl = newResource.file ? URL.createObjectURL(newResource.file) : '';
        const newResourceItem = {
            ...newResource,
            id: Date.now().toString(),
            fileUrl
        };

        setResources([...resources, newResourceItem]);
        setNewResource({
            name: '',
            type: '',
            link: '',
            file: null,
            fileName: ''
        });
    };

    const handleDownload = (resource: Resource) => {
        if (resource.file) {
            const url = URL.createObjectURL(resource.file);
            const link = document.createElement('a');
            link.href = url;
            link.download = resource.file.name; // Use the original filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url); // Clean up memory
        }
        else if (resource.link) {
            window.open(resource.link, '_blank');
        }
    };

    return (
        <div className="flex h-screen w-screen bg-[#000]">
            {/* Sidebar would go here */}
            <Sidebar/>
            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                <h1 className="text-white text-3xl font-bold mb-6">Resources</h1>

                {/* Upload Section - Moved to top */}
                <div className="bg-[#000000] border-[#19191c] rounded-lg shadow-md p-6 mb-8 border-4">
                    <h2 className="text-white text-xl font-semibold mb-4">Upload:</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white mb-1">
                                    Resource Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newResource.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border text-white border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-1">
                                    Document Type
                                </label>
                                <input
                                    type="text"
                                    name="type"
                                    value={newResource.type}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border text-white border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-1">Link (optional)</label>
                                <input
                                    type="text"
                                    name="link"
                                    value={newResource.link}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border text-white border-gray-300 rounded-md overflow-hidden"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-1">File Upload</label>
                            <div className="flex items-center space-x-1">
                                <div className="relative flex-1 ">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full cursor-pointer"
                                        id="fileInput"
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        className="block w-full px-4 py-2 !bg-[#000000] border text-white cursor-pointer !border-gray-300 rounded-md">
                                        {newResource.fileName || 'Choose File'}
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 !bg-[#000000] border  text-white !border-gray-300 rounded-md">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Resources Table */}
                <div className="bg-[#000] overflow-hidden border-[#19191c] rounded-lg shadow-md p-6 mb-8 border-4">
                    <table className="min-w-full divide-y  !bg-[#000000] border border-b-gray-500 b divide-gray-200">
                        <thead className=" !bg-[#000000] border-b-gray-500">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium !bg-[#000000] border border-[#19191c] text-white uppercase tracking-wider">
                                RESOURCE NAME
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium  !bg-[#000000] border border-[#19191c] text-white uppercase tracking-wider">
                                DOCUMENT TYPE
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium  !bg-[#000000] border border-[#19191c] text-white uppercase tracking-wider">
                                LINK
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium  !bg-[#000000] border border-[#19191c] text-white uppercase tracking-wider">FILE</th>
                            <th className="px-6 py-3 text-left text-xs font-medium  !bg-[#000000] border border-[#19191c] text-white uppercase tracking-wider">DOWNLOAD</th>
                        </tr>
                        </thead>
                        <tbody className=" !bg-[#000000] border border-[#19191c] divide-y divide-gray-500">
                        {resources.map((resource) => (
                            <tr key={resource.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    {resource.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                    {resource.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-600 hover:underline">
                                    {resource.link ? (
                                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                            {resource.link}
                                        </a>
                                    ) : ('  ')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                    {resource.fileName || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {(resource.fileUrl|| resource.link)&&(<button onClick={()=> handleDownload(resource)} className="text-white !bg-[#000000] border">Download</button>)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}