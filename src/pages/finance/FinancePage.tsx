import { useState } from 'react';

type Expense = {
    id: number;
    name: string;
    price: number;
    amount: number; // New property added
    date: string;
};

export default function FinancePage() {
    const [expenses, setExpenses] = useState<Expense[]>([
        { id: 1, name: 'Hackathon Stickers', price: 1500.00, amount: 100, date: '2025-05-15' },
        { id: 2, name: 'GDSC Graphic Shirts', price: 2000, amount: 100, date: '2025-05-10' },
        { id: 3, name: 'Lanyards/Name Tags', price: 400.00, amount: 100.00, date: '2025-05-01' }
    ]);

    const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
        name: '',
        price: 0,
        amount: 0, // New property added
        date: new Date().toISOString().split('T')[0]
    });

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.price, 0);
    const budget = 5000; // Example budget amount

    const handleAddExpense = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newExpense.name || newExpense.price <= 0) return;

        setExpenses([...expenses, {
            ...newExpense,
            id: Date.now()
        }]);

        setNewExpense({
            name: '',
            price: 0,
            amount: 0, // New property added
            date: new Date().toISOString().split('T')[0]
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewExpense(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'amount' ? parseFloat(value) || 0 : value
        }));
    };

    return (
        <div className="flex h-screen w-screen bg-[#19191c]">
            {/* Sidebar */}
            <div className="w-64 bg-[#19191c] border-r border-[#3c3c3c] p-4">
                <h2 className="text-xl font-bold mb-6 text-white">PLANAC</h2>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="block py-2 px-2 hover:bg-[#3c3c3c] hover:border-b-2 hover:border-white hover:scale-105 hover:rounded-md transition-all duration-200 text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-2 hover:bg-[#3c3c3c] hover:border-b-2 hover:border-white hover:scale-105 hover:rounded-md transition-all duration-200 text-white">Calender</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-2 hover:bg-[#3c3c3c] hover:border-b-2 hover:border-white hover:scale-105 hover:rounded-md transition-all duration-200 text-white">Team</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-2 hover:bg-[#3c3c3c] hover:border-b-2 hover:border-white hover:scale-105 hover:rounded-md transition-all duration-200 text-white">Tasks</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-2 hover:bg-[#3c3c3c] hover:border-b-2 hover:border-white hover:scale-105 hover:rounded-md transition-all duration-200 text-white">Resources</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-2 bg-[#3c3c3c] border-b-2 border-white rounded-md font-medium text-white">Finance</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-2 hover:bg-[#3c3c3c] hover:border-b-2 hover:border-white hover:scale-105 hover:rounded-md transition-all duration-200 text-white">Workshops</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-2 hover:bg-[#3c3c3c] hover:border-b-2 hover:border-white hover:scale-105 hover:rounded-md transition-all duration-200 text-white">Timeline</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-2 hover:bg-[#3c3c3c] hover:border-b-2 hover:border-white hover:scale-105 hover:rounded-md transition-all duration-200 text-white">Photos</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Finance</h1>
                        <p className="text-[#a1a1a1]">Expense Number</p>
                    </div>

                    <div className="flex space-x-4">
                        <div className="bg-[#3c3c3c] p-4 rounded-lg border border-[#3c3c3c] w-40">
                            <p className="text-[#a1a1a1] text-sm">Budget</p>
                            <p className="text-xl font-semibold text-white">${budget.toLocaleString()}</p>
                        </div>
                        <div className="bg-[#3c3c3c] p-4 rounded-lg border border-[#3c3c3c] w-40">
                            <p className="text-[#a1a1a1] text-sm">Total</p>
                            <p className="text-xl font-semibold text-white">${totalExpenses.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-[#3c3c3c] p-6 rounded-lg border border-[#3c3c3c] mb-8">
                    <h2 className="text-lg font-semibold text-white mb-4">Add More Items</h2>
                    <p className="text-[#a1a1a1] mb-4"></p>

                    <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#a1a1a1] mb-1">Expense Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newExpense.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-[#19191c] border border-[#3c3c3c] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#a1a1a1] mb-1">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={newExpense.price || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-[#19191c] border border-[#3c3c3c] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#a1a1a1] mb-1">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={newExpense.amount || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-[#19191c] border border-[#3c3c3c] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#a1a1a1] mb-1">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={newExpense.date}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-[#19191c] border border-[#3c3c3c] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                                required
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full bg-[#19191c] text-black py-2 px-4 rounded-md hover:bg-blue-700 transition-colors align-middle">Click</button>
                        </div>
                    </form>
                </div>

                {/* Expense Table */}
                <div className="bg-[#3c3c3c] rounded-lg border border-[#3c3c3c] overflow-hidden">
                    <table className="min-w-full divide-y divide-[#19191c]">
                        <thead className="bg-[#19191c]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#a1a1a1] uppercase tracking-wider">Expense Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#a1a1a1] uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#a1a1a1] uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#a1a1a1] uppercase tracking-wider">Date</th>
                        </tr>
                        </thead>
                        <tbody className="bg-[#3c3c3c] divide-y divide-[#19191c]">
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="hover:bg-[#19191c] transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{expense.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#a1a1a1]">${expense.price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#a1a1a1]">{expense.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#a1a1a1]">{expense.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}