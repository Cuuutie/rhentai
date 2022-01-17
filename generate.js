const titleOutput = document.getElementById("title");
const authorOutput = document.getElementById("author");
const linkOutput = document.getElementById("imageLink");
const authorLinkOutput = document.getElementById("authorLink");
const imageOutput = document.getElementById("image");

const posts = [];

let currentIndex;
let nextIndex;
let previousIndex;

function Generate() {
  fetch("https://www.reddit.com/r/hentai/random.json")
    .then((result) => {
      return result.json();
    })
    .then((content) => {
      image = content[0].data.children[0].data.url_overridden_by_dest;

      if (!image.includes("i.redd.it")) {
        return Generate();
      }

      title = content[0].data.children[0].data.title;
      author = content[0].data.children[0].data.author;
      permalink = content[0].data.children[0].data.permalink;
      link = "https://www.reddit.com" + permalink;

      const post = new Post(image, title, author, link);
      posts.push(post);

      LoadPost(post);
    });
}

function LoadPrevious() {
  if (posts[currentIndex - 1]) return LoadPost(posts[currentIndex - 1]);
}

function LoadNext() {
  if (nextIndex) return LoadPost(nextIndex);
  else {
    Generate();
  }
}

function LoadPost(post) {
  imageOutput.src = post.image;
  imageOutput.onload = () => {
    titleOutput.innerText = post.title;
    authorOutput.innerText = post.author;
    linkOutput.href = post.link;
    authorLinkOutput.href = `https://www.reddit.com/u/${author}`;
  };

  currentIndex = posts.indexOf(post);
  nextIndex = posts[currentIndex + 1];
  previousIndex = posts[currentIndex - 1];
}

class Post {
  constructor(image, title, author, link) {
    this.image = image;
    this.title = title;
    this.author = author;
    this.link = link;
  }
}

Generate();
