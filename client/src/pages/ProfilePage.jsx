import { useAuth } from '../contexts/AuthContext'

const ProfilePage = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-600">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-gray-500">{user?.email}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                {user?.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                {user?.firstName || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                {user?.lastName || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                {user?.email || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Student ID</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                {user?.studentId || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Faculty</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                {user?.faculty || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                {user?.year || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Membership Status</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                {user?.membershipStatus || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                {user?.membershipDate ? new Date(user.membershipDate).toLocaleDateString() : 'Not provided'}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage