import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cards: [],
}

const cardReducersSlice = createSlice({
    name: "cardReducers",
    initialState,
    reducers: {
        addCard: (state, action) => {
            const  {id} = action.payload;
            const existingCard = state.cards.find(card => card.id === id);
            if (existingCard) {
              existingCard.data.quantity += 1;
            } else {
              const newCard = { id: action.payload.id, data: { ...action.payload.data, quantity: 1 } };
              state.cards.push(newCard);
            }
            localStorage.setItem("basketItems", JSON.stringify(state.cards));
          },
          removeCard: (state, action) => {
            const { id } = action.payload;
            const updatedCards = state.cards.filter(card => card.id !== id);
            state.cards.splice(updatedCards, 1);
            localStorage.setItem("basketItems", JSON.stringify(state.cards));
        },
        
    }
});

export const { addCard, removeCard } = cardReducersSlice.actions;
export default cardReducersSlice.reducer;
