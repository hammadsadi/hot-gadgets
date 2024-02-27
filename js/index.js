async function getPhones(searchText) {
  let res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  let phones = await res.json();
  showData(phones.data);
}

getPhones("iphone");

// Show data
let showData = (phones) => {
  //  Get Parent Element
  let phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  //   Show All Button Disable and Enable
  let showAllBtn = document.getElementById("show-all-btn");
  if (phones.length > 10) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }
  //   Show Specific Data
  phones = phones.slice(0, 10);

  phones.forEach((phone) => {
    // Create Element
    let phoneSingle = document.createElement("div");
    phoneSingle.classList = "card border p-6";
    // Set Inner Html
    phoneSingle.innerHTML = `
    <div class="">
    <figure class="p-10 bg-[#0D6EFD0D]">
      <img
        src="${phone.image}"
        alt="Shoes"
        class="w-2/3"
      />
    </figure>
  </div>
  <div>
    <div class="flex flex-col justify-center items-center">
      <h2 class="text-2xl font-bold my-4">${phone.phone_name}</h2>
      <p class="text-center">
        If a dog chews shoes whose shoes does he choose?
      </p>
      <h4 class="my-3 text-lg font-bold">$999</h4>
      <button
        class="btn bg-[#0D6EFD] text-white hover:bg-[#0D6EFD] w-fit"
      >
        Show Details
      </button>
    </div>
  </div>
    
    `;
    phonesContainer.appendChild(phoneSingle);
    console.log(phone);
  });
  loadingHamdle(false);
};

//  Search Data
let searchdata = () => {
  loadingHamdle(true);
  let searchFiled = document.getElementById("search-filed");
  let searchFiledValue = searchFiled.value;
  getPhones(searchFiledValue);
};

let loadingHamdle = (status) => {
  let loader = document.getElementById("loader");
  if (status) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};
