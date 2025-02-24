export interface Project {
    id: string
    name: string
    clientName: string
    auditDate: string
    status: 'pending' | 'in-progress' | 'completed'
    hotelName?: string
    inspector?: string
    contactPerson?: string
    contactPosition?: string
  }
  
  export interface NewProjectData {
    name: string
    clientName: string
    auditDate: string
    hotelName: string
    inspector: string
    contactPerson: string
    contactPosition: string
  }