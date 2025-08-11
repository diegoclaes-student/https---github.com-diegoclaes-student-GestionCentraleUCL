import { useAuth } from '../contexts/AuthContext'
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react'

const DashboardPage = () => {
  const { user } = useAuth()

  // Mock data - in a real app, this would come from your API
  const stats = [
    {
      name: 'Total Members',
      value: '147',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: 'Upcoming Events',
      value: '5',
      change: '+2',
      changeType: 'increase',
      icon: Calendar,
    },
    {
      name: 'Monthly Budget',
      value: '€2,450',
      change: '-5%',
      changeType: 'decrease',
      icon: DollarSign,
    },
    {
      name: 'Event Attendance',
      value: '89%',
      change: '+3%',
      changeType: 'increase',
      icon: TrendingUp,
    },
  ]

  const recentEvents = [
    { id: 1, name: 'Welcome Back Party', date: '2024-02-15', attendees: 82 },
    { id: 2, name: 'Study Group Session', date: '2024-02-18', attendees: 15 },
    { id: 3, name: 'Career Fair', date: '2024-02-22', attendees: 156 },
  ]

  const recentMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Member', joinDate: '2024-02-10' },
    { id: 2, name: 'Bob Smith', role: 'Member', joinDate: '2024-02-12' },
    { id: 3, name: 'Carol Davis', role: 'Officer', joinDate: '2024-02-14' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your student association</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Events</h3>
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.name}</p>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                  <div className="text-sm text-gray-900">
                    {event.attendees} attendees
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="/events"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                View all events →
              </a>
            </div>
          </div>
        </div>

        {/* Recent Members */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">New Members</h3>
            <div className="space-y-3">
              {recentMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <div className="text-sm text-gray-900">
                    {member.joinDate}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="/members"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                View all members →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="btn-primary w-full">Create Event</button>
            <button className="btn-secondary w-full">Add Member</button>
            <button className="btn-secondary w-full">Send Announcement</button>
            <button className="btn-secondary w-full">View Reports</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage