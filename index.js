const express = require("express");

// json 被require進來後，會變成物件
// const singers = require("./singers.json");
// console.log(singers);

// require 時，加入{} 會單抓陣列
const { singers } = require("./singers.json");
console.log(singers);

const app = express();

app.get("/", (req, res) => {
    res.send("網站主頁");
})

app.get("/singer/:id.html", (req, res) => {
    //讀出url內的id
    const { id } = req.params;
    //搜尋url內的id 是否符合json檔內的id
    // 用filter 去查詢的話，即使只有一筆一樣會回傳陣列, find會回傳單筆資料
    const result = singers.find(singer => {
        if (singer.id == id) {  // 前方為json檔案內的singer.id , 後方的id為url :id 進行比對
            return true
        }
    });
    console.log(result);

    if (!result) {
        res.send("<h1>404 - 找不到歌手</h1>");
        return;
    }
    res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>歌手：${result.singer_name}</title>
    <style>
        img {
            width: 100%;
        }
    </style>
</head>

<body>
    <h1>${result.singer_name}</h1>
    <h3>${result.singer_id}</h3>
    <img src="${result.singer_img}" alt="">
</body>

</html>`);
})

app.all("*", (req, res) => {
    res.send("404");
})

app.listen(3000, () => {
    console.log("running at http://localhost:3000");
})