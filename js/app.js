// Header fetch url
const fetchCategoryName = async() =>{
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url)
  const data = await res.json()
  displayCategoryName(data.data.news_category);
}

// header display from url
const displayCategoryName = (data) => {
  const headerContainer = document.getElementById('headerContainer');
  data.forEach(name => {
    headerContainer.innerHTML += `<a onclick="fetchCategoryId('${name.category_id}', '${name.category_name}')" class="text-decoration-none text-black-50 fw-semibold" href="#">${name.category_name}</a>`;
  });
}

// warning fetch url 
const fetchCategoryId = async(category_id, category_name) =>{
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(url)
  const data = await res.json()
  // console.log(data);
  warningDisplay(data.data, category_name)
}
// warning display url
const warningDisplay = (data, category_name) =>{
  // console.log(data);
  document.getElementById('countNews').innerHTML = data.length
  document.getElementById('warnigHeader').innerHTML = category_name;
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerText = '';
  data.forEach(news => {
    const {title, details, author, total_view, image_url, _id} = news;
    newsContainer.innerHTML += `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${details.slice(0, 200)}...</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-center align-items-center">
                  <img class="rounded-circle" src="${author.img ? author.img : "No img"}" alt="" width="40" height="40">
                  <div class="ps-2">
                    <span>${author.name ? author.name : "No Name"}</span> <br>
                    <span>${author.published_date ? author.published_date : "No date"}</span>
                  </div>
                </div>
                <div>
                  <i class="fas fa-eye"></i> ${total_view ? total_view : "No View"}
                </div>
                <div>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half"></i>
                </div>
                <div>
                  <i onclick="fetchNewsDetails('${_id}')" class="fas fa-arrow-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
  })
}

const fetchNewsDetails = news_id => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>showNewsDetails(data.data[0]))
  .catch(err=>console.log(err))
}
const showNewsDetails = data =>{
  const {title, details, author, total_view, image_url, _id} = data;
  const modalBody = document.getElementById('modalBody');
  modalBody.innerText = '';
    modalBody.innerHTML += `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-12">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-12">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${details.slice(0, 200)}...</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-center align-items-center">
                  <img class="rounded-circle" src="${author.img ? author.img : "No img"}" alt="" width="40" height="40">
                  <div class="ps-2">
                    <span>${author.name ? author.name : "No Name"}</span> <br>
                    <span>${author.published_date ? author.published_date : "No date"}</span>
                  </div>
                </div>
                <div>
                  <i class="fas fa-eye"></i> ${total_view ? total_view : "No View"}
                </div>
                <div>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
}
// fetchCategoryName();
fetchCategoryName();