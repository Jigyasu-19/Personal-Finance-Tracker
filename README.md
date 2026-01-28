# Personal Finance Tracker

## Project Title & Description

**Personal Finance Tracker**

A compact, client-side web app built with plain HTML, CSS and JavaScript that helps users record incomes and expenses, view totals and net balance, and visualize spending by category. Transactions persist locally using the browser's `localStorage`.

## Problem Statement

Many people need a simple, offline-capable tool to track everyday finances without signing up for an account or using a backend service. This project addresses that need by providing an easy-to-use interface to record transactions, view summaries, and inspect spending breakdowns.

## Features Implemented

- Add transactions as **Income** or **Expense** with description, amount, and category.
- Switch between Income and Expense types via toggle buttons.
- View summary cards showing **Total Income**, **Total Expenses**, and **Net Balance**.
- See a list of recent transactions with the ability to delete entries.
- Visual category breakdown for expenses using relative bar charts.
- Persist transactions locally with `localStorage` so data remains between sessions on the same browser.

## DOM Concepts Used

- Selecting elements: `document.getElementById`, `document.querySelectorAll`.
- Event handling: `addEventListener` for `click` and `submit` events.
- Creating and inserting elements: `document.createElement`, `appendChild`, and setting `innerHTML`.
- Modifying classes and states: `classList.add` / `classList.remove` to set active UI states.
- Reading and writing `localStorage` for persistence.
- Updating element content with `textContent` and modifying inline styles for chart widths.

## Steps to run the project

1. Open the project folder and open `index.html` in a modern browser (double-click or open via your editor's live preview).

2. (Optional) Serve the folder with a simple local HTTP server. From the project root run one of the following:

```bash

```


3. Use the form to add transactions. Select Income or Expense, choose a category, enter description and amount, then click **Add Transaction**. Transactions are saved automatically in your browser's `localStorage`.

---

If you'd like, I can add a short Usage section, screenshots, or a CSV export/import feature next.
