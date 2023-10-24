/* birinci asama tiklanılan koltugun rengini degiştir ve tekrar tıklanınca tersine cevir

tıklanılan koltuk tespiti icin container divi cagirma
once contİNER DİVİNE ERİS bu dive olay dineyıcısı ekle
tıklanılan elemanı tespıt et
tespıt ettigin elem. classlist seat varsa onu classselected ekle
toggle yap

2* eger secili koltuk yoksa info yazısı kalkacak varsa geri gelecek
info yazisina eris
secili koltuk olup olmadigini kontrol et
varsa textin displayını degistır

 3-secilil koltuk sayısını ve toplam tutari bilgi yazisinda gonderme
 --seçili koltuk sayısını aktarmakı için count classlı divi çek
 --bu divin innerText ine selectedSeatsCount ver
 --film seçme kısmını filmlerin fiyat bilgisi için çek
 --ve toplam sayı ile bu değeri çarp
 --amount classlı spana ekle
*/

const container = document.querySelector(".container");
const infoText = document.querySelector(".infoText");
// console.log(container);
const select = document.getElementById("movie");
// selectin icindeki value degeri filmin fiyatina esit
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
//console.log(amount)
const seats = document.querySelectorAll(".seat:not(.reserved)");

//veri tabanında veri okuma

const getSeatsFromDatabase = () => {
  const dbSelectSeats = JSON.parse(localStorage.getItem("selectedSeatIndex"));
  const dbSelectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));

  select.selectedIndex = dbSelectedMovie;
  if (dbSelectSeats !== null && dbSelectSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
};

//veri tababnına kayıt etme
const saveSeatsToDatabase = (index) => {
  localStorage.setItem("selectedSeatIndex", JSON.stringify(index));
  localStorage.setItem("selectedMovie", JSON.stringify(select.selectedIndex));
};

getSeatsFromDatabase();

// tutar hesaplama fonksiyonu
const priceCalculator = () => {
  // koltukların sıra numarasi tespit işlemleri
  const seatsArray = [];

  seats.forEach((seat) => {
    seatsArray.push(seat);
  });

  const selectedSeats = container.querySelectorAll(".seat.selected");
  const selectedSeatsArray = [];

  selectedSeats.forEach((selectedSeat) => {
    selectedSeatsArray.push(selectedSeat);
  });

  let selectedSeatIndex = selectedSeatsArray.map((selectedSeat) => {
    return seatsArray.indexOf(selectedSeat);
  });

  //toplam secili koltuk sayısını bulma
  const selectedSeatsCount =
    container.querySelectorAll(".seat.selected").length;
  const moviePrice = select.value;
  //secili koltuk varsa
  if (selectedSeatsCount > 0) {
    //eger varsa textin still ozelligini degistirme
    infoText.style.display = "block";
  } else {
    infoText.style.display = "none";
  }
  //toplam sayılı koltuk sayısını html gonderme
  count.innerText = selectedSeatsCount;
  //toplam tutari html onderme
  amount.innerText = moviePrice * selectedSeatsCount;
  saveSeatsToDatabase(selectedSeatIndex);
};
priceCalculator();

//===hesaplama islemleri===

container.addEventListener("click", (pointerEvent) => {
  //   console.log(pointerEvent.target.offsetparent);
  const clickedSeat = pointerEvent.target.offsetParent;

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  priceCalculator();
});

select.addEventListener("change", () => {
  priceCalculator();
});
