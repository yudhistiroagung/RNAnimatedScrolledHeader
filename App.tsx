import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: '100%',
  },
  listItem: {
    height: 70,
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
});

const MAX_OFFSET = 100;

const App = () => {
  const scrollOffset = useSharedValue(0);

  console.log('OFFSET: ', scrollOffset.value);

  const animtedHeaderStyle = useAnimatedStyle(() => {
    const offset =
      scrollOffset.value > MAX_OFFSET ? MAX_OFFSET : scrollOffset.value;
    const value = offset / 100; // to get value between 0 to 1
    const backgroundColor = interpolateColor(value, [0, 1], ['white', 'green']);

    return {
      backgroundColor,
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const header = useMemo(
    () => <Animated.View style={[s.header, animtedHeaderStyle]} />,
    [animtedHeaderStyle],
  );

  const items = useMemo(
    () =>
      Array(100)
        .fill('a')
        .map((_, index) => (
          <View key={`${index}`} style={s.listItem}>
            <Text>{`This is item index ${index}`}</Text>
          </View>
        )),
    [],
  );

  const content = useMemo(
    () => (
      <Animated.ScrollView onScroll={scrollHandler}>
        {items}
      </Animated.ScrollView>
    ),
    [items, scrollHandler],
  );

  return (
    <View style={s.container}>
      {header}
      {content}
    </View>
  );
};

export default App;
