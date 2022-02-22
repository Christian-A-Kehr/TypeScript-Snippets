import React from 'react';
import {
  View,
  FlatList, ListRenderItem, StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import Notification from '../../../utils/types/Notification';
import NotificationItems from '../../../utils/types/NotificationItems';
import NotificationListItem from './NotificationListItem';

type Props = { listData: Notification[]; };

const NotificationList: React.FC<Props> = ({ listData }:Props) => {
  const { t } = useTranslation();

  const openingNotification = () => {
    // add event action here (go to like ect.)
  };

  /**
   * @param oldesDate Date of the oldest data obj to compare
   * @param newestDate (optional) newest date (default current date.time())
   * @returns the time differences in hours, days, weeks, month or years depending on the amout of time differences.
   */
  const dateDifference = (oldesDate: Date, newestDate?: Date) => {
    // add ( * 24 ) to get it in days
    const msToHours = 60 * 60 * 1000;
    let compariedDate = new Date();
    if (newestDate != null) {
      compariedDate = newestDate;
    }
    // Discard the time and time-zone information.
    const amountOfHours = Math.floor(Math.abs(oldesDate.getTime() - compariedDate.getTime()) / msToHours);
    let totalTime = amountOfHours;
    let timeType = t('notification.time.hours');

    if (totalTime > 8765) {
      totalTime = Math.floor(amountOfHours / 8765.81);
      timeType = t('notification.time.years');
    } else if (totalTime > 730.4) {
      totalTime = Math.floor(amountOfHours / 730.48);
      timeType = t('notification.time.months');
    } else if (totalTime >= 168) {
      totalTime = Math.floor(amountOfHours / 168);
      timeType = t('notification.time.weeks');
    } else if (totalTime >= 24) {
      totalTime = Math.floor(amountOfHours / 24);
      timeType = t('notification.time.days');
    }
    return (totalTime + timeType);
  };

  const sortList = (data: Notification[]) => {
    const listOfSeen: Notification[] = [];
    const listOfNotSeen: Notification[] = [];
    data.forEach((item:Notification) => {
      if (!item.is_seen) {
        listOfSeen.push(item);
      } else {
        listOfNotSeen.push(item);
      }
    });

    // Sorting list by time differences (shortest time differnces first)
    listOfNotSeen.sort((a, b) => Math.floor(Math.abs(b.time.getTime())) - Math.floor(Math.abs(a.time.getTime())));
    listOfSeen.sort((a, b) => Math.floor(Math.abs(b.time.getTime())) - Math.floor(Math.abs(a.time.getTime())));

    const newSortedList = listOfSeen.concat(listOfNotSeen);
    return newSortedList;
  };

  const renderNotification: ListRenderItem <NotificationItems> = ({ item }) => (

    <NotificationListItem
      sender={item.sender}
      text={item.text}
      time={dateDifference(item.time)}
      onPressNotification={() => openingNotification()}
      image={item.image}
      is_seen={item.is_seen}
    />
  );

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.listStyle}
        data={sortList(listData)}
        renderItem={renderNotification}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    alignItems: 'center',
  },
});

export default NotificationList;
