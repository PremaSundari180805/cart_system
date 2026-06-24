const express = require("express");

const router = express.Router();

const db = require("../db");

const createCartTableQuery = `
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1
)
`;

router.post("/", (req,res)=>{

    const { product_id, quantity } =
    req.body;

    db.query(
        createCartTableQuery,
        (createErr) => {
            if(createErr){
                return res.status(500).json(createErr);
            }

            db.query(
                "INSERT INTO cart(product_id,quantity) VALUES(?,?)",
                [product_id,quantity],
                (err,result)=>{

                    if(err){
                        return res.status(500).json(err);
                    }

                    res.json({
                        message:"Added To Cart"
                    });

                }
            );
        }
    );

});

router.delete("/:id", (req, res) => {

    const { id } = req.params;

    db.query(
        createCartTableQuery,
        (createErr) => {
            if(createErr){
                return res.status(500).json(createErr);
            }

            db.query(
                "DELETE FROM cart WHERE id = ?",
                [id],
                (err, result) => {
                    if(err){
                        return res.status(500).json(err);
                    }

                    if(result.affectedRows === 0){
                        return res.status(404).json({
                            message: "Cart item not found"
                        });
                    }

                    res.json({
                        message: "Removed from cart"
                    });
                }
            );
        }
    );
});

router.get("/", (req,res)=>{

    db.query(
        createCartTableQuery,
        (createErr) => {
            if(createErr){
                return res.status(500).json(createErr);
            }

            db.query(
`
SELECT
c.id,
p.name,
p.price,
c.quantity
FROM cart c
JOIN products p
ON c.product_id = p.id
`,
(err,result)=>{

                if(err){
                    return res.status(500).json(err);
                }

                res.json(result);

});
        }
    );
});

module.exports = router;
