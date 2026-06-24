const express = require("express");

const router = express.Router();

const db = require("../db");

const sampleProducts = [
    ["Classic Cotton T-Shirt", 799],
    ["Slim Fit Jeans", 1899],
    ["Wireless Earbuds", 2499],
    ["Leather Wallet", 999]
];

router.post("/", (req, res) => {

    const { name, price } = req.body;

    db.query(
        "INSERT INTO products(name,price) VALUES(?,?)",
        [name, price],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Product Added"
            });

        }
    );

});

router.get("/", (req,res)=>{

    db.query(
        "SELECT * FROM products",
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            if(result.length > 0){
                return res.json(result);
            }

            db.query(
                "INSERT INTO products(name,price) VALUES ?",
                [sampleProducts],
                (insertErr) => {
                    if(insertErr){
                        return res.status(500).json(insertErr);
                    }

                    db.query(
                        "SELECT * FROM products",
                        (refetchErr, seededResult) => {
                            if(refetchErr){
                                return res.status(500).json(refetchErr);
                            }

                            res.json(seededResult);
                        }
                    );
                }
            );

        }
    );

});
module.exports = router;
