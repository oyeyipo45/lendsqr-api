const express = require("express");
const router = express.Router();
const knex = require("../database");
const { v4: uuidv4 } = require('uuid');


router.get("/", async (req, res) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const users = await knex("users");

   
    res.json({data: users, status_code: 200, success: true});
  } catch (error) {
    throw error;
  }
});


router.post('/create-user', async (req, res) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const {
      username,
      frst_name,
      last_name,
      email,
      password,
    } = req.body
    

    const user_data = {
      user_id: uuidv4(),
      username,
      frst_name,
      last_name,
      wallet_id: uuidv4(),
      email,
      password
    };

    const wallet_data = {
      wallet_id: user_data.wallet_id,
      created_date,
      balance: 0,
      currency: 'NGN',
    };

    
    const user = await knex('users').insert({...user_data});
 

    res.json({ data: user, status_code: 200, success: true });
  } catch (error) {
    throw error;
  }
});


router.post('/fund-wallet', async (req, res) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const { wallet_id, amount } = req.body;

    const wallet = await knex('wallet').where({ wallet_id: wallet_id });

    console.log(wallet, "dfdfdfd")

    if (wallet.length === 0) {
      res.json({ data: {}, status_code: 400, success: false });
    } else {

      const updated_wallet = await knex('wallet').where({ wallet_id: wallet_id }).update({ balance: amount });

      res.json({ data: updated_wallet, status_code: 200, success: true });
    }
    
  } catch (error) {
    throw error;
  }
});



module.exports = router;
