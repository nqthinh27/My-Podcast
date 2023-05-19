import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        sound: null,
        sound_id: null,
        dataSound: [],
        currentSound: 0,
        playValue: false,  // dừng, phát
        position: 0,
        duration: 0,
        isMiniPlayer: false,
        isPlayer: false,  // kiểm tra xem bài hát có đang dừng không
        isPlayScreen: false,
        isPlaying: false, // kiểm tra dưng phát màn theo dõi
        nextPress: false,
        prevPress: false,
    },
    reducers: {
        setSound(state, action) {
            // const { uri, shouldPlay, isLooping, positionMillis } = action.payload;
            // state.sound = { uri, shouldPlay, isLooping, positionMillis };
            state.sound = action.payload;
        },
        setSoundId(state, action) {
            state.sound_id = action.payload;
        },
        setDataSound(state, action) {
            state.dataSound = action.payload;
        },
        setCurrentSound(state, action) {
            state.currentSound = action.payload;
        },
        setPlayValue(state, action) {
            state.playValue = action.payload;
        },
        setPosition(state, action) {
            state.position = action.payload;
        },
        setDuration(state, action) {
            state.duration = action.payload;
        },
        setIsMiniPlayer(state, action) {
            state.isMiniPlayer = action.payload;
        },
        setIsPlayer(state, action) {
            state.isPlayer = action.payload;
        },
        setIsPlayScreen(state, action) {
            state.isPlayScreen = action.payload;
        },
        setIsPlaying(state, action) {
            state.isPlaying = action.payload;
        },
        setNextPress: (state) => {
            const nextIndex = (state.currentSound + 1) % state.dataSound.length;
            state.currentSound = nextIndex;
        },
        setPrevPress: (state) => {
            const prevIndex = state.currentSound - 1;
            state.currentSound = prevIndex < 0 ? state.dataSound.length - 1 : prevIndex;
        },
    },
});

export const {
    setSound,
    setSoundId,
    setDataSound,
    setCurrentSound,
    setPlayValue,
    setPosition,
    setDuration,
    setIsMiniPlayer,
    setIsPlayer,
    setIsPlayScreen,
    setIsPlaying,
    setNextPress,
    setPrevPress
} = playerSlice.actions;

export default playerSlice.reducer;