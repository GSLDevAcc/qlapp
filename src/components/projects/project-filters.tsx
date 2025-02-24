// src/components/projects/project-filters.tsx
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

interface ProjectFiltersProps {
  search: string
  status: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function ProjectFilters({
  search,
  status,
  onSearchChange,
  onStatusChange
}: ProjectFiltersProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <Select
        value={status}
        onValueChange={onStatusChange}
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </Select>
    </div>
  )
}