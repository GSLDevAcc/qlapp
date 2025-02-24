'use client'

import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import type { GroupWeightage, Answer, CriteriaItem } from '@/types/audit'
import { getPointsForAnswer } from '@/types/audit'

interface AuditSectionProps {
  group: GroupWeightage
  onUpdate: (groupId: string, updatedCriteria: CriteriaItem[]) => void
}

export function AuditSection({ group, onUpdate }: AuditSectionProps) {
  const handleAnswerChange = (criteriaId: string, answer: Answer) => {
    const updatedCriteria = group.criteria.map(criteria => {
      if (criteria.id === criteriaId) {
        const isActive = answer !== 'NA'
        return {
          ...criteria,
          answer,
          points: isActive ? getPointsForAnswer(answer, criteria.tpp) : 0,
          isActive
        }
      }
      return criteria
    })
    onUpdate(group.id, updatedCriteria)
  }

  const handleCommentChange = (criteriaId: string, comment: string) => {
    const updatedCriteria = group.criteria.map(criteria => {
      if (criteria.id === criteriaId) {
        return { ...criteria, comments: comment }
      }
      return criteria
    })
    onUpdate(group.id, updatedCriteria)
  }

  const getAnswerColor = (answer: Answer) => {
    switch (answer) {
      case 'Complying': return 'bg-green-500 text-white'
      case 'Need Improvement': return 'bg-yellow-500 text-white'
      case 'NC': return 'bg-red-500 text-white'
      default: return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <Card className="mb-6">
      <div className="bg-blue-50 p-4">
        <h3 className="text-lg font-semibold flex justify-between">
          <span>{group.name}</span>
          <span className="text-sm text-gray-600">Weightage: {group.weightage}%</span>
        </h3>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full border-collapse border">
          <thead>
            <tr>
              {group.verticalText && (
                <th rowSpan={2} className="border p-2 w-24">
                  <div className="writing-vertical-lr transform rotate-180 h-32">
                    {group.verticalText}
                  </div>
                </th>
              )}
              <th className="border p-2">Question</th>
              <th className="border p-2">Comments</th>
              <th className="border p-2 w-32">Answer</th>
              <th className="border p-2 w-20">TPP</th>
              <th className="border p-2 w-20">Status</th>
              <th className="border p-2 w-20">Points</th>
            </tr>
          </thead>
          <tbody>
            {group.criteria.map((criteria) => (
              <tr key={criteria.id} className={!criteria.isActive ? 'bg-gray-50' : ''}>
                {group.verticalText && <td className="border"></td>}
                <td className="border p-2">{criteria.name}</td>
                <td className="border p-2">
                  <Textarea
                    value={criteria.comments || ''}
                    onChange={(e) => handleCommentChange(criteria.id, e.target.value)}
                    className="min-h-[40px] text-sm"
                    disabled={!criteria.isActive}
                  />
                </td>
                <td className="border p-2">
                  <select
                    value={criteria.answer}
                    onChange={(e) => handleAnswerChange(criteria.id, e.target.value as Answer)}
                    className={`w-full rounded-md border p-1 ${getAnswerColor(criteria.answer)}`}
                  >
                    <option value="Complying">Complying</option>
                    <option value="Need Improvement">Need Improvement</option>
                    <option value="NC">NC</option>
                    <option value="NA">NA</option>
                  </select>
                </td>
                <td className="border p-2 text-center text-orange-500">{criteria.tpp}</td>
                <td className="border p-2 text-center">
                  {criteria.isActive && criteria.answer === 'Complying' && (
                    <span className="text-green-500">✓</span>
                  )}
                </td>
                <td className="border p-2 text-center">
                  {criteria.isActive ? criteria.points : '-'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-semibold">
              <td colSpan={group.verticalText ? 4 : 3} className="border p-2">
                Totals
              </td>
              <td className="border p-2 text-center">
                {group.criteria.reduce((sum, item) => sum + item.tpp, 0)}
              </td>
              <td className="border p-2"></td>
              <td className="border p-2 text-center">
                {group.criteria.reduce((sum, item) => sum + (item.isActive ? item.points : 0), 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  )
}