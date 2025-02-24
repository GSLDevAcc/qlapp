// src/components/projects/new-project-modal.tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { NewProjectData } from '@/types'

interface NewProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: NewProjectData) => void
}

export function NewProjectModal({ isOpen, onClose, onSubmit }: NewProjectModalProps) {
  const [formData, setFormData] = useState<NewProjectData>({
    name: '',
    clientName: '',
    auditDate: '',
    hotelName: '',
    inspector: '',
    contactPerson: '',
    contactPosition: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Audit Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                name="clientName"
                required
                value={formData.clientName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hotelName">Hotel Name</Label>
              <Input
                id="hotelName"
                name="hotelName"
                required
                value={formData.hotelName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auditDate">Audit Date</Label>
              <Input
                id="auditDate"
                name="auditDate"
                type="date"
                required
                value={formData.auditDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspector">Inspector</Label>
              <Input
                id="inspector"
                name="inspector"
                required
                value={formData.inspector}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                required
                value={formData.contactPerson}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="contactPosition">Contact Position</Label>
              <Input
                id="contactPosition"
                name="contactPosition"
                required
                value={formData.contactPosition}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}