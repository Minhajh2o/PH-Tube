// loading categories from api
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
};

// displaying categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');

    categories.forEach(item => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerText = item.category;

        categoryContainer.append(btn);
    });
};


// loading videos from api
const loadVideoCards = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideoCards(data.videos))
        .catch(error => console.log(error))
};

// displaying video cards
const displayVideoCards = (videos) => {
    const videoContainer = document.getElementById('video-container');

    videos.forEach(video => {
        const div = document.createElement('div');
        div.classList.add('video-card');
        div.innerHTML = `
            <figure class="h-[150px] overflow-hidden rounded-lg">
                <img class="w-full object-cover" src="${video.thumbnail}" alt="">
            </figure>
            <div class="flex gap-3 py-2">
                <figure class="h-8 w-8 overflow-hidden rounded-full mt-2">
                    <img class="w-full h-full object-cover" src="${video.authors[0].profile_picture}" alt="">
                </figure>
                <div>
                    <h3 class="text-base font-bold">${video.title}</h3>
                    <div class="flex items-center gap-2">
                        <p class="text-sm text-gray-600">${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified === true ? `<img class="w-4 h-4" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt="Verified"></img>` : ""}
                    </div>
                    <p class="text-sm text-gray-600">${video.others.views} views <span class="text-xl">·</span> ${video.others.posted_date.length == 0 ? `Pending` : `${upload(video.others.posted_date)}`}</p>

                </div>
            </div>
            `;
        videoContainer.append(div);

    });
};


// const upload = (sec) => {
//     const years = Math.floor(sec / 31536000);
//     const months = Math.floor(sec / 2592000);
//     const weeks = Math.floor(sec / 604800);
//     const days = Math.floor(sec / 86400);
//     const hours = Math.floor(sec / 3600);
//     const minutes = Math.floor((sec % 3600) / 60);

//     if (years > 0) {
//         return `${years} years ago`;
//     }
//     if (months > 0) {
//         return `${months} months ago`;
//     }
//     if (weeks > 0) {
//         return `${weeks} weeks ago`;
//     }
//     if (days > 0) {
//         return `${days} days ago`;
//     }
//     if (hours > 0 && hours < 24) {
//         return `${hours} hours ago`;
//     }
//     if (minutes > 0 && minutes < 60) {
//         return `${minutes} minutes ago`;
//     }
// }

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






// calling functions
loadCategories();
loadVideoCards();
