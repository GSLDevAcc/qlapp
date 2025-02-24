'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, ClipboardList, Calendar, Building, Search } from 'lucide-react'
import Link from 'next/link'
import { NewProjectModal } from '@/components/projects/new-project-modal'
import { ProjectFilters } from '@/components/projects/project-filters'
import type { Project, NewProjectData } from '@/types'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Food Safety Audit 2025',
      clientName: 'Hotel ABC',
      hotelName: 'Hotel ABC Resort',
      auditDate: '2025-01-15',
      status: 'pending',
      inspector: 'John Doe',
      contactPerson: 'Jane Smith',
      contactPosition: 'F&B Manager'
    },
    // Add more sample projects as needed
  ])

  const handleCreateProject = (data: NewProjectData) => {
    const newProject: Project = {
      id: (projects.length + 1).toString(),
      status: 'pending',
      ...data
    }
    setProjects([...projects, newProject])
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.clientName.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = !statusFilter || project.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Food Hygiene Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{user?.email}</span>
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Audits</p>
              <p className="text-2xl font-semibold">{projects.length}</p>
            </div>
          </Card>
          <Card className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Audits</p>
              <p className="text-2xl font-semibold">
                {projects.filter(p => p.status === 'pending').length}
              </p>
            </div>
          </Card>
          <Card className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Clients</p>
              <p className="text-2xl font-semibold">
                {new Set(projects.map(p => p.clientName)).size}
              </p>
            </div>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Audit Projects</h2>
              {/* <Button 
                className="flex items-center space-x-2"
                onClick={() => setIsNewProjectModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span>New Audit</span>
              </Button> */}
            </div>
            
            <ProjectFilters
              search={search}
              status={statusFilter}
              onSearchChange={setSearch}
              onStatusChange={setStatusFilter}
            />
          </div>
          
          <div className="p-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Link href={`/projects/${project.id}`} key={project.id}>
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs capitalize
                            ${project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                              'bg-green-100 text-green-800'}`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500 flex items-center space-x-2">
                            <Building className="h-4 w-4" />
                            <span>{project.clientName}</span>
                          </p>
                          <p className="text-sm text-gray-500 flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(project.auditDate).toLocaleDateString()}</span>
                          </p>
                        </div>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  )
}