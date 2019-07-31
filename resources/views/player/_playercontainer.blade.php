<div id="playercontainer">
    <div class="playerbuttons">
        <img src="{{asset('img/playercontainer/prevBtn.jpg')}}" id="prevBtn" class="btnWrapper">
        <img src="{{asset('img/playercontainer/playBtn.jpg')}}" id="playPauseBtn" class="btnWrapper">
        <img src="{{asset('img/playercontainer/nextBtn.jpg')}}" id="nextBtn" class="btnWrapper">
    </div>

    <div class="songInfoContainer">
        <div class="titlePlusTime">
            <div id="songTitle">No song selected</div>
            <div id="songTime">0:00 - 0:00</div>
        </div>
        <div class="scrubber" id="scrubber">
            <div id="progressBar"></div>
        </div>
    </div>
    <div class="playerbuttons">
        <img src="{{asset('img/playercontainer/randomBtn.jpg')}}" id="randomBtn" class="btnWrapper">
        <img src="{{asset('img/playercontainer/repeatAllBtn.jpg')}}" id="repeatAllBtn" class="btnWrapper">
        <img src="{{asset('img/playercontainer/repeatOneBtn.jpg')}}" id="repeatOneBtn" class="btnWrapper">
    </div>
    <div style="position: absolute;top: -16px;right: -164px;/* float: right; */">
        <div id="audioSliderContainer">
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
        </div>
    </div>
</div>