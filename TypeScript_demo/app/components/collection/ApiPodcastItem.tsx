import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import {
  black, gray, softRed, white,
} from '../../../utils/constants/colors';
import PodcastEpisode from '../../../utils/types/collection/PodcastEpisode';
import CollapsibleTextBarlow from '../../elements/text/CollapsibleTextBarlow';
import TextBarlow from '../../elements/text/TextBarlow';
import ArrowIcon from '../../../assets/images/icons/archive/redArrow.svg';
import AddToPlaylist from '../../../assets/images/icons/collection/AddToPlaylist.svg';
import SeparatorIcon from '../../../assets/images/icons/archive/separator.svg';
import ListOfChoicesModal from './ListOfChoicesModal';
import { dummeyPlaylist, playlistTest } from '../../../utils/dummy-data/collection/PodcastDummy';
import PlaylistItem from '../../../utils/types/PlaylistItem';
import EventModal from '../modal/EventModal';

type Props = {
  episode: PodcastEpisode
};

const ApiPodcastItem: React.FC<Props> = ({ episode }: Props) => {
  const { t } = useTranslation();
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [playListChoiceModal, setPlayListChoiceModal] = useState(false);
  const [playListChoice, setPlaylistChoice] = useState<PlaylistItem>(playlistTest);
  const [wasEpsidoeAdded, setWasEpsidoeAdded] = useState(false);

  const addToPlayList = () => {
    // check if episode is on playlist
    // add to playlist here (episode + playListChoice)
  };
  const checkLines = useCallback((event: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (event.nativeEvent.lines.length > 2) {
      setShowMoreButton(true);
    }
  }, []);

  const splitDateAndTime = (item: number) => {
    const dateStr = moment(item).format('LL');
    const timeStr = moment(item).format('LT');
    return (
      <View
        style={styles.dateContainer}
      >
        <View style={styles.date}>
          <TextBarlow
            style={styles.timeText}
            fontWeight={500}
          >
            {dateStr}
          </TextBarlow>
        </View>
        <SeparatorIcon style={styles.separatorIcon} />
        <View style={styles.time}>
          <TextBarlow
            fontWeight={500}
            style={styles.timeText}
          >
            {timeStr}
          </TextBarlow>
        </View>
      </View>
    );
  };

  const playlistChoice = (newPodcast: PlaylistItem) => {
    setPlaylistChoice(newPodcast);
    setWasEpsidoeAdded(true);
    setTimeout(() => {
      setPlayListChoiceModal(false);
      setWasEpsidoeAdded(false);
    }, 3000);
    addToPlayList();
  };

  const renderMoreButton = () => {
    if (showMoreButton) {
      return (
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
        >
          <TextBarlow
            style={styles.more}
            fontWeight={500}
          >
            {expanded ? t('apiPodcast.less') : t('apiPodcast.more')}
          </TextBarlow>
        </TouchableOpacity>
      );
    }
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const playEpisode = (selectedEpisode : PodcastEpisode) => {
    // Play selected episode in audioplayer here
    // Change Episode type
    // Remove ESLint disable
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <View>
          <TextBarlow
            numberOfLines={1}
            fontWeight={600}
            style={styles.title}
          >
            {episode.title}
          </TextBarlow>
        </View>
        <View>
          <CollapsibleTextBarlow
            isVisible={expanded}
            maxLines={320}
            minLines={2}
            style={styles.description}
            animDuration={300}
            fontWeight={500}
            onTextLayout={checkLines}
          >
            {episode.description}
          </CollapsibleTextBarlow>
          <View style={styles.lowerLeftContainer}>
            <View style={{ flex: 1 }}>
              {renderMoreButton()}
            </View>
            <View style={styles.timePosistion}>
              {splitDateAndTime(episode.pub_date_ms)}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            onPress={() => playEpisode(episode)}
          >
            <ArrowIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.addToListContainer}>
          <TouchableOpacity
            onPress={() => setPlayListChoiceModal(true)}
          >
            <AddToPlaylist />
          </TouchableOpacity>
        </View>
      </View>
      <ListOfChoicesModal
        visible={playListChoiceModal}
        list={dummeyPlaylist}
        dismiss={() => setPlayListChoiceModal(false)}
        chosePlayList={playlistChoice}
      />
      <View style={styles.confirmationModal}>
        <EventModal
          isVisible={wasEpsidoeAdded}
          closeModal={() => {}}
          title={t('episode.wasAddedTo')}
          description={`${episode.title} ${t('episode.added')} ${playListChoice.title}`}
          coverScreen
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: '2%',
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: white,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    paddingTop: 17,
    paddingLeft: 17,
    paddingRight: '10%',
  },
  title: {
    fontSize: 14,
    paddingBottom: '1%',
  },
  description: {
    color: gray,
    paddingBottom: '1%',
  },
  dateContainer: {
    flexDirection: 'row',
    fontSize: 12,
    color: gray,
    paddingBottom: 7,
  },
  more: {
    fontSize: 12,
    color: softRed,
    paddingBottom: 14,
    paddingTop: 5,
  },
  date: {
    paddingRight: 7,
  },
  time: {
    paddingLeft: 7,
  },
  iconContainer: {
    paddingRight: 19,
  },
  arrowContainer: {
    justifyContent: 'flex-start',
    flex: 1,
    paddingTop: 17,
    paddingBottom: 24,
  },
  addToListContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 17,
  },
  separatorIcon: {
    alignSelf: 'center',
  },
  lowerLeftContainer: {
    flexDirection: 'row',
  },
  timePosistion: {
    alignSelf: 'center',
    flex: 2,
  },
  timeText: {
    fontSize: 11,
    color: gray,
  },
  confirmationModal: {
    marginHorizontal: '10%',
    position: 'absolute',
    marginTop: 5,
  },
});

export default ApiPodcastItem;
