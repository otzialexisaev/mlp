<div id="playercontainer">
    <div class="playerbuttons">
        <div class="btnWrapper">
            <img src="{{asset('img/playercontainer/prevBtn.jpg')}}" id="prevBtn">
        </div>
        <div class="btnWrapper">
            <img src="{{asset('img/playercontainer/playBtn.jpg')}}" id="playPauseBtn">
        </div>
        <div class="btnWrapper">
            <img src="{{asset('img/playercontainer/nextBtn.jpg')}}" id="nextBtn">
        </div>
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
        <div class="btnWrapper">
            <img src="{{asset('img/playercontainer/randomBtn.jpg')}}" id="randomBtn">
        </div>

        <div class="btnWrapper">
            <img src="{{asset('img/playercontainer/repeatAllBtn.jpg')}}" id="repeatAllBtn">
        </div>

        <div class="btnWrapper">
            <img src="{{asset('img/playercontainer/repeatOneBtn.jpg')}}" id="repeatOneBtn">
        </div>
    </div>
    <div style="position: absolute;top: -16px;right: -164px;/* float: right; */">
        <div id="audioSliderContainer">
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
        </div>
    </div>
</div>