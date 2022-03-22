# lendsqr api

## Installing
To install run `npm install`

## 🎈 Usage <a name="usage"></a>
To run `npm run dev`

#### Creating the database

Create a `lendsqrApp` table in Mysql Workbench using the sql below

```sql
CREATE SCHEMA `lendsqrApp`;


CREATE TABLE `lendsqrApp`.`users` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NULL UNIQUE,
  `first_name` VARCHAR(255) NULL,
  `last_name` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL UNIQUE,
  `password` VARCHAR(255) NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP);
  
  
CREATE TABLE `lendsqrApp`.`wallet` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `wallet_id` VARCHAR(255) NULL UNIQUE,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `balance` INT(45) NULL,
  `currency` VARCHAR(255) NULL,
  FOREIGN KEY (`wallet_id`) REFERENCES users (`username`));


CREATE TABLE `lendsqrApp`.`transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `wallet_id` VARCHAR(255) NULL,
 `sender_id` VARCHAR(255) NULL,
 `receiver_id` VARCHAR(255) NULL,
 `transaction_type` VARCHAR(255) NULL,
 `debit_amount` INT(45) NULL,
 `credit_amount` INT(45) NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `currency` VARCHAR(255) NULL);

```

#### Setting up the project


Use this template

Remember to copy the `.env.example` file, and rename the copied file to `.env`. In the `.env` file add the relevant host, database name, database user and pasword to your own local database. If you are unsure of these things then select your database in the Mysql Workbench. Now press `Database` -> `Manage Connections...`. Here you can see everything you need except the password. If you forgot that, reset it.  

Now you can `cd` into the project and run `npm install` and then `npm run dev`
