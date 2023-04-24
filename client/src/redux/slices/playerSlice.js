import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        dataSound: [], 
        currentSound: 0,
        playValue: false,  // dừng, phát
        position: 0,
        duration: 0,
        isMiniPlayer: false,
        isPlayer: false,  // kiểm tra xem bài hát có đang dừng không
        isPlayScreen: false,
        isPlaying: false, // kiểm tra xem có phải ấn nut back android
        nextPress: false,
        prevPress: false,
    },
    reducers: {
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
        setNextPress(state, action) {
            state.nextPress = action.payload;
        },
        setPrevPress(state, action) {
            state.prevPress = action.payload;
        },
    },
});

export const {
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