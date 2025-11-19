const input = document.getElementById("cityInput");
const API_KEY = "e8934a5a43664f4fa9a201032251911";

async function getWeather(city = "Cairo") {
  if (!city) return;

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`
    );
    if (!res.ok) throw new Error();

    const data = await res.json();

    data.forecast?.forecastday.forEach((day, i) => {
      const date = new Date(day.date);
      document.getElementById(`day${i + 1}`).innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <h6>${date.toLocaleDateString("en-US", { weekday: "long" })}</h6>
          <h6>${
            i === 0
              ? "Today"
              : date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
          }</h6>
        </div>
        <h6>${data.location.name}, ${data.location.country}</h6>
        <img class="w-25 my-2" src="https:${day.day.condition.icon}" alt="${
        day.day.condition.text
      }">
        <h3>${day.day.avgtemp_c}°C</h3>
        <p>${day.day.condition.text}</p>
        <div class="d-flex justify-content-between">
          <span><img src="./Images/imgi_3_icon-umberella.png"> ${
            day.day.daily_chance_of_rain
          }%</span>
          <span><img src="./Images/imgi_4_icon-wind.png"> ${
            day.day.maxwind_kph
          } km/h</span>
          <span><img src="./Images/imgi_5_icon-compass.png"> ${
            day.astro.sunrise
          }</span>
        </div>
      `;
    });

    document.getElementById("errorMsg")?.classList.add("d-none");
  } catch {
    const err = document.getElementById("errorMsg");
    if (err) {
      err.textContent = "City not found! Try again.";
      err.classList.remove("d-none");
    }
  }
}

navigator.geolocation.getCurrentPosition(
  (pos) => getWeather(`${pos.coords.latitude},${pos.coords.longitude}`),
  () => getWeather()
);

input.addEventListener("input", () => getWeather(input.value.trim()));
input.addEventListener(
  "keypress",
  (e) => e.key === "Enter" && getWeather(input.value.trim())
);
