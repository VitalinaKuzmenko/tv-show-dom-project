function setup() {
  createWebpagePath();
  createAllShowsList();
}

function createWebpagePath() {
  const root = document.getElementById("root");
  let webpagePath = document.createElement("ul");
  webpagePath.classList.add("webpagePath");
  root.appendChild(webpagePath);

  let li1 = document.createElement("li");
  li1.innerHTML = "TV Project";
  webpagePath.appendChild(li1);
  li1.classList.add("main-page-path");

  let span1 = document.createElement("span");
  span1.innerHTML = "/";
  span1.classList.add("span1");
  webpagePath.appendChild(span1);

  let li2 = document.createElement("li");
  li2.innerHTML = "Shows";
  webpagePath.appendChild(li2);
  li2.classList.add("shows-path");

  let span2 = document.createElement("span");
  span2.innerHTML = "/";
  span2.classList.add("span2", "not-active");
  webpagePath.appendChild(span2);

  let li3 = document.createElement("li");
  li3.innerHTML = "Episodes";
  webpagePath.appendChild(li3);
  li3.classList.add("episodes-path", "not-active");

  li2.addEventListener("click", () => {
    let showWrapper = document.getElementById("show-wrapper");
    showWrapper.classList.remove("not-active");

    let episodeWrapper = document.getElementById("episode-wrapper");
    episodeWrapper.classList.add("not-active");

    let episodesPath = document.querySelector(".episodes-path");
    episodesPath.classList.add("not-active");

    let span2 = document.querySelector(".span2");
    span2.classList.add("not-active");
  });
}

function createAllShowsList() {
  let showsList = getAllShows();
  makePageForShows(showsList);
  createSelectMenuShow(showsList);
  createLiveShowSearch(showsList);
  showEventListener(showsList);
}

//displaying all shows
function makePageForShows(showsList) {
  const rootElem = document.getElementById("root");
  let wrapper = document.createElement("div");
  wrapper.setAttribute("id", "show-wrapper");
  rootElem.appendChild(wrapper);

  let filterSection = document.createElement("section");
  filterSection.classList.add("filter-menu");
  wrapper.appendChild(filterSection);

  let shows = document.createElement("ul");
  shows.classList.add("shows");
  wrapper.appendChild(shows);

  //looping through show list and displaying show on webpage
  showsList.forEach((showFromList) => {
    createOneShow(showFromList);
  });
}

//creating one show
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
  infoAboutShow.classList.add("info-about-show");

  title.innerHTML = showFromList.name;
  let paragraph = document.createElement("p");
  paragraph.innerHTML = showFromList.summary;
  div2.append(title, infoAboutShow, paragraph);

  let rating = document.createElement("p");
  let genres = document.createElement("p");
  let year = document.createElement("p");
  let status = document.createElement("p");
  let runtime = document.createElement("p");
  rating.innerHTML = "Rated: " + showFromList.rating.average;
  let genresString = "Rated: ";
  for (let i = 0; i < showFromList.genres.length; i++) {
    if (i === showFromList.genres.length - 1) {
      genresString += showFromList.genres[i];
    } else {
      genresString += showFromList.genres[i] + " | ";
    }
  }
  genres.innerHTML = genresString;
  year.innerHTML = "Year: " + showFromList.premiered.substring(0, 4);
  status.innerHTML = "Status: " + showFromList.status;
  runtime.innerHTML = "Runtime: " + showFromList.runtime + " min";
  infoAboutShow.append(rating, genres, year, status, runtime);

  let hr = document.createElement("hr");
  shows.appendChild(hr);
}

// creating live search input for shows
function createLiveShowSearch(list) {
  const filterSection = document.querySelector(".filter-menu");
  const shows = document.querySelector(".shows");
  const element = document.querySelector(".search-show");

  //checking if element exists. If yes - delete, if no - create a new one.
  // if (element) {
  //   element.remove();
  //   console.log("remove");
  // }

  const search = document.createElement("input");
  search.classList.add("search-show", "search-input");
  filterSection.appendChild(search);
  search.setAttribute("autocomplete", "off");
  search.setAttribute("type", "search");
  search.setAttribute("id", "search");
  search.setAttribute("placeholder", "Search for show...");

  const allShows = list;
  let search_show = "";

  const showList = () => {
    let count = 0;
    shows.innerHTML = " ";
    allShows
      .filter((show) => {
        if (show.summary !== null || show.summary !== "") {
          return show.name.toLowerCase().includes(search_show);
        } else {
          return (
            show.summary.toLowerCase().includes(search_show) ||
            show.name.toLowerCase().includes(search_show)
          );
        }
      })
      .forEach((e) => {
        count++;
        createOneShow(e);
      });
  };
  showList();

  createAmountOfShows();

  search.addEventListener("input", (event) => {
    search_show = event.target.value.toLowerCase();
    showList();
    createAmountOfShows();
    showEventListener(list);
  });
}

//creating select menu for choosing one show from the list
function createSelectMenuShow(showList) {
  const shows = document.querySelector(".shows");
  const filterSection = document.querySelector(".filter-menu");
  const element = document.querySelector(".select-show");

  //checking if element exists. If yes - delete, if no - create a new one.
  if (element) {
    element.remove();
  }

  const selectMenuShow = document.createElement("select");
  selectMenuShow.classList.add("select-menu", "select-show");
  selectMenuShow.setAttribute("name", "names_of_shows");
  filterSection.appendChild(selectMenuShow);

  //creating all episodes value
  let option = document.createElement("option");
  option.innerHTML = "All shows";
  option.setAttribute("value", `All shows`);
  selectMenuShow.appendChild(option);

  //sorting list
  showList.sort((a, b) => {
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
  showList.forEach((showFromList) => {
    let option = document.createElement("option");
    let value = showFromList.name;
    option.innerHTML = value;
    option.setAttribute("value", `${value}`);
    selectMenuShow.appendChild(option);
  });

  selectMenuShow.addEventListener("change", (event) => {
    shows.innerHTML = " ";
    if (event.target.value === "All shows") {
      showList.forEach((show) => {
        createOneShow(show);
      });
      showEventListener(showList);
      createAmountOfShows();
    } else {
      const result = showList.find((show) => {
        return event.target.value.includes(show.name);
      });
      createOneShow(result);
      createAmountOfShows();
      showEventListener(showList);
    }
  });
}

//creating information for displaying amount of shows on the screen
function createAmountOfShows() {
  const shows = document.querySelector(".shows");
  const filterSection = document.querySelector(".filter-menu");
  const element = document.querySelector(".amount-of-shows");

  //checking if element exists. If yes - delete, if no - create a new one.
  if (element) {
    element.remove();
  }

  let amountOfShows = document.createElement("p");
  amountOfShows.classList.add("amount-of-shows");
  filterSection.appendChild(amountOfShows);

  let liNodes = [];

  for (var i = 0; i < shows.childNodes.length; i++) {
    if (shows.childNodes[i].nodeName == "LI") {
      liNodes.push(shows.childNodes[i]);
    }
    amountOfShows.innerHTML = `Found ${liNodes.length} shows`;
  }
}

//listening to image and title - to open episode page
function showEventListener(showsList) {
  let titles = document.querySelector(".shows").querySelectorAll("h1");
  let images = document.querySelector(".shows").querySelectorAll("img");

  titles.forEach((title) => {
    title.addEventListener("click", () => {
      let resultShow = showsList.find((show) => {
        return show.name === title.textContent;
      });

      let episodeWrapper = document.getElementById("episode-wrapper");
      if (episodeWrapper) {
        episodeWrapper.remove();
      }

      createAllEpisodesList(showsList, resultShow.name, resultShow.id);
      let showWrapper = document.getElementById("show-wrapper");
      showWrapper.classList.add("not-active");

      // let episodeWrapper = document.getElementById("episode-wrapper");
      episodeWrapper.classList.remove("not-active");

      let episodesPath = document.querySelector(".episodes-path");
      episodesPath.classList.remove("not-active");
      episodesPath.innerHTML = `Episodes: ${resultShow.name}`;

      let span2 = document.querySelector(".span2");
      span2.classList.remove("not-active");
    });
  });

  images.forEach((image) => {
    image.addEventListener("click", () => {
      let resultShow = showsList.find((show) => {
        return show.image.medium === image.src;
      });

      let episodeWrapper = document.getElementById("episode-wrapper");
      if (episodeWrapper) {
        episodeWrapper.remove();
      }

      createAllEpisodesList(showsList, resultShow.name, resultShow.id);
      let showWrapper = document.getElementById("show-wrapper");
      showWrapper.classList.add("not-active");

      let episodesPath = document.querySelector(".episodes-path");
      episodesPath.classList.remove("not-active");
      episodesPath.innerHTML = `Episodes: ${resultShow.name}`;

      let span2 = document.querySelector(".span2");
      span2.classList.remove("not-active");
    });
  });
}

function createAllEpisodesList(showsList, showName, showId) {
  fetchAllEpisodesList(showsList, showName, showId);
}

// getting episodes list from API
async function fetchAllEpisodesList(showsList, showName, showId) {
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let episodeList = data;
      makePageForEpisodes(episodeList); //displaying episodes
      createSelectMenuShowsForEpisodes(showsList, showName);
      createSelectMenuEpisode(episodeList); //creating selectMenu episodes
      createLiveEpisodeSearch(episodeList); // creating live search
    })
    .catch((err) => console.error(`Fetch problem: ${err.message}`));
}

//creating the list with episodes, adding all the episodes from the array to this list
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let wrapper = document.createElement("div");
  wrapper.setAttribute("id", "episode-wrapper");
  rootElem.appendChild(wrapper);

  let filterSection = document.createElement("section");
  filterSection.classList.add("filter-menu");
  wrapper.appendChild(filterSection);
  // const wrapper = document.getElementById("episode-wrapper");

  let episodes = document.createElement("ul");
  episodes.classList.add("episodes");
  wrapper.appendChild(episodes);
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
  if (episodeFromList.image === null) {
    img.src = "/media/no-image-available.jpg";
  } else {
    img.src = episodeFromList.image.medium;
  }

  title.innerHTML = `${createEpisodeName(
    episodeFromList.season,
    episodeFromList.number
  )} - ${episodeFromList.name}`;
  paragraph.innerHTML = episodeFromList.summary;
  episode.appendChild(img);
  episode.appendChild(title);
  episode.appendChild(paragraph);
}

//the function for choosing show on episode page
function createSelectMenuShowsForEpisodes(showsList, showName) {
  const wrapper = document.getElementById("episode-wrapper");
  const filterSection = wrapper.querySelector(".filter-menu");
  const selectMenuShow = document.createElement("select");
  selectMenuShow.classList.add("select-menu", "select-show");
  selectMenuShow.setAttribute("name", "names_of_shows");
  filterSection.appendChild(selectMenuShow);

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

    //it should make clicked show as selected option on episode page
    if (option.value === showName) {
      option.selected = true;
    }
  });

  //adding eventListener
  selectMenuShow.addEventListener("change", (event) => {
    let episodes = document.querySelector(".episodes");
    episodes.innerHTML = "";

    let episodesPath = document.querySelector(".episodes-path");

    const result = showsList.find((show) => {
      episodesPath.innerHTML = `Episodes: ${event.target.value}`;
      return event.target.value === show.name;
    });

    getListOfEpisodes(result.id);
  });
}

async function getListOfEpisodes(showId) {
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let episodeList = data;
      createSelectMenuEpisode(episodeList); //creating selectMenu episodes
      createLiveEpisodeSearch(episodeList); // creating live search
    })
    .catch((err) => console.error(`Fetch problem: ${err.message}`));
}

//creating select menu for choosing one episode from the list
function createSelectMenuEpisode(episodeList) {
  const wrapper = document.getElementById("episode-wrapper");
  const episodes = document.querySelector(".episodes");
  const filterSection = wrapper.querySelector(".filter-menu");
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
    episodes.innerHTML = "";
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
function createLiveEpisodeSearch(list) {
  const wrapper = document.getElementById("episode-wrapper");
  const filterSection = wrapper.querySelector(".filter-menu");
  const episodes = document.querySelector(".episodes");
  const element = document.querySelector(".search-episode");

  //checking if element exists. If yes - delete, if no - create a new one.
  if (element) {
    element.remove();
  }

  const search = document.createElement("input");
  search.classList.add("search-episode", "search-input");
  filterSection.appendChild(search);
  search.setAttribute("autocomplete", "off");
  search.setAttribute("type", "search");
  search.setAttribute("id", "search");
  search.setAttribute("placeholder", "Search for episode...");

  const allEpisodes = list;
  let search_episode = "";

  const showList = () => {
    let count = 0;
    episodes.innerHTML = " ";
    allEpisodes
      .filter((episode) => {
        if (episode.summary !== null || episode.summary !== "") {
          return episode.name.toLowerCase().includes(search_episode);
        } else {
          return (
            episode.summary.toLowerCase().includes(search_episode) ||
            episode.name.toLowerCase().includes(search_episode)
          );
        }
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
  const wrapper = document.getElementById("episode-wrapper");
  const episodes = document.querySelector(".episodes");
  const filterSection = wrapper.querySelector(".filter-menu");
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
