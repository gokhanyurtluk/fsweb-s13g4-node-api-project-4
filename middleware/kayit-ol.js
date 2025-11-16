const kayitOlValidation = (req, res, next) => {
    const {kullaniciadi, sifre} = req.body ;
    if(kullaniciadi && sifre) {
       next(); 
    } else {
        return res.status(400).json({error: "Kullanıcı adı ve şifre boş olamaz."})
    }
}

module.exports = kayitOlValidation;