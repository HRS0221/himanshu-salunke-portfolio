import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AvailabilityStatus: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Simulate online status (in real app, this would check actual status)
    const checkOnlineStatus = () => {
      const hour = new Date().getHours()
      const day = new Date().getDay()
      
      // Available during weekdays 9 AM - 6 PM IST
      const isWeekday = day >= 1 && day <= 5
      const isWorkingHours = hour >= 9 && hour < 18
      
      setIsOnline(isWeekday && isWorkingHours)
    }

    checkOnlineStatus()
    const statusTimer = setInterval(checkOnlineStatus, 60000) // Check every minute

    return () => {
      clearInterval(timer)
      clearInterval(statusTimer)
    }
  }, [])

  const availabilityData = {
    status: isOnline ? 'Online' : 'Away',
    statusColor: isOnline ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400',
    statusBg: isOnline ? 'bg-green-100 dark:bg-green-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30',
    nextAvailable: isOnline ? 'Now' : 'Tomorrow 9:00 AM IST',
    responseTime: isOnline ? 'Within 2 hours' : 'Within 24 hours',
    workingHours: 'Monday - Friday, 9:00 AM - 6:00 PM IST',
    timezone: 'Indian Standard Time (IST)',
    currentTime: currentTime.toLocaleTimeString('en-US', { 
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const schedule = [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM', status: 'Available', color: 'text-green-600 dark:text-green-400' },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM', status: 'Available', color: 'text-green-600 dark:text-green-400' },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM', status: 'Available', color: 'text-green-600 dark:text-green-400' },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM', status: 'Available', color: 'text-green-600 dark:text-green-400' },
    { day: 'Friday', hours: '9:00 AM - 6:00 PM', status: 'Available', color: 'text-green-600 dark:text-green-400' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM', status: 'Limited', color: 'text-yellow-600 dark:text-yellow-400' },
    { day: 'Sunday', hours: 'Unavailable', status: 'Off', color: 'text-red-600 dark:text-red-400' }
  ]

  const quickActions = [
    {
      title: 'Schedule a Call',
      description: 'Book a 30-minute consultation call',
      icon: '📞',
      action: 'Book Now',
      available: true
    },
    {
      title: 'Send Email',
      description: 'Get a detailed response within 24 hours',
      icon: '✉️',
      action: 'Send Email',
      available: true
    },
    {
      title: 'Live Chat',
      description: 'Quick questions and instant responses',
      icon: '💬',
      action: 'Start Chat',
      available: isOnline
    },
    {
      title: 'Project Inquiry',
      description: 'Detailed project discussion and planning',
      icon: '📋',
      action: 'Submit Inquiry',
      available: true
    }
  ]

  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          📅 Availability Status
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Check my current availability and preferred contact methods
        </p>
      </div>

      {/* Current Status */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
          <span className={`font-semibold ${availabilityData.statusColor}`}>
            {availabilityData.status}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400">•</span>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {availabilityData.currentTime} IST
          </span>
        </div>
      </motion.div>

      {/* Status Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">⏰</div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Response Time
            </h3>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {availabilityData.responseTime}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {availabilityData.workingHours}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">🌍</div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Timezone
            </h3>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {availabilityData.timezone}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Next available: {availabilityData.nextAvailable}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Weekly Schedule */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 text-center">
          Weekly Schedule
        </h3>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {schedule.map((day, index) => (
            <motion.div
              key={day.day}
              className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
            >
              <div>
                <div className="font-medium text-neutral-900 dark:text-white text-sm">
                  {day.day}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  {day.hours}
                </div>
              </div>
              <div className={`text-xs font-semibold ${day.color}`}>
                {day.status}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 text-center">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                action.available
                  ? 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:shadow-md cursor-pointer'
                  : 'bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 opacity-60 cursor-not-allowed'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              whileHover={action.available ? { scale: 1.02 } : {}}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">{action.icon}</div>
                <h4 className="font-semibold text-neutral-900 dark:text-white">
                  {action.title}
                </h4>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {action.description}
              </p>
              <div className={`text-sm font-medium ${
                action.available
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}>
                {action.available ? action.action : 'Currently Unavailable'}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AvailabilityStatus
