import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        sound: null,
        soundUrl: null,
        playValue: false,
        position: 0,
        duration: 0,
        isMiniPlayer: false,
        isPlayer: false
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
        }
    },
});

export const { setSound, setSoundUrl, setPlayValue, setPosition, setDuration, setIsMiniPlayer, setIsPlayer } = playerSlice.actions;

export default playerSlice.reducer;