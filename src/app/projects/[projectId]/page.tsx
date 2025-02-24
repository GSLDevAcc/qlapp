// src/app/projects/[projectId]/page.tsx
'use client'

import React from 'react'
import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import { ScoreSummaryTable } from './score-summary-table'
import { Report, Client } from '@/types/audit'

interface PageProps {
  params: Promise<{ projectId: string }>
}

const ProjectDetailPage: React.FC<PageProps> = ({ params }) => {
  const router = useRouter()
  const resolvedParams = use(params)
  const projectId = resolvedParams.projectId

  const [report, setReport] = useState<Partial<Report>>({
    companyId: '1',
    userId: '1',
    dateTimeOfAudit: new Date(),
    issueDate: new Date(),
    inspector: '',
    inspectionBody: '',
    address: '',
    reviewedBy: '',
    averageFloorAudit: 100,
    totalMarkFloorAudit: 70,
    totalMarkForSampling: 30,
    overallQuality: 100
  })

  const [client, setClient] = useState<Partial<Client>>({
    companyId: '1',
    userId: '1',
    clientName: '',
    hotelName: '',
    address: '',
    contactPersonOnSite: '',
    positionOfContactPerson: ''
  })

  const handleReportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'datetime-local' || e.target.type === 'date'
      ? new Date(e.target.value)
      : e.target.value

    setReport(prev => ({
      ...prev,
      [e.target.name]: value
    }))
  }

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSave = async () => {
    console.log('Saving audit data:', { report, client })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-semibold">Food Hygiene Audit Report</h1>
            </div>
            <Button onClick={handleSave} className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save Report</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date and time of audit
              </label>
              <input
                type="datetime-local"
                name="dateTimeOfAudit"
                value={report.dateTimeOfAudit?.toISOString().slice(0, 16)}
                onChange={handleReportChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issue date
              </label>
              <input
                type="date"
                name="issueDate"
                value={report.issueDate?.toISOString().slice(0, 10)}
                onChange={handleReportChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Inspector
              </label>
              <input
                type="text"
                name="inspector"
                value={report.inspector}
                onChange={handleReportChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Inspection Body
              </label>
              <input
                type="text"
                name="inspectionBody"
                value={report.inspectionBody}
                onChange={handleReportChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client name
              </label>
              <input
                type="text"
                name="clientName"
                value={client.clientName}
                onChange={handleClientChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hotel name
              </label>
              <input
                type="text"
                name="hotelName"
                value={client.hotelName}
                onChange={handleClientChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact person
              </label>
              <input
                type="text"
                name="contactPersonOnSite"
                value={client.contactPersonOnSite}
                onChange={handleClientChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact position
              </label>
              <input
                type="text"
                name="positionOfContactPerson"
                value={client.positionOfContactPerson}
                onChange={handleClientChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Score Summary</h2>
          <ScoreSummaryTable projectId={projectId} />
        </Card>
      </main>
    </div>
  )
}

export default ProjectDetailPage