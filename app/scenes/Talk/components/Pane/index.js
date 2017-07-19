// @flow
import React, { Component } from 'react';
import {
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';

import type { ScheduleTalk } from '../../../../types';

import { TIME_FORMAT } from '../../../../constants';
import theme from '../../../../theme';
import Avatar from '../../../../components/Avatar';

import Preview from '../Preview';

function Speaker({ data, onPress }) {
  const touchableProps = {
    activeOpacity: 0.66,
    onPress,
  };

  return (
    <TouchableOpacity {...touchableProps}>
      <View style={styles.heroSpeaker}>
        <Avatar source={data.avatar} />
        <Text style={styles.heroSpeakerName}>
          {data.name}
        </Text>
        <Text style={styles.heroSpeakerHint}>
          (tap for more)
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default class TalkPane extends Component {
  props: {
    nextTalk?: ScheduleTalk | null,
    nextTalkPreviewIsEngaged?: boolean,
    onHeroLayout?: (Object) => mixed,
    onScroll?: (Object) => mixed,
    onScrollEndDrag?: () => mixed,
    prevTalk?: ScheduleTalk | null,
    prevTalkPreviewIsEngaged?: boolean,
    showSpeakerModal?: () => mixed,
    visibleTalk: ScheduleTalk,
  };

  render() {
    const {
      nextTalk,
      nextTalkPreviewIsEngaged,
      onHeroLayout,
      prevTalk,
      prevTalkPreviewIsEngaged,
      showSpeakerModal,
      visibleTalk,
      ...props
    } = this.props;

    const speakers = Array.isArray(visibleTalk.speaker)
      ? visibleTalk.speaker.map(s => (
          <Speaker key={s.name} data={s} onPress={() => showSpeakerModal(s)} />
        ))
      : <Speaker
          data={visibleTalk.speaker}
          onPress={() => showSpeakerModal(visibleTalk.speaker)}
        />;

    return (
      <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={90}
        ref="scrollview"
        {...props}
      >
        {!!prevTalk &&
          <View ref="prevTalkPreview" style={{ opacity: 0 }}>
            <Preview
              isActive={prevTalkPreviewIsEngaged}
              position="top"
              subtitle={
                `${moment(prevTalk.time.start).format(TIME_FORMAT)} ${prevTalk.speaker.name ? ' - ' + prevTalk.speaker.name : ''}`
              }
              title={prevTalk.title}
            />
          </View>}
        <View style={styles.hero} onLayout={onHeroLayout}>
          {speakers}
          <Text style={styles.heroTitle}>
            {visibleTalk.title}
          </Text>
        </View>

        <View style={styles.summary} ref="summary">
          <Text style={styles.summaryText}>
            {visibleTalk.summary}
          </Text>
        </View>

        {!!nextTalk &&
          <View ref="nextTalkPreview" style={{ opacity: 0 }}>
            <Preview
              isActive={nextTalkPreviewIsEngaged}
              position="bottom"
              subtitle={
                `${moment(nextTalk.time.start).format(TIME_FORMAT)} - ${nextTalk.speaker.name}`
              }
              title={nextTalk.title}
            />
          </View>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: theme.color.gray20,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopColor: theme.color.gray20,
    borderTopWidth: 1 / PixelRatio.get(),
    marginTop: -(1 / PixelRatio.get()),
    paddingHorizontal: theme.fontSize.large,
    paddingBottom: theme.fontSize.xlarge,
    paddingTop: theme.fontSize.xlarge,
  },
  heroSpeaker: {
    alignItems: 'center',
    paddingHorizontal: theme.fontSize.xlarge,
  },
  heroSpeakerHint: {
    color: theme.color.gray40,
    fontSize: theme.fontSize.xsmall,
    paddingBottom: theme.fontSize.large,
  },
  heroSpeakerName: {
    color: theme.color.blue,
    fontSize: theme.fontSize.default,
    fontWeight: '500',
    marginTop: theme.fontSize.small,
  },
  heroTitle: {
    fontSize: theme.fontSize.large,
    fontWeight: '300',
    textAlign: 'center',
  },

  // summary
  summary: {
    paddingBottom: 40,
  },
  summaryText: {
    fontSize: theme.fontSize.default,
    fontWeight: '300',
    lineHeight: theme.fontSize.large,
    padding: theme.fontSize.large,
  },
});
