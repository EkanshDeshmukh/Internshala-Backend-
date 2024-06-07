// SDK initialization




var ImageKit = require("imagekit");
require('dotenv').config();
exports.initImageKit = function () {
    var imagekit = new ImageKit({
        publicKey: process.env.PUBLICKEY_IMAGEKIT,
        privateKey: process.env.PRIVATEKEY_IMAGEKIT,
        urlEndpoint: 'https://ik.imagekit.io/zvxja9lus'
    });

    return imagekit;
};

 