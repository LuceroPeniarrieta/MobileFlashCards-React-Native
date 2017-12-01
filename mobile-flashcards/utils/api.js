import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo'
import { DECK_STORAGE_KEY, NOTIFICATION_STORAGE_KEY } from './storageKeys';

export function getDecksApi () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export function addDeckApi ({ key, data }) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
      [key]: data
    }))
}

export function addCardApi ({key, data}) {

  return AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
     stores.map((result, i, store) => {

       let value = JSON.parse(store[i][1]);
       value[key].questions.push(data)
       console.log('VALUEEE res', value[key]) 
       AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(value))     
      });
    });
  });
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'STUDYY!',
    body: "👋 don't forget study for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function clear() {
  AsyncStorage.clear();
}