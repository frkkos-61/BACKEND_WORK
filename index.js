//! API: gelen istekleri izler ve isteklere cevap gönderir.

//* gerekli modülleri çağırdık
const http = require("http");
const fs = require("fs");
const url = require("url");

//*Kendi oluşturduğumuz fonksiyonu import ediyoruz.
const replaceTemplate = require("./modüles/replaceTemplate.js");

/**
 * createServer(), verdiğimiz dinleyici fonksiyonu api' a her istek geldiğinde tetikler.
 * Bu fonksiyon 2 parametre alır.
 * 1) request > istek ile alakalı verileri içeren nesne
 * 2) response > cevap göndermemizi sağlayacak nesne
 

 * Bu fonksiyon içerisinde gelen isteğe göre cevap gönderilir.

 * ? Routing
 * 
 * API' a gelen isteğin hangi endpoint (uç nokta/yol)' e geldiğini tespit edip ona göre farklı cevaplar gönderme işlemine routing denir.
 * Routing için client' ın hangi yola ve hangi http methodu ile istek attığını bilmemiz gerekiyor.
 */

//html şablon verileri
let tempOverview = fs.readFileSync("./templates/overview.html", "utf-8");
let tempProduct = fs.readFileSync("./templates/product.html", "utf-8");
let tempCard = fs.readFileSync("./templates/card.html", "utf-8");

//*Json dosyasındaki sayı kadar olmasını istiyoruz, json dosyasına erişeceğiz.
let jsonData = fs.readFileSync("./dev-data/data.json", "utf-8");

//*Json verisini js formatına çevirmek:
const data = JSON.parse(jsonData);

const server = http.createServer((request, response) => {
  console.log("❤️ API'a istek geldi", );  

  //* İstek url' ini parçalara ayırdık
  const {query,pathname} = url.parse(request.url, true);

  const sonuc = url.parse("/product?id=4",true);
  console.log(sonuc);

  //* Gelen isteğin url' ine göre farklı cevap gönder
  switch (pathname) {
    case "/overview":
      //*Meyveler disinindeki eleman sayısı kadar kart oluştur.
      const cards = data.map((el) => replaceTemplate(tempCard, el));

      //*Anasayfa html' inde kartlar alanına hart html ekleyeceğiz
      tempOverview = tempOverview.replace("{%PRODUCT_CARDS%}", cards);

      return response.end(tempOverview);

    case "/product":
      // 1) dizideki doğru elemanı bul
      const item = data.find((item) => item.id == query.id);

      // 2) detay sayfasının html' ini bulunan elemanın verilerine göre güncelle
      const output = replaceTemplate(tempProduct,item);

      // 3) güncel html'i client'a gönder
      return response.end(output);

    default:
      return response.end("<h1>Tanimlanmayan Yol</h1>");
  }
});

//Bir dinleyici oluşturup hangi porta gelen isteklerin dinleneceğini söylemeliyiz
server.listen(6161, "127.0.0.1", () => {
  console.log("😍 IP adresinin 6161 portuna gelen istekler dinlenmeye alındı");
});
