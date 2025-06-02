
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Settings, Save } from 'lucide-react';
import { useComplianceAutomation } from '@/hooks/useComplianceAutomation';

const AutomationSettingsTab: React.FC = () => {
  const { automationSettings, updateSettings, isLoading } = useComplianceAutomation();

  const handleSettingChange = (settingKey: string, newValue: any, enabled?: boolean) => {
    const setting = automationSettings.find(s => s.setting_key === settingKey);
    if (setting) {
      updateSettings.mutate({
        settingKey,
        settingValue: typeof newValue === 'object' ? newValue : { ...setting.setting_value, ...newValue },
        enabled: enabled !== undefined ? enabled : setting.enabled
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  const oshaSettings = automationSettings.find(s => s.setting_key === 'osha_reporting');
  const epaSettings = automationSettings.find(s => s.setting_key === 'epa_compliance');
  const inspectionSettings = automationSettings.find(s => s.setting_key === 'inspection_scheduling');
  const maintenanceSettings = automationSettings.find(s => s.setting_key === 'maintenance_automation');

  return (
    <div className="space-y-6">
      {/* OSHA Reporting Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            OSHA Reporting Automation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="osha-enabled">Enable Automatic OSHA Reporting</Label>
            <Switch 
              id="osha-enabled"
              checked={oshaSettings?.enabled || false}
              onCheckedChange={(checked) => handleSettingChange('osha_reporting', oshaSettings?.setting_value, checked)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="osha-frequency">Report Frequency (days)</Label>
              <Input 
                id="osha-frequency"
                type="number"
                value={oshaSettings?.setting_value?.frequency_days || 30}
                onChange={(e) => handleSettingChange('osha_reporting', { frequency_days: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="osha-notification">Notification Days Before</Label>
              <Input 
                id="osha-notification"
                type="number"
                value={oshaSettings?.setting_value?.notification_days || 7}
                onChange={(e) => handleSettingChange('osha_reporting', { notification_days: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EPA Compliance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            EPA Compliance Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="epa-enabled">Enable EPA Compliance Tracking</Label>
            <Switch 
              id="epa-enabled"
              checked={epaSettings?.enabled || false}
              onCheckedChange={(checked) => handleSettingChange('epa_compliance', epaSettings?.setting_value, checked)}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="voc-monitoring">VOC Emissions Monitoring</Label>
              <Switch 
                id="voc-monitoring"
                checked={epaSettings?.setting_value?.voc_monitoring || false}
                onCheckedChange={(checked) => handleSettingChange('epa_compliance', { voc_monitoring: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="waste-tracking">Waste Disposal Tracking</Label>
              <Switch 
                id="waste-tracking"
                checked={epaSettings?.setting_value?.waste_tracking || false}
                onCheckedChange={(checked) => handleSettingChange('epa_compliance', { waste_tracking: checked })}
              />
            </div>
            <div>
              <Label htmlFor="alert-threshold">Alert Threshold (0-1)</Label>
              <Input 
                id="alert-threshold"
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={epaSettings?.setting_value?.alert_threshold || 0.8}
                onChange={(e) => handleSettingChange('epa_compliance', { alert_threshold: parseFloat(e.target.value) })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Automation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Maintenance Automation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="maintenance-enabled">Enable Predictive Maintenance</Label>
            <Switch 
              id="maintenance-enabled"
              checked={maintenanceSettings?.enabled || false}
              onCheckedChange={(checked) => handleSettingChange('maintenance_automation', maintenanceSettings?.setting_value, checked)}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="predictive-enabled">Predictive Alerts</Label>
              <Switch 
                id="predictive-enabled"
                checked={maintenanceSettings?.setting_value?.predictive_enabled || false}
                onCheckedChange={(checked) => handleSettingChange('maintenance_automation', { predictive_enabled: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="filter-tracking">Booth Filter Tracking</Label>
              <Switch 
                id="filter-tracking"
                checked={maintenanceSettings?.setting_value?.filter_tracking || false}
                onCheckedChange={(checked) => handleSettingChange('maintenance_automation', { filter_tracking: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="calibration-reminders">Tool Calibration Reminders</Label>
              <Switch 
                id="calibration-reminders"
                checked={maintenanceSettings?.setting_value?.calibration_reminders || false}
                onCheckedChange={(checked) => handleSettingChange('maintenance_automation', { calibration_reminders: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationSettingsTab;
