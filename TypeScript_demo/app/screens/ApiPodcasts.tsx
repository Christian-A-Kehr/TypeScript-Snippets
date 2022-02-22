import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ListRenderItem,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import Podcast from '../../../../utils/types/collection/Podcast';
import PodcastHeader from '../../../components/collection/PodcastHeader';
import { testPodcast } from '../../../../utils/dummy-data/collection/PodcastDummy';
import ApiPodcastItem from '../../../components/collection/ApiPodcastItem';
import PodcastEpisode from '../../../../utils/types/collection/PodcastEpisode';
import { statusBarTranslucentStyle } from '../../../../styles/globalStyles';
import { softRed } from '../../../../utils/constants/colors';

 type Props = {
   podcastA: Podcast;
 };

const ApiPodcast: React.FC<Props> = ({ podcastA }:Props) => {
  const [podcast] = useState<Podcast>(testPodcast); // When collection functionality works: remove this line and chages podcastA to podcast
  const [loading, setLoading] = useState(false);

  const renderList: ListRenderItem<PodcastEpisode> = ({ item }) => (
    <ApiPodcastItem
      episode={item}
    />
  );

  const loadingMore = () => {
    // add functionalty for time loarding a fetch podcast.
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useFocusEffect(
    useCallback(() => {
      const barStyle = StatusBar.pushStackEntry(statusBarTranslucentStyle);
      return () => {
        StatusBar.popStackEntry(barStyle);
      };
    }, []),
  );
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          onEndReachedThreshold={0.2}
          onEndReached={loadingMore}
          ListHeaderComponent={(
            <PodcastHeader
              title={podcast.title}
              publisher={podcast.publisher}
              description={podcast.description}
              thumbnail={podcast.thumbnail}
              total_episodes={podcast.total_episodes}
            />
          )}
          ListFooterComponent={(
            <ActivityIndicator
              size="large"
              color={softRed}
              animating={loading}
            />
          )}
          data={podcast.episodes}
          renderItem={renderList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ApiPodcast;
