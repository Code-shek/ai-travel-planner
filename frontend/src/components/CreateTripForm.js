'use client';

import { useState } from 'react';

const INTERESTS = ['Food', 'Culture', 'Adventure', 'Shopping', 'Nature', 'History', 'Nightlife', 'Art'];

export default function CreateTripForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    destination: '',
    durationDays: 3,
    budgetTier: 'Medium',
    interests: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.interests.length === 0) {
      alert('Please select at least one interest');
      return;
    }
    onSubmit({ ...formData, durationDays: Number(formData.durationDays) });
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Plan a New Trip</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Destination
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
            placeholder="e.g. Tokyo, Japan"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Number of Days
          </label>
          <input
            type="number"
            name="durationDays"
            value={formData.durationDays}
            onChange={handleChange}
            min={1}
            max={14}
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Budget
          </label>
          <select
            name="budgetTier"
            value={formData.budgetTier}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                  formData.interests.includes(interest)
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Generate Itinerary
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}