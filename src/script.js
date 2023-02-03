function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  createLiveSearch();
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let episodes = document.createElement("ul");
  episodes.classList.add("episodes");
  rootElem.appendChild(episodes);
  //looping through episode list and displaying episode on webpage
  episodeList.forEach((episodeFromList) => {
    let episode = document.createElement("li");
    episode.classList.add("episode");
    episodes.appendChild(episode);
    let img = document.createElement("img");
    let title = document.createElement("h1");
    let paragraph = document.createElement("p");
    img.src = episodeFromList.image.medium;
    title.innerHTML = `${createEpisodeName(
      episodeFromList.season,
      episodeFromList.number
    )} - ${episodeFromList.name}`;
    paragraph.innerHTML = episodeFromList.summary;
    episode.appendChild(img);
    episode.appendChild(title);
    episode.appendChild(paragraph);
  });
}

function createEpisodeName(season, episode) {
  if (season < 10) season = "0" + season;
  if (episode < 10) episode = "0" + episode;

  return `S${season}E${episode}`;
}

function makeOneEpisode(episodeFromList) {
  const episodes = document.querySelector(".episodes");
  let episode = document.createElement("li");
  episode.classList.add("episode");
  episodes.appendChild(episode);
  let img = document.createElement("img");
  let title = document.createElement("h1");
  let paragraph = document.createElement("p");
  img.src = episodeFromList.image.medium;
  title.innerHTML = `${createEpisodeName(
    episodeFromList.season,
    episodeFromList.number
  )} - ${episodeFromList.name}`;
  paragraph.innerHTML = episodeFromList.summary;
  episode.appendChild(img);
  episode.appendChild(title);
  episode.appendChild(paragraph);
}

// create live search input for episodes
function createLiveSearch() {
  const filterSection = document.querySelector(".filter-menu");
  const episodes = document.querySelector(".episodes");
  const search = document.createElement("input");
  search.classList.add("search-episode");
  filterSection.appendChild(search);
  search.setAttribute("autocomplete", "off");
  search.setAttribute("type", "search");
  search.setAttribute("id", "search");
  search.setAttribute("placeholder", "Search for episode...");

  const allEpisodes = getAllEpisodes();
  let search_episode = "";

  const showList = () => {
    episodes.innerHTML = " ";
    allEpisodes
      .filter((episode) => {
        console.log(episode.name);
        return (
          episode.summary.toLowerCase().includes(search_episode) ||
          episode.name.toLowerCase().includes(search_episode)
        );
      })
      .forEach((e) => {
        makeOneEpisode(e);
      });
  };
  showList();

  search.addEventListener("input", (event) => {
    search_episode = event.target.value.toLowerCase();
    showList();
  });
}

window.onload = setup;

//Header
const navigation = document.getElementById("nav");
const menu = document.getElementById("menu");

menu.addEventListener("click", () => {
  // The navigation.children.length means the following :-
  // The children inside a parent are basically an array of elements;
  // So, here I'm finding the length of the array aka how many children are inside the nav bar.
  navigation.style.setProperty("--childenNumber", navigation.children.length);

  //    Casually Toggling Classes to make them animate on click
  navigation.classList.toggle("active");
  menu.classList.toggle("active");
});
