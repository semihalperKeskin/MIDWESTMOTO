import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cards: [],
}

const cardReducersSlice = createSlice({
    name: "cardReducers",
    initialState,
    reducers: {
        addCard: (state, action) => {
            const { id } = action.payload;
            const existingCard = state.cards.find(card => card.id === id);
            
            if (existingCard) {
              existingCard.quantity += 1;
            } else {
              const newCard = { ...action.payload, quantity: 1 };
              state.cards.push(newCard);
            }

            localStorage.setItem("basketItems", JSON.stringify(state.cards));
          },
        removeCard: (state, action) => {
            const { id } = action.payload;
            const index = state.cards.findIndex(card => card.id === id);
          
            if (index !== -1) {
              state.cards.splice(index, 1);
            }
          
            localStorage.setItem("basketItems", JSON.stringify(state.cards));
        },
    }
});

export const { addCard, removeCard } = cardReducersSlice.actions;
export default cardReducersSlice.reducer;
