// src/app/projects/[projectId]/section/[sectionId]/section-content.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Home, CheckCircle, AlertTriangle, X, ChevronDown, ChevronUp } from 'lucide-react'
import { 
  Answer,
  SectionContentProps,
  getAnswerText,
  getAnswerId,
  SectionMetrics,
  SectionWithAnswers,
} from '@/types/audit'
import { calculateSectionMetrics, calculateOverallScore } from '@/lib/audit-calculations'
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function SectionContent({ sectionData, projectId }: SectionContentProps) {
  const router = useRouter()
  const [sections, setSections] = useState(sectionData.sections)
  const [isDirty, setIsDirty] = useState(false)
  const [overallPercentage, setOverallPercentage] = useState<number>(0)
  const [sectionMetrics, setSectionMetrics] = useState<Record<string, SectionMetrics>>({})
  const [focusedSection, setFocusedSection] = useState<string | null>(null)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})

  // Initialize sections with full scores
 // Initialize sections with full scores
 const initializeFullScores = useCallback(() => {
  setSections(currentSections => 
    currentSections.map(section => ({
      ...section,
      items: section.items.map(item => ({
        ...item,
        answerId: getAnswerId('Complying'),
        points: item.tpp, // Full points for complying
      }))
    }))
  )
  setIsDirty(false); // Set dirty to false after initialization
}, [])

  // Run initializeFullScores once on mount
  useEffect(() => {
    initializeFullScores()
  }, [initializeFullScores])

  // Calculate section metrics and overall score
  useEffect(() => {
    const newMetrics: Record<string, SectionMetrics> = {}
    sections.forEach(section => {
      const sectionWithAnswers: SectionWithAnswers = {
        ...section,
        items: section.items.map(item => ({
          ...item,
          answer: getAnswerText(item.answerId || 4),
          points: item.points || 0, // Ensure points is always defined
        }))
      }
      newMetrics[section.id] = calculateSectionMetrics(sectionWithAnswers)
    })
    setSectionMetrics(newMetrics)

    const sectionsWithAnswers: SectionWithAnswers[] = sections.map(section => ({
      ...section,
      items: section.items.map(item => ({
        ...item,
        answer: getAnswerText(item.answerId || 4),
        points: item.points || 0, // Ensure points is always defined
      }))
    }))
    const overall = calculateOverallScore(sectionsWithAnswers)
    setOverallPercentage(overall)
  }, [sections])

  // Handle section focus and expand
  const handleSectionFocus = (sectionId: string) => {
    setFocusedSection(sectionId)
    if (collapsedSections[sectionId]) {
      setCollapsedSections(prev => ({
        ...prev,
        [sectionId]: false
      }))
    }
    const element = document.getElementById(`section-${sectionId}`)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  // Toggle section collapse
  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Calculate total metrics with NA exclusion
  const totalMetrics = {
    totalPossibleMarks: sections.reduce((sum, section) => 
      sum + section.items.reduce((itemSum, item) => {
        return getAnswerText(item.answerId || 4) !== 'NA' ? itemSum + item.tpp : itemSum
      }, 0), 0),
    totalScoredMarks: sections.reduce((sum, section) => 
      sum + section.items.reduce((itemSum, item) => {
        return getAnswerText(item.answerId || 4) !== 'NA' ? itemSum + (item.points || 0) : itemSum
      }, 0), 0),
    minorNonConformances: sections.reduce((sum, section) => 
      sum + section.items.filter(item => getAnswerText(item.answerId || 4) === 'Need Improvement').length, 0),
    majorNonConformances: sections.reduce((sum, section) => 
      sum + section.items.filter(item => getAnswerText(item.answerId || 4) === 'NC').length, 0),
    activeItems: sections.reduce((sum, section) => 
      sum + section.items.filter(item => getAnswerText(item.answerId || 4) !== 'NA').length, 0)
  }

  // Calculate score percentage based on active items
  const scorePercentage = totalMetrics.totalPossibleMarks > 0 
    ? (totalMetrics.totalScoredMarks / totalMetrics.totalPossibleMarks) * 100 
    : 0

  // Handle beforeunload event to warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  // Handle answer change
  const handleAnswerChange = (sectionIndex: number, itemIndex: number, answer: Answer) => {
    setIsDirty(true)
    const newSections = [...sections]
    const item = newSections[sectionIndex].items[itemIndex]
    
    // Ensure points is always defined
    item.points = item.points || 0

    // Special handling for 'NA' to update TPP calculations
    if (answer === 'NA') {
      item.answerId = getAnswerId(answer)
      item.points = 0
    } else {
      item.answerId = getAnswerId(answer)
      switch(answer) {
        case 'Complying':
          item.points = item.tpp // Full points
          break
        case 'Need Improvement':
          item.points = Math.floor(item.tpp / 2) // Half points
          break
        case 'NC':
          item.points = 0 // No points
          break
      }
    }
    setSections(newSections)
  }

  // Handle comment change
  const handleCommentChange = (sectionIndex: number, itemIndex: number, comment: string) => {
    setIsDirty(true)
    const newSections = [...sections]
    newSections[sectionIndex].items[itemIndex].comment = comment
    setSections(newSections)
  }

  // Get answer style based on answer type
  const getAnswerStyle = (answer: Answer) => {
    switch (answer) {
      case 'Complying':
        return 'bg-green-500 text-white'
      case 'Need Improvement':
        return 'bg-orange-500 text-white'
      case 'NC':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  // Get status icon based on answer type
  const getStatusIcon = (answer: Answer) => {
    switch (answer) {
      case 'Complying':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'Need Improvement':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case 'NC':
        return <X className="h-5 w-5 text-red-500" />
      case 'NA':
        return <span className="text-sm text-gray-400">NA</span>
      default:
        return null
    }
  }

  // Calculate section total points and TPP
  const calculateSectionTotal = (sectionIndex: number) => {
    const section = sections[sectionIndex]
    const activeItems = section.items.filter(item => getAnswerText(item.answerId || 4) !== 'NA')
    return {
      totalPoints: activeItems.reduce((sum, item) => sum + (item.points || 0), 0),
      totalTPP: activeItems.reduce((sum, item) => sum + item.tpp, 0)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/projects/${projectId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
            <h1 className="text-2xl font-semibold">{sectionData.scoreSummary.item}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={initializeFullScores}
              className="bg-green-50 hover:bg-green-100"
            >
              Reset to Full Score
            </Button>
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              onClick={() => {
                console.log('Saving:', sections)
                setIsDirty(false)
              }}
              disabled={!isDirty}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Summary Card */}
        <Card className="bg-white p-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center pb-4 border-b border-gray-200">
              <span className="text-sm text-gray-600 mb-1">Overall Score</span>
              <div className="text-3xl font-bold text-blue-600">
                {overallPercentage.toFixed(2)}%
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Left column: Overall Metrics */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Overall Metrics</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Progress</span>
                      <span className="font-medium">{scorePercentage.toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={scorePercentage} 
                      className="h-2"
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-sm text-gray-600">Total Mark Possible</span>
                      <Badge variant="outline" className="text-lg py-2 px-3">
                        {totalMetrics.totalPossibleMarks}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="text-sm text-gray-600">Total Mark Scored</span>
                      <Badge 
                        className={`text-lg py-2 px-3 ${
                          scorePercentage >= 80 ? 'bg-green-100 text-green-800' :
                          scorePercentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {totalMetrics.totalScoredMarks}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2">
                    <div className="space-y-1">
                      <span className="text-sm text-gray-600">Minor Non Conformances</span>
                      <Badge variant="secondary" className="block">
                        {totalMetrics.minorNonConformances}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-gray-600">Major Non Conformances</span>
                      <Badge variant="destructive" className="block">
                        {totalMetrics.majorNonConformances}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column: Sections Overview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sections Overview</h3>
                <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
                  {sections.map(section => {
                    const metrics = sectionMetrics[section.id] || {}
                    const sectionScore = metrics.scorePerItem || 0
                    return (
                      <Button
                        key={section.id}
                        variant={focusedSection === section.id ? "default" : "outline"}
                        className="w-full justify-between group hover:shadow-md transition-all"
                        onClick={() => handleSectionFocus(section.id)}
                      >
                        <span className="truncate">{section.item}</span>
                        <Badge 
                          className={`ml-2 ${
                            sectionScore >= 80 ? 'bg-green-100 text-green-800' :
                            sectionScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          } group-hover:scale-110 transition-transform`}
                        >
                          {sectionScore.toFixed(1)}%
                        </Badge>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <Card 
            key={section.id} 
            id={`section-${section.id}`}
            className={`overflow-hidden transition-all duration-200 ${
              focusedSection === section.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div 
              className="bg-blue-50 p-4 cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {collapsedSections[section.id] ? 
                    <ChevronDown className="h-5 w-5" /> : 
                    <ChevronUp className="h-5 w-5" />
                  }
                  <h2 className="text-lg font-semibold">{section.item}</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Weightage: {section.weightage}%
                  </span>
                  {!collapsedSections[section.id] && (
                    <span className="text-sm text-gray-600">
                      Score: {sectionMetrics[section.id]?.scorePerItem?.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {!collapsedSections[section.id] && (
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[35.2%]">Question</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Comments</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-44">Answer</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">TPP</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Status</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Points</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {section.items.map((item, itemIndex) => {
                        const answer = getAnswerText(item.answerId || 4)
                        return (
                          <tr 
                            key={item.id} 
                            className={`transition-colors ${answer === 'NA' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                          >
                            <td className="px-4 py-2 text-sm">{item.question}</td>
                            <td className="px-4 py-2">
                              <textarea
                                value={item.comment || ''}
                                onChange={(e) => handleCommentChange(sectionIndex, itemIndex, e.target.value)}
                                className="w-full px-2 py-1 text-sm border rounded-md resize-none"
                                rows={2}
                                disabled={answer === 'NA'}
                              />
                            </td>
                            <td className="px-4 py-2">
                              <select
                                value={answer}
                                onChange={(e) => handleAnswerChange(sectionIndex, itemIndex, e.target.value as Answer)}
                                className={`w-full p-2 rounded-md text-sm font-medium ${getAnswerStyle(answer)}`}
                              >
                                <option value="Complying">Complying</option>
                                <option value="Need Improvement">Need Improvement</option>
                                <option value="NC">NC</option>
                                <option value="NA">NA</option>
                              </select>
                            </td>
                            <td className="px-4 py-2 text-center text-sm font-medium text-orange-500">
                              {item.tpp}
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex justify-center">
                                {getStatusIcon(answer)}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-center text-sm">
                              {answer !== 'NA' ? item.points : '-'}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 font-medium">
                        <td colSpan={5} className="px-4 py-2 text-right">Total:</td>
                        <td className="px-4 py-2 text-center">
                          {calculateSectionTotal(sectionIndex).totalPoints}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </Card>
        ))}
      </main>
    </div>
  )
}