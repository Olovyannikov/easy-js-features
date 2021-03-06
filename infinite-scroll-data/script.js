const postsContainer = document.querySelector('#post-container');
const loading = document.querySelector('.loader');
const filter = document.querySelector('#filter');

let limit = 5;
let page = 1;

//Fetch posts from API

const getPosts = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    return await res.json();
}

// Show posts in DOM

const showPosts = async () => {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = `
        <div class="post">
                <div class="number">${post.id}</div>
                <div class="post-info">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-body">${post.body}</p>
                </div>
            </div>`;
        postsContainer.insertAdjacentHTML('beforeend', postEl);
    });
}

// Show loader and fetch more posts

const showLoading = () => {
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
}

// Show initial posts
showPosts();

// Filter posts by input

const filterPosts = (e) => {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
}

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);