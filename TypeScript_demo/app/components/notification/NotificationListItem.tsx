import React from 'react';
import {
  View, StyleSheet, GestureResponderEvent, TouchableOpacity, Image,
} from 'react-native';

import TextBarlow from '../../elements/text/TextBarlow';
import {
  white, veryDarkPink, veryDarkDesaturatedPink, darkGrayishRed,
} from '../../../utils/constants/colors';

type Props = {
  sender: string;
  text: string;
  time: string;
  image: string;
  is_seen: boolean;
  onPressNotification: (event: GestureResponderEvent) => void;
};

const NotificationListItem: React.FC<Props> = ({
  sender, text, time, image, is_seen, onPressNotification,
}: Props) => {
  const colorSelect = is_seen ? styles.isSeen : styles.isNotSeen;

  const renderText = () => {
    if (is_seen) {
      return (
        <View style={styles.textContainer}>
          <TextBarlow
            style={[styles.generalText, styles.senderStyling]}
          >
            {sender}
          </TextBarlow>
          <TextBarlow
            numberOfLines={2}
            style={[styles.generalText, styles.textPreview]}
          >
            {text}
          </TextBarlow>
        </View>
      );
    }
    return (
      <View style={styles.textContainer}>
        <TextBarlow
          style={[styles.generalText, styles.senderStyling, styles.textColorIsNotSeen]}
          fontWeight={700}
        >
          {sender}
        </TextBarlow>
        <TextBarlow
          numberOfLines={2}
          style={[styles.generalText, styles.textPreview, styles.textColorIsNotSeen]}
          fontWeight={700}
        >
          {text}
        </TextBarlow>
      </View>
    );
  };

  const renderTime = () => {
    if (is_seen) {
      return (
        <View style={styles.timestampContainer}>
          <TextBarlow
            style={[styles.darkGray2, styles.darkGray2ColorIsSeen]}
            fontWeight={600}
          >
            {time}
          </TextBarlow>
        </View>
      );
    }
    return (
      <View style={styles.timestampContainer}>
        <TextBarlow
          style={[styles.darkGray2, styles.textColorIsNotSeen]}
          fontWeight={600}
        >
          {time}
        </TextBarlow>
      </View>
    );
  };

  return (
    <View style={[styles.notificationItem, colorSelect]}>
      <TouchableOpacity onPress={onPressNotification}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imageStyle}
              source={{ uri: image }}
            />
          </View>
          {renderText()}
          {renderTime()}
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  notificationItem: {
    width: '100%',
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  contentContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: '20%',
    marginRight: '5%',
  },
  textContainer: {
    width: '60%',
    justifyContent: 'center',
  },
  timestampContainer: {
    width: '10%',
    marginLeft: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  isSeen: {
    backgroundColor: white,
    borderBottomColor: veryDarkPink,
    borderBottomWidth: 0.3,
  },
  isNotSeen: {
    backgroundColor: veryDarkDesaturatedPink,
    borderBottomColor: white,
    borderBottomWidth: 0.3,
  },
  imageStyle: {
    padding: 30,
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 150 / 2,
    justifyContent: 'space-around',
  },
  textHandler: {
    width: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 30,
  },
  generalText: {
    lineHeight: 17,
    letterSpacing: 1,
  },
  senderStyling: {
    fontSize: 17,
  },
  textColorIsNotSeen: {
    color: white,
  },
  textPreview: {
    fontSize: 11,
    lineHeight: 17,
    letterSpacing: 1,
  },
  dateStyling: {
    width: '10%',
    alignItems: 'center',
    textAlign: 'right',
  },
  darkGray2: {
    fontSize: 9,
    lineHeight: 10.8,
    letterSpacing: 1,
  },
  darkGray2ColorIsSeen: {
    color: darkGrayishRed,
  },
});

export default NotificationListItem;
