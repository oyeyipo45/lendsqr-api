
CREATE TABLE `users` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NULL UNIQUE,
  `first_name` VARCHAR(255) NULL,
  `last_name` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL UNIQUE,
  `password` VARCHAR(255) NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP);
  
  
CREATE TABLE `wallet` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `wallet_id` VARCHAR(255) NULL UNIQUE,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `balance` INT(45) NULL,
  `currency` VARCHAR(255) NULL,
  FOREIGN KEY (`wallet_id`) REFERENCES users (`username`));


CREATE TABLE `transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `wallet_id` VARCHAR(255) NULL,
 `sender_id` VARCHAR(255) NULL,
 `receiver_id` VARCHAR(255) NULL,
 `transaction_type` VARCHAR(255) NULL,
 `debit_amount` INT(45) NULL,
 `credit_amont` INT(45) NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `currency` VARCHAR(255) NULL);
