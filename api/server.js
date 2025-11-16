const express = require("express");
const cors = require("cors");
const kayitOlValidation = require("../middleware/kayit-ol");

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

server.post("/api/kayitol", kayitOlValidation, (req, res) => {
   const user = {
    kullaniciadi: req.body.kullaniciadi,
    sifre: req.body.sifre
};
    users.push(user);
    return res.status(201).json(user);
});

server.post("/api/kullanicilar/giris", (req, res) => {
    const {kullaniciadi, sifre} = req.body;
    const user = users.find((item) => item.kullaniciadi === kullaniciadi && item.sifre === sifre);
    if(user) {
        return res.status(200).json({message: "Hoşgeldin!"});
    } else {
        return res.status(401).json({error: "Kullanıcı adı veya şifre hatalı."})
    }

})


module.exports = server;