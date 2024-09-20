//* Card html' ini ve ürün bilgilerini parametre olarak alacak, Card html' inin içerisinde değişken olarak tanımlanan değerlerin yerine ürünün bilgilerini ekleyecek bir fonksiyon yazalım.

const replaceTemplate = (html, data) => {
  let output = html.replace(/{%PRODUCTNAME%}/, data.productName);

  output = output.replace(/{%PRICE%}/g, data.price);
  output = output.replace(/{%QUANTITY%}/g, data.quantity);
  output = output.replace(/{%IMAGE%}/g, data.image); //*ikinci bir image old. için / / arasına yazdık.
  output = output.replace(/{%ID%}/g, data.id); 
  output = output.replace(/{%NUTRIENTS%}/g, data.nutrients); 
  output = output.replace(/{%DESCRIPTION%}/g, data.description); 
  output = output.replace(/{%FROM%}/g, data.from); 

  //*Eğer ürün organik değilse {notorganic} değişkenş yerine not-organic class'ı ekle
  if (data.organic === false) {
    output = output.replace("{%NOT_ORGANIC%}", "not-organic");
  }

  //*Olşuturduğumuz yeni - güncellenmiş card html' ini döndür
  return output;
};

//replaceTemplate isimindeki fonksiyonu farklı dosyalarda kullanma niyetimiz varsa export etmemiz gerekli
module.exports = replaceTemplate;
