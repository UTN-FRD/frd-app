// @flow
import React, { Component } from "react";
import {
  Animated,
  Easing,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import Icon from "@exponent/vector-icons/Ionicons";

import theme from "../../../../theme";
import { lighten } from "../../../../utils/color";

type Status = "past" | "present" | "future";

// ==============================
// TALK SEPARATOR
// ==============================

export function TalkSeparator({ status }: { status: Status }) {
  let barColor = theme.color.gray20;
  if (status === "past") barColor = lighten(theme.color.blue, 60);
  else if (status === "present") barColor = theme.color.blue;

  return (
    <View
      style={{
        height: 1 / PixelRatio.get(),
        flexDirection: "row",
        alignItems: "stretch"
      }}
      underlayColor="white"
    >
      <View style={{ backgroundColor: barColor, width: 5 }} />
      <View
        style={{ backgroundColor: "white", width: theme.fontSize.default }}
      />
      <View style={{ backgroundColor: theme.color.gray20, flexGrow: 1 }} />
    </View>
  );
}

// ==============================
// TALK STATUSBAR
// ==============================

export function TalkStatusBar({ status, ...props }: { status: Status }) {
  let barColor = theme.color.gray20;
  if (status === "past") barColor = lighten(theme.color.blue, 60);
  if (status === "present") barColor = theme.color.blue;

  return (
    <View
      style={{
        backgroundColor: barColor,
        width: 5
      }}
      {...props}
    />
  );
}

// ==============================
// ICON HELPERS
// ==============================

function Indicator({ color, icon }) {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: color,
        borderRadius: 14,
        marginRight: 7,
        height: 14,
        justifyContent: "center",
        width: 14
      }}
    >
      <Icon
        color="white"
        name={icon}
        size={14}
        style={{ backgroundColor: "transparent", marginBottom: -1 }}
      />
    </View>
  );
}
function LightningSubtitle({ text, ...props }) {
  return (
    <View style={styles.subtitle} {...props}>
      <Indicator color={theme.color.yellow} icon="ios-flash" />
      <Text style={styles.subtitleText}>{text}</Text>
    </View>
  );
}
function KeynoteSubtitle({ text, ...props }) {
  return (
    <View style={styles.subtitle} {...props}>
      <Indicator color={theme.color.blue} icon="ios-key" />
      <Text style={styles.subtitleText}>{text}</Text>
    </View>
  );
}

// ==============================
// TALK ROW
// ==============================

type Props = {
  lightning: boolean,
  onPress: () => mixed,
  speaker: Object,
  startTime: string,
  status: Status,
  title: string
};

const animationDefault = val => ({
  toValue: val,
  duration: 666,
  easing: Easing.inOut(Easing.quad)
});

export default class Talk extends Component {
  props: Props;
  animValue: Animated.Value;

  static defaultProps = {
    status: "future"
  };

  constructor(props: Props) {
    super(props);

    this.animValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.cycleAnimation();
  }
  cycleAnimation() {
    Animated.sequence([
      Animated.timing(this.animValue, animationDefault(1)),
      Animated.timing(this.animValue, animationDefault(0))
    ]).start(() => this.cycleAnimation());
  }
  render() {
    const {
      lightning,
      onPress,
      speaker,
      startTime,
      status,
      title,
      ...props
    } = this.props;

    const isPresent = status === "present";

    const touchableProps = {
      activeOpacity: 1,
      onPress: onPress,
      style: styles.touchable,
      underlayColor: theme.color.gray05
    };
    const animatedStyle = {
      transform: [
        {
          translateX: this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 4]
          })
        }
      ]
    };

    // subtitle variants
    let subtitleText = startTime;
    if (speaker) subtitleText += ` - ${speaker.name}`;

    let subtitle = (
      <Text style={[styles.subtitle, styles.subtitleText]}>
        {subtitleText}
      </Text>
    );
    if (lightning)
      subtitle = <LightningSubtitle text={speaker.name} />;

    return (
      <TouchableHighlight {...touchableProps} {...props}>
        <View style={[styles.base, styles["base__" + status]]}>
          <TalkStatusBar status={status}>
            {isPresent &&
              <Animated.View style={animatedStyle}>
                <Icon
                  color={theme.color.blue}
                  name="md-arrow-dropright"
                  size={34}
                  style={styles.statusbarIcon}
                />
              </Animated.View>}
          </TalkStatusBar>

          <View style={[styles.content, styles["content__" + status]]}>
            <View style={[styles.text, styles["text__" + status]]}>
              {subtitle}
              <Text style={[styles.title, styles["title__" + status]]}>
                {title}
              </Text>
            </View>

            <View style={styles.right}>
              <Icon
                color={theme.color.gray40}
                name="ios-arrow-forward"
                size={20}
                style={styles.chevron}
              />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: "white"
  },
  base: {
    alignItems: "stretch",
    backgroundColor: "transparent",
    flexDirection: "row"
  },

  statusbarIcon: {
    backgroundColor: "transparent",
    height: 34,
    left: 0,
    position: "absolute",
    top: 10,
    width: 34
  },

  // content
  content: {
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 1,
    padding: theme.fontSize.default
  },
  content__past: {
    opacity: 0.5
  },
  text: {
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: theme.fontSize.xsmall
  },
  subtitle: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: theme.fontSize.small
  },
  subtitleText: {
    color: theme.color.gray60,
    flexShrink: 1,
    fontSize: theme.fontSize.small,
    fontWeight: "300"
  },
  title: {
    color: theme.color.text,
    fontSize: theme.fontSize.default
  },

  // right (avatar and chevron)
  right: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 0
  },

  // chevron
  chevron: {
    marginLeft: theme.fontSize.default
  }
});
