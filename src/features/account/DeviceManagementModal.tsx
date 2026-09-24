import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, Trash2, Shield, RefreshCw, X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { listDevices, revokeDevice, logoutAll, getOrCreateDeviceId, type DeviceRegistration } from '../../api/authApi';

interface DeviceManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceManagementModal: React.FC<DeviceManagementModalProps> = ({ isOpen, onClose }) => {
  const [devices, setDevices] = useState<DeviceRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const currentDeviceId = getOrCreateDeviceId();

  const loadDevices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listDevices();
      setDevices(data);
    } catch (err: unknown) {
      console.error('Failed to load devices:', err);
      setError('Unable to load registered devices. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadDevices();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRevoke = async (deviceId: string) => {
    try {
      setLoading(true);
      await revokeDevice(deviceId);
      setSuccessMsg('Device revoked successfully.');
      setTimeout(() => setSuccessMsg(null), 3000);
      await loadDevices();
    } catch (err: unknown) {
      console.error('Failed to revoke device:', err);
      setError('Failed to revoke device.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAll = async () => {
    if (!window.confirm('Are you sure you want to sign out of all devices? You will need to sign in again.')) {
      return;
    }
    try {
      setLoading(true);
      await logoutAll();
      window.location.reload();
    } catch (err) {
      console.error('Failed to revoke all sessions:', err);
      setError('Failed to sign out all devices.');
      setLoading(false);
    }
  };

  const activeCount = devices.filter((d) => d.status === 'ACTIVE').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Registered Devices</h2>
              <p className="text-xs text-slate-400">Account device anti-sharing security</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Device limit info */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
            <span className="font-semibold text-slate-700">Device Quota</span>
            <span className={`font-bold px-2 py-0.5 rounded-full ${activeCount >= 2 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
              {activeCount} / 2 Devices Registered
            </span>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Device list */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {loading && devices.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Loading devices...</span>
              </div>
            ) : devices.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No devices registered yet.
              </div>
            ) : (
              devices.map((device) => {
                const isCurrent = device.deviceName?.toLowerCase().includes('current') || false;
                const isRevoked = device.status === 'REVOKED';

                return (
                  <div
                    key={device.id}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                      isRevoked
                        ? 'bg-slate-50 border-slate-200/60 opacity-60'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isRevoked ? 'bg-slate-100 text-slate-400' : 'bg-cyan-50 text-atlas-cyan'
                      }`}>
                        {device.userAgentSummary?.toLowerCase().includes('android') || device.userAgentSummary?.toLowerCase().includes('ios') ? (
                          <Smartphone className="w-5 h-5" />
                        ) : (
                          <Laptop className="w-5 h-5" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {device.deviceName || 'Web Device'}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-bold bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded-full">
                              This Device
                            </span>
                          )}
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            isRevoked ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {device.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {device.userAgentSummary || 'Unknown browser'}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Last seen: {new Date(device.lastSeenAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {!isRevoked && (
                      <button
                        type="button"
                        onClick={() => handleRevoke(device.id)}
                        disabled={loading}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors ml-2"
                        title="Revoke Device Access"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleLogoutAll}
              disabled={loading}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
            >
              Sign Out All Devices
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
