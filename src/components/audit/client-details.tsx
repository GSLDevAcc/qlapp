import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const ClientDetailsPage = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">FOOD HYGIENE AUDIT REPORT</h1>
      
      {/* General Information */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">General Information</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date and time of audit</label>
              <input type="datetime-local" className="w-full p-2 border rounded" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Issue date</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Inspector</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Inspection body</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Client Information</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Client name</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Name of hotel</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Person on site</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Position of contact person</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Summary */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Score Summary</h2>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-2">Section</th>
                <th className="text-center p-2">% per section</th>
                <th className="text-center p-2">Minor NC</th>
                <th className="text-center p-2">Major NC</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <tr key={section.id} className="border-t hover:bg-gray-50 cursor-pointer">
                  <td className="p-2">{section.name}</td>
                  <td className="text-center p-2">{section.percentage}%</td>
                  <td className="text-center p-2">{section.minorNC}</td>
                  <td className="text-center p-2">{section.majorNC}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Average for floor audit</span>
              <span>100.00%</span>
            </div>
            <div className="flex justify-between">
              <span>Total mark for floor audit (70%)</span>
              <span>70.00%</span>
            </div>
            <div className="flex justify-between">
              <span>Total mark for sampling (30%)</span>
              <span>30.00%</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Overall Quality Index</span>
              <span>100.00%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const sections = [
  {
    id: '1',
    name: 'Front handling food area e.g buffet',
    percentage: 100,
    minorNC: 0,
    majorNC: 0,
  },
  {
    id: '2',
    name: 'Dry Store',
    percentage: 100,
    minorNC: 0,
    majorNC: 0,
  },
  // ... add other sections
];

export default ClientDetailsPage;