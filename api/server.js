const express = require("express");
const cors = require("cors");
const kayitOlValidation = require("../middleware/kayit-ol");

const bcrypt = require('bcrypt');
const saltRounds = 10;


const server = express();

server.use(cors());
server.use(express.json());

const users = [];

server.get("/api/kullanicilar", (req, res) => {
    return res.status(200).json(users.map((item) => {
        return {
            kullaniciadi: item.kullaniciadi
        }
    }));
});

server.post("/api/kullanicilar/kayitol", kayitOlValidation, async  (req, res) => {
   const hashedPassword = await bcrypt.hash(req.body.sifre, saltRounds);
   const user = {
    kullaniciadi: req.body.kullaniciadi,
    sifre: hashedPassword
};

    users.push(user);
    return res.status(201).json(user);
});

server.post("/api/kullanicilar/giris", async (req, res) => {
    const {kullaniciadi, sifre} = req.body;
   
    const user = users.find((item) => item.kullaniciadi === kullaniciadi);
    if(!user) {
        return res.status(401).json({error: "Kullanıcı adı veya şifre hatalı."})
     } else {
       const isMatch = await bcrypt.compare(sifre, user.sifre);
       if(isMatch) {
        return res.status(200).json({message:"Hoşgeldin!"})
       } else {
        return res.status(401).json({error: "Kullanıcı adı veya şifre hatalı."})
       }
     }

});


module.exports = server;