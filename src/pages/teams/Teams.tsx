import { useState, useEffect } from 'react';

type TeamMember = {
    id: string;
    name: string;
    position: string;
    contact: string;
    subMembers: TeamMember[];
};

export default function TeamsPage() {
    const [teams, setTeams] = useState<TeamMember[]>(() => {
        // Load from localStorage if available
        const saved = localStorage.getItem('teamsData');
        return saved ? JSON.parse(saved) : [
            {
                id: '1',
                name: 'Kyle',
                position: '514-278-9333',
                contact: 'Kyle23@gmail.com',
                subMembers: []
            }
        ];
    });

    const [newMember, setNewMember] = useState<Omit<TeamMember, 'id' | 'subMembers'>>({
        name: '',
        position: '',
        contact: ''
    });

    const [newSubMember, setNewSubMember] = useState<{
        parentId: string;
        member: Omit<TeamMember, 'id' | 'subMembers'>;
    } | null>(null);

    // Save to localStorage whenever teams change
    useEffect(() => {
        localStorage.setItem('teamsData', JSON.stringify(teams));
    }, [teams]);

    const handleAddMember = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMember.name || !newMember.position) return;

        setTeams([...teams, {
            ...newMember,
            id: Date.now().toString(),
            subMembers: []
        }]);

        setNewMember({
            name: '',
            position: '',
            contact: ''
        });
    };

    const handleAddSubMember = (parentId: string) => {
        if (!newSubMember?.member.name || !newSubMember.member.position) return;

        setTeams(teams.map(team => {
            if (team.id === parentId) {
                return {
                    ...team,
                    subMembers: [
                        ...team.subMembers,
                        {
                            ...newSubMember.member,
                            id: Date.now().toString(),
                            subMembers: []
                        }
                    ]
                };
            }
            return team;
        }));

        setNewSubMember(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewMember(prev => ({ ...prev, [name]: value }));
    };

    const handleSubMemberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (newSubMember) {
            setNewSubMember({
                ...newSubMember,
                member: {
                    ...newSubMember.member,
                    [name]: value
                }
            });
        }
    };

    const toggleSubMemberForm = (parentId: string) => {
        setNewSubMember({
            parentId,
            member: {
                name: '',
                position: '',
                contact: ''
            }
        });
    };

    return (
        <div className="flex h-screen bg-[#19191c]">
            {/* Sidebar - same as your Finance page */}
            <div className="w-64 bg-[#19191c] border-r border-[#3c3c3c] p-4">
                {/* ... same sidebar content as your Finance page ... */}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Teams</h1>
                        <p className="text-[#a1a1a1]">Get Contact Infos.</p>
                    </div>
                </div>

                {/* Add New Team Member Form */}
                <div className="bg-[#3c3c3c] p-6 rounded-lg mb-8">
                    <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#a1a1a1] mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newMember.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-[#19191c] border border-[#3c3c3c] rounded-md text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#a1a1a1] mb-1">Phone Number</label>
                            <input
                                type="text"
                                name="position"
                                value={newMember.position}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-[#19191c] border border-[#3c3c3c] rounded-md text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#a1a1a1] mb-1">Email Contact</label>
                            <input
                                type="text"
                                name="contact"
                                value={newMember.contact}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-[#19191c] border border-[#3c3c3c] rounded-md text-white"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Add a new Team Member</button>
                        </div>
                    </form>
                </div>

                {/* Team Members List */}
                <div className="space-y-4">
                    {teams.map((member) => (
                        <div key={member.id} className="bg-[#3c3c3c] p-4 rounded-lg">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-3 h-5 w-5" />
                                <div className="flex-1">
                                    <span className="text-white">{member.name}</span>
                                    <span className="text-[#a1a1a1] mx-2">|</span>
                                    <span className="text-[#a1a1a1]">{member.position}</span>
                                    <span className="text-[#a1a1a1] mx-2">|</span>
                                    <span className="text-blue-400">[{member.contact}]</span>
                                </div>
                                <button
                                    onClick={() => toggleSubMemberForm(member.id)}
                                    className="ml-2 bg-[#19191c] text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Add Sub-Member
                                </button>
                            </div>

                            {/* Sub-member form */}
                            {newSubMember?.parentId === member.id && (
                                <div className="mt-3 ml-8 p-3 bg-[#2a2a2a] rounded">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <input
                                            type="text"
                                            name="name"
                                            value={newSubMember.member.name}
                                            onChange={handleSubMemberInputChange}
                                            placeholder="Name"
                                            className="px-2 py-1 bg-[#19191c] border border-[#3c3c3c] rounded text-white"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="position"
                                            value={newSubMember.member.position}
                                            onChange={handleSubMemberInputChange}
                                            placeholder="Position"
                                            className="px-2 py-1 bg-[#19191c] border border-[#3c3c3c] rounded text-white"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="contact"
                                            value={newSubMember.member.contact}
                                            onChange={handleSubMemberInputChange}
                                            placeholder="Contact"
                                            className="px-2 py-1 bg-[#19191c] border border-[#3c3c3c] rounded text-white"/> <button
                                            onClick={() => handleAddSubMember(member.id)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">Add</button>
                                    </div>
                                </div>
                            )}

                            {/* Display sub-members */}
                            {member.subMembers.length > 0 && (
                                <div className="mt-2 ml-8 space-y-2">
                                    {member.subMembers.map((subMember) => (
                                        <div key={subMember.id} className="flex items-center bg-[#2a2a2a] p-2 rounded">
                                            <input type="checkbox" className="mr-3 h-4 w-4" />
                                            <div className="flex-1">
                                                <span className="text-white">{subMember.name}</span>
                                                <span className="text-[#a1a1a1] mx-2">|</span>
                                                <span className="text-[#a1a1a1]">{subMember.position}</span>
                                                <span className="text-[#a1a1a1] mx-2">|</span>
                                                <span className="text-blue-400">[{subMember.contact}]</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}