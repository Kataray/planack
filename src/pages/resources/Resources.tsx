import { useState, useEffect } from 'react';
import Sidebar from '@/components/Navbar/Sidebar.tsx'

type Resource = {
    id: string;
    name: string;
    type: string;
    link: string;
    file?: File | null;
    fileName?: string;
};

export default function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>(() => {
        const saved = localStorage.getItem('resourcesData');
        return saved ? JSON.parse(saved) : [
            { id: '1', name: 'Hackthon Acceptances', type: 'PDF', link: '/docs/project-brief.pdf', fileName: '' },
            { id: '2', name: 'Waiver', type: 'ZIP', link: '/assets/designs.zip', fileName: '' },
            { id: '3', name: 'Food Allergy Slip', type: 'DOCX', link: '/docs/meeting-notes.docx', fileName: '' }
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
            setNewResource(prev => ({
                ...prev,
                file: e.target.files![0],
                fileName: e.target.files![0].name
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newResource.name || !newResource.type) return;

        const newResourceItem = {
            ...newResource,
            id: Date.now().toString(),
            fileName: newResource.file ? newResource.file.name : ''
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

    return (
        <div className="flex h-screen w-screen bg-[#000]">
            {/* Sidebar would go here */}
            <Sidebar/>
            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                <h1 className="text-3xl font-bold mb-6">RESOURCES</h1>

                {/* Upload Section - Moved to top */}
                <div className="bg-[#000000] border border-[#19191c] rounded-lg shadow-md p-6 mb-8 border-4">
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
                                <label className="block text-sm font-medium text-white mb-1">
                                    Link (optional)
                                </label>
                                <input
                                    type="text"
                                    name="link"
                                    value={newResource.link}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border text-white border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-1">
                                File Upload
                            </label>
                            <div className="flex items-center space-x-1">
                                <div className="relative flex-1">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        id="fileInput"
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        className="block w-full px-4 py-2 !bg-[#000000] border border-[#19191c] text-white cursor-pointer"
                                    >
                                        {newResource.fileName || 'Choose File'}
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 !bg-[#000000] border border-[#19191c] text-white rounded-md hover:bg-blue-700">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Resources Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                RESOURCE NAME
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                DOCUMENT TYPE
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                LINK
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FILE</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {resources.map((resource) => (
                            <tr key={resource.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {resource.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {resource.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                                    {resource.link ? (
                                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                            {resource.link}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {resource.fileName || '-'}
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