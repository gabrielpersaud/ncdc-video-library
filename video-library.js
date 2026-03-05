const grid = document.getElementById("videoGrid")
const searchInput = document.getElementById("videoSearch")
const sentinel = document.getElementById("loadSentinel")

let allVideos = []
let filteredVideos = []
let rowsLoaded = 0

const ROW_SIZE = 10

function getColumns(){
if(window.innerWidth < 600) return 1
if(window.innerWidth < 900) return 2
return 3
}

function renderNextRows(){

const cols = getColumns()
const batchSize = ROW_SIZE * cols

const start = rowsLoaded * batchSize
const end = start + batchSize

const slice = filteredVideos.slice(start, end)

slice.forEach(video => {

const card = document.createElement("div")
card.className = "video-card"

card.innerHTML = `
<img class="video-thumb" src="${video.thumb}">
<div class="video-title">${video.title}</div>
`

grid.appendChild(card)

})

rowsLoaded++

}

function resetGrid(){

grid.innerHTML = ""
rowsLoaded = 0
renderNextRows()

}

function filterVideos(){

const q = searchInput.value.toLowerCase()

filteredVideos = allVideos.filter(v =>
v.title.toLowerCase().includes(q)
)

resetGrid()

}

searchInput.addEventListener("input", filterVideos)

const observer = new IntersectionObserver(entries=>{
if(entries[0].isIntersecting){
renderNextRows()
}
})

observer.observe(sentinel)

window.videoLibraryInit = async function(){

try{

const res = await fetch("https://cdn.jsdelivr.net/gh/gabrielpersaud/ncdc-video-library@main/videos.json")
allVideos = await res.json()

}catch(e){

allVideos = [
{id:"1",title:"Example Video 1",thumb:"https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"},
{id:"2",title:"Example Video 2",thumb:"https://i.ytimg.com/vi/ysz5S6PUM-U/hqdefault.jpg"},
{id:"3",title:"Example Video 3",thumb:"https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg"},
{id:"4",title:"Example Video 4",thumb:"https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"},
{id:"5",title:"Example Video 5",thumb:"https://i.ytimg.com/vi/tgbNymZ7vqY/hqdefault.jpg"}
]

}

filteredVideos = allVideos
renderNextRows()

}

videoLibraryInit()