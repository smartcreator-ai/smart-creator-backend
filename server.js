const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Test Route
app.get("/", (req, res) => {

    res.send("Smart Creator Backend Running 🚀");

});


// Gemini API Route
app.post("/generate-script", async (req, res) => {

    try {

        const { prompt } = req.body;


        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]

                })

            }
        );


        const data = await response.json();


        if(data.candidates){

            res.json({

                result:
                data.candidates[0]
                .content
                .parts[0]
                .text

            });

        }else{

            res.json({

                error: data

            });

        }


    } catch(error) {


        res.status(500).json({

            error: error.message

        });


    }

});



// Server Start

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        `Smart Creator Backend Running on Port ${PORT}`
    );

});
