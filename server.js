const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let budgetEntries = [];

app.get(`/budget`, (request, response) => {
    response.json(budgetEntries)
});

app.get(`/budget/:id`, (request, response) => {
    const budgetId = request.params.id;
    const budgetEntry = budgetEntries.find(entry => entry.id === parseInt(budgetId));
    if (!budgetEntry) {
        response.send('budget not found')
    }
    response.json(budgetEntry);
});

app.post(`/budget`, (request, response) => {
    const { category, amount, date } = req.body;

    if (amount <= 0) {
        response.send('not a positive number')
    }

    const newBudgetEntry = {
        id: budgetEntries.length + 1,
        category,
        amount,
        date
    }

    budgetEntries.push(newBudgetEntry);
    response.json(newBudgetEntry);
});

app.put(`/budget/:id`, (request, response) => {
    const budgetId = request.params.id;
    const { category, amount, date } = request.body;
    const budgetIndex = budgetEntries.findIndex(entry => entry.id === parseInt(budgetId));
    if (budgetIndex === -1) {
        response.send('budget not found');
    }
    if (amount <= 0) {
        response.send('must be a positive number');
    }

    const updatedBudgetEntry = {
        ...budgetEntries[budgetIndex],
        category: category || budgetEntries[budgetIndex].category,
        amount: amount || budgetEntries[budgetIndex].amount,
        date: date || budgetEntries[budgetIndex].date
    };
    budgetEntries[budgetIndex] = updatedBudgetEntry;
    response.json(updatedBudgetEntry);
});


app.delete(`/budget/:id`, (request, response) => {
    const budgetId = request.params.id;
    const budgetIndex = budgetEntries.findIndex(entry => entry.id === parseInt(budgetId));
    if (budgetIndex === -1) {
        response.send('budegt not found');
    }
    budgetEntries.splice(budgetIndex, 1);
    response.send('budget has been deleted')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});