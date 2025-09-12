import { useState, useEffect } from 'react'

interface ProjectView {
  projectId: string
  views: number
  lastViewed: number
}

const STORAGE_KEY = 'project-views'

export const useProjectViews = (projectId: string, initialViews: number) => {
  const [views, setViews] = useState(initialViews)

  // Load views from localStorage on mount
  useEffect(() => {
    const storedViews = localStorage.getItem(STORAGE_KEY)
    if (storedViews) {
      try {
        const parsedViews: ProjectView[] = JSON.parse(storedViews)
        const projectView = parsedViews.find(view => view.projectId === projectId)
        if (projectView) {
          setViews(projectView.views)
        }
      } catch (error) {
        console.error('Error parsing stored views:', error)
      }
    }
  }, [projectId])

  // Save views to localStorage whenever they change
  useEffect(() => {
    const storedViews = localStorage.getItem(STORAGE_KEY)
    let parsedViews: ProjectView[] = []
    
    if (storedViews) {
      try {
        parsedViews = JSON.parse(storedViews)
      } catch (error) {
        console.error('Error parsing stored views:', error)
        parsedViews = []
      }
    }

    const existingIndex = parsedViews.findIndex(view => view.projectId === projectId)
    const projectView: ProjectView = { 
      projectId, 
      views, 
      lastViewed: Date.now() 
    }

    if (existingIndex >= 0) {
      parsedViews[existingIndex] = projectView
    } else {
      parsedViews.push(projectView)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedViews))
  }, [projectId, views])

  const incrementView = () => {
    setViews(prev => prev + 1)
  }

  return {
    views,
    incrementView
  }
}
