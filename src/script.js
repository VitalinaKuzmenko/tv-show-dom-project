function setup() {
  let showsList = getAllShows();
  // createSelectMenuShows(showsList);
  makePageForShows(showsList);
}

function createSelectMenuShows(showsList) {
  const filterSection = document.querySelector(".filter-menu");
  const selectMenuShow = document.createElement("select");
  selectMenuShow.classList.add("select-menu", "select-show");
  selectMenuShow.setAttribute("name", "names_of_shows");
  filterSection.appendChild(selectMenuShow);

  //creating all shows value
  let option = document.createElement("option");
  option.innerHTML = "All shows";
  option.setAttribute("value", `All shows`);
  selectMenuShow.appendChild(option);

  //sorting list
  showsList.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  //creating options
  showsList.forEach((show) => {
    let option = document.createElement("option");
    let value = show.name;
    option.innerHTML = value;
    option.setAttribute("value", `${value}`);
    selectMenuShow.appendChild(option);
  });
  selectMenuShow.addEventListener("change", (event) => {
    const resultShow = showsList.find((show) => {
      return event.target.value.includes(show.name);
    });
    console.log(resultShow.id);
    fetchAllEpisodesList(resultShow.id);
  });
}

function makePageForShows(showsList) {
  const rootElem = document.getElementById("root");
  let shows = document.createElement("ul");
  shows.classList.add("shows");
  rootElem.appendChild(shows);
  //looping through episode list and displaying episode on webpage
  showsList.forEach((showFromList) => {
    createOneShow(showFromList);
  });
}

function createOneShow(showFromList) {
  // Image, name, rating, genres; year, actors, status, runtime, summary
  const shows = document.querySelector(".shows");
  let show = document.createElement("li");
  show.classList.add("show");
  shows.appendChild(show);

  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  div1.classList.add("div1");
  div2.classList.add("div2");

  show.append(div1, div2);

  let img = document.createElement("img");
  img.src = showFromList.image.medium;

  div1.appendChild(img);

  let title = document.createElement("h1");
  let infoAboutShow = document.createElement("div");
  console.log(showFromList.name);
  title.innerHTML = showFromList.name;
  let paragraph = document.createElement("p");
  paragraph.innerHTML = showFromList.summary;
  div2.append(title, infoAboutShow, paragraph);

  let rating = document.createElement("p");
  let genres = document.createElement("p");
  let year = document.createElement("p");
  let status = document.createElement("p");
  let runtime = document.createElement("p");
  rating.innerHTML = showFromList.rating.average;
  genres.innerHTML = showFromList.genres;
  year.innerHTML = showFromList.premiered;
  status.innerHTML = showFromList.status;
  runtime.innerHTML = showFromList.runtime + " min";
  infoAboutShow.append(rating, genres, year, status, runtime);
}

// getting episodes list from API
async function fetchAllEpisodesList(numOfShow) {
  fetch(`https://api.tvmaze.com/shows/${numOfShow}/episodes`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let episodeList = data;
      makePageForEpisodes(episodeList); //displaying episodes
      createSelectMenuEpisode(episodeList); //creating selectMenu episodes
      createLiveSearch(episodeList); // creating live search
    })
    .catch((err) => console.error(`Fetch problem: ${err.message}`));
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

//creating select menu for choosing one episode from the list
function createSelectMenuEpisode(episodeList) {
  const episodes = document.querySelector(".episodes");
  const filterSection = document.querySelector(".filter-menu");
  const element = document.querySelector(".select-episode");

  //checking if element exists. If yes - delete, if no - create a new one.
  if (element) {
    element.remove();
  }

  const selectMenuEpisode = document.createElement("select");
  selectMenuEpisode.classList.add("select-menu", "select-episode");
  selectMenuEpisode.setAttribute("name", "names_of_episodes");
  filterSection.appendChild(selectMenuEpisode);

  //creating all episodes value
  let option = document.createElement("option");
  option.innerHTML = "All episodes";
  option.setAttribute("value", `All episodes`);
  selectMenuEpisode.appendChild(option);

  //creating options
  episodeList.forEach((episodeFromList) => {
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
      episodeList.forEach((episode) => {
        createOneEpisode(episode);
      });
      createAmountOfEpisodes(episodeList);
    } else {
      const result = episodeList.find((episode) => {
        return event.target.value.includes(episode.name);
      });
      createOneEpisode(result);
      createAmountOfEpisodes(episodeList);
    }
  });
}

// creating live search input for episodes
function createLiveSearch(list) {
  const filterSection = document.querySelector(".filter-menu");
  const episodes = document.querySelector(".episodes");
  const element = document.querySelector(".search-episode");

  //checking if element exists. If yes - delete, if no - create a new one.
  if (element) {
    element.remove();
  }

  const search = document.createElement("input");
  search.classList.add("search-episode");
  filterSection.appendChild(search);
  search.setAttribute("autocomplete", "off");
  search.setAttribute("type", "search");
  search.setAttribute("id", "search");
  search.setAttribute("placeholder", "Search for episode...");

  const allEpisodes = list;
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

  createAmountOfEpisodes(allEpisodes);

  search.addEventListener("input", (event) => {
    search_episode = event.target.value.toLowerCase();
    showList();
    createAmountOfEpisodes(allEpisodes);
  });
}

// changing the info about amount of episodes on the screen
function createAmountOfEpisodes(episodeList) {
  const episodes = document.querySelector(".episodes");
  const filterSection = document.querySelector(".filter-menu");
  const element = document.querySelector(".amount-of-episodes");

  //checking if element exists. If yes - delete, if no - create a new one.
  if (element) {
    element.remove();
  }

  let amountOfEpisodes = document.createElement("p");
  amountOfEpisodes.classList.add("amount-of-episodes");
  filterSection.appendChild(amountOfEpisodes);
  let liNodes = [];

  for (var i = 0; i < episodes.childNodes.length; i++) {
    if (episodes.childNodes[i].nodeName == "LI") {
      liNodes.push(episodes.childNodes[i]);
    }
    amountOfEpisodes.innerHTML = `Displaying ${liNodes.length}/${episodeList.length} episodes`;
  }
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
