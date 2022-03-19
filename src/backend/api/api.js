const express = require("express");
const router = express.Router();
const knex = require("../database");
const bcrypt = require('bcrypt');
const jwtGen = require('../../../utils/jwtgen');
const validate = require("../../../utils/validate");


router.get("/users", async (req, res, next) => {
  try {
    
    const users = await knex("users");

   
    res.json({data: users, status_code: 200, success: true});
  } catch (error) {
    throw error;
  }
});


router.post('/register', validate, async (req, res, next) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;

    const user_data = {
      username,
      first_name,
      last_name,
      email,
    };

    const availableUser = await knex('users').select().where({ email: email }).orWhere({username : username});

    if (availableUser.length > 0) {
      return res.json({ status_code: 400, success: false, message: 'A user with this email or username already exist' });
    }

    // Hashing user's password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await knex('users').insert({ ...user_data, password: bcryptPassword });

    const foundUser = await knex('users').select().where({ username: username });

    if (foundUser) {
      const data = {
        wallet_id: foundUser[0].username,
        balance: 0,
        currency: 'NGN',
      };

      const wallet = await knex('wallet').insert({ ...data });

      //Generating a JWT token
      const token = jwtGen(foundUser[0].username);

      return res.json({ data:{ token : token}, status_code: 200, success: true, message: 'User created succesfully' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/fund-wallet', async (req, res) => {
  try {
    
    const { username, amount } = req.body;


     const wallet = await knex('wallet').where({ wallet_id: username });

      if (wallet.length === 0) {
        res.json({ data: {}, status_code: 400, success: false, message :"user does not exist" });
      } else {

        const updated_wallet = await knex('wallet').where({ wallet_id: username }).update({ balance: amount });

        const new_balance = await knex('wallet').select().where({ wallet_id: username });

        res.json({ data: new_balance, status_code: 200, success: true, message : "Wallet funded sucessfully" });
      }
  } catch (error) {
    throw error;
  }
});


router.post('/transfer', async (req, res) => {
  try {
    // Destructure request body
    const { sender_username, receiver_username, amount } = req.body;

    // check receiver wallet exists
    const receiver_wallet = await knex('wallet').where({ wallet_id: receiver_username });

    // Throw error is user with entered username does not exist
    if (receiver_wallet.length === 0) {
      res.json({ data: {}, status_code: 400, success: false, message: 'A user with this username does not exist' });
    }

    // Check wallet for sufficient balance
    const sender_wallet_balance_validation = await knex('wallet').where({ wallet_id: sender_username }).having('balance', '>', amount);

    // Throw error is user does not exist
    if (sender_wallet_balance_validation.length === 0) {
      res.json({ data: {}, status_code: 400, success: false, message: 'Insuffucient funds' });
    } else {
      const sender_old_balance = await knex('wallet').select().where({ wallet_id: sender_username });

      // Get wallet balance
      const sender_balance = sender_old_balance[0].balance || 0
      const receiver_balance = receiver_wallet[0].balance || 0

      // Make transaction
      const sender_new_balance = sender_balance - amount;
      const receiver_new_balance = receiver_balance + amount;

      // Updae balance
      const updated_sender_wallet = await knex('wallet').where({ wallet_id: sender_username }).update({ balance: sender_new_balance });

      const updated_receiver_wallet = await knex('wallet').where({ wallet_id: receiver_username }).update({ balance: receiver_new_balance });

      // Return new balance
      const debited_balance = await knex('wallet').select().where({ wallet_id: sender_username });

      const credited_balance = await knex('wallet').select().where({ wallet_id: receiver_username });

      console.log(receiver_balance, 'sender_balance');
      res.json({ data: debited_balance, status_code: 200, success: true });
    }
   


    // if (wallet.length === 0) {
    //   res.json({ data: {}, status_code: 400, success: false });
    // } else {
    //   const updated_wallet = await knex('wallet').where({ wallet_id: wallet_id }).update({ balance: amount });

    //   const new_balance = await knex('wallet').select().where({ wallet_id: wallet_id });

    //   res.json({ data: new_balance, status_code: 200, success: true });
    // }
  } catch (error) {
    throw error;
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await knex('users').select('first_name', 'last_name', 'username', 'email', 'password').where({ email: email });

    console.log(user, 'user');
    if (user.length === 0) {
      return res.status(401).json({ success: false, status_code: 400, message: 'Invalid Credential(s)' });
    }
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Incorrect Password' });
    }
    const token = jwtGen(user[0].id);

   return res.json({ data: { ...user[0] , token }, status_code: 200, success: true });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
