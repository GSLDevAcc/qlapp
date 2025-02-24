// src/app/projects/[projectId]/score-summary-table.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ScoreSummary } from '@/types/audit'
import auditData from '@/lib/audit-data'

interface ScoreSummaryTableProps {
  projectId: string
}

export const ScoreSummaryTable: React.FC<ScoreSummaryTableProps> = ({ projectId }) => {
  const router = useRouter()
  const [summaries, setSummaries] = useState<ScoreSummary[]>([])
  
  useEffect(() => {
    // In a real app, you would fetch this data based on projectId
    // For now, we'll use the mock data
    if (auditData.scoreSummaries) {
      setSummaries(auditData.scoreSummaries)
    }
  }, [projectId])

  const handleRowClick = (sectionId: string) => {
    if (projectId && sectionId) {
      const url = `/projects/${projectId}/section/${sectionId}`
      console.log('Navigating to:', url)
      router.push(url)
    }
  }

  if (!projectId || summaries.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Section
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                % per section
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Minor NC
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Major NC
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {summaries.map((summary) => (
              <tr
                key={summary.id}
                onClick={() => handleRowClick(summary.id)}
                className="hover:bg-blue-50 cursor-pointer transition-colors"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleRowClick(summary.id)
                  }
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {summary.item}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {summary.percentagePerSection}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {summary.minorNC}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {summary.majorNC}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2 text-right">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Average for floor audit:</span> {summaries[0]?.percentagePerSection.toFixed(2)}%
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Total mark for floor audit (70%):</span>{' '}
          {(summaries[0]?.percentagePerSection * 0.7).toFixed(2)}%
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Total mark for sampling (30%):</span>{' '}
          {(summaries[0]?.percentagePerSection * 0.3).toFixed(2)}%
        </p>
        <p className="text-lg font-semibold text-gray-900">
          <span>Overall Quality Index:</span> {summaries[0]?.percentagePerSection.toFixed(2)}%
        </p>
      </div>
    </div>
  )
}