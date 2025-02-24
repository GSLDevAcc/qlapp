'use client'

import { Textarea } from '@/components/ui/textarea'
import type { CriteriaItem, Answer } from '@/types/audit'

interface CriteriaTableProps {
  criteria: CriteriaItem[]
  verticalText?: string
  onAnswerChange: (criteriaId: string, answer: Answer) => void
  onCommentChange: (criteriaId: string, comment: string) => void
}

export function CriteriaTable({
  criteria,
  verticalText,
  onAnswerChange,
  onCommentChange
}: CriteriaTableProps) {
  const getAnswerColor = (answer: Answer) => {
    switch (answer) {
      case 'Complying': return 'bg-green-500 text-white'
      case 'Need Improvement': return 'bg-yellow-500 text-white'
      case 'NC': return 'bg-red-500 text-white'
      default: return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {verticalText && (
              <th className="border border-gray-200 p-2">
                <div className="writing-vertical-lr transform rotate-180 h-32">
                  {verticalText}
                </div>
              </th>
            )}
            <th className="border border-gray-200 p-2 text-left">Question</th>
            <th className="border border-gray-200 p-2 text-left">Comments</th>
            <th className="border border-gray-200 p-2 text-center w-32">Answer</th>
            <th className="border border-gray-200 p-2 text-center w-20">TPP</th>
            <th className="border border-gray-200 p-2 text-center w-20">Status</th>
            <th className="border border-gray-200 p-2 text-center w-20">Points</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((item) => (
            <tr key={item.id} className={!item.isActive ? 'bg-gray-50' : ''}>
              {verticalText && <td className="border border-gray-200"></td>}
              <td className="border border-gray-200 p-2">{item.name}</td>
              <td className="border border-gray-200 p-2">
                <Textarea
                  value={item.comments || ''}
                  onChange={(e) => onCommentChange(item.id, e.target.value)}
                  className="min-h-[40px] text-sm resize-none"
                  disabled={!item.isActive}
                />
              </td>
              <td className="border border-gray-200 p-2">
                <select
                  value={item.answer}
                  onChange={(e) => onAnswerChange(item.id, e.target.value as Answer)}
                  className={`w-full rounded-md border p-1 ${getAnswerColor(item.answer)}`}
                >
                  <option value="Complying">Complying</option>
                  <option value="Need Improvement">Need Improvement</option>
                  <option value="NC">NC</option>
                  <option value="NA">NA</option>
                </select>
              </td>
              <td className="border border-gray-200 p-2 text-center text-orange-500 font-medium">
                {item.tpp}
              </td>
              <td className="border border-gray-200 p-2 text-center">
                {item.isActive && item.answer === 'Complying' && (
                  <span className="text-green-500">✓</span>
                )}
              </td>
              <td className="border border-gray-200 p-2 text-center">
                {item.isActive ? item.points : '-'}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50 font-semibold">
            <td colSpan={verticalText ? 4 : 3} className="border border-gray-200 p-2">
              Totals
            </td>
            <td className="border border-gray-200 p-2 text-center">
              {criteria.reduce((sum, item) => sum + item.tpp, 0)}
            </td>
            <td className="border border-gray-200 p-2"></td>
            <td className="border border-gray-200 p-2 text-center">
              {criteria.reduce((sum, item) => sum + (item.isActive ? item.points : 0), 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}