import React from 'react';
import { Card } from '@/components/ui/card';
import { Home } from 'lucide-react';

const SectionDetailPage = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Front food handling section: Breakfast Buffet</h1>
        <button className="p-2 rounded-full bg-gray-100">
          <Home className="w-6 h-6" />
        </button>
      </div>

      {/* Infrastructure Section */}
      <Card className="overflow-hidden">
        <div className="bg-blue-50 p-4">
          <h2 className="text-lg font-semibold">Infrastructure</h2>
        </div>
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-sm">
                <th className="text-left p-2">Question</th>
                <th className="text-left p-2">Comments</th>
                <th className="text-center p-2">Answer</th>
                <th className="text-center p-2">TPP</th>
                <th className="text-center p-2">Status</th>
                <th className="text-center p-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {infrastructureItems.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.comments}</td>
                  <td className="p-2 text-center">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                      Complying
                    </span>
                  </td>
                  <td className="p-2 text-center">{item.tpp}</td>
                  <td className="p-2 text-center">✓</td>
                  <td className="p-2 text-center">{item.points}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t font-semibold">
                <td colSpan={3}>Totals</td>
                <td className="text-center p-2">18</td>
                <td></td>
                <td className="text-center p-2">18</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      {/* Equipment & Utensils Section */}
      <Card className="overflow-hidden">
        <div className="bg-blue-50 p-4">
          <h2 className="text-lg font-semibold">Equipment & Utensils</h2>
        </div>
        <div className="p-4">
          <table className="w-full">
            {/* Similar structure to Infrastructure table */}
            {/* ... */}
          </table>
        </div>
      </Card>
    </div>
  );
};

const infrastructureItems = [
  {
    name: 'Floors',
    comments: 'floor visually dirty',
    tpp: 2,
    points: 2
  },
  {
    name: 'Drains',
    comments: '',
    tpp: 2,
    points: 2
  },
  // ... other items
];

export default SectionDetailPage;