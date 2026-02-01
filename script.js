document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses();
  updateTotal();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name === "" && !isNaN(amount) && amount > 0) {
      alert("Please enter a valid expense name.");
      return;
    }

    const expense = {
      id: Date.now(),
      name,
      amount,
    };

    expenses.push(expense);
    saveToLocalStorage();
    renderExpenses();
    updateTotal();

    //clear input
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const liDiv = document.createElement("li");
      liDiv.innerHTML = `
      <span>${expense.name}: $${expense.amount}</span>
      <button data-id="${expense.id}">Delete</button>
    `;
      expenseList.appendChild(liDiv);
    });
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));

      expenses = expenses.filter((expense) => expense.id !== expenseId);
      saveToLocalStorage();
      updateTotal();
      renderExpenses();
    }
  });

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
});
