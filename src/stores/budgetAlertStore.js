import { atom } from 'nanostores';

export const budgetStore = atom({
    budget: 0,          // total budget
    totalSpent: 0,      // Total expense
});

// Set a new budget
export const setBudget = (amount) => {
    budgetStore.set((current) => ({
        ...current,
        budget: amount,
    }));
};

// Add an amount to the total spent
export const addToSpent = (amount) => {
    budgetStore.set((current) => ({
        ...current,
        totalSpent: current.totalSpent + amount,
    }));
};

// Reset total spent to zero
export const resetSpent = () => {
    budgetStore.set((current) => ({
        ...current,
        totalSpent: 0,
    }));
};

// Get the current budget status
export const getBudgetState = () => budgetStore.get();

