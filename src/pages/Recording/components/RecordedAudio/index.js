import React from "react";
import { View } from "react-native";

import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Time, Control, Paused, Play } from "./styles";
import { ProgressBar, ProgressButton } from "../../../../components/Player/styles";
import { formatAudioDuration } from "../../../../utils/formatAudioDuration";

export function RecordedAudio({ song, setConfig, config }) {
  const progressWidth = useSharedValue(wp("3.5%"));

  const progressStyle = useAnimatedStyle(() => ({
    width: progressWidth.value,
    height: progressWidth.value,
    borderRadius: progressWidth.value / 2,
  }));

  const { uri, currentDuration, duration, isPaused } = config;

  async function togglePause() {
    if (isPaused) {
      await song.current.setProgressUpdateIntervalAsync(1000);
      song.current.setOnPlaybackStatusUpdate(
        async ({ isPlaying, didJustFinish, positionMillis }) => {
          if (didJustFinish) {
            await song.current.setPositionAsync(0);
            setConfig(s => ({
              ...s,
              isPaused: true,
              currentDuration: 0,
            }));
            return;
          }

          if (isPlaying) {
            setConfig(s => ({
              ...s,
              currentDuration: positionMillis,
            }));
          }
        }
      );
      await song.current.playAsync();
      setConfig(s => ({ ...s, isPaused: false }));
      return;
    }
    await song.current.pauseAsync();
    setConfig(s => ({ ...s, isPaused: true }));
  }

  return (
    <>
      <Time>{formatAudioDuration({ currentDuration, duration, uri })}</Time>
      {uri && (
        <>
          <View style={{ width: wp("90%") }}>
            <ProgressBar
              minimumValue={0}
              maximumValue={duration}
              value={currentDuration}
              onSlidingStart={async () => {
                progressWidth.value = withSpring(wp("4.5%"));
                if (!isPaused) {
                  togglePause();
                }
              }}
              onSlidingComplete={async value => {
                progressWidth.value = withSpring(wp("3.5%"));
                await song.current.setPositionAsync(value[0]);
                togglePause();
              }}
              renderThumbComponent={() => (
                <ProgressButton style={progressStyle} />
              )}
              maximumTrackTintColor="rgba(255,255,255,.3)"
              minimumTrackTintColor="#fff"
            />
          </View>

          <Control onPress={togglePause}>
            {isPaused ? <Play /> : <Paused />}
          </Control>
        </>
      )}
    </>
  );
}
