import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Clock, FileText, Tag } from 'lucide-react';

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (event: {
        title: string;
        date: number;
        time: string;
        type: 'VACCINE' | 'CHECKUP' | 'PERSONAL';
        description?: string;
    }) => void;
    selectedDay?: number;
    currentMonth: string;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
    isOpen,
    onClose,
    onAdd,
    selectedDay,
    currentMonth,
}) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(selectedDay || 1);
    const [time, setTime] = useState('10:00 AM');
    const [type, setType] = useState<'VACCINE' | 'CHECKUP' | 'PERSONAL'>('CHECKUP');
    const [description, setDescription] = useState('');

    // Update date when selectedDay changes
    useEffect(() => {
        if (selectedDay) setDate(selectedDay);
    }, [selectedDay]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd({
            title: title.trim(),
            date,
            time,
            type,
            description: description.trim() || undefined,
        });

        // Reset form
        setTitle('');
        setDate(1);
        setTime('10:00 AM');
        setType('CHECKUP');
        setDescription('');
        onClose();
    };

    if (!isOpen) return null;

    const timeOptions = [
        '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
        '05:00 PM', '05:30 PM', '06:00 PM',
    ];

    const modalContent = (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Add New Event</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-rose-100 text-sm mt-1">{currentMonth}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Event Title *
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Doctor's Appointment"
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Date and Time Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Day
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    value={date}
                                    onChange={(e) => setDate(Number(e.target.value))}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-sm appearance-none bg-white"
                                >
                                    {[...Array(31)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Time
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-sm appearance-none bg-white"
                                >
                                    {timeOptions.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Event Type */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Event Type
                        </label>
                        <div className="flex gap-2">
                            {[
                                { value: 'CHECKUP', label: 'Checkup', color: 'blue' },
                                { value: 'VACCINE', label: 'Vaccine', color: 'amber' },
                                { value: 'PERSONAL', label: 'Personal', color: 'rose' },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setType(option.value as typeof type)}
                                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${type === option.value
                                        ? option.color === 'blue'
                                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                            : option.color === 'amber'
                                                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                                                : 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description (Optional) */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add any notes..."
                            rows={3}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-rose-500/30 transition-all"
                        >
                            Add Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    // Render modal at document.body level using portal
    return createPortal(modalContent, document.body);
};

export default AddEventModal;

