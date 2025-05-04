import {useEffect, useState} from 'react';
import Sidebar from "@/components/Navbar/Sidebar.tsx";


type Expense = {
    id: number;
    name: string;
    price: number;
    amount: number; // New property added
    date: string;
};

export default function FinancePage() {
    const [expenses, setExpenses] = useState<Expense[]>(() => {
        const savedExpenses = localStorage.getItem('expenses');
        return savedExpenses ? JSON.parse(savedExpenses) : [
        { id: 1, name: 'Hackathon Stickers', price: 1500.00, amount: 100, date: '2025-05-15' },
        { id: 2, name: 'GDSC Graphic Shirts', price: 2000, amount: 100, date: '2025-05-10' },
        { id: 3, name: 'Lanyards/Name Tags', price: 400.00, amount: 100.00, date: '2025-05-01' }
    ]});

    const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
        name: '',
        price: 0,
        amount: 0, // New property added
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(()=>{
        localStorage.setItem('expenses', JSON.stringify(expenses));
    },[expenses]);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.price, 0);
    const budget = 7000; // Example budget amount

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
        <div className="flex h-screen w-screen bg-[#000000]">

            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Finance</h1>
                        <p className="text-[#a1a1a1]">Managing your Teams Finance</p>
                    </div>

                    <div className="flex space-x-4">
                        <div className="bg-[#19191c] p-4 rounded-lg border border-[#19191c] w-40">
                            <p className="text-[#a1a1a1] text-sm">Budget</p>
                            <p className="text-xl font-semibold text-white">${budget.toLocaleString()}</p>
                        </div>
                        <div className="bg-[#19191c] p-4 rounded-lg border border-[#19191c] w-40">
                            <p className="text-[#a1a1a1] text-sm">Total</p>
                            <p className="text-xl font-semibold text-white">${totalExpenses.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-[#19191c] p-6 rounded-lg border border-[#19191c] mb-8">
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
                                className="w-full px-3 py-2 bg-[#000000] border border-[#19191c] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
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
                                className="w-full px-3 py-2 bg-[#000000] border border-[#19191c] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
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
                                className="w-full px-3 py-2 bg-[#000000] border border-[#19191c] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
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
                                className="w-full px-3 py-2 bg-[#000000] border border-[#19191c] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                                required
                            /></div>

                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full !bg-[#000000] border border-[#19191c] text-white align-middle">Confirm
                            </button>
                        </div>
                    </form>
                </div>

                {/* Expense Table */}
                <div className="bg-[#19191c] rounded-lg border border-[#19191c] overflow-hidden">
                    <table className="min-w-full divide-y divide-[#19191c]">
                        <thead className="bg-[#19191c]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#a1a1a1] uppercase tracking-wider">Expense Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#a1a1a1] uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#a1a1a1] uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#a1a1a1] uppercase tracking-wider">Date</th>
                        </tr>
                        </thead>
                        <tbody className="bg-[#19191c] divide-y divide-[#19191c]">
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="hover:bg-[#1d1a1a] transition-colors duration-200">
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