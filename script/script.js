// loading categories from api
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
};

const loadCategoryVideos = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`)
        .then(res => res.json())
        .then(data => { 
            const activeBtn = document.getElementById('btn-' + categoryId);
            removeActiveClass();
            activeBtn.classList.add("active");
            console.log(activeBtn);
            displayVideoCards(data.category) 
        })
        .catch(error => console.log(error))

};

// displaying categories
const displayCategories = (items) => {
    const categories = document.getElementById('categories');

    items.forEach(item => {
        // console.log(item);
        const categoryContainer = document.createElement('div');
        categoryContainer.innerHTML = `
            <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
            ${item.category}
            </button>
        `;
        // btn.innerText = item.category;

        categories.append(categoryContainer);
    });
};


// loading videos from api
const loadVideoCards = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideoCards(data.videos))
        .catch(error => console.log(error))
};

// displaying video cards
const displayVideoCards = (videos) => {
    // console.log(videos);
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // Clear previous content

    if (videos.length == 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
            <div class="flex flex-col justify-center items-center text-center w-full h-96 space-y-5">
                <img class="" src="images/Icon.png" alt="No content">
                <h1 class="text-4xl font-bold text-gray-700">Oops!! Sorry, There is no content here</h1>
            </div>
            `;
            return;
    }

    videos.forEach(video => {
        // console.log(video);
        const div = document.createElement('div');
        div.classList.add('video-card');
        div.innerHTML = `
            <figure class="relative h-[150px] overflow-hidden rounded-lg">
            <img class="w-full object-cover" src="${video.thumbnail}" alt="">
            <div onclick="loadVideoDetails('${video.video_id}')" style="cursor: pointer;" class="absolute bottom-2 right-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-lg">Description</div>
            </figure>
            <div class="flex gap-3 py-2">
            <figure class="h-8 w-8 overflow-hidden rounded-full mt-2">
                <img class="w-full h-full object-cover" src="${video.authors[0].profile_picture}" alt="">
            </figure>
            <div>
                <h3 class="text-base font-bold">${video.title}</h3>
                <div class="flex items-center gap-2">
                <p class="text-sm text-gray-300">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified === true ? `<img class="w-4 h-4" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt="Verified"></img>` : ""}
                </div>
                <p class="text-sm text-gray-300">${video.others.views} views <span class="text-xl">·</span> ${video.others.posted_date.length == 0 ? `Pending` : `${upload(video.others.posted_date)}`}</p>

            </div>
            </div>
            `;
        videoContainer.append(div);

    });
};

// load Video Details 
const loadVideoDetails = (video_id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video))
        .catch(error => console.log(error))
};

// displaying video details
const displayVideoDetails = (video) => {
    console.log(video);
    const modalDescription = document.getElementById('modal-description');
    modalDescription.innerText = video.description;
    const detailsModal = document.getElementById('details_modal');
    detailsModal.showModal();
}

// searching video cards
    document.getElementById('search_input').addEventListener('keyup', (event) => {
            const searchText = event.target.value;
            if(event.key === 'Enter'){
                event.preventDefault(); // Prevent form submission
                loadVideoCards(searchText);
            }
        
    });


const upload = (sec) => {
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(sec / interval.seconds);
        if (count > 0) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
};

const removeActiveClass = () => {
    const activeBtn = document.querySelector('.active');
    if (activeBtn) {
        activeBtn.classList.remove('active');
    }
}





// calling functions
loadCategories();
loadVideoCards();
