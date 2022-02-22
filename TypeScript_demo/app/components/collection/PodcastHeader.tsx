import React from 'react';
import {
  View, Image, StyleSheet, ImageBackground, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import Omnipod from '../../../assets/images/Omnipod.svg';
import TextBarlow from '../../elements/text/TextBarlow';
import AuthBackButton from '../../elements/touchables/AuthBackButton';
import { lightGrayishRed, veryDarkGrayishPinkOpacity90, white } from '../../../utils/constants/colors';

type Props = {
  title: string;
  publisher: string;
  description: string;
  thumbnail: string;
  total_episodes: number;
};

const PodcastHeader: React.FC<Props> = ({
  title, publisher, description, thumbnail, total_episodes,
}: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        resizeMode="cover"
        source={{ uri: thumbnail }}
      >
        <View style={styles.header}>
          <AuthBackButton
            style={styles.backArrow}
            height={25}
            width={25}
            onPress={() => navigation.goBack()}
          />
          <Omnipod
            width={100}
            height={100}
            style={styles.logo}
          />
          <View style={styles.backArrow} />
        </View>
        <View style={styles.profileRow}>
          <View style={styles.pofileImagePosistion}>
            <Image
              style={styles.thumnailStyle}
              source={{ uri: thumbnail }}
            />
          </View>
          <View style={styles.profileData}>
            <TextBarlow
              fontWeight={500}
              style={styles.textTitle}
            >
              {title}
            </TextBarlow>
            <TextBarlow
              fontWeight={300}
              style={styles.textPublisher}
            >
              {publisher}
            </TextBarlow>
            <TextBarlow
              fontWeight={500}
              style={styles.textEpisodeCount}
            >
              {total_episodes}
              {' '}
              {total_episodes === 1 ? t('profile.labels.episode') : t('profile.labels.episodes')}
              {' '}
            </TextBarlow>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.descript}>
          <TextBarlow
            fontWeight={500}
            style={styles.textDescription}
            numberOfLines={6}
          >
            {description}
          </TextBarlow>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: veryDarkGrayishPinkOpacity90,
    paddingTop: Platform.OS === 'android' ? '2.5%' : 0,
  },
  backArrow: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: '7%',
  },
  logo: {
    alignSelf: 'center',
  },
  topBox: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
  },
  profileRow: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: veryDarkGrayishPinkOpacity90,
    paddingHorizontal: '7%',
  },
  pofileImagePosistion: {
    flex: 1,
    justifyContent: 'center',
  },
  thumnailStyle: {
    padding: 30,
    width: 70,
    height: 70,
    overflow: 'hidden',
    borderRadius: 60,
  },
  profileData: {
    flex: 3,
  },
  textTitle: {
    color: white,
    fontSize: 16,

  },
  textPublisher: {
    color: lightGrayishRed,
    fontSize: 13,
  },
  textEpisodeCount: {
    color: white,
  },
  descript: {
    flex: 3,
    backgroundColor: veryDarkGrayishPinkOpacity90,
    paddingHorizontal: '7%',
    paddingTop: '2.5%',
    paddingBottom: '4%',

  },
  textDescription: {
    color: white,
    fontSize: 15,
    letterSpacing: 0.2,
  },

});

export default PodcastHeader;
