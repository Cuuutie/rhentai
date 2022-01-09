const titleOutput = document.getElementById("title");
const authorOutput = document.getElementById("author");
const linkOutput = document.getElementById("imageLink");
const authorLinkOutput = document.getElementById("authorLink");
const imageOutput = document.getElementById("image");

let image;
let title;
let author;
let permalink;
let link;

let previousImage;
let previousTitle;
let previousAuthor;
let previousPermalink;
let previousLink;

let nextImage;
let nextTitle;
let nextAuthor;
let nextPermalink;
let nextLink;

function Generate() {
  previousImage = image;
  previousTitle = title;
  previousAuthor = author;
  previousPermalink = permalink;
  previousLink = link;

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

      imageOutput.src = image;
      imageOutput.onload = () => {
        titleOutput.innerText = title;
        authorOutput.innerText = author;
        linkOutput.href = link;
        authorLinkOutput.href = `https://www.reddit.com/u/${author}`;
      };
    });
}

function LoadPrevious() {
  nextImage = image;
  nextTitle = title;
  nextAuthor = author;
  nextPermalink = permalink;
  nextLink = link;

  if (!previousImage) return;

  imageOutput.src = previousImage;
  imageOutput.onload = () => {
    titleOutput.innerText = previousTitle;
    authorOutput.innerText = previousAuthor;
    linkOutput.href = previousLink;
    authorLinkOutput.href = `https://www.reddit.com/u/${previousAuthor}`;
  };
}

function LoadNext() {
  if (nextImage) {
    imageOutput.src = image;
    imageOutput.onload = () => {
      titleOutput.innerText = title;
      authorOutput.innerText = author;
      linkOutput.href = link;
      authorLinkOutput.href = `https://www.reddit.com/u/${author}`;

      nextImage = null;
      nextTitle = null;
      nextAuthor = null;
      nextPermalink = null;
      nextLink = null;
    };
  } else {
    return Generate();
  }
}

Generate();
