console.log("I am connected :)");
// Burger menus
document.addEventListener("DOMContentLoaded", function () {
  // open
  const burger = document.querySelectorAll(".navbar-burger");
  const menu = document.querySelectorAll(".navbar-menu");

  if (burger.length && menu.length) {
    for (var i = 0; i < burger.length; i++) {
      burger[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }

  // close
  const close = document.querySelectorAll(".navbar-close");
  const backdrop = document.querySelectorAll(".navbar-backdrop");

  if (close.length) {
    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }

  if (backdrop.length) {
    for (var i = 0; i < backdrop.length; i++) {
      backdrop[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }

  favoriteArtistcheck();
});

const viewFriendsProfile = (e) => {
  e.preventDefault();
  const friendId = e.currentTarget.getAttribute('data-id');
  console.log(friendId);
  window.location.href = `/api/friends/profile/${friendId}`;
}
const friends = document.querySelectorAll(".friendBtn");
console.log(friends);
if (friends.length) {
  friends.forEach((friend) => {
    friend.addEventListener("click", viewFriendsProfile);
  });
}

//Code For Api requests from AudioDB and MusicBrainz
//Add an event listener to the Search Artist button
const searchBtn = document.getElementById("searchButton");
if (searchBtn) {
  searchBtn.addEventListener("click", searchArtist);
}

const favArtist = document.querySelectorAll(".artist");
console.log(favArtist);
if (favArtist.length > 0) {
  console.log("button clicked!");
  favArtist.forEach((artist) => {
    artist.addEventListener("click", searchArtist);
  });
}

//Add a keydown event listener to the input field
const audioDbSearch = document.getElementById("audioDbSearch");
if (audioDbSearch) {
  audioDbSearch.addEventListener("keydown", function (event) {
    //Check if the pressed key is Enter
    if (event.key === "Enter") {
      searchArtist();
    }
  });
}

// Function to search for an artist using async/await
async function searchArtist(e) {
  let artistName = "";
  let serverUrl = "";
  let userInput = "";
  const audioDbSearch = document.getElementById("audioDbSearch");
  if (audioDbSearch) {
    userInput = audioDbSearch.value;
    artistName = userInput;
  } else if (e.target && e.target.hasAttribute("data-artistName")) {
    artistName = e.target.getAttribute("data-artistName");
    localStorage.setItem("searchedArtistName", artistName);
    try {
      window.location.href = `/api/favorite/${artistName}`;
    } catch (err) {
      console.error("Error:", err);
    }
  }
  if (!artistName) {
    artistName = localStorage.getItem("searchedArtistName");
    localStorage.removeItem("searchedArtistName");
  }

  serverUrl = `/searchArtist?artist=${encodeURIComponent(artistName)}`;
  console.log(serverUrl);
  try {
    const response = await fetch(serverUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayArtistInfo(data);
    await fetchMusicVideos(data);
    await getMusicBrainzData(data);
    //Add an event listener to bookmark an artist
    const bookmark = document.getElementById("bookmark");
    console.log(artistName, bookmark);
    await favoriteArtist(artistName, bookmark);
    bookmark.addEventListener("click", function () {
      bookmarkHandler(bookmark, artistName);
    });
  } catch (err) {
    console.error("error:", err);
  }
}

async function searchFavArtist(artist) {
  serverUrl = `/searchArtist?artist=${encodeURIComponent(artist)}`;
  try {
    const response = await fetch(serverUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayArtistInfo(data);
    await fetchMusicVideos(data);
    await getMusicBrainzData(data);
    //Add an event listener to bookmark an artist
    const bookmark = document.getElementById("bookmark");
    await favoriteArtist(artist, bookmark);
    bookmark.addEventListener("click", function () {
      bookmarkHandler(bookmark, artistName);
    });
  } catch (err) {
    console.error("error:", err);
  }
}

async function bookmarkHandler(bm, name) {
  if (bm.classList.contains("bx-bookmark-heart")) {
    bm.classList.add("bx-tada");
    setTimeout(function () {
      bm.classList.remove("bx-tada", "bx-bookmark-heart");
      bm.classList.add("bxs-bookmark-heart");
    }, 1000);
    AddFavoriteArtist(name);
  } else {
    bm.classList.add("bx-tada");
    setTimeout(function () {
      bm.classList.remove("bx-tada", "bxs-bookmark-heart");
      bm.classList.add("bx-bookmark-heart");
    }, 1000);
    RemoveFavoriteArtist(name);
  }
}

async function AddFavoriteArtist(artist) {
  try {
    const response = await fetch("/api/favorite", {
      method: "PUT",
      body: JSON.stringify({ artist }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("artist added to favorites");
    } else {
      console.error("Failed to add artist to favorites:", response.statusText);
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

async function RemoveFavoriteArtist(artist) {
  try {
    const response = await fetch("/api/favorite/remove", {
      method: "PUT",
      body: JSON.stringify({ artist }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("artist removed from favorites");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

//function to check if the searched artist is already in the user's favorite artists list
async function favoriteArtist(artist, bookmark) {
  console.log("favoriteArtist called");
  try {
    const response = await fetch("/api/favorite", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const isFavorite = data.includes(artist);
    if (isFavorite) {
      bookmark.classList.add("bxs-bookmark-heart");
    } else {
      bookmark.classList.add("bx-bookmark-heart");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

//Function to display artist information
function displayArtistInfo(data) {
  console.log(data);
  const resultsDiv = document.getElementById("results");
  const containerDiv = document.getElementById("container");
  containerDiv.style.display = "block";
  resultsDiv.innerHTML = "";

  if (data && data.artists) {
    const artist = data.artists[0];

    //Create an HTML template with the desired properties
    const artistInfoHTML = `
            <i class='bx' id='bookmark' style='color:#f70707; font-size: 40px;'></i>
            <p><strong>Artist:</strong> ${artist.strArtist}</p>
            <p><strong>Birth Year:</strong> ${artist.intBornYear}</p>
            <p><strong>Gender:</strong> ${artist.strGender}</p>
            <p><strong>Country:</strong> ${artist.strCountry}</p>
            <p><strong>Genre:</strong> ${artist.strGenre}</p>
            <p><strong>Label:</strong> ${artist.strLabel}</p>
            <p><strong>Website:</strong> <a href="${
              artist.strWebsite
            }" target="_blank">${artist.strWebsite}</a></p>
            <p><strong>Biography:</strong><br>${artist.strBiographyEN.replace(
              /\n/g,
              "<br>"
            )}</p>
        `;

    //Append the HTML to the resultsDiv
    resultsDiv.innerHTML = artistInfoHTML;
  } else {
    resultsDiv.innerHTML = "No results found for the artist.";
  }
}

async function fetchMusicVideos(data) {
  if (data && data.artists) {
    const artistId = data.artists[0].idArtist;
    const serverUrl = `/fetchMusicVideos?artistId=${encodeURIComponent(
      artistId
    )}`;
    try {
      const response = await fetch(serverUrl);
      if (response.ok) {
        const musicVideosData = await response.json();
        displayMusicVideos(musicVideosData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

//Function to display music videos as links with each title on a new line, along with the corresponding thumbnail
function displayMusicVideos(musicVideosData) {
  console.log(musicVideosData);
  const videosDiv = document.getElementById("videos");
  videosDiv.innerHTML = "";
  document.getElementById("slide-track").innerHTML = "";

  const maxVideosToShow = 50;

  if (musicVideosData.mvids) {
    const musicVideos = musicVideosData.mvids;

    for (let i = 0; i < maxVideosToShow && i < musicVideos.length; i++) {
      const video = musicVideos[i];
      //Extract the YouTube video ID from the URL
      const videoId = getYouTubeVideoId(video.strMusicVid);

      //Check if a thumbnail is available
      if (videoId && video.strTrackThumb) {
        // Create div to hold slides with class styling added
        const slide = document.createElement("div");
        slide.classList.add("slide");
        document.getElementById("slide-track").appendChild(slide);

        //Create an anchor element for the thumbnail
        const thumbnailLink = document.createElement("a");
        thumbnailLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        thumbnailLink.target = "_blank"; // Open the link in a new tab

        //Create an image element for the thumbnail and add to slide div
        const thumbnail = document.createElement("img");
        thumbnail.src = video.strTrackThumb;
        thumbnail.alt = `${video.strTrack} Thumbnail`;

        // append link in slide div, append image to anchor tag
        slide.appendChild(thumbnailLink);
        thumbnailLink.appendChild(thumbnail);
      }
    }
    // copy albums to create infinite loop effect
    var copy = document.querySelector("#slide-track").copyNode(true);
    document.querySelector("#slider").appendChild(copy);
  } else {
    console.log("No music videos found for this artist.");
  }
}

//Function to extract YouTube video ID from a URL
function getYouTubeVideoId(url) {
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

async function getMusicBrainzData(data) {
  if (data && data.artists) {
    const mbId = data.artists[0].strMusicBrainzID;
    const serverUrl = `/getMusicBrainzData?mbId=${encodeURIComponent(mbId)}`;

    try {
      const response = await fetch(serverUrl);
      if (!response.ok) {
        // This will catch any HTTP errors, such as 404 or 500 status codes.
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const musicBrainzData = await response.json();
      displayMusicBrainzData(musicBrainzData);
    } catch (error) {
      console.error("Error fetching from MusicBrainz:", error);
    }
  } else {
    console.error("No artist data available to retrieve MusicBrainz ID.");
  }
}

//Function to display the results in a container ID mb Results
function displayMusicBrainzData(musicBrainzData) {
  console.log(musicBrainzData);
  const mbDataDiv = document.getElementById("mbResults");
  mbDataDiv.innerHTML = ""; // Clear previous results

  const resultDiv = document.getElementById("results");
  if (musicBrainzData) {
    const mbDataHTML = `
          <p><strong>Birth Area:</strong> ${
            musicBrainzData["begin-area"].name
          }</p>
          <p><strong>Life Span:</strong> ${
            musicBrainzData["life-span"].begin
          } to ${musicBrainzData["life-span"].end || "present"}</p>
      `;
    //Append the HTML to the mbDataDiv
    mbDataDiv.innerHTML = mbDataHTML;
    resultDiv.append(mbDataDiv);
  } else {
    mbDataDiv.innerHTML = "No MusicBrainz data available for this artist.";
  }
}

//function to check if the url is from /api/favorite/:artistName router
//and gather the artist name if it is.
function favoriteArtistcheck() {
  var query = window.location.search.substring(1);
  var params = new URLSearchParams(query);
  const favArtist = params.get("artistName");
  if (!favArtist) {
    return;
  } else {
    searchFavArtist(favArtist);
  }
}
