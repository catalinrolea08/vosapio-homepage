function openVideo(event) {
    event.preventDefault();
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("youtubeFrame");

    iframe.src = "https://www.youtube.com/embed/RiOtcGc_5b0?autoplay=1";
    modal.style.display = "block";
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("youtubeFrame");

    iframe.src = ""; // stops the video
    modal.style.display = "none";
}
