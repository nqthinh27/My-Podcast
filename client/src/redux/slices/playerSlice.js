import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        sound: null, 
        soundUrl: null,
        playValue: false,  // dừng, phát
        position: 0,
        duration: 0,
        isMiniPlayer: false,
        isPlayer: false,  // kiểm tra xem bài hát có đang dừng không
        currentTrack: null,
        isBackButtonPressed: false, // kiểm tra xem có phải ấn nut back android
    },
    reducers: {
        setSound(state, action) {
            state.sound = action.payload;
        },
        setSoundUrl(state, action) {
            state.soundUrl = action.payload;
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
        setCurrentTrack(state, action) {
            state.currentTrack = action.payload;
        },
        setIsBackButtonPressed(state, action) {
            state.isBackButtonPressed = action.payload;
        }
    },
});

export const {
    setSound,
    setSoundUrl,
    setPlayValue,
    setPosition,
    setDuration,
    setIsMiniPlayer,
    setIsPlayer,
    setCurrentTrack,
    setIsBackButtonPressed
} = playerSlice.actions;

export default playerSlice.reducer;