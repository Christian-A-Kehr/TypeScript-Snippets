import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';
import NotificationList from '../components/notification/NotificationList';
import NotificationListData from '../../utils/dummy-data/notification/NotificationListData';
import AppHeader from '../components/header/AppHeader';
import { white } from '../../utils/constants/colors';

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <AppHeader
        tabs={[{ label: t('notification.notification') }]}
      />
      <View style={styles.container}>
        <NotificationList listData={NotificationListData} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});

export default Notifications;
