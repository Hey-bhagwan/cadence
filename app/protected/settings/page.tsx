export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-slate-400">Manage your profile and preferences.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Profile Settings */}
        <div className="glass-panel p-6 rounded-2xl border-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Profile Settings</h3>
          <p className="text-sm text-slate-400">Update your personal information.</p>
        </div>

        {/* Notification Settings */}
        <div className="glass-panel p-6 rounded-2xl border-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Notification Settings</h3>
          <p className="text-sm text-slate-400">Configure how you receive alerts.</p>
        </div>

        {/* AI Preferences */}
        <div className="glass-panel p-6 rounded-2xl border-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">AI Preferences</h3>
          <p className="text-sm text-slate-400">Customize your AI assistant&apos;s behavior.</p>
        </div>

        {/* Account Settings */}
        <div className="glass-panel p-6 rounded-2xl border-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
          <p className="text-sm text-slate-400">Manage security and billing details.</p>
        </div>
        
      </div>
    </div>
  );
}
