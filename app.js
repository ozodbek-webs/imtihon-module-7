const fs = require("fs"),
    express = require("express"),
    fileupload = require("express-fileupload"),
    app = express(),
    path = require("path"),
    product = JSON.parse(fs.readFileSync('./Data/product.json', "utf-8")),
    events = JSON.parse(fs.readFileSync('./Data/ishlarRo\'yxati.json', "utf-8")),
    categories = JSON.parse(fs.readFileSync('./Data/categories.json', "utf-8"))
app.use(express.json())
app.use(fileupload())
let a = {
    id: 1,
    method: "GET",
    event: "GET to smartfone"
}
function filter(a) {
    // console.log(product);
    // console.log("mjbjhb");
    // console.log(product.filter(el => el.categories == a));
    return product.filter(el => el.categories == a)
}
// GET

b = {
    id: 3,
    name: "noutbuk"
}

app.get("/categories", (req, res) => {
    res.send(categories)


    a.id = events.length ? events[events.length - 1].id * 1 + 1 : 1;
    a.event = "GET to categories"
    events.push(a)
    fs.writeFileSync("./Data/ishlarRo\'yxati.json", JSON.stringify(events, null, 4))
})
app.get("/category/:id", (req, res) => {
    let id = req.params.id;
    const find = categories.find((b) => b.id == id);
    console.log(id, find);
    if (find) {
        res.send(categories[req.params.id - 1])


        a.id = events.length ? events[events.length - 1].id * 1 + 1 : 1;
        a.event = "GET to /category/" + id
        events.push(a)
        fs.writeFileSync("./Data/ishlarRo\'yxati.json", JSON.stringify(events, null, 4))
    } else {
        res.send("Bunday idli tavar yoq")
    }
})
app.post("/categories", (req, res) => {
    if (req.body.name) {
        b.name = req.body.name
        b.id = categories.length ? categories[categories.length - 1].id * 1 + 1 : 1;
        categories.push(b)
        res.send(categories)
        fs.writeFileSync("./Data/categories.json", JSON.stringify(categories, null, 4))





        a.id = events.length ? events[events.length - 1].id * 1 + 1 : 1;
        a.event = "POST to /categories"
        a.method = "POST"
        events.push(a)
        fs.writeFileSync("./Data/ishlarRo\'yxati.json", JSON.stringify(events, null, 4))




    } else {
        res.end("Xamma malumotni kiriting")
    }
})

app.put("/category/:id", (req, res) => {
    let id = req.params.id - 1;
    categories[id]["name"] = req.body.name ? req.body.name : categories[id]["name"];
    res.send(categories[id])
})

app.delete("/category/:id", (req, res) => {
    let id = req.params.id;
    const find = categories.find((b) => b.id == id);
    if (!find) {
        res.jsonp("Yemadi").status(404);
    }
    else {
        let d = (categories.filter((b) => b.id != id));
        fs.writeFileSync("./Data/categories.json", JSON.stringify(d, null, 4));
        res.jsonp("Yedi").json(200)

        a.id = events.length ? events[events.length - 1].id * 1 + 1 : 1;
        a.event = "DELETE to /category" + id
        a.method = "DELETE"
        events.push(a)
        fs.writeFileSync("./Data/ishlarRo\'yxati.json", JSON.stringify(events, null, 4))
    }
})
// wfg
// 
// wtg
app.get("/smartfon", (req, res) => {
    let phones = filter("smartfon")
    res.send(phones)

    a.id = events.length ? events[events.length - 1].id * 1 + 1 : 1;
    events.push(a)
    console.log(events);
    fs.writeFileSync("./Data/ishlarRo\'yxati.json", JSON.stringify(events, null, 4))
})
app.get("/holodilnik", (req, res) => {
    let phones = filter("holodilnik")
    res.send(phones)


    
    a.id = events.length ? events[events.length - 1].id * 1 + 1 : 1;
    a.event = "GET to holodilnik"
    events.push(a)
    fs.writeFileSync("./Data/ishlarRo\'yxati.json", JSON.stringify(events, null, 4))
})
app.get("/noutbuk", (req, res) => {
    let phones = filter("noutbuk")
    res.send(phones)


    a.id = events.length ? events[events.length - 1].id * 1 + 1 : 1;
    a.event = "GET to noutbuk"
    events.push(a)
    fs.writeFileSync("./Data/ishlarRo\'yxati.json", JSON.stringify(events, null, 4))
})
app.get("/product/:id", (req, res) => {
    let id = req.params.id;
    const find = product.find((b) => b.id == id);
    console.log(id, find);
    if (find) {
        res.send(product[req.params.id - 1])

        a.id = events.length ? events[events.length - 1].id * 1 + 1 : 1;
        a.event = "GET to /product/" + id
        events.push(a)
        fs.writeFileSync("./Data/ishlarRo\'yxati.json", JSON.stringify(events, null, 4))
    } else {
        res.send("Bunday idli tavar yoq")
    }
})

// POST
app.post("/product", (req, res) => {
    req.body.id = product.length ? product[product.length - 1].id * 1 + 1 : 1;
    if (req.body.name && req.body.img && req.body.categories && req.body.price && req.body.description) {
        product.push(req.body)
        res.send(product)
        fs.writeFileSync("./Data/product.json", JSON.stringify(product, null, 4))
    } else {
        res.end("Xamma malumotni kiriting")
    }
    // // // Taxminiy kiritilishi kerk malumot =👇
    // {
    // "name":"nokia",
    // "img":"https://www.google.com/imgres?imgurl=https%3A%2F%2Ffrankfurt.apollo.olxcdn.com%2Fv1%2Ffiles%2F55tajnsx5nlx-UZ%2Fimage%3Bs%3D1023x1280&imgrefurl=https%3A%2F%2Fwww.olx.uz%2Fd%2Fobyavlenie%2Fnokia-1202-sotiladi-ID38vj5.html&tbnid=PIVjcNn6V6jQpM&vet=12ahUKEwiCu9qE95_9AhXzDBAIHSx-DWAQMygGegUIARDPAQ..i&docid=FVGO-zA5QvPoYM&w=1023&h=1280&q=nokia%201202&ved=2ahUKEwiCu9qE95_9AhXzDBAIHSx-DWAQMygGegUIARDPAQ",
    // "price":300,
    // "categories":"smartfon",
    // "description":"lefahbvjkbefvkjbh"
    // }

    a.id = events.length ? events[events.length - 1].id * 1 + 1 : 1;
    a.event = "POST to /product"
    a.method = "POST"
    events.push(a)
    fs.writeFileSync("./Data/ishlarRo\'yxati.json", JSON.stringify(events, null, 4))
})
// PUT
app.put("/product/:id", (req, res) => {
    let id = req.params.id - 1;
    if (!req.body.name && !req.body.img && !req.body.categories && !req.body.price && !req.body.description) {
        res.send("Iltimos name yoki img yoki price yoki categories yoki description larni to'ldiring")
    } else {
        product[id]["name"] = req.body.name ? req.body.name : product[id]["name"];
        product[id]["img"] = req.body.img ? req.body.img : product[id]["img"];
        product[id]["price"] = req.body.price ? req.body.price : product[id]["price"];
        product[id]["categories"] = req.body.categories ? req.body.categories : product[id]["categories"];
        product[id]["description"] = req.body.description ? req.body.description : product[id]["description"];
        fs.writeFileSync("./Data/product.json", JSON.stringify(product, null, 4))
        res.send(product[id])


        a.id = events.length ? events[events.length - 1].id * 1 + 1 : 1;
        a.event = "PUT to /product" + id
        a.method = "PUT"
        events.push(a)
        fs.writeFileSync("./Data/ishlarRo\'yxati.json", JSON.stringify(events, null, 4))
    }
})
app.delete("/product/:id", (req, res) => {
    let id = req.params.id;
    const find = product.find((b) => b.id == id);
    if (!find) {
        res.jsonp("Yemadi").status(404);
    }
    else {
        let d = (product.filter((b) => b.id != id));
        fs.writeFileSync("./Data/product.json", JSON.stringify(d, null, 4));
        res.jsonp("Yedi").json(200)


        a.id = events.length ? events[events.length - 1].id * 1 + 1 : 1;
        a.event = "DELETE to /product" + id
        a.method = "DELETE"
        events.push(a)
        fs.writeFileSync("./Data/ishlarRo\'yxati.json", JSON.stringify(events, null, 4))

    }
})
// http://localhost:5000
app.listen(5000, () => console.log("Running : http://localhost:5000"))