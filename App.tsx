import React, {useMemo} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
  },
  searchBar: {
    marginHorizontal: 16,
    borderRadius: 24,
    backgroundColor: 'white',
    height: 32,
    flex: 1,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderColor: '#e5e5e5',
  },
  listItem: {
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  listSeparator: {
    height: 1,
    backgroundColor: '#e5e5e5',
  },
});

const MAX_OFFSET = 100;

const App = () => {
  const scrollOffset = useSharedValue(0);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const offset =
      scrollOffset.value > MAX_OFFSET ? MAX_OFFSET : scrollOffset.value;
    const value = offset / MAX_OFFSET; // to get value between 0 to 1
    const backgroundColor = interpolateColor(value, [0, 1], ['green', 'white']);

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
    () => (
      <Animated.View style={[s.header, animatedHeaderStyle]}>
        <TextInput
          style={s.searchBar}
          underlineColorAndroid={undefined}
          placeholder="Search"
        />
      </Animated.View>
    ),
    [animatedHeaderStyle],
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
      <Animated.FlatList
        onScroll={scrollHandler}
        data={items}
        ItemSeparatorComponent={() => <View style={s.listSeparator} />}
        renderItem={({item}) => {
          return (
            <View style={s.listItem}>
              <Text>{item}</Text>
            </View>
          );
        }}
      />
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
