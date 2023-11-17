import "./App.css";
import React from "react"; //state yi kllanmak için import ettik
function Arama({ aramaMetni, onSearch }) {
  //arama çubuğunun çalışmasını sağlıyıcağız
  //input ile ne zaman etkileşim yapsak etki etsin gibi bağlantı yapmasak çalışmazdı (onChange={handleChange})
  /* function handleChange(event){
    //setAramaMetni(event.target.value);
    //console.log(event);
    //console.log(event.target.value);
   // props.onSearch(event);
  }*/

  //handleChange arama metnini güncelliyor
  return (
    //kapsayıcı birleşen olmadan bir birleşen oluşturamayız(div)// ONCHANGE ARAMA YAPMAMIZI SAĞLIYOR
    <div>
      <label htmlFor="arama">Ara: </label>
      <input id="arama" type="text" onChange={onSearch} value={aramaMetni} />
      <p></p>
    </div>
  );
}
function Yazi({ id, url, baslik, yazar, yorum_sayisi, puan }) {
  return (
    <li key={id}>
      <span>
        <a href={url}>{baslik}</a>,
      </span>
      <span>
        <b>Yazar:</b> {yazar},{" "}
      </span>
      <span>
        <b>Yorum Sayısı:</b> {yorum_sayisi},{" "}
      </span>
      <span>
        <b>Puan:</b> {puan}
      </span>
    </li>
  );
}
//Side Effects de önemli
//yani bir birleşen oluşturucaz
// PROPS TANIMI ÇIKABİLİR
function Liste(props) {
  //PROPS ÖNEMLİ= VERİ İLETİŞİMİ İÇİN PROPS(VERİ DEĞİŞİMİ İÇİN=STATE)
  //props tanımlıyoruz(Liste içindeki ile buradaki isim aynı olmalı)
  return (
    //dönecek bütün elemanlar burada ekranda görünütlenecek
    // liste oluşturmak için(ul) kullanılıyor
    <ul>
      {props.yazilar.map(function (yazi) {
        return <Yazi key={yazi.id} {...yazi} />;
      })}
      {""}
    </ul>
  );
}
function App() {
  //kök birleşen App tir
  //state yazıcaz dizi şeklinde tanımlanır (React.useState= ilk değeri atadık)
  const [aramaMetni, setAramaMetni] = React.useState(
    localStorage.getItem("aranan") || "React"
  ); //LİFTİNG STATE YAPTIK BUNU
  //LİFTİNG STATE KURALI ÖNEMLİ
  //aRAMADAN VERİYİ ALIP FİLTRELİYİP GERİDEN ARAMAYA ATICAZ
  const yaziListesi = [
    {
      //dizi
      baslik: "React Öğreniyorum",
      url: "www.sdu.edu.tr",
      yazar: "Sinan Yüksel",
      yorum_sayisi: 3,
      puan: 4,
      id: 0,
    },
    {
      baslik: "Web Teknolojileri ve Programlama",
      url: "wwww.google.com.tr",
      yazar: "Asım Yüksel",
      yorum_sayisi: 2,
      puan: 5,
      id: 1,
    },
    {
      baslik: "HTML ",
      url: "wwww.github.com.tr",
      yazar: "Yiğit Aktürk",
      yorum_sayisi: 0,
      puan: 3,
      id: 2,
    },
    {
      baslik: "Javascript",
      url: "wwww.google.com.tr",
      yazar: "Turgut Muradlı",
      yorum_sayisi: 9,
      puan: 7,
      id: 3,
    },
  ];
  //filter(filtrelememizi sağlıyor)
  //includes(bir stact içerisinde var mı)
  //Burada dizi filtreledik(AŞAĞIDA LİSTEDE ARAMA YAPTIK)
  const arananYazilar = yaziListesi.filter(function (yazi) {
    return (
      yazi.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      yazi.yazar.toLowerCase().includes(aramaMetni.toLowerCase())
    );
  });

  //STATE NİN ANLAMI SINAVDA GELEBİLİR
  //handle search fonksiyonunu tanımladık
  //1.Aşama Callback metodu oluşturma
  function handleSearch(event) {
    setAramaMetni(event.target.value);
    //localStorage.setItem("aranan",event.target.value);
    // console.log(event.target.value);
  }

  React.useEffect(() => {
    localStorage.setItem("aranan", aramaMetni);
  }, [aramaMetni]); //eğer boş olursa[] içi bir kere tetiklenir

  //props a metodda geçırebiliyoruz(handleSearch)
  return (
    //amaç bunun(App içerisinde) içerisindeki kodu azaltmak
    //listeyi çağırdık
    //Liste içerisine props tanımlamaya çalışıyoruz
    // <div> yerine <> kullanılabilir
    <div>
      <h1>Yazılar</h1>
      <Arama aramaMetni={aramaMetni} onSearch={handleSearch} />
      <strong>{aramaMetni} aranıyor...</strong>
      <hr />
      <Liste yazilar={arananYazilar} />
    </div>
  );
}
export default App;
//sunumlardan sorumluyuz kodlar ve örneklerde dahil 10 soru genelde test,klasik,boşluk doldurma
//react tarafınla ilgili açıklamalı sorular (props ne , state ne)
//bazen ufak bir kod sorusu yada senaryo verip javascript yazmamızı ister

//ödev:küçük büyük harf farketmeksizin yazılsın listeye birkaç tane eleman ekle(4)
//yazar ifadesini de arasın
//yayınlayıp oraya at github linkini gönder(depoyu) readme ye linki eklicez
//Cumartesi akşamına kadar
