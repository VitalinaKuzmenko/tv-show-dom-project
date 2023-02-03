function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  createSelectMenuEpisode(allEpisodes);
  createLiveSearch();
}

//creating the list with episodes, adding all the episodes from the array to this list
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let episodes = document.createElement("ul");
  episodes.classList.add("episodes");
  rootElem.appendChild(episodes);
  //looping through episode list and displaying episode on webpage
  episodeList.forEach((episodeFromList) => {
    createOneEpisode(episodeFromList);
  });
}

//creating episode name like "S01E01"
function createEpisodeName(season, episode) {
  if (season < 10) season = "0" + season;
  if (episode < 10) episode = "0" + episode;

  return `S${season}E${episode}`;
}

//creating and displaying one episode
function createOneEpisode(episodeFromList) {
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

// creating live search input for episodes
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
  let count = 0;

  const showList = () => {
    count = 0;
    episodes.innerHTML = " ";
    allEpisodes
      .filter((episode) => {
        return (
          episode.summary.toLowerCase().includes(search_episode) ||
          episode.name.toLowerCase().includes(search_episode)
        );
      })
      .forEach((e) => {
        count++;
        createOneEpisode(e);
      });
  };
  showList();

  const showAmountOfEpisodes = () => {
    let amountOfEpisodes = document.createElement("p");
    amountOfEpisodes.classList.add("amount-of-episodes");
    filterSection.appendChild(amountOfEpisodes);
    amountOfEpisodes.innerHTML = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;
  };

  showAmountOfEpisodes();

  search.addEventListener("input", (event) => {
    search_episode = event.target.value.toLowerCase();
    showList();
    changeAmountOfEpisodes(allEpisodes);
  });
}

// changing the info about amount of episodes on the screen
function changeAmountOfEpisodes(allEpisodes) {
  const episodes = document.querySelector(".episodes");
  let amountOfEpisodes1 = document.querySelector(".amount-of-episodes");
  let liNodes = [];

  for (var i = 0; i < episodes.childNodes.length; i++) {
    if (episodes.childNodes[i].nodeName == "LI") {
      liNodes.push(episodes.childNodes[i]);
    }
    amountOfEpisodes1.innerHTML = `Displaying ${liNodes.length}/${allEpisodes.length} episodes`;
  }
}

//creating select menu for choosing one episode from the list
function createSelectMenuEpisode(allEpisodes) {
  const filterSection = document.querySelector(".filter-menu");
  const selectMenuEpisode = document.createElement("select");
  const episodes = document.querySelector(".episodes");

  selectMenuEpisode.classList.add("select-episode");
  selectMenuEpisode.setAttribute("name", "names_of_episodes");
  filterSection.appendChild(selectMenuEpisode);

  //creating all episodes value
  let option = document.createElement("option");
  option.innerHTML = "All episodes";
  option.setAttribute("value", `All episodes`);
  selectMenuEpisode.appendChild(option);

  //creating options
  allEpisodes.forEach((episodeFromList) => {
    let option = document.createElement("option");
    let value = `${createEpisodeName(
      episodeFromList.season,
      episodeFromList.number
    )} - ${episodeFromList.name}`;
    option.innerHTML = value;
    option.setAttribute("value", `${value}`);
    selectMenuEpisode.appendChild(option);
  });

  selectMenuEpisode.addEventListener("change", (event) => {
    episodes.innerHTML = " ";
    if (event.target.value === "All episodes") {
      allEpisodes.forEach((episode) => {
        createOneEpisode(episode);
      });
      changeAmountOfEpisodes(allEpisodes);
    } else {
      const result = allEpisodes.find((episode) => {
        return event.target.value.includes(episode.name);
      });
      createOneEpisode(result);
      changeAmountOfEpisodes(allEpisodes);
    }
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
