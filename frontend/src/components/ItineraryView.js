'use client';

import { useState } from 'react';

export default function ItineraryView({ trip, onAddActivity, onRemoveActivity, onRegenerateDay, onDeleteTrip }) {
  const [newActivity, setNewActivity] = useState({ dayNumber: 1, title: '', timeOfDay: 'Afternoon' });
  const [regenInstruction, setRegenInstruction] = useState('');
  const [regenDay, setRegenDay] = useState(null);
  const [loadingRegen, setLoadingRegen] = useState(false);

  const handleAddActivity = async (dayNumber) => {
    if (!newActivity.title.trim()) return;
    await onAddActivity(trip._id, { ...newActivity, dayNumber });
    setNewActivity({ dayNumber: 1, title: '', timeOfDay: 'Afternoon' });
  };

  const handleRegenerate = async (dayNumber) => {
    setLoadingRegen(true);
    await onRegenerateDay(trip._id, dayNumber, regenInstruction);
    setRegenDay(null);
    setRegenInstruction('');
    setLoadingRegen(false);
  };

  return (
    <div className="space-y-6">
      {/* Trip header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white">{trip.destination}</h2>
            <p className="text-slate-400 mt-1">
              {trip.durationDays} days · {trip.budgetTier} budget · {trip.interests.join(', ')}
            </p>
          </div>
          <button
            onClick={() => onDeleteTrip(trip._id)}
            className="text-red-400 hover:text-red-300 text-sm transition"
          >
            Delete Trip
          </button>
        </div>

        {/* Budget summary */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          {['transport', 'accommodation', 'food', 'activities'].map((key) => (
            <div key={key} className="bg-slate-800 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-400 capitalize">{key}</p>
              <p className="text-white font-semibold">${trip.estimatedBudget[key]}</p>
            </div>
          ))}
          <div className="bg-indigo-900/40 border border-indigo-700 rounded-lg p-3 text-center">
            <p className="text-xs text-indigo-300">Total</p>
            <p className="text-indigo-200 font-bold">${trip.estimatedBudget.total}</p>
          </div>
        </div>
      </div>

      {/* Itinerary days */}
      <div className="space-y-4">
        {trip.itinerary.map((day) => (
          <div key={day.dayNumber} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Day {day.dayNumber}</h3>
              <button
                onClick={() => setRegenDay(regenDay === day.dayNumber ? null : day.dayNumber)}
                className="text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-800 px-3 py-1 rounded-full transition"
              >
                🔄 Regenerate Day
              </button>
            </div>

            {/* Regenerate input */}
            {regenDay === day.dayNumber && (
              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Optional: e.g. more outdoor activities"
                  value={regenInstruction}
                  onChange={(e) => setRegenInstruction(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleRegenerate(day.dayNumber)}
                  disabled={loadingRegen}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  {loadingRegen ? '...' : 'Go'}
                </button>
              </div>
            )}

            {/* Activities */}
            <div className="space-y-2 mb-4">
              {day.activities.map((activity) => (
                <div
                  key={activity._id}
                  className="flex items-start justify-between bg-slate-800 border border-slate-700 rounded-lg p-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white text-sm">{activity.title}</span>
                      <span className="text-[10px] bg-indigo-900/50 text-indigo-300 px-2 py-0.5 rounded-full">
                        {activity.timeOfDay}
                      </span>
                      {activity.estimatedCostUSD > 0 && (
                        <span className="text-[10px] text-slate-400">${activity.estimatedCostUSD}</span>
                      )}
                    </div>
                    {activity.description && (
                      <p className="text-xs text-slate-400 mt-1">{activity.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => onRemoveActivity(trip._id, activity._id)}
                    className="text-slate-500 hover:text-red-400 text-xs ml-3 transition flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add activity */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add an activity..."
                value={newActivity.dayNumber === day.dayNumber ? newActivity.title : ''}
                onChange={(e) => setNewActivity({ ...newActivity, dayNumber: day.dayNumber, title: e.target.value })}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <select
                value={newActivity.dayNumber === day.dayNumber ? newActivity.timeOfDay : 'Afternoon'}
                onChange={(e) => setNewActivity({ ...newActivity, dayNumber: day.dayNumber, timeOfDay: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-sm text-white focus:outline-none"
              >
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
              <button
                onClick={() => handleAddActivity(day.dayNumber)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hotels */}
      {trip.hotels && trip.hotels.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">🏨 Recommended Hotels</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trip.hotels.map((hotel) => (
              <div key={hotel._id} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                <p className="font-semibold text-white text-sm">{hotel.name}</p>
                <p className="text-xs text-indigo-300 mt-1">{hotel.tier}</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-400">${hotel.estimatedCostNightUSD}/night</span>
                  <span className="text-xs text-yellow-400">⭐ {hotel.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}