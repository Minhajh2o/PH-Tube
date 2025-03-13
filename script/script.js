// loading categories from api
const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
};

// displaying categories
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('category-container');
    
    categories.forEach(item => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerText = item.category;

        categoryContainer.append(btn);
    });
};


// calling functions
loadCategories();
