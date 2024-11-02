



export async function snow() {
    const snow = document.querySelector(".snow");

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.style.top = `${Math.random() * 1}vh`;
  snowflake.style.left = `${Math.random() * 100}%`;
  snowflake.style.animationDuration = `${Math.random() * 10 + 10}s`;
  snow.appendChild(snowflake);
}

setInterval(createSnowflake, 800);
}
