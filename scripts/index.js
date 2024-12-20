function  getTimeString(secsString) {
    const secs = parseInt(secsString)
    const getHour = parseInt(secs / 3600);
    const remainingSec = secs % 3600;
    const getMinutes = parseInt(remainingSec / 60);
    const getSec = remainingSec % 60;
    return `${getHour} hours ${getMinutes} minustes ${getSec} seconds ago`
}
const removeActive = () => {
    const btns = document.getElementsByClassName("category-btn");
    for(let btn of btns){
        btn.classList.remove('active');
    }
}
const loadCategoryVideos = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        showAllVideos(data.category);
        // remove active color to the btns 
        removeActive();

        // add active color to the btns 
        const activeBtn = document.getElementById(`btn-${id}`);
        console.log(activeBtn);
        activeBtn.classList.add("active")
    })

}

const loadAllCategories = async() =>{

    const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
    const data = await response.json();
    showAllCategories(data.categories);
};

const loadAllVideos = async(name ="")=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${name}`);
    const data = await response.json();
    showAllVideos(data.videos);
};

const showAllCategories = (categories) =>{
    const categoriesSection = document.getElementById('categories');
    categories.forEach((item) => {
        // creating button section here :
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML =
        `
        <button id="btn-${item.category_id}" onclick=loadCategoryVideos(${item.category_id}) class="p-3 category-btn btn" >
        ${item.category}
        </button>
        `
        // appending the button to the section :
        categoriesSection.appendChild(buttonContainer);
    });

}

const loadDetails = async(videoId) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
    const data = await response.json();
    displayDetails(data.video)
}
const displayDetails = (id) =>{
    console.log(id);
    const modalDetails = document.getElementById('modal-details');

        modalDetails.innerHTML =
        `
        <img src=${id.thumbnail}>
        <p>${id.description}</p>
        `




    document.getElementById('showModalData').click();
}
const showAllVideos = (videos) =>{
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = "";
    
    if(videos.length === 0){
        videoContainer.classList.remove('grid');

        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">

        <img src="./icon.png">
        <h2 class="text-center text-4xl font-bold">OOP! SORRY THERE IS NO <br> CONTENT FOUND</h2>

        </div>
        `
    return}
    else{
        videoContainer.classList.add('grid');
    }
    videos.forEach((video) => {

        // create element
    const card = document.createElement('div');
    card.classList = "card card-compact bg-base-100 w-96 shadow-xl";
    
    console.log(video);
    
    card.innerHTML = `
          <figure class="relative h-[200px]" >
    <img class="h-full w-full object-cover"
      src="${video.thumbnail
      }"
      alt="Shoes" />

      ${video.others.
        posted_date?.length === 0? "" : ` <span class="absolute bg-black text-xs text-white p-1 rounded-md right-2 bottom-2">
      ${getTimeString(video.others.
        posted_date)}
      </span>`}
  </figure>
  <div class="my-2 flex items-center gap-4">
      <div>
      <img class="h-10 w-10 rounded-full object-cover" src="${video.authors[0].profile_picture}">
      </div>
      <div>
      <h2 class="font-bold">${video.title}</h2>
      <div class="flex gap-3 items-center">
      <p class="text-gray-400">
      ${video.authors[0].profile_name}
      </p>
      ${video.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000">`: ""}
      </div>
      <div>
      <button onclick="loadDetails('${video.video_id}')" class="btn btn-primary"> details </button>
      </div>
      </div>

  </div>
    `
        videoContainer.appendChild(card)
    });
}

document.getElementById("search-box").addEventListener("keyup", function(event){
    loadAllVideos(event.target.value);
})
loadAllCategories();
loadAllVideos();