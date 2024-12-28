let display = document.getElementById("display");
let historyList = document.getElementById("history-list");
let historyArray = []; // To store history in memory

// Append value to display
function appendValue(value) {
  display.value += value;
}

// Clear the display
function clearDisplay() {
  display.value = "";
}

// Remove the last character
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Perform calculation and save to history
function calculate() {
  try {
    const result = eval(display.value);
    saveToHistory(display.value + " = " + result);
    display.value = result;
  } catch (error) {
    alert("Invalid input!");
  }
}

// Advanced operations
function calculateSquareRoot() {
  try {
    const result = Math.sqrt(eval(display.value));
    saveToHistory(`√(${display.value}) = ${result}`);
    display.value = result;
  } catch {
    alert("Invalid input for square root!");
  }
}

function calculatePercentage() {
  try {
    const result = eval(display.value) / 100;
    saveToHistory(`${display.value}% = ${result}`);
    display.value = result;
  } catch {
    alert("Invalid input for percentage!");
  }
}

// Save calculation to history
function saveToHistory(entry) {
  historyArray.push(entry); // Store in array
  const li = document.createElement("li");
  li.innerHTML = `
    ${entry}
    <button onclick="deleteHistoryEntry(this)">Delete</button>
  `;
  historyList.appendChild(li);
  saveHistoryToLocalStorage(); // Update local storage
}

// Delete a specific history entry
function deleteHistoryEntry(button) {
  const li = button.parentElement;
  const index = Array.from(historyList.children).indexOf(li);
  historyArray.splice(index, 1); // Remove from array
  li.remove();
  saveHistoryToLocalStorage(); // Update local storage
}

// Clear the entire history
function clearHistory() {
  historyList.innerHTML = "";
  historyArray = [];
  saveHistoryToLocalStorage(); // Clear local storage
}

// Save history to localStorage
function saveHistoryToLocalStorage() {
  localStorage.setItem("calculatorHistory", JSON.stringify(historyArray));
}

// Load history from localStorage
function loadHistoryFromLocalStorage() {
  const savedHistory = JSON.parse(localStorage.getItem("calculatorHistory"));
  if (savedHistory) {
    historyArray = savedHistory;
    historyArray.forEach(entry => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${entry}
        <button onclick="deleteHistoryEntry(this)">Delete</button>
      `;
      historyList.appendChild(li);
    });
  }
}

// Download history as a text file
function downloadHistory() {
  const historyText = historyArray.join("\n");
  const blob = new Blob([historyText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "calculator_history.txt";
  link.click();
}

// Load history on page load
window.onload = loadHistoryFromLocalStorage;
