create database minipro;
use minipro;

-- CREATE Queries

CREATE TABLE users (
    user_id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    created_at DATE
);

CREATE TABLE categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(50)
);

CREATE TABLE expenses (
    expense_id INT PRIMARY KEY,
    user_id INT,
    category_id INT,
    amount DECIMAL(10,2),
    expense_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);


-- insert Queries

INSERT INTO users(user_id, name, email, created_at)
VALUES
(1, 'Arbaz', 'arbaz@gmail.com', '2026-05-01'),
(2, 'Ali', 'ali@gmail.com', '2026-05-02');

INSERT INTO categories(category_id, category_name)
VALUES
(1, 'Food'),
(2, 'Travel'),
(3, 'Shopping');


INSERT INTO expenses(expense_id, user_id, category_id, amount, expense_date)
VALUES
(1, 1, 1, 500.00, '2026-05-10'),
(2, 1, 2, 1200.00, '2026-05-12'),
(3, 2, 3, 2500.00, '2026-05-15');

-- READ Queries
select * from users;
select * from categories;
select * from expenses;

SELECT 
    users.name,
    categories.category_name,
    expenses.amount,
    expenses.expense_date
FROM expenses
JOIN users
ON expenses.user_id = users.user_id
JOIN categories
ON expenses.category_id = categories.category_id;

-- UPDATE Queries

UPDATE users
SET email = 'arbaz123@gmail.com'
WHERE user_id = 1;

UPDATE expenses
SET amount = 1500.00
WHERE expense_id = 2;

-- DELETE Queries
DELETE FROM expenses
WHERE expense_id = 3;

DELETE FROM categories
WHERE category_id = 3;

-- Stored Procedure to Calculate Monthly User Expense

DELIMITER //

CREATE PROCEDURE MonthlyUserExpense(IN uid INT)
BEGIN
    SELECT 
        users.name,
        SUM(expenses.amount) AS TotalMonthlyExpense
    FROM expenses
    JOIN users
    ON expenses.user_id = users.user_id
    WHERE expenses.user_id = uid
    AND MONTH(expenses.expense_date) = MONTH(CURDATE())
    AND YEAR(expenses.expense_date) = YEAR(CURDATE())
    GROUP BY users.name;
END //

DELIMITER ;

-- Execute Procedure
CALL MonthlyUserExpense(1);

-- COMMIT Example
UPDATE expenses SET amount = 5000.00 WHERE expense_id = 1;

-- ROLLBACK Example
START TRANSACTION;

UPDATE expenses
SET amount = 9000.00
WHERE expense_id = 2;

ROLLBACK;