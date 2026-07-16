import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';
import { Task } from '@/types';

// Converts a UUID into a stable 32-bit positive integer
export const getNumericId = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

export const syncTaskNotifications = async (tasks: Task[]) => {
  if (!Capacitor.isNativePlatform()) return;

  try {
    const permStatus = await LocalNotifications.checkPermissions();
    if (permStatus.display !== 'granted') {
      const request = await LocalNotifications.requestPermissions();
      if (request.display !== 'granted') return;
    }

    // Cancel all pending notifications so we can re-schedule them fresh
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel(pending);
    }

    const notificationsToSchedule = [];

    for (const task of tasks) {
      if (!task.prazo || task.status === 'completa' || task.status === 'descartada') continue;

      const parts = task.prazo.split('-');
      if (parts.length !== 3) continue;

      const scheduleDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 9, 0, 0);

      if (scheduleDate.getTime() <= Date.now()) continue;

      notificationsToSchedule.push({
        title: 'Prazo Vencendo Hoje',
        body: `A tarefa "${task.nome}" vence hoje!`,
        id: getNumericId(task.id),
        schedule: { at: scheduleDate },
        smallIcon: 'ic_stat_name'
      });
    }

    if (notificationsToSchedule.length > 0) {
      await LocalNotifications.schedule({ notifications: notificationsToSchedule });
    }
    console.log(`[Notifications] Synced ${notificationsToSchedule.length} notifications`);
  } catch (err) {
    console.error('[Notifications] Error syncing notifications', err);
  }
};
