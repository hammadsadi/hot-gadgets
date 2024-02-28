async function getPhones(searchText, isShowAllData) {
  let res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  let phones = await res.json();
  showData(phones.data, isShowAllData);
}

// Show data
let showData = (phones, isShowAllData) => {
  //  Get Parent Element
  let phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  //   Show All Button Disable and Enable
  let showAllBtn = document.getElementById("show-all-btn");
  if (phones.length > 10 && !isShowAllData) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }
  //   Show Specific Data

  if (!isShowAllData) {
    phones = phones.slice(0, 10);
  }

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
        class="btn bg-[#0D6EFD] text-white hover:bg-[#0D6EFD] w-fit" onclick="getSingledata('${phone.slug}')"
      >
        Show Details
      </button>
    </div>
  </div>
    
    `;
    phonesContainer.appendChild(phoneSingle);
  });
  loadingHandle(false);
};

//  Search Data
let searchdata = (isShowAllData) => {
  loadingHandle(true);
  let searchFiled = document.getElementById("search-filed");
  let searchFiledValue = searchFiled.value;
  getPhones(searchFiledValue, isShowAllData);
};

let loadingHandle = (status) => {
  let loader = document.getElementById("loader");
  if (status) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

//  Handle Show All Btn
let handleShowAllButton = () => {
  searchdata(true);
};

// Get Single Data
let getSingledata = async (slug) => {
  let singleRes = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  let singleData = await singleRes.json();
  showDetailsModal(singleData.data);
};

//  Show Modal
let showDetailsModal = (phone) => {
  console.log(phone);

  //  Inject data
  let modalBox = document.getElementById("modalBox");
  modalBox.innerHTML = `
  <div class="">
  <img
    src="${phone.image}"
    alt=""
    class="w-1/2 mx-auto"
  />
  <div class="mt-8">
    <h2 class="text-lg font-bold">${phone.name}</h2>
    <p class="my-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum eum velit aliquid sint odit saepe distinctio culpa odio consectetur totam!</p>
    <div class="space-y-2">
      <p><span class="font-bold">Storage:</span> ${
        phone?.mainFeatures?.storage ||
        "Storage Isnot Available For This Device"
      }</p>
      <p><span class="font-bold">Display Size:</span> ${
        phone?.mainFeatures?.displaySize || "Size Not Available"
      }</p>
      <p><span class="font-bold">Chip Set:</span> ${
        phone?.mainFeatures?.chipSet || "Chip Set Info Not Available"
      }</p>
      <p><span class="font-bold">Memory :</span> ${
        phone?.mainFeatures?.memory || "Memory Info Not Available"
      }</p>
      <p><span class="font-bold">Slug :</span> ${phone?.slug}</p>
      <p><span class="font-bold">Release Date :</span> ${
        phone?.releaseDate || "Release Date Not Available"
      }</p>
      <p><span class="font-bold">Brand :</span> ${
        phone?.brand || "Not Available"
      }</p>
      <p><span class="font-bold">GPS :</span> ${
        phone?.others?.GPS || "GPS Info Not Available"
      }</p>
    </div>
  </div>
</div>
<div class="modal-action">
  <form method="dialog">
   
    <button class="btn bg-red-600">Close</button>
  </form>
</div>
  `;

  show_detail_modal.showModal();
};

// iphone
getPhones("13");
